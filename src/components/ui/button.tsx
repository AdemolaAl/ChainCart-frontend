import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-semibold tracking-wide uppercase transition-all duration-300 disabled:pointer-events-none disabled:opacity-40 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/60 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-950 border border-transparent",
  {
    variants: {
      variant: {
        default:
          "bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 text-white shadow-[0_0_15px_rgba(6,182,212,0.4)] hover:shadow-[0_0_25px_rgba(6,182,212,0.6)] hover:scale-[1.02] active:scale-[0.98]",
        destructive:
          "bg-gradient-to-r from-red-600 to-pink-600 text-white shadow-[0_0_15px_rgba(239,68,68,0.3)] hover:shadow-[0_0_25px_rgba(239,68,68,0.5)] hover:scale-[1.02] active:scale-[0.98]",
        outline:
          "border-cyan-500/40 bg-transparent text-cyan-300 hover:bg-cyan-500/10 hover:border-cyan-400/70 hover:shadow-[0_0_15px_rgba(6,182,212,0.2)]",
        secondary:
          "bg-gray-800/80 text-gray-300 border-gray-700/50 hover:bg-gray-700/80 hover:text-white hover:border-gray-600/50",
        ghost: "text-gray-400 hover:text-cyan-300 hover:bg-cyan-500/10",
        link: "text-cyan-400 underline-offset-4 hover:underline hover:text-cyan-300",
      },
      size: {
        default: "h-10 px-5 py-2",
        sm: "h-8 rounded-md gap-1.5 px-3 text-xs",
        lg: "h-12 rounded-lg px-8 text-base",
        icon: "size-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className, variant, size, asChild = false, ...props
}: React.ComponentProps<"button"> & VariantProps<typeof buttonVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "button"
  return (
    <Comp data-slot="button" className={cn(buttonVariants({ variant, size, className }))} {...props} />
  )
}

export { Button, buttonVariants }
