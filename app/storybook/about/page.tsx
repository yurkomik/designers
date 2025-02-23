import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Palette, Component, Layers, GitBranch, Zap, BookOpen, Download } from "lucide-react"
import Link from "next/link"

export default function StoryBookAbout() {
  return (
    <div className="w-full py-12">
      <div className="space-y-16">
        {/* Hero Section */}
        <div className="text-center space-y-6 max-w-4xl mx-auto px-4">
          <Badge variant="secondary" className="mb-4">
            Design System Tool
          </Badge>
          <h1 className="text-4xl font-bold tracking-tight lg:text-5xl">
            Storybook: Your Design System&apos;s Best Friend
          </h1>
          <p className="text-xl text-muted-foreground">
            The ultimate playground for designers and developers to collaborate,
            iterate, and perfect UI components.
          </p>
        </div>

        {/* Key Benefits Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 px-4">
          <Card className="h-full">
            <CardHeader>
              <Palette className="h-6 w-6 mb-2 text-primary" />
              <CardTitle>Visual Development</CardTitle>
              <CardDescription>
                Design and develop components in isolation, perfect for focusing on
                details and edge cases.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="h-full">
            <CardHeader>
              <Component className="h-6 w-6 mb-2 text-primary" />
              <CardTitle>Component Library</CardTitle>
              <CardDescription>
                Showcase your design system components with interactive documentation
                and live examples.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="h-full">
            <CardHeader>
              <Layers className="h-6 w-6 mb-2 text-primary" />
              <CardTitle>Design Consistency</CardTitle>
              <CardDescription>
                Maintain design consistency across your project with a single source
                of truth for UI components.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="h-full">
            <CardHeader>
              <GitBranch className="h-6 w-6 mb-2 text-primary" />
              <CardTitle>Version Control</CardTitle>
              <CardDescription>
                Track component changes, review designs, and collaborate with
                developers seamlessly.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* Feature Highlight */}
        <div className="px-4">
          <Card className="max-w-4xl mx-auto">
            <CardHeader>
              <CardTitle className="text-2xl">Perfect for shadcn/ui</CardTitle>
              <CardDescription>
                Storybook integrates perfectly with shadcn/ui components, allowing you to:
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-4">
                <li className="flex items-center gap-3">
                  <Zap className="h-5 w-5 text-primary" />
                  <span>Preview components with different variants and states</span>
                </li>
                <li className="flex items-center gap-3">
                  <Zap className="h-5 w-5 text-primary" />
                  <span>Test dark/light mode transitions</span>
                </li>
                <li className="flex items-center gap-3">
                  <Zap className="h-5 w-5 text-primary" />
                  <span>Document component APIs and usage guidelines</span>
                </li>
                <li className="flex items-center gap-3">
                  <Zap className="h-5 w-5 text-primary" />
                  <span>Share component states with developers</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Registry Section */}
        <div className="px-4">
          <Card className="max-w-4xl mx-auto">
            <CardHeader>
              <CardTitle className="text-2xl">Comprehensive Component Registry</CardTitle>
              <CardDescription>
                Explore the complete shadcn/ui Storybook registry with ready-to-use stories for all components
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-muted-foreground">
                Access a comprehensive collection of pre-built Storybook stories for every shadcn/ui component, 
                including Accordions, Buttons, Cards, Dialogs, and many more. Each component comes with 
                interactive documentation and live examples.
              </p>
              <div className="flex justify-center">
                <Link 
                  href="https://registry.lloydrichards.dev/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="outline" size="lg" className="gap-2">
                    <BookOpen className="h-4 w-4" />
                    Browse Component Registry
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Installation Section */}
        <div className="px-4">
          <Card className="max-w-4xl mx-auto">
            <CardHeader>
              <CardTitle className="text-2xl">Quick Installation</CardTitle>
              <CardDescription>
                Get started with Storybook in your project in minutes
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col md:flex-row gap-4 justify-center">
                <Link 
                  href="https://storybook.js.org/docs/get-started/install"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button size="lg" className="gap-2 w-full md:w-auto">
                    <Download className="h-4 w-4" />
                    Installation Guide
                  </Button>
                </Link>
                <Link 
                  href="https://storybook.js.org/docs/get-started/install"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="outline" size="lg" className="gap-2 w-full md:w-auto">
                    <BookOpen className="h-4 w-4" />
                    View Documentation
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
} 