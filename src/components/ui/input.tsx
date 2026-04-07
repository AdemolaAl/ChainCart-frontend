import * as React from "react"
import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "flex h-10 w-full min-w-0 rounded-lg border border-gray-700/60 bg-gray-900/60 backdrop-blur-sm px-4 py-2 text-sm text-gray-100 placeholder:text-gray-500 shadow-inner transition-all duration-300 outline-none",
        "focus:border-cyan-500/60 focus:ring-2 focus:ring-cyan-500/20 focus:shadow-[0_0_15px_rgba(6,182,212,0.1)]",
        "hover:border-gray-600/80",
        "file:text-cyan-400 file:border-0 file:bg-transparent file:text-sm file:font-medium",
        "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    />
  )
}

export { Input }
