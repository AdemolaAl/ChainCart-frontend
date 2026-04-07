import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-full border px-3 py-0.5 text-xs font-bold uppercase tracking-wider w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none transition-all duration-300 overflow-hidden",
  {
    variants: {
      variant: {
        default: "border-cyan-500/30 bg-cyan-500/15 text-cyan-300 shadow-[0_0_10px_rgba(6,182,212,0.15)]",
        secondary: "border-gray-600/30 bg-gray-700/30 text-gray-300",
        destructive: "border-red-500/30 bg-red-500/15 text-red-400 shadow-[0_0_10px_rgba(239,68,68,0.15)]",
        outline: "border-gray-600/50 text-gray-400 hover:bg-gray-800/50",
      },
    },
    defaultVariants: { variant: "default" },
  }
)

function Badge({ className, variant, asChild = false, ...props }: React.ComponentProps<"span"> & VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "span"
  return <Comp data-slot="badge" className={cn(badgeVariants({ variant }), className)} {...props} />
}

export { Badge, badgeVariants }
