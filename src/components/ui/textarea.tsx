import * as React from "react"
import { cn } from "@/lib/utils"

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "flex field-sizing-content min-h-16 w-full rounded-lg border border-gray-700/60 bg-gray-900/60 backdrop-blur-sm px-4 py-3 text-sm text-gray-100 placeholder:text-gray-500 shadow-inner transition-all duration-300 outline-none",
        "focus:border-cyan-500/60 focus:ring-2 focus:ring-cyan-500/20 focus:shadow-[0_0_15px_rgba(6,182,212,0.1)]",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    />
  )
}

export { Textarea }
