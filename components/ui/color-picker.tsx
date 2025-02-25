import * as React from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"
import {
  parseOKLCH,
  oklchToString,
  colorHarmonies,
  getAccessibleVariations,
  getContextColors,
  getContrastRatio
} from "@/lib/color-utils"
import { Download, Upload, Copy, Check } from "lucide-react"

interface ColorPickerProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  color: string
  onChange: (color: string) => void
  context?: "error" | "success" | "info" | "warning" | "neutral"
}

// Generate color grid
const generateColorGrid = () => {
  const grid = []
  const hueSteps = 24 // More hue steps for smoother transitions
  const lightnessSteps = 12 // More lightness steps
  const chromaSteps = [0, 0.05, 0.1, 0.15, 0.2, 0.3] // Specific chroma values

  // Generate main color grid
  for (const chroma of chromaSteps) {
    const row = []
    for (let h = 0; h < hueSteps; h++) {
      const hue = (h / hueSteps) * 360
      const lightness = 65 // Optimal lightness for color perception
      row.push(`oklch(${lightness}% ${chroma} ${hue})`)
    }
    grid.push(row)
  }

  // Add grayscale row
  const grayscaleRow = []
  for (let l = 0; l < hueSteps; l++) {
    const lightness = (l / hueSteps) * 100
    grayscaleRow.push(`oklch(${lightness}% 0 0)`)
  }
  grid.push(grayscaleRow)

  return grid
}

export function ColorPicker({
  open,
  onOpenChange,
  color,
  onChange,
  context = "neutral"
}: ColorPickerProps) {
  const [selectedColor, setSelectedColor] = React.useState(color)
  const { l, c, h } = React.useMemo(() => parseOKLCH(selectedColor), [selectedColor])
  const colorGrid = React.useMemo(() => generateColorGrid(), [])
  const accessibleVariations = React.useMemo(() => 
    getAccessibleVariations(selectedColor, 4.5), [selectedColor])
  const contextColors = React.useMemo(() => getContextColors(context), [context])
  const [copied, setCopied] = React.useState(false)

  const handleColorChange = (newColor: string) => {
    setSelectedColor(newColor)
    onChange(newColor)
  }

  const handleSliderChange = (type: 'l' | 'c' | 'h', value: number) => {
    const current = parseOKLCH(selectedColor)
    const newColor = oklchToString({
      ...current,
      [type]: value
    })
    handleColorChange(newColor)
  }

  const handleCopy = async (text: string) => {
    await navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleExport = () => {
    const data = {
      color: selectedColor,
      harmonies: Object.fromEntries(
        colorHarmonies.map(harmony => [
          harmony.name,
          harmony.fn(selectedColor)
        ])
      ),
      variations: accessibleVariations,
      context: contextColors
    }
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'color-scheme.json'
    a.click()
    URL.revokeObjectURL(url)
  }

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target?.result as string)
        if (data.color) {
          handleColorChange(data.color)
        }
      } catch (err) {
        console.error('Failed to parse color scheme file:', err)
      }
    }
    reader.readAsText(file)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[95vw] md:max-w-[900px] lg:max-w-[1000px] w-full p-6">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle>Color Picker - {context.charAt(0).toUpperCase() + context.slice(1)}</DialogTitle>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={handleExport}
                title="Export color scheme"
              >
                <Download className="h-4 w-4" />
              </Button>
              <div className="relative">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => document.getElementById('import-colors')?.click()}
                  title="Import color scheme"
                >
                  <Upload className="h-4 w-4" />
                </Button>
                <input
                  type="file"
                  id="import-colors"
                  className="hidden"
                  accept=".json"
                  onChange={handleImport}
                />
              </div>
            </div>
          </div>
        </DialogHeader>

        <Tabs defaultValue="picker" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="picker">Color Picker</TabsTrigger>
            <TabsTrigger value="harmony">Color Harmony</TabsTrigger>
            <TabsTrigger value="accessibility">Accessibility</TabsTrigger>
          </TabsList>

          <TabsContent value="picker" className="space-y-6">
            <div className="grid lg:grid-cols-[2.5fr,1fr] gap-6">
              {/* Color Grid */}
              <div className="space-y-6">
                <div className="grid gap-1.5">
                  {colorGrid.map((row, i) => (
                    <div key={i} className="flex gap-1.5 justify-center">
                      {row.map((colorValue, j) => {
                        const { l, c } = parseOKLCH(colorValue)
                        return (
                          <button
                            key={`${i}-${j}`}
                            className={cn(
                              "w-7 h-7 rounded-md transition-all hover:scale-110",
                              colorValue === selectedColor && "ring-2 ring-ring ring-offset-2 scale-110"
                            )}
                            style={{ 
                              backgroundColor: colorValue,
                              opacity: c === 0 ? 1 : 0.9 + (l / 200)
                            }}
                            onClick={() => handleColorChange(colorValue)}
                          />
                        )
                      })}
                    </div>
                  ))}
                </div>

                {/* Color Preview Bar */}
                <div className="h-8 rounded-md shadow-sm" style={{ 
                  background: `linear-gradient(to right, ${Array.from({ length: 360 }, 
                    (_, i) => oklchToString({ l, c, h: i })).join(',')})`
                }} />

                {/* Sliders with preview bars */}
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Lightness</Label>
                    <div className="relative">
                      <div className="absolute inset-0 rounded-md -z-10 shadow-sm" style={{
                        background: `linear-gradient(to right, oklch(0% ${c} ${h}), oklch(100% ${c} ${h}))`
                      }} />
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={l}
                        onChange={(e) => handleSliderChange('l', Number(e.target.value))}
                        className="w-full h-8 bg-transparent rounded-md appearance-none cursor-pointer [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-background [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-ring [&::-webkit-slider-thumb]:appearance-none"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Chroma</Label>
                    <div className="relative">
                      <div className="absolute inset-0 rounded-md -z-10 shadow-sm" style={{
                        background: `linear-gradient(to right, oklch(${l}% 0 ${h}), oklch(${l}% 0.4 ${h}))`
                      }} />
                      <input
                        type="range"
                        min="0"
                        max="0.4"
                        step="0.01"
                        value={c}
                        onChange={(e) => handleSliderChange('c', Number(e.target.value))}
                        className="w-full h-8 bg-transparent rounded-md appearance-none cursor-pointer [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-background [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-ring [&::-webkit-slider-thumb]:appearance-none"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Hue</Label>
                    <div className="relative">
                      <div className="absolute inset-0 rounded-md -z-10 shadow-sm" style={{
                        background: `linear-gradient(to right, ${Array.from({ length: 360 }, 
                          (_, i) => oklchToString({ l, c, h: i })).join(',')})`
                      }} />
                      <input
                        type="range"
                        min="0"
                        max="360"
                        value={h}
                        onChange={(e) => handleSliderChange('h', Number(e.target.value))}
                        className="w-full h-8 bg-transparent rounded-md appearance-none cursor-pointer [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-background [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-ring [&::-webkit-slider-thumb]:appearance-none"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Recommendations */}
              <div className="space-y-6">
                <div>
                  <h4 className="text-base font-medium mb-2">Recommended Colors</h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    Colors optimized for {context} states
                  </p>
                  <div className="space-y-2">
                    {contextColors.map((color, i) => (
                      <button
                        key={i}
                        className="flex items-center gap-2 w-full p-2 rounded-lg hover:bg-accent/50 transition-colors"
                        onClick={() => handleColorChange(color)}
                      >
                        <div
                          className="w-8 h-8 rounded-md shadow-sm ring-1 ring-ring/10"
                          style={{ backgroundColor: color }}
                        />
                        <div className="flex-1 text-left">
                          <div className="text-sm font-medium">Option {i + 1}</div>
                          <div className="text-xs text-muted-foreground font-mono">{color}</div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-base font-medium mb-2">Current Color</h4>
                  <div className="space-y-2">
                    <div
                      className="w-full h-20 rounded-lg shadow-sm ring-1 ring-ring/10"
                      style={{ backgroundColor: selectedColor }}
                    />
                    <Input
                      value={selectedColor}
                      onChange={(e) => handleColorChange(e.target.value)}
                      className="font-mono text-sm"
                    />
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="harmony" className="space-y-4">
            <div className="grid gap-4">
              {colorHarmonies.map(harmony => {
                const colors = Array.isArray(harmony.fn(selectedColor))
                  ? harmony.fn(selectedColor)
                  : [harmony.fn(selectedColor)]
                
                return (
                  <div key={harmony.name}>
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-sm font-medium">{harmony.name}</h4>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-6 px-2"
                        onClick={() => handleCopy(colors.join(', '))}
                      >
                        {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                      </Button>
                    </div>
                    <div className="flex gap-2">
                      {colors.map((color, i) => (
                        <button
                          key={i}
                          className="w-12 h-12 rounded-lg hover:ring-2 hover:ring-offset-2 transition-all"
                          style={{ backgroundColor: color }}
                          onClick={() => handleColorChange(color)}
                          title={color}
                        />
                      ))}
                    </div>
                  </div>
                )
              })}
            </div>
          </TabsContent>

          <TabsContent value="accessibility" className="space-y-4">
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium mb-2">Contrast Ratios</h4>
                <div className="grid gap-2">
                  <div className="flex items-center justify-between p-2 rounded-lg border">
                    <span>White text</span>
                    <div className="flex items-center gap-2">
                      <div className="text-xl font-bold">
                        {getContrastRatio(selectedColor, "#FFFFFF").toFixed(2)}
                      </div>
                      <Badge variant={getContrastRatio(selectedColor, "#FFFFFF") >= 4.5 ? "default" : "destructive"}>
                        {getContrastRatio(selectedColor, "#FFFFFF") >= 4.5 ? "AA" : "Failed"}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded-lg border">
                    <span>Black text</span>
                    <div className="flex items-center gap-2">
                      <div className="text-xl font-bold">
                        {getContrastRatio(selectedColor, "#000000").toFixed(2)}
                      </div>
                      <Badge variant={getContrastRatio(selectedColor, "#000000") >= 4.5 ? "default" : "destructive"}>
                        {getContrastRatio(selectedColor, "#000000") >= 4.5 ? "AA" : "Failed"}
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium mb-2">Accessible Variations</h4>
                <div className="grid grid-cols-5 gap-2">
                  {accessibleVariations.map((color, i) => (
                    <button
                      key={i}
                      className="group relative w-full aspect-square rounded-lg hover:ring-2 hover:ring-offset-2"
                      style={{ backgroundColor: color }}
                      onClick={() => handleColorChange(color)}
                    >
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <Badge variant="outline" className="bg-background/50">
                          {getContrastRatio(color, "#FFFFFF").toFixed(1)}
                        </Badge>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium mb-2">Preview</h4>
                <div className="space-y-2">
                  <div className="p-4 rounded-lg" style={{ backgroundColor: selectedColor }}>
                    <p className="text-white">White text on selected color</p>
                    <p className="text-black">Black text on selected color</p>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="p-4 rounded-lg bg-white">
                      <p style={{ color: selectedColor }}>Selected on white</p>
                    </div>
                    <div className="p-4 rounded-lg bg-black">
                      <p style={{ color: selectedColor }}>Selected on black</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
} 