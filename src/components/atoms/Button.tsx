'use client'

import { ButtonHTMLAttributes, forwardRef } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        primary: 'bg-primary-600 text-white hover:bg-primary-700 shadow-premium hover:shadow-premium-lg transform hover:-translate-y-0.5',
        secondary: 'bg-white text-primary-600 border-2 border-primary-600 hover:bg-primary-50',
        ghost: 'hover:bg-neutral-100 hover:text-primary-600',
        premium: 'bg-gradient-to-r from-primary-600 to-primary-500 text-white hover:from-primary-700 hover:to-primary-600 shadow-premium-lg hover:shadow-premium-xl transform hover:-translate-y-0.5',
        gold: 'bg-gradient-to-r from-accent-gold to-accent-gold-light text-primary-600 hover:from-accent-gold-light hover:to-accent-gold shadow-premium hover:shadow-premium-lg',
      },
      size: {
        sm: 'h-9 px-4 text-sm rounded-md',
        md: 'h-11 px-6 text-base rounded-lg',
        lg: 'h-14 px-8 text-lg rounded-lg',
        xl: 'h-16 px-10 text-xl rounded-xl',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
)

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)

Button.displayName = 'Button'

export { Button, buttonVariants }