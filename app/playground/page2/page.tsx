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
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function PlaygroundPage2() {
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
                  <BreadcrumbPage>Page 2</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 p-6 md:min-h-min">
            <h1 className="text-3xl font-bold tracking-tight mb-4">Playground - Page 2</h1>
            <p className="text-muted-foreground mb-6">
              This is the second page of the playground section.
            </p>
            
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Card Example</CardTitle>
                  <CardDescription>
                    This is a sample card component for demonstration purposes.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="h-40 rounded-md bg-muted flex items-center justify-center">
                      Content Area
                    </div>
                    <div className="flex justify-end space-x-2">
                      <button className="px-4 py-2 bg-muted text-muted-foreground rounded-md">
                        Cancel
                      </button>
                      <button className="px-4 py-2 bg-primary text-primary-foreground rounded-md">
                        Submit
                      </button>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Another Example</CardTitle>
                  <CardDescription>
                    A different card with alternative styling.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="h-40 rounded-md bg-accent/20 flex items-center justify-center">
                      Alternative Content
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Last updated: Today</span>
                      <button className="px-3 py-1 bg-accent text-accent-foreground rounded-md text-sm">
                        View Details
                      </button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
} 