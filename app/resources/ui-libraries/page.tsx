"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { 
  ArrowUpRight, 
  Terminal, 
  Sparkles, 
  Blocks, 
  Shapes, 
  Check, 
  Copy, 
  Palette,
  Type,
  Layout,
  PenTool,
  Calendar,
  Globe,
  FileInput,
  Table2,
  LineChart,
  Wand2,
  Brush,
  Box,
  LucideIcon,
  Tags,
  Pen,
  Library,
  Calculator,
  MapPin,
  CalendarDays,
  Flag,
  Boxes,
  Bot,
  TextCursor,
  Store,
  Search
} from "lucide-react"
import Link from "next/link"
import { useState, useMemo } from "react"
import Image from "next/image"

interface Resource {
  title: string
  description: string
  url: string
  command?: string
  type?: "command" | "link"
  icon: LucideIcon
  preview?: string
}

interface CommandResource {
  title: string
  description: string
  command: string
  type: "command"
  icon: LucideIcon
}

interface ResourceCategory {
  category: string
  items: Resource[]
}

const resources: ResourceCategory[] = [
  {
    category: "Component Collections",
    items: [
      {
        title: "shadcn/ui Installation",
        description: "Quick command to add all shadcn/ui components to your project",
        url: "#",
        icon: Terminal,
        command: "npx shadcn@latest add --all",
      },
      {
        title: "Awesome shadcn/ui Templates",
        description: "A curated collection of templates and examples built with shadcn/ui",
        url: "https://awesome-shadcn-ui.vercel.app/",
        icon: Sparkles,
      },
      {
        title: "Motion Primitives",
        description: "Beautiful animations for shadcn/ui components including morphing popovers and dialogs",
        url: "https://motion-primitives.com/docs/morphing-popover",
        icon: Wand2,
      },
      {
        title: "Origin UI",
        description: "Enhanced select components and form elements with modern interactions",
        url: "https://originui.com/select",
        icon: Blocks,
      },
      {
        title: "Aceternity UI",
        description: "Beautiful components with modern design patterns and advanced animations",
        url: "https://ui.aceternity.com/components/",
        icon: Shapes,
      },
      {
        title: "21st.dev Components",
        description: "Modern UI components with focus on developer experience",
        url: "https://21st.dev/?tab=components&sort=recommended",
        icon: Layout,
      },
      {
        title: "Magic UI",
        description: "Beautiful components with magical interactions",
        url: "https://magicui.design/docs/components/",
        icon: Sparkles,
      },
      {
        title: "Stack Zero UI",
        description: "Specialized ecommerce components and templates",
        url: "https://ui.stackzero.co/docs/components/price-format/sale",
        icon: Store,
      },
      {
        title: "Skiper UI",
        description: "Modern text effects and animations for engaging interfaces",
        url: "https://skiper-ui.com/docs/components/text-effect-flipper",
        icon: TextCursor,
      },
      {
        title: "Cult UI",
        description: "Premium components including sortable lists and complex interactions",
        url: "https://www.cult-ui.com/docs/components/sortable-list",
        icon: Blocks,
      },
      {
        title: "Motion Dialog",
        description: "Beautiful morphing dialog animations for smooth transitions",
        url: "https://motion-primitives.com/docs/morphing-dialog",
        icon: Wand2,
      },
      {
        title: "Animated Numbers",
        description: "Dynamic number animations and counters",
        url: "https://skiper-ui.com/docs/components/animated-number",
        icon: TextCursor,
      },
    ]
  },
  {
    category: "Specialized Components",
    items: [
      {
        title: "Tiptap AI Editor",
        description: "AI-powered rich text editor integration",
        url: "https://tiptap.dev/docs/content-ai/getting-started/overview",
        icon: PenTool,
      },
      {
        title: "Minimal Tiptap",
        description: "Minimalistic implementation of the Tiptap editor",
        url: "https://shadcn-minimal-tiptap.vercel.app/",
        icon: Type,
      },
      {
        title: "3D Components",
        description: "Beautiful 3D components and animations",
        url: "https://www.hover.dev/components/three-d",
        icon: Boxes,
      },
      {
        title: "Form Builder",
        description: "Advanced form building components and utilities",
        url: "https://ui.indie-starter.dev/form-builder",
        icon: FileInput,
      },
      {
        title: "AI Chat Components",
        description: "Ready-to-use AI chatbot and related components",
        url: "https://www.simple-ai.dev/docs",
        icon: Bot,
      },
      {
        title: "Smart DateTime Input",
        description: "Intelligent datetime input with natural language processing",
        url: "https://shadcn-extension.vercel.app/docs/smart-datetime-input",
        icon: Calendar,
      },
      {
        title: "Tags Input",
        description: "Flexible tags input component with autocomplete",
        url: "https://shadcn-extension.vercel.app/docs/tags-input",
        icon: Tags,
      },
      {
        title: "Signature Input",
        description: "Digital signature capture component",
        url: "https://shadcn-form-build.vercel.app/components/signature-input",
        icon: Pen,
      },
      {
        title: "Location Components",
        description: "Country and region selection components",
        url: "https://shadcn-form-build.vercel.app/components/location-input",
        icon: Globe,
      },
      {
        title: "Icon Picker",
        description: "Visual icon selection component",
        url: "https://icon-picker.alan-courtois.fr/",
        icon: Library,
      },
      {
        title: "Number Scrubber",
        description: "Interactive number input with scrubbing functionality",
        url: "https://github.com/camwebby/shadcn-react-number-scrubber",
        icon: Calculator,
      },
      {
        title: "Advanced Table",
        description: "Complex table with filters and sorting (server/client side)",
        url: "https://www.sadmn.com/blog/shadcn-table",
        icon: Table2,
      },
      {
        title: "Interactive Charts",
        description: "Beautiful charts with table filtering capabilities",
        url: "https://linked-chart.vercel.app/",
        icon: LineChart,
      },
      {
        title: "Address Autocomplete",
        description: "Address input with autocomplete suggestions",
        url: "https://github.com/NiazMorshed2007/shadcn-address-autocomplete",
        icon: MapPin,
      },
      {
        title: "Calendar Heatmap",
        description: "GitHub-style calendar contribution heatmap",
        url: "https://shadcn-calendar-heatmap.vercel.app/",
        icon: CalendarDays,
      },
      {
        title: "Country Dropdown",
        description: "Searchable country selection dropdown",
        url: "https://shadcn-country-dropdown.vercel.app/",
        icon: Flag,
      },
    ]
  },
  {
    category: "Alternative Libraries",
    items: [
      {
        title: "DaisyUI",
        description: "Tailwind CSS components with extensive theme support",
        url: "https://v5.daisyui.com/components/timeline/",
        icon: Box,
      },
      {
        title: "Hero UI Components",
        description: "Comprehensive set of accessible UI components",
        url: "https://www.heroui.com/docs/components",
        icon: Shapes,
      },
      {
        title: "Hero UI Date Picker",
        description: "Advanced date and date range selection components",
        url: "https://www.heroui.com/docs/components/date-range-picker",
        icon: Calendar,
      },
      {
        title: "Hero UI Loading",
        description: "Skeleton loaders and loading states",
        url: "https://www.heroui.com/docs/components/skeleton",
        icon: Layout,
      },
      {
        title: "Hero UI Navigation",
        description: "Pagination and navigation components",
        url: "https://www.heroui.com/docs/components/pagination",
        icon: Layout,
      },
      {
        title: "Gluestack",
        description: "Universal design system for multiple platforms",
        url: "https://gluestack.io/",
        icon: Blocks,
      },
      {
        title: "UI Labs",
        description: "Experimental UI components and patterns",
        url: "https://www.uilabs.dev/",
        icon: Blocks,
      },
      {
        title: "Flyon UI",
        description: "Modern UI components with unique interactions",
        url: "https://flyonui.com/",
        icon: Sparkles,
      },
    ]
  },
  {
    category: "Design Tools",
    items: [
      {
        title: "DaisyUI Theme Generator",
        description: "Visual theme generator for style brainstorming",
        url: "https://v5.daisyui.com/theme-generator/",
        icon: Palette,
      },
      {
        title: "Shadcn Theme Generator",
        description: "Theme generator specifically for shadcn/ui",
        url: "https://zippystarter.com/tools/shadcn-ui-theme-generator",
        icon: Brush,
      },
      {
        title: "Radix Colors",
        description: "Color system generator for shadcn/ui themes",
        url: "https://ui.ewgenius.me/shadcn-radix-colors",
        icon: Palette,
      },
      {
        title: "Tilebit FAQ Components",
        description: "FAQ component inspiration and examples",
        url: "https://www.tilebit.io/components-category/faq",
        icon: Layout,
      },
      {
        title: "Tilebit Team Components",
        description: "Team section component inspiration",
        url: "https://www.tilebit.io/inspiration/team",
        icon: Layout,
      },
    ]
  }
] as const

export default function UILibrariesPage() {
  const [search, setSearch] = useState("")
  const [hasCopied, setHasCopied] = useState(false)
  const [enabledCategories, setEnabledCategories] = useState<string[]>(
    resources.map(cat => cat.category)
  )

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setHasCopied(true)
    setTimeout(() => setHasCopied(false), 2000)
  }

  const toggleCategory = (category: string) => {
    setEnabledCategories(prev => 
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    )
  }

  const filteredResources = useMemo(() => {
    return resources
      .filter(category => enabledCategories.includes(category.category))
      .map(category => ({
        ...category,
        items: category.items.filter(item =>
          item.title.toLowerCase().includes(search.toLowerCase()) ||
          item.description.toLowerCase().includes(search.toLowerCase())
        )
      }))
      .filter(category => category.items.length > 0)
  }, [search, enabledCategories])

  return (
    <div className="w-full py-12">
      <div className="space-y-12">
        {/* Header */}
        <div className="text-center space-y-4">
          <Badge variant="secondary" className="mb-2">
            Resources
          </Badge>
          <h1 className="text-3xl font-bold tracking-tight lg:text-4xl">
            UI Libraries & Resources
          </h1>
          <p className="text-lg text-muted-foreground">
            A curated collection of the best UI libraries, templates, and resources for your next project
          </p>
        </div>

        {/* Search and Filters */}
        <div className="max-w-2xl mx-auto space-y-4">
          <div className="relative">
            <Input
              placeholder="Search resources..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pr-10"
            />
            <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          </div>
          <div className="flex flex-wrap gap-2">
            {resources.map(category => (
              <Button
                key={category.category}
                variant={enabledCategories.includes(category.category) ? "outline" : "default"}
                size="sm"
                onClick={() => toggleCategory(category.category)}
                className="transition-colors"
              >
                {category.category}
              </Button>
            ))}
          </div>
        </div>

        {/* Resource Categories */}
        {filteredResources.map((category) => (
          <div key={category.category} className="container mx-auto">
            <h2 className="text-xl font-semibold mb-4">{category.category}</h2>
            <div className="grid gap-4 md:grid-cols-[repeat(2,370px)] lg:grid-cols-[repeat(3,370px)] justify-center">
              {category.items.map((resource) => (
                <div key={resource.title} className="w-[370px]">
                  <Link 
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={resource.command ? (e) => {
                      e.preventDefault();
                      copyToClipboard(resource.command!);
                    } : undefined}
                    className="block h-full"
                  >
                    <Card className="group transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 h-full flex flex-col min-h-[164px] w-full">
                      <CardHeader className="flex-1">
                        <div className="flex items-start justify-between gap-4 h-full">
                          <div className="min-h-[2.5rem] flex-1">
                            <CardTitle className="text-base group-hover:text-primary transition-colors">
                              {resource.title}
                            </CardTitle>
                            <CardDescription className="text-sm line-clamp-2">
                              {resource.description}
                            </CardDescription>
                          </div>
                          <resource.icon className="h-5 w-5 text-primary shrink-0 group-hover:scale-110 transition-transform duration-200" />
                        </div>
                      </CardHeader>
                      {resource.command && (
                        <CardContent className="pt-0">
                          <div className="relative w-full group cursor-pointer mt-auto">
                            <code className="relative rounded bg-muted px-[0.5rem] py-[0.3rem] font-mono text-sm w-full block transition-colors duration-200 group-hover:bg-muted/70 overflow-x-auto max-w-full whitespace-pre-wrap break-all">
                              {resource.command}
                            </code>
                            <div className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-xs text-muted-foreground flex items-center gap-1 bg-muted/80 px-1.5 py-0.5 rounded">
                              {hasCopied ? (
                                <>
                                  <Check className="h-3 w-3" />
                                  Copied!
                                </>
                              ) : (
                                <>
                                  <Copy className="h-3 w-3" />
                                  Click to copy
                                </>
                              )}
                            </div>
                          </div>
                        </CardContent>
                      )}
                    </Card>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
} 