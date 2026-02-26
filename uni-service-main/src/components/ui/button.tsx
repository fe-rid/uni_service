/**
 * Button Component - Uni Service Marketplace
 * 
 * A versatile button component with multiple variants for different use cases.
 * Includes hero, student, provider, and admin role-specific variants.
 */

import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        // Default primary button
        default: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-md hover:shadow-lg",
        // Destructive action button
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-md",
        // Outline button with border
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        // Secondary button with muted styling
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        // Ghost button - transparent until hovered
        ghost: "hover:bg-accent hover:text-accent-foreground",
        // Link-styled button
        link: "text-primary underline-offset-4 hover:underline",
        // Hero button - gradient with glow effect for landing pages
        hero: "bg-gradient-to-r from-primary to-primary/80 text-primary-foreground shadow-lg hover:shadow-glow hover:scale-[1.02] active:scale-[0.98]",
        // Hero outline - for secondary CTAs on landing
        heroOutline: "border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground",
        // Role-specific variants
        student: "bg-student text-student-foreground hover:bg-student/90 shadow-md",
        provider: "bg-provider text-provider-foreground hover:bg-provider/90 shadow-md",
        admin: "bg-admin text-admin-foreground hover:bg-admin/90 shadow-md",
        // Success state
        success: "bg-success text-success-foreground hover:bg-success/90 shadow-md",
        // Warning state
        warning: "bg-warning text-warning-foreground hover:bg-warning/90 shadow-md",
        // Accent/CTA button
        accent: "bg-accent text-accent-foreground hover:bg-accent/90 shadow-md hover:shadow-lg",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-lg px-8 text-base",
        xl: "h-14 rounded-xl px-10 text-lg font-semibold",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

/**
 * Button component with support for multiple variants and sizes.
 * Use asChild prop to render as a different element (e.g., Link).
 */
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
