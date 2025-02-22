"use client"

import * as React from "react"
import { Save, Upload, Download, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Separator } from "@/components/ui/separator"
import { Slider } from "@/components/ui/slider"

export function DesignSystemTopBar() {
  return (
    <div className="flex items-center justify-between gap-4">
      {/* Left section - Preset Management */}
      <div className="flex items-center gap-2">
        <Select defaultValue="default">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select preset" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="default">Default Preset</SelectItem>
            <SelectItem value="dark">Dark Theme</SelectItem>
            <SelectItem value="modern">Modern UI</SelectItem>
          </SelectContent>
        </Select>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline" size="icon">
                <Plus className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Create new preset</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      {/* Center section - Quick Token Controls */}
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2">
          <span className="text-sm">Radius</span>
          <Slider
            defaultValue={[8]}
            max={20}
            step={1}
            className="w-[100px]"
          />
        </div>
        <Separator orientation="vertical" className="h-6" />
        <div className="flex items-center gap-2">
          <span className="text-sm">Density</span>
          <Slider
            defaultValue={[1]}
            min={0.75}
            max={1.25}
            step={0.05}
            className="w-[100px]"
          />
        </div>
        <Separator orientation="vertical" className="h-6" />
        <Select defaultValue="inter">
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="Select font" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="inter">Inter</SelectItem>
            <SelectItem value="roboto">Roboto</SelectItem>
            <SelectItem value="sf">SF Pro</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Right section - Actions */}
      <div className="flex items-center gap-2">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline" size="icon">
                <Upload className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Import configuration</TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline" size="icon">
                <Download className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Export configuration</TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <Button>
          <Save className="mr-2 h-4 w-4" />
          Save Changes
        </Button>
      </div>
    </div>
  )
} 