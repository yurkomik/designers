"use client"

import * as React from "react"
import { AppSidebar } from "@/components/app-sidebar"

interface ThemeLayoutProps {
  children: React.ReactNode
}

export default function ThemeLayout({ children }: ThemeLayoutProps) {
  return (
    <div className="flex min-h-screen">
      <AppSidebar className="w-64 flex-shrink-0" />
      <main className="flex-1 p-6 overflow-auto">{children}</main>
    </div>
  )
} 