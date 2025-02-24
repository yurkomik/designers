"use client"

import * as React from "react"
import { ThemeProvider } from "@/lib/theme-context"
import { SidebarProvider } from "@/components/ui/sidebar"

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <SidebarProvider>
        {children}
      </SidebarProvider>
    </ThemeProvider>
  )
} 