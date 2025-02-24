"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"
import { useTheme } from "@/lib/theme-context"
import { ThemePreviewDialog } from "@/components/theme/theme-preview-dialog"
import { Card, CardContent } from "@/components/ui/card"

const THEME_LIST = [
  "light",
  "dark",
  "cupcake",
  "autumn",
  "forest",
  "garden",
  "synthwave",
  "retro",
  "cyberpunk",
  "valentine",
  "halloween",
  "aqua",
  "lofi",
  "pastel",
  "fantasy",
  "wireframe",
  "black",
  "luxury",
  "dracula",
  "cmyk",
  "business",
  "acid",
  "lemonade",
  "night",
  "coffee",
  "winter",
] as const

export default function ThemePage() {
  const { theme, setTheme, colors, setColors } = useTheme()
  const [showCssPreview, setShowCssPreview] = React.useState(false)
  
  const handleRandomTheme = () => {
    const randomTheme = THEME_LIST[Math.floor(Math.random() * THEME_LIST.length)]
    setTheme(randomTheme)
  }

  const handleColorChange = (key: string, value: string) => {
    setColors({ ...colors, [key]: value })
  }

  return (
    <div className="flex-1 space-y-8 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
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
            onClick={handleRandomTheme}
          >
            Random Theme
          </Button>
          <Button 
            variant="outline"
            className="bg-background"
            onClick={() => setShowCssPreview(true)}
          >
            View CSS
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-6">
        {/* Theme Selection */}
        <Card className="col-span-1">
          <CardContent className="p-4 pt-4">
            <div className="font-medium mb-3">Available Themes</div>
            <ScrollArea className="h-[calc(100vh-12rem)]">
              <div className="space-y-1 pr-2">
                {THEME_LIST.map((t) => (
                  <Button
                    key={t}
                    variant={theme === t ? "secondary" : "ghost"}
                    className="w-full justify-start font-normal"
                    onClick={() => setTheme(t)}
                  >
                    {t}
                  </Button>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Theme Configuration */}
        <div className="col-span-3 space-y-6">
          <Card>
            <CardContent className="p-6">
              <div className="grid grid-cols-2 gap-6">
                {/* Primary & Secondary Colors */}
                <div className="space-y-4">
                  <div>
                    <Label>Primary</Label>
                    <div className="flex items-center gap-2 mt-2">
                      <div
                        className="w-10 h-10 rounded-md border"
                        style={{ backgroundColor: colors.primary }}
                      />
                      <Input
                        value={colors.primary}
                        onChange={(e) => handleColorChange('primary', e.target.value)}
                        className="font-mono"
                      />
                    </div>
                  </div>
                  <div>
                    <Label>Secondary</Label>
                    <div className="flex items-center gap-2 mt-2">
                      <div
                        className="w-10 h-10 rounded-md border"
                        style={{ backgroundColor: colors.secondary }}
                      />
                      <Input
                        value={colors.secondary}
                        onChange={(e) => handleColorChange('secondary', e.target.value)}
                        className="font-mono"
                      />
                    </div>
                  </div>
                </div>

                {/* Accent & Neutral Colors */}
                <div className="space-y-4">
                  <div>
                    <Label>Accent</Label>
                    <div className="flex items-center gap-2 mt-2">
                      <div
                        className="w-10 h-10 rounded-md border"
                        style={{ backgroundColor: colors.accent }}
                      />
                      <Input
                        value={colors.accent}
                        onChange={(e) => handleColorChange('accent', e.target.value)}
                        className="font-mono"
                      />
                    </div>
                  </div>
                  <div>
                    <Label>Neutral</Label>
                    <div className="flex items-center gap-2 mt-2">
                      <div
                        className="w-10 h-10 rounded-md border"
                        style={{ backgroundColor: colors.neutral }}
                      />
                      <Input
                        value={colors.neutral}
                        onChange={(e) => handleColorChange('neutral', e.target.value)}
                        className="font-mono"
                      />
                    </div>
                  </div>
                </div>

                {/* Semantic Colors */}
                <div className="col-span-2 grid grid-cols-2 gap-6">
                  <div>
                    <Label>Info</Label>
                    <div className="flex items-center gap-2 mt-2">
                      <div
                        className="w-10 h-10 rounded-md border"
                        style={{ backgroundColor: colors.info }}
                      />
                      <Input
                        value={colors.info}
                        onChange={(e) => handleColorChange('info', e.target.value)}
                        className="font-mono"
                      />
                    </div>
                  </div>
                  <div>
                    <Label>Success</Label>
                    <div className="flex items-center gap-2 mt-2">
                      <div
                        className="w-10 h-10 rounded-md border"
                        style={{ backgroundColor: colors.success }}
                      />
                      <Input
                        value={colors.success}
                        onChange={(e) => handleColorChange('success', e.target.value)}
                        className="font-mono"
                      />
                    </div>
                  </div>
                  <div>
                    <Label>Warning</Label>
                    <div className="flex items-center gap-2 mt-2">
                      <div
                        className="w-10 h-10 rounded-md border"
                        style={{ backgroundColor: colors.warning }}
                      />
                      <Input
                        value={colors.warning}
                        onChange={(e) => handleColorChange('warning', e.target.value)}
                        className="font-mono"
                      />
                    </div>
                  </div>
                  <div>
                    <Label>Error</Label>
                    <div className="flex items-center gap-2 mt-2">
                      <div
                        className="w-10 h-10 rounded-md border"
                        style={{ backgroundColor: colors.error }}
                      />
                      <Input
                        value={colors.error}
                        onChange={(e) => handleColorChange('error', e.target.value)}
                        className="font-mono"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Component Preview */}
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-medium mb-4">Component Preview</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <Button variant="default" className="bg-primary text-primary-foreground">Primary Button</Button>
                  <Button variant="secondary" className="bg-secondary text-secondary-foreground">Secondary Button</Button>
                  <Button variant="outline" className="border-input bg-background">Outline Button</Button>
                </div>
                <div className="max-w-sm">
                  <Input placeholder="Input field" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <ThemePreviewDialog
        open={showCssPreview}
        onOpenChange={setShowCssPreview}
      />
    </div>
  )
} 