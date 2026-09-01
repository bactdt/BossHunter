import { useCallback, useEffect, useState } from 'react'

export type ThemeChoice = 'light' | 'dark' | 'system'
export type ResolvedTheme = 'light' | 'dark'

export const THEME_STORAGE_KEY = 'bosshunter-theme'

interface ThemeStore {
  choice: ThemeChoice
  resolved: ResolvedTheme
}

function readStoredChoice(): ThemeChoice {
  try {
    const value = window.localStorage.getItem(THEME_STORAGE_KEY)
    if (value === 'light' || value === 'dark' || value === 'system') return value
  } catch {
    return 'system'
  }
  return 'system'
}

function resolveTheme(choice: ThemeChoice): ResolvedTheme {
  if (choice === 'system') {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  }
  return choice
}

function applyToDocument(resolved: ResolvedTheme) {
  document.documentElement.classList.toggle('dark', resolved === 'dark')
}

let store: ThemeStore = (() => {
  const choice = readStoredChoice()
  const resolved = resolveTheme(choice)
  applyToDocument(resolved)
  return { choice, resolved }
})()

const listeners = new Set<() => void>()

function emit() {
  listeners.forEach(listener => listener())
}

function handleSystemChange() {
  if (store.choice !== 'system') return
  const resolved = resolveTheme('system')
  if (resolved !== store.resolved) {
    store = { choice: store.choice, resolved }
    applyToDocument(resolved)
    emit()
  }
}

window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', handleSystemChange)

export function useTheme() {
  const [, forceUpdate] = useState(0)

  useEffect(() => {
    const rerender = () => forceUpdate(n => n + 1)
    listeners.add(rerender)
    return () => {
      listeners.delete(rerender)
    }
  }, [])

  const update = useCallback((next: ThemeChoice) => {
    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, next)
    } catch {
      return
    }
    store = { choice: next, resolved: resolveTheme(next) }
    applyToDocument(store.resolved)
    emit()
  }, [])

  return { themeChoice: store.choice, resolvedTheme: store.resolved, setThemeChoice: update }
}
