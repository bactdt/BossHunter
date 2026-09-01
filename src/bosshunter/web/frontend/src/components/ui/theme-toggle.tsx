import { Moon, Monitor, Sun } from 'lucide-react'
import { useTheme, type ThemeChoice } from '@/hooks/useTheme'

const options: { value: ThemeChoice; label: string; icon: typeof Sun }[] = [
  { value: 'light', label: '浅色模式', icon: Sun },
  { value: 'dark', label: '深色模式', icon: Moon },
  { value: 'system', label: '跟随系统', icon: Monitor },
]

export function ThemeToggle() {
  const { themeChoice, setThemeChoice } = useTheme()
  const index = options.findIndex(option => option.value === themeChoice)
  const current = options[index] ?? options[2]
  const next = options[(index + 1) % options.length]

  const CurrentIcon = current.icon

  return (
    <button
      type="button"
      onClick={() => setThemeChoice(next.value)}
      title={`主题：${current.label}（点击切换为${next.label}）`}
      aria-label={`切换主题，当前${current.label}`}
      className="flex h-8 w-8 items-center justify-center rounded-lg border border-card-border bg-surface text-muted transition-colors hover:border-primary/60 hover:text-primary"
    >
      <CurrentIcon className="h-4 w-4" />
    </button>
  )
}
