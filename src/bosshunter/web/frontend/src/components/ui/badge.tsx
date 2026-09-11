import { cn } from '@/lib/utils'
import { cva, type VariantProps } from 'class-variance-authority'
import { HTMLAttributes } from 'react'

const badgeVariants = cva(
  'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium border',
  {
    variants: {
      variant: {
        default: 'bg-secondary text-muted border-[#F2E7DE]',
        pending: 'bg-surface text-muted border-card-border',
        scored: 'bg-info/10 text-info border-info/20',
        ready: 'bg-cyan/10 text-cyan border-cyan/20',
        approved: 'bg-warning/10 text-warning border-warning/20',
        skipped: 'bg-surface text-muted border-card-border',
        sent: 'bg-success/10 text-success border-success/20',
        replied: 'bg-success/10 text-success border-success/20',
        resume_sent: 'bg-purple/10 text-purple border-purple/20',
        needs_resume: 'bg-warning/10 text-warning border-warning/20',
        follow_up_sent: 'bg-info/10 text-info border-info/20',
        reply_pending: 'bg-warning/10 text-warning border-warning/20',
        auto_replied: 'bg-success/10 text-success border-success/20',
        rejected: 'bg-danger/10 text-danger border-danger/20',
        error: 'bg-danger/10 text-danger border-danger/20',
        filtered: 'bg-surface text-muted border-card-border',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

export interface BadgeProps extends HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />
}
