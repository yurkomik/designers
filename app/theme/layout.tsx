"use client"

import * as React from "react"
import { Save, Upload, Download, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Slider } from "@/components/ui/slider"

interface ThemeEditorLayoutProps {
  children: React.ReactNode
}

export default function ThemeEditorLayout({ children }: ThemeEditorLayoutProps) {
  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      {/* Top Bar with Quick Actions */}
      <header className="border-b bg-background px-6 py-3">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Select defaultValue="default">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select theme" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="default">Default Theme</SelectItem>
                <SelectItem value="dark">Dark Theme</SelectItem>
                <SelectItem value="modern">Modern Theme</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="icon">
              <Plus className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon">
              <Upload className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon">
              <Download className="h-4 w-4" />
            </Button>
            <Button>
              <Save className="mr-2 h-4 w-4" />
              Save Theme
            </Button>
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Main Content Area */}
        <main className="flex-1 overflow-auto p-6">
          {children}
        </main>

        {/* Right Configuration Panel */}
        <aside className="border-l bg-muted/10 w-80 overflow-y-auto p-4">
          <div className="space-y-6">
            {/* Global Adjustments */}
            <div>
              <h3 className="font-medium mb-4">Global Adjustments</h3>
              <div className="space-y-4">
                <div>
                  <label className="text-sm mb-2 block">Border Radius</label>
                  <Slider
                    defaultValue={[8]}
                    max={20}
                    step={1}
                    className="w-full"
                  />
                </div>
                <div>
                  <label className="text-sm mb-2 block">Spacing Scale</label>
                  <Slider
                    defaultValue={[1]}
                    min={0.75}
                    max={1.25}
                    step={0.05}
                    className="w-full"
                  />
                </div>
              </div>
            </div>

            <Separator />

            {/* Color Scheme */}
            <div>
              <h3 className="font-medium mb-4">Color Scheme</h3>
              <div className="grid gap-2">
                <Select defaultValue="light">
                  <SelectTrigger>
                    <SelectValue placeholder="Select color scheme" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">Light Mode</SelectItem>
                    <SelectItem value="dark">Dark Mode</SelectItem>
                    <SelectItem value="system">System</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Separator />

            {/* Typography */}
            <div>
              <h3 className="font-medium mb-4">Typography</h3>
              <div className="space-y-4">
                <Select defaultValue="inter">
                  <SelectTrigger>
                    <SelectValue placeholder="Select font family" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="inter">Inter</SelectItem>
                    <SelectItem value="roboto">Roboto</SelectItem>
                    <SelectItem value="system">System Default</SelectItem>
                  </SelectContent>
                </Select>
                <div>
                  <label className="text-sm mb-2 block">Base Size</label>
                  <Slider
                    defaultValue={[16]}
                    min={12}
                    max={20}
                    step={1}
                    className="w-full"
                  />
                </div>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
} 