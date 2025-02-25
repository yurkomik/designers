"use client"

import dynamic from 'next/dynamic'
import { AppSidebar } from "@/components/app-sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"

// Dynamically import the WeatherWidget with SSR disabled
const WeatherWidget = dynamic(
  () => import('@/components/weather-widget/weather-widget'),
  { ssr: false }
)

export default function WeatherWidgetPage() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/playground">Playground</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>Weather Widget</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 p-6 md:min-h-min">
            <h1 className="text-3xl font-bold tracking-tight mb-2">3D Weather Widget</h1>
            <p className="text-muted-foreground mb-6">
              Interactive 3D city scene with dynamic weather effects and camera movement
            </p>
            
            <WeatherWidget />
            
            <div className="mt-8">
              <h2 className="text-xl font-semibold mb-4">About this Widget</h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-medium mb-2">Features</h3>
                  <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                    <li>3D modern city with buildings, roads, and trees</li>
                    <li>Dynamic weather effects (rain, snow, clouds, etc.)</li>
                    <li>Day/night cycle with appropriate lighting</li>
                    <li>Multiple camera views with smooth transitions</li>
                    <li>Animated cars and people throughout the city</li>
                    <li>Detailed central park with fountain and benches</li>
                    <li>Street lights that illuminate at night</li>
                    <li>Real-time weather data from OpenWeatherMap API</li>
                    <li>Search for weather in any location</li>
                    <li>Weather condition and time of day controls</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-2">Technologies Used</h3>
                  <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                    <li>React with Next.js</li>
                    <li>Three.js for 3D rendering</li>
                    <li>React Three Fiber (React renderer for Three.js)</li>
                    <li>React Three Drei (useful helpers for React Three Fiber)</li>
                    <li>OpenWeatherMap API for weather data</li>
                    <li>Tailwind CSS for styling</li>
                    <li>Shadcn UI components</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
} 