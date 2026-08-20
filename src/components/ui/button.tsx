import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center rounded-lg border border-transparent bg-clip-padding text-sm font-medium whitespace-nowrap transition-all outline-none select-none focus-visible:border-ring focus-visible:ring focus-visible:ring-ring/50 active:[&:not([aria-haspopup])]:translate-y-px disabled:pointer-events-none disabled:opacity-50 aria-[invalid=true]:border-destructive aria-[invalid=true]:ring aria-[invalid=true]:ring-destructive/20 dark:aria-[invalid=true]:border-destructive/50 dark:aria-[invalid=true]:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default:
          "bg-primary bg-gradient-to-b from-white/[8%] to-transparent text-primary-foreground ring-1 ring-white/10 ring-inset hover:brightness-[1.02] active:brightness-[0.97] dark:ring-white/5",
        outline:
          "border-border bg-transparent hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:border-input dark:hover:bg-input/50",
        secondary:
          "bg-secondary text-secondary-foreground hover:brightness-[1.02] active:brightness-[0.97] aria-expanded:bg-secondary aria-expanded:text-secondary-foreground",
        card:
          "bg-card text-card-foreground hover:brightness-[1.02] active:brightness-[0.97] aria-expanded:bg-card aria-expanded:text-card-foreground",
        ghost:
          "hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:hover:bg-muted/50",
        destructive:
          "bg-destructive/10 text-destructive hover:bg-destructive/20 focus-visible:border-destructive/40 focus-visible:ring-destructive/20 dark:bg-destructive/20 dark:hover:bg-destructive/30 dark:focus-visible:ring-destructive/40",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default:
          "h-10 gap-1.5 px-5 has-[[data-icon=inline-end]]:pr-4 has-[[data-icon=inline-start]]:pl-4",
        xs: "h-6 gap-1 rounded-[min(calc(var(--radius)*0.8),10px)] px-2.5 text-xs [[data-slot=button-group]_&]:rounded-lg has-[[data-icon=inline-end]]:pr-2 has-[[data-icon=inline-start]]:pl-2",
        sm: "h-7 gap-1 rounded-[min(calc(var(--radius)*0.8),12px)] px-3 text-[0.8rem] [[data-slot=button-group]_&]:rounded-lg has-[[data-icon=inline-end]]:pr-2 has-[[data-icon=inline-start]]:pl-2",
        lg: "h-12 gap-1.5 px-4 has-[[data-icon=inline-end]]:pr-3 has-[[data-icon=inline-start]]:pl-3",
        icon: "size-10",
        "icon-xs":
          "size-6 rounded-[min(calc(var(--radius)*0.8),10px)] [[data-slot=button-group]_&]:rounded-lg [&_svg:not([class*='size-'])]:size-3",
        "icon-sm":
          "size-7 rounded-[min(calc(var(--radius)*0.8),12px)] [[data-slot=button-group]_&]:rounded-lg",
        "icon-lg": "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

type ButtonProps = React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
export type { ButtonProps }
