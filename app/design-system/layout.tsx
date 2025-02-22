"use client"

import * as React from "react"
import { DesignSystemSidebar } from "@/components/design-system/design-sidebar"
import { DesignSystemTopBar } from "@/components/design-system/top-bar"

interface DesignSystemLayoutProps {
  children: React.ReactNode
}

export default function DesignSystemLayout({ children }: DesignSystemLayoutProps) {
  return (
    <div className="flex h-screen w-screen overflow-hidden">
      {/* Left Sidebar - Design System Navigation */}
      <DesignSystemSidebar />

      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="border-b bg-background px-6 py-3">
          <DesignSystemTopBar />
        </header>

        <div className="flex flex-1 overflow-hidden">
          {/* Main Content Area */}
          <main className="flex-1 overflow-auto p-6">
            {children}
          </main>

          {/* Right Sidebar - Configuration Panel */}
          <aside className="border-l bg-muted/10 w-80 overflow-y-auto p-4">
            <div className="space-y-4">
              <div>
                <h3 className="font-medium mb-2">Tokens</h3>
                {/* Token controls will go here */}
              </div>
              <div>
                <h3 className="font-medium mb-2">Styles</h3>
                {/* Style controls will go here */}
              </div>
              <div>
                <h3 className="font-medium mb-2">Component Actions</h3>
                {/* Component-specific actions will go here */}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
} 