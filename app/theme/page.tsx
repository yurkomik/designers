"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { ThemePreviewDialog } from "@/components/theme/theme-preview-dialog"
import { ThemeList } from "@/components/theme/theme-list"
import { ThemeConfiguration } from "@/components/theme/theme-configuration"
import { ThemePreview } from "@/components/theme/theme-preview"

export default function ThemePage() {
  const [showCssPreview, setShowCssPreview] = React.useState(false)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Theme Editor</h2>
          <p className="text-muted-foreground">
            Customize your application's theme settings
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button 
            variant="outline"
            className="bg-background"
            onClick={() => setShowCssPreview(true)}
          >
            View CSS
          </Button>
        </div>
      </div>

      <div className="flex gap-6">
        {/* Theme Selection */}
        <div className="w-[300px] shrink-0">
          <ThemeList />
        </div>

        {/* Theme Configuration */}
        <div className="w-[300px] shrink-0">
          <ThemeConfiguration />
        </div>

        {/* Preview */}
        <div className="w-full flex-1">
          <ThemePreview />
        </div>
      </div>

      <ThemePreviewDialog
        open={showCssPreview}
        onOpenChange={setShowCssPreview}
      />
    </div>
  )
} 