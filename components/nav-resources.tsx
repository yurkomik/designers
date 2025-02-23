"use client"

import {
  Folder,
  Forward,
  MoreHorizontal,
  Trash2,
  type LucideIcon,
} from "lucide-react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"

interface NavResourcesProps {
  projects: {
    name: string
    url: string
    icon: any
  }[]
}

export function NavResources({ projects }: NavResourcesProps) {
  const { isMobile } = useSidebar()

  return (
    <div className="flex flex-col gap-2">
      <Separator />
      <div className="px-4">
        <p className="text-xs font-medium text-muted-foreground">Resources</p>
      </div>
      <div className="grid gap-1 px-2">
        {projects.map((project) => {
          const Icon = project.icon
          return (
            <Link href={project.url} key={project.name}>
              <Button
                variant="ghost"
                className="w-full justify-start gap-2"
                size="sm"
              >
                <Icon className="h-4 w-4" />
                {project.name}
              </Button>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
