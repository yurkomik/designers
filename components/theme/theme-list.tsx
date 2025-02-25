import * as React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Card, CardContent } from "@/components/ui/card"
import { useTheme } from "@/lib/theme-context"
import { Label } from "@/components/ui/label"
import { 
  Save, 
  Download, 
  Upload, 
  ShuffleIcon, 
  ChevronDown, 
  ChevronRight, 
  Trash2, 
  PaintBucket
} from "lucide-react"
import { Theme } from "@/lib/theme-types"
import { 
  getAllThemes, 
  officialThemes, 
  communityThemes, 
  customThemes, 
  removeCustomTheme 
} from "@/lib/theme-registry"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"

export function ThemeList() {
  const { 
    currentTheme, 
    setCurrentTheme, 
    saveTheme, 
    exportTheme, 
    importTheme,
    resetToDefaults 
  } = useTheme()
  
  const [customThemeName, setCustomThemeName] = React.useState("")
  const [openSections, setOpenSections] = React.useState({
    official: true,
    community: true,
    custom: true
  })
  const [importDialogOpen, setImportDialogOpen] = React.useState(false)
  const fileInputRef = React.useRef<HTMLInputElement>(null)

  const handleRandomTheme = () => {
    const allThemes = getAllThemes()
    const randomTheme = allThemes[Math.floor(Math.random() * allThemes.length)]
    setCurrentTheme(randomTheme)
  }

  const handleSaveCustomTheme = () => {
    if (!customThemeName) return
    
    // Create a new custom theme based on current settings and save it
    const newCustomTheme: Theme = {
      ...currentTheme,
      id: `custom-${Date.now()}`,
      name: customThemeName,
      description: `Custom theme based on ${currentTheme.name}`,
      type: 'custom'
    }
    
    // Use the saveTheme function from context
    saveTheme()
    setCustomThemeName("")
  }
  
  const handleExportTheme = () => {
    const themeJson = exportTheme()
    const blob = new Blob([themeJson], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${currentTheme.name.toLowerCase().replace(/\s+/g, '-')}-theme.json`
    a.click()
    URL.revokeObjectURL(url)
  }
  
  const handleImportClick = () => {
    fileInputRef.current?.click()
  }
  
  const handleImportTheme = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return
    
    const reader = new FileReader()
    reader.onload = (e) => {
      const content = e.target?.result as string
      if (content) {
        importTheme(content)
      }
    }
    reader.readAsText(file)
    
    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }
  
  const handleRemoveCustomTheme = (themeId: string) => {
    removeCustomTheme(themeId)
    
    // If the removed theme was the current theme, reset to default
    if (currentTheme.id === themeId) {
      resetToDefaults()
    }
  }
  
  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections({ ...openSections, [section]: !openSections[section] })
  }

  // Helper to render a single theme item
  const renderThemeItem = (theme: Theme) => {
    const isActive = currentTheme.id === theme.id
    
    return (
      <div 
        key={theme.id}
        className={cn(
          "flex items-center justify-between p-2 rounded-md transition-colors",
          isActive ? "bg-secondary/20" : "hover:bg-secondary/10"
        )}
      >
        <button
          className="flex items-center gap-2 flex-1 text-left"
          onClick={() => setCurrentTheme(theme)}
        >
          {/* Color swatches */}
          <div className="flex gap-0.5">
            {Object.values(theme.colors).slice(0, 4).map((color, i) => (
              <div 
                key={i} 
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
          
          <div className="flex-1">
            <div className="text-sm font-medium">{theme.name}</div>
            {theme.type === 'community' && theme.author && (
              <div className="text-xs text-muted-foreground">by {theme.author}</div>
            )}
          </div>
        </button>
        
        {/* Actions for custom themes */}
        {theme.type === 'custom' && (
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7"
            onClick={() => handleRemoveCustomTheme(theme.id)}
          >
            <Trash2 className="h-3.5 w-3.5 text-muted-foreground" />
          </Button>
        )}
      </div>
    )
  }
  
  // Separate themes by type
  const allThemes = getAllThemes()
  
  return (
    <Card>
      <CardContent className="p-4 pt-4">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="font-medium flex items-center gap-1">
              <PaintBucket className="h-4 w-4" />
              <span>Themes</span>
            </div>
            <div className="flex gap-1">
              <Button 
                variant="outline" 
                size="sm"
                className="h-8 px-2"
                onClick={handleRandomTheme}
                title="Random Theme"
              >
                <ShuffleIcon className="h-3.5 w-3.5 mr-1" />
                <span>Random</span>
              </Button>
              
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8"
                onClick={handleExportTheme}
                title="Export Current Theme"
              >
                <Download className="h-3.5 w-3.5" />
              </Button>
              
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8"
                onClick={handleImportClick}
                title="Import Theme"
              >
                <Upload className="h-3.5 w-3.5" />
              </Button>
              <input
                ref={fileInputRef}
                type="file"
                className="hidden"
                accept=".json"
                onChange={handleImportTheme}
              />
            </div>
          </div>

          <ScrollArea className="h-[calc(100vh-22rem)]">
            <div className="space-y-3 pr-2">
              {/* Official themes */}
              <Collapsible
                open={openSections.official}
                onOpenChange={() => toggleSection('official')}
              >
                <CollapsibleTrigger className="flex items-center justify-between w-full text-left py-1">
                  <div className="text-sm font-medium">Official Themes</div>
                  <div className="text-muted-foreground">
                    {openSections.official ? (
                      <ChevronDown className="h-4 w-4" />
                    ) : (
                      <ChevronRight className="h-4 w-4" />
                    )}
                  </div>
                </CollapsibleTrigger>
                <CollapsibleContent className="pt-1">
                  <div className="space-y-1">
                    {officialThemes.map(renderThemeItem)}
                  </div>
                </CollapsibleContent>
              </Collapsible>
              
              {/* Community themes */}
              <Collapsible
                open={openSections.community}
                onOpenChange={() => toggleSection('community')}
              >
                <CollapsibleTrigger className="flex items-center justify-between w-full text-left py-1">
                  <div className="text-sm font-medium">Community Themes</div>
                  <div className="text-muted-foreground">
                    {openSections.community ? (
                      <ChevronDown className="h-4 w-4" />
                    ) : (
                      <ChevronRight className="h-4 w-4" />
                    )}
                  </div>
                </CollapsibleTrigger>
                <CollapsibleContent className="pt-1">
                  <div className="space-y-1">
                    {communityThemes.map(renderThemeItem)}
                  </div>
                </CollapsibleContent>
              </Collapsible>
              
              {/* Custom themes */}
              <Collapsible
                open={openSections.custom}
                onOpenChange={() => toggleSection('custom')}
              >
                <CollapsibleTrigger className="flex items-center justify-between w-full text-left py-1">
                  <div className="text-sm font-medium">Custom Themes</div>
                  <div className="text-muted-foreground">
                    {openSections.custom ? (
                      <ChevronDown className="h-4 w-4" />
                    ) : (
                      <ChevronRight className="h-4 w-4" />
                    )}
                  </div>
                </CollapsibleTrigger>
                <CollapsibleContent className="pt-1">
                  {customThemes.length === 0 ? (
                    <div className="text-sm text-muted-foreground py-2">
                      No custom themes yet. Create one by saving your current theme.
                    </div>
                  ) : (
                    <div className="space-y-1">
                      {customThemes.map(renderThemeItem)}
                    </div>
                  )}
                </CollapsibleContent>
              </Collapsible>
            </div>
          </ScrollArea>

          <Separator />

          <div className="space-y-2 pt-1">
            <Label>Save Current as Theme</Label>
            <div className="flex gap-2">
              <Input
                placeholder="Theme name"
                value={customThemeName}
                onChange={(e) => setCustomThemeName(e.target.value)}
              />
              <Button
                variant="outline"
                size="icon"
                onClick={handleSaveCustomTheme}
                disabled={!customThemeName}
              >
                <Save className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          {/* Current theme preview */}
          <div className="p-3 bg-muted/20 rounded-md space-y-2">
            <div className="text-sm font-medium">Current Theme</div>
            <div className="flex items-center gap-2">
              <div className="flex gap-1">
                {Object.values(currentTheme.colors).slice(0, 4).map((color, i) => (
                  <div 
                    key={i} 
                    className="w-4 h-4 rounded-md"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
              <div className="text-sm">{currentTheme.name}</div>
              <div className="text-xs text-muted-foreground bg-muted px-1.5 py-0.5 rounded-full">
                {currentTheme.type}
              </div>
            </div>
            <div className="text-xs text-muted-foreground">{currentTheme.description}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
} 