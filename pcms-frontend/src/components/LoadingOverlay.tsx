import { cn } from "@/lib/utils"
import React from "react"
import { LoadingOverlayProps } from "@/interfaces/interfaces"

export function LoadingOverlay({ className }: LoadingOverlayProps) {
  return (
    <div className={cn(
      "absolute inset-0 bg-white/80 flex items-center justify-center rounded-lg",
      className
    )}>
      <div className="w-8 h-8 border-2 border-[#6fb080] border-t-transparent rounded-full animate-spin" />
    </div>
  )
}

