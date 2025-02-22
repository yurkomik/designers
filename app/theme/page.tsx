"use client"

import * as React from "react"
import { Copy, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"

export default function ThemeEditorPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Theme Editor</h1>
        <p className="text-muted-foreground mt-2">
          Customize your theme colors, typography, and other design tokens.
        </p>
      </div>

      <Tabs defaultValue="colors">
        <TabsList>
          <TabsTrigger value="colors">Colors</TabsTrigger>
          <TabsTrigger value="typography">Typography</TabsTrigger>
          <TabsTrigger value="spacing">Spacing</TabsTrigger>
          <TabsTrigger value="effects">Effects</TabsTrigger>
        </TabsList>

        <TabsContent value="colors" className="space-y-4">
          {/* Color Palettes */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {/* Primary Colors */}
            <Card>
              <CardHeader>
                <CardTitle>Primary</CardTitle>
                <CardDescription>
                  Main brand colors used throughout the interface
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <Label>Base Color</Label>
                    <div className="flex gap-2 mt-1.5">
                      <div className="w-10 h-10 rounded-md bg-primary" />
                      <Input value="#0091FF" className="font-mono" />
                      <Button variant="outline" size="icon">
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="grid grid-cols-5 gap-2">
                    <div className="space-y-1.5">
                      <div className="h-10 rounded-md bg-primary/20" />
                      <div className="text-xs text-center">20%</div>
                    </div>
                    <div className="space-y-1.5">
                      <div className="h-10 rounded-md bg-primary/40" />
                      <div className="text-xs text-center">40%</div>
                    </div>
                    <div className="space-y-1.5">
                      <div className="h-10 rounded-md bg-primary/60" />
                      <div className="text-xs text-center">60%</div>
                    </div>
                    <div className="space-y-1.5">
                      <div className="h-10 rounded-md bg-primary/80" />
                      <div className="text-xs text-center">80%</div>
                    </div>
                    <div className="space-y-1.5">
                      <div className="h-10 rounded-md bg-primary" />
                      <div className="text-xs text-center">100%</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Secondary Colors */}
            <Card>
              <CardHeader>
                <CardTitle>Secondary</CardTitle>
                <CardDescription>
                  Supporting colors for secondary elements
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <Label>Base Color</Label>
                    <div className="flex gap-2 mt-1.5">
                      <div className="w-10 h-10 rounded-md bg-secondary" />
                      <Input value="#64748B" className="font-mono" />
                      <Button variant="outline" size="icon">
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="grid grid-cols-5 gap-2">
                    <div className="space-y-1.5">
                      <div className="h-10 rounded-md bg-secondary/20" />
                      <div className="text-xs text-center">20%</div>
                    </div>
                    <div className="space-y-1.5">
                      <div className="h-10 rounded-md bg-secondary/40" />
                      <div className="text-xs text-center">40%</div>
                    </div>
                    <div className="space-y-1.5">
                      <div className="h-10 rounded-md bg-secondary/60" />
                      <div className="text-xs text-center">60%</div>
                    </div>
                    <div className="space-y-1.5">
                      <div className="h-10 rounded-md bg-secondary/80" />
                      <div className="text-xs text-center">80%</div>
                    </div>
                    <div className="space-y-1.5">
                      <div className="h-10 rounded-md bg-secondary" />
                      <div className="text-xs text-center">100%</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Add New Color */}
            <Card className="border-dashed">
              <CardHeader>
                <CardTitle>Add New Color</CardTitle>
                <CardDescription>
                  Create a new color palette for your theme
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Color Palette
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Color Preview */}
          <Card>
            <CardHeader>
              <CardTitle>Preview</CardTitle>
              <CardDescription>
                See how your colors look in different components
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-2">
                <Button>Primary Button</Button>
                <Button variant="secondary">Secondary Button</Button>
                <Button variant="outline">Outline Button</Button>
                <Button variant="ghost">Ghost Button</Button>
              </div>
              <div className="flex flex-wrap gap-2">
                <div className="bg-primary text-primary-foreground p-4 rounded-md">Primary</div>
                <div className="bg-secondary text-secondary-foreground p-4 rounded-md">Secondary</div>
                <div className="bg-muted text-muted-foreground p-4 rounded-md">Muted</div>
                <div className="bg-accent text-accent-foreground p-4 rounded-md">Accent</div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="typography">
          {/* Typography content will go here */}
        </TabsContent>

        <TabsContent value="spacing">
          {/* Spacing content will go here */}
        </TabsContent>

        <TabsContent value="effects">
          {/* Effects content will go here */}
        </TabsContent>
      </Tabs>
    </div>
  )
} 