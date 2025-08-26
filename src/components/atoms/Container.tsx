import { HTMLAttributes, forwardRef } from 'react'
import { cn } from '@/lib/utils'

export interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  as?: keyof JSX.IntrinsicElements
}

const Container = forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, as: Component = 'div', ...props }, ref) => {
    const Comp = Component as any
    return (
      <Comp
        ref={ref}
        className={cn(
          'mx-auto w-full max-w-7xl px-6 sm:px-8 lg:px-12',
          className
        )}
        {...props}
      />
    )
  }
)

Container.displayName = 'Container'

export { Container }