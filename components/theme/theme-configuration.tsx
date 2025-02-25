import * as React from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { useTheme } from "@/lib/theme-context"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { Separator } from "@/components/ui/separator"
import { ColorPicker } from "@/components/ui/color-picker"
import { cn } from "@/lib/utils"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { ChevronDown, ChevronRight, PaintBucket, CircleDashed, Maximize, Settings, Palette, Layers, Type, Library } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { getAllThemes } from "@/lib/theme-registry"
import { Theme, PanelBackgroundType } from "@/lib/theme-types"

export function ThemeConfiguration() {
  const {
    colors,
    setColors,
    radius,
    setRadius,
    borderWidth,
    setBorderWidth,
    defaultTheme,
    setDefaultTheme,
    defaultDarkTheme,
    setDefaultDarkTheme,
    darkColorScheme,
    setDarkColorScheme,
    currentTheme,
    setCurrentTheme,
    scaling,
    setScaling,
    panelBackground,
    setPanelBackground,
    saveTheme,
    exportTheme,
    importTheme,
    resetToDefaults
  } = useTheme()
  const [depthEffect, setDepthEffect] = React.useState(false)
  const [noiseEffect, setNoiseEffect] = React.useState(false)
  const [colorPickerOpen, setColorPickerOpen] = React.useState(false)
  const [selectedColorKey, setSelectedColorKey] = React.useState<string | null>(null)
  const [openSections, setOpenSections] = React.useState({
    colors: true,
    appearance: false,
    options: false,
    effects: false,
    sizes: false,
    typography: false,
    icons: false
  })
  
  // Typography state
  const [fontFamily, setFontFamily] = React.useState("Geist Sans")
  const [baseFontSize, setBaseFontSize] = React.useState(16)
  const [fontScale, setFontScale] = React.useState(1.25)
  const [lineHeight, setLineHeight] = React.useState(1.5)
  const [fontWeights, setFontWeights] = React.useState({
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700
  })
  
  // Icon sets state
  const [currentIconSet, setCurrentIconSet] = React.useState("lucide")
  const [customIconUrl, setCustomIconUrl] = React.useState("")
  const [isLoadingIcons, setIsLoadingIcons] = React.useState(false)

  const handleColorChange = (key: string, value: string) => {
    setColors({ ...colors, [key]: value })
  }

  const handleColorClick = (key: string) => {
    setSelectedColorKey(key)
    setColorPickerOpen(true)
  }

  const getColorContext = (key: string): "error" | "success" | "info" | "warning" | "neutral" => {
    switch (key) {
      case "error": return "error"
      case "success": return "success"
      case "info": return "info"
      case "warning": return "warning"
      default: return "neutral"
    }
  }

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections({ ...openSections, [section]: !openSections[section] })
  }

  // Add function to handle icon set loading
  const handleLoadIconSet = () => {
    // This would typically involve fetching from the custom URL
    // and registering the icons in the application
    setIsLoadingIcons(true)
    
    // Simulate loading
    setTimeout(() => {
      setIsLoadingIcons(false)
      // In a real implementation, this would load the icons
      alert("Icon loading is a conceptual demonstration - implementation would require custom logic to register icons from external sources.")
    }, 1500)
  }

  const baseColors = ["100", "200", "300", "A"]
  
  // Group colors into categories for better organization
  const colorGroups = [
    {
      title: "Brand Colors",
      colors: [
        { key: "primary", label: "Primary" },
        { key: "secondary", label: "Secondary" },
        { key: "accent", label: "Accent" },
      ]
    },
    {
      title: "UI Colors",
      colors: [
        { key: "neutral", label: "Neutral" },
        { key: "info", label: "Info" },
        { key: "success", label: "Success" },
        { key: "warning", label: "Warning" },
        { key: "error", label: "Error" },
      ]
    }
  ]

  // Define radius options
  const radiusOptions = [
    { value: "0", label: "Square" },
    { value: "0.25rem", label: "Small" },
    { value: "0.5rem", label: "Medium" },
    { value: "1rem", label: "Large" },
    { value: "1.5rem", label: "Full" }
  ]

  // Define border width options
  const borderWidthOptions = [
    { value: 0.5, label: "0.5px" },
    { value: 1, label: "1px" },
    { value: 1.5, label: "1.5px" },
    { value: 2, label: "2px" }
  ]

  // Define scaling options
  const scalingOptions = [
    { value: "90%", label: "90%" },
    { value: "95%", label: "95%" },
    { value: "100%", label: "100%" },
    { value: "105%", label: "105%" },
    { value: "110%", label: "110%" }
  ]

  // Define panel background options
  const panelBackgroundOptions = [
    { value: "solid", label: "Solid" },
    { value: "translucent", label: "Translucent" }
  ]

  // Sample font families
  const fontFamilies = [
    { value: "Geist Sans", label: "Geist Sans" },
    { value: "Inter", label: "Inter" },
    { value: "SF Pro", label: "SF Pro" },
    { value: "Roboto", label: "Roboto" },
    { value: "Open Sans", label: "Open Sans" }
  ]
  
  // Sample icon sets
  const iconSets = [
    { value: "lucide", label: "Lucide Icons (Default)" },
    { value: "heroicons", label: "Heroicons" },
    { value: "phosphor", label: "Phosphor Icons" },
    { value: "boxicons", label: "Boxicons" },
    { value: "custom", label: "Custom Icon Set" }
  ]

  return (
    <>
      <Card className="h-full">
        <CardContent className="p-4 pt-4 overflow-y-auto max-h-[calc(100vh-100px)]">
          <div className="space-y-4">
            {/* Colors Section */}
            <CollapsibleSection 
              title="Colors" 
              icon={<PaintBucket className="h-4 w-4" />}
              isOpen={openSections.colors}
              onToggle={() => toggleSection('colors')}
            >
              <div className="space-y-4">
                {/* Color Categories */}
                {colorGroups.map((group) => (
                  <div key={group.title} className="space-y-3">
                    <h3 className="text-sm font-medium text-muted-foreground">{group.title}</h3>
                    <div className="space-y-2.5">
                      {group.colors.map(({ key, label }) => (
                        <div key={key}>
                          <div className="flex items-center gap-2">
                            <button
                              className="w-8 h-8 rounded-md border flex-shrink-0"
                              style={{ backgroundColor: colors[key] }}
                              onClick={() => handleColorClick(key)}
                              title={`Change ${label} color`}
                            />
                            <div className="flex-1">
                              <Label className="text-xs mb-1">{label}</Label>
                              <Input
                                value={colors[key]}
                                onChange={(e) => handleColorChange(key, e.target.value)}
                                className="font-mono h-7 text-xs"
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CollapsibleSection>

            <Separator className="my-2" />

            {/* Appearance Section */}
            <CollapsibleSection 
              title="Appearance" 
              icon={<Palette className="h-4 w-4" />}
              isOpen={openSections.appearance}
              onToggle={() => toggleSection('appearance')}
            >
              <div className="space-y-4">
                {/* Scaling */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Scaling</Label>
                  <div className="grid grid-cols-5 gap-2">
                    {scalingOptions.map((option) => (
                      <button
                        key={option.value}
                        className={cn(
                          "flex items-center justify-center py-2 px-3 rounded-md border text-sm",
                          scaling === option.value ? "border-primary bg-primary/10" : "border-muted"
                        )}
                        onClick={() => setScaling(option.value)}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>
                
                {/* Panel Background */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label className="text-sm font-medium">Panel background</Label>
                    <div className="text-xs text-muted-foreground">
                      <span className="inline-flex items-center">
                        <CircleDashed className="h-3 w-3 mr-1" />
                        Info
                      </span>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {panelBackgroundOptions.map((option) => (
                      <button
                        key={option.value}
                        className={cn(
                          "flex items-center justify-center py-5 px-3 rounded-md border text-sm",
                          panelBackground === option.value ? "border-primary bg-primary/10" : "border-muted"
                        )}
                        onClick={() => setPanelBackground(option.value as PanelBackgroundType)}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </CollapsibleSection>
            
            <Separator className="my-2" />
            
            {/* Effects Section */}
            <CollapsibleSection 
              title="Effects" 
              icon={<Layers className="h-4 w-4" />}
              isOpen={openSections.effects}
              onToggle={() => toggleSection('effects')}
            >
              <div className="space-y-3">
                <ToggleOption
                  label="Depth Effect"
                  description="Add shadows and depth"
                  checked={depthEffect}
                  onChange={setDepthEffect}
                />
                <ToggleOption
                  label="Noise Effect"
                  description="Add subtle texture"
                  checked={noiseEffect}
                  onChange={setNoiseEffect}
                />
              </div>
            </CollapsibleSection>
            
            <Separator className="my-2" />
            
            {/* Icon Sets Section */}
            <CollapsibleSection 
              title="Icon Sets" 
              icon={<Library className="h-4 w-4" />}
              isOpen={openSections.icons}
              onToggle={() => toggleSection('icons')}
            >
              <div className="space-y-4">
                <div>
                  <Label className="text-sm mb-2 block">Current Icon Set</Label>
                  <Select value={currentIconSet} onValueChange={setCurrentIconSet}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select icon set" />
                    </SelectTrigger>
                    <SelectContent>
                      {iconSets.map((iconSet) => (
                        <SelectItem key={iconSet.value} value={iconSet.value}>
                          {iconSet.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                {currentIconSet === 'custom' && (
                  <div className="space-y-2">
                    <Label className="text-sm">Custom Icon Set URL</Label>
                    <div className="flex gap-2">
                      <Input 
                        value={customIconUrl} 
                        onChange={(e) => setCustomIconUrl(e.target.value)}
                        placeholder="https://example.com/icons.json"
                        className="flex-1"
                      />
                      <button
                        onClick={handleLoadIconSet}
                        disabled={!customIconUrl || isLoadingIcons}
                        className={cn(
                          "btn btn-secondary h-9 px-3 whitespace-nowrap",
                          isLoadingIcons && "opacity-70"
                        )}
                      >
                        {isLoadingIcons ? "Loading..." : "Load Icons"}
                      </button>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Enter a URL to a JSON file containing your custom icon set definitions.
                    </p>
                  </div>
                )}
                
                <div className="p-3 bg-muted/30 rounded-md">
                  <h3 className="text-sm font-medium mb-2">Icon Set Information</h3>
                  <div className="space-y-1 text-sm">
                    <p><span className="font-medium">ShadCN Default:</span> Lucide Icons</p>
                    <p><span className="font-medium">Current Selection:</span> {
                      iconSets.find(set => set.value === currentIconSet)?.label || currentIconSet
                    }</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Note: Changing icon sets requires implementing a custom icon loader in your application. ShadCN by default uses Lucide icons, but you can implement adapters for other icon libraries.
                    </p>
                  </div>
                </div>
                
                <div className="grid grid-cols-6 gap-2 mt-2">
                  {Array.from({ length: 12 }).map((_, i) => (
                    <div key={i} className="flex items-center justify-center h-10 w-10 border border-border rounded-md">
                      <div className="w-5 h-5 bg-foreground/20 rounded-sm" />
                    </div>
                  ))}
                </div>
              </div>
            </CollapsibleSection>
            
            <Separator className="my-2" />
            
            {/* Options Section */}
            <CollapsibleSection 
              title="Theme Options" 
              icon={<Settings className="h-4 w-4" />}
              isOpen={openSections.options}
              onToggle={() => toggleSection('options')}
            >
              <div className="space-y-3">
                <ToggleOption
                  label="Default theme"
                  checked={defaultTheme}
                  onChange={setDefaultTheme}
                />
                <ToggleOption
                  label="Default dark theme"
                  checked={defaultDarkTheme}
                  onChange={setDefaultDarkTheme}
                />
                <ToggleOption
                  label="Dark color scheme"
                  checked={darkColorScheme}
                  onChange={setDarkColorScheme}
                />
              </div>
            </CollapsibleSection>
          </div>
        </CardContent>
      </Card>

      {selectedColorKey && (
        <ColorPicker
          open={colorPickerOpen}
          onOpenChange={setColorPickerOpen}
          color={colors[selectedColorKey]}
          onChange={(color) => handleColorChange(selectedColorKey, color)}
          context={getColorContext(selectedColorKey)}
        />
      )}
    </>
  )
}

// Helper component for collapsible sections
function CollapsibleSection({ 
  title, 
  icon, 
  isOpen, 
  onToggle, 
  children 
}: { 
  title: string; 
  icon: React.ReactNode;
  isOpen: boolean; 
  onToggle: () => void; 
  children: React.ReactNode 
}) {
  return (
    <Collapsible open={isOpen} onOpenChange={onToggle} className="space-y-2">
      <div className="flex items-center justify-between">
        <CollapsibleTrigger className="flex items-center gap-2 group w-full text-left">
          <div className="flex items-center gap-2">
            {icon}
            <h2 className="text-sm font-medium">{title}</h2>
          </div>
          <div className="text-muted-foreground">
            {isOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
          </div>
        </CollapsibleTrigger>
      </div>
      <CollapsibleContent className="pt-2">
        {children}
      </CollapsibleContent>
    </Collapsible>
  )
}

// Helper component for radius controls
function RadiusControl({ 
  title, 
  description, 
  options, 
  value, 
  onChange 
}: { 
  title: string; 
  description: string; 
  options: Array<{ value: string; label: string; }>; 
  value: string; 
  onChange: (value: string) => void; 
}) {
  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <Label className="text-xs text-muted-foreground">{title}</Label>
        <span className="text-xs text-muted-foreground">{description}</span>
      </div>
      <div className="grid grid-cols-5 gap-1.5">
        {options.map((option, i) => {
          const isSelected = value === option.value;
          const borderRadius = 
            i === 0 ? "0" : // Square
            i === 1 ? "0.25rem" : // Small
            i === 2 ? "0.5rem" : // Medium
            i === 3 ? "1rem" : // Large
            "1.5rem"; // Full
          
          return (
            <button
              key={option.value}
              onClick={() => onChange(option.value)}
              className={cn(
                "relative h-10 flex items-center justify-center border-2",
                "transition-all duration-150",
                isSelected 
                  ? "border-primary ring-1 ring-primary/30 bg-primary/5" 
                  : "border-slate-300 bg-background hover:border-slate-400"
              )}
              style={{ borderRadius }}
              title={option.label}
            >
              <div className="text-xs font-medium">
                {i === 0 ? "0px" : 
                 i === 1 ? "4px" : 
                 i === 2 ? "8px" : 
                 i === 3 ? "16px" : 
                 "24px"}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  )
}

// Helper component for toggle options
function ToggleOption({ 
  label, 
  description, 
  checked, 
  onChange 
}: { 
  label: string; 
  description?: string; 
  checked: boolean; 
  onChange: (checked: boolean) => void; 
}) {
  return (
    <div className="flex items-center justify-between">
      <div className="space-y-0.5">
        <Label className="text-sm">{label}</Label>
        {description && <div className="text-xs text-muted-foreground">{description}</div>}
      </div>
      <Switch
        checked={checked}
        onCheckedChange={onChange}
      />
    </div>
  )
} 