"use client"

import * as React from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { useTheme } from "@/lib/theme-context"

interface ThemePreviewDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ThemePreviewDialog({
  open,
  onOpenChange,
}: ThemePreviewDialogProps) {
  const { colors, radius } = useTheme()

  const generateCSS = () => {
    return `
:root {
  /* Colors */
  ${Object.entries(colors)
    .map(([key, value]) => `  --color-${key}: ${value};`)
    .join("\n")}

  /* Border Radius */
  ${Object.entries(radius)
    .map(([key, value]) => `  --radius-${key}: ${value};`)
    .join("\n")}
}
    `.trim()
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(generateCSS())
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Theme CSS Preview</DialogTitle>
          <DialogDescription>
            Copy these CSS variables to use in your project
          </DialogDescription>
        </DialogHeader>
        <div className="relative">
          <pre className="p-4 rounded-lg bg-muted overflow-auto max-h-[400px]">
            <code>{generateCSS()}</code>
          </pre>
          <Button
            variant="secondary"
            size="sm"
            className="absolute top-2 right-2"
            onClick={handleCopy}
          >
            Copy
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
} 