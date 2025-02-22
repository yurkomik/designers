import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Palette, Component, Layers, GitBranch, Zap } from "lucide-react"
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

        {/* CTA Section */}
        <div className="text-center">
          <Link 
            href="https://storybook.js.org/docs/get-started/install"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button size="lg" className="gap-2">
              Get Started with Storybook
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
} 