'use client';

import { Button } from "@/components/ui/button";
import { ChevronLeft, ExternalLink } from "lucide-react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useSearchParams } from 'next/navigation';

// Client component to handle iframe and theme sync
const StorybookFrame = dynamic(() => import('./storybook-frame'), { ssr: false });

export function StorybookPageClient() {
  const searchParams = useSearchParams();
  const path = searchParams.get('path') || '';
  
  // Construct the external URL with the correct path
  const externalUrl = path
    ? `http://localhost:6006${path}`
    : 'http://localhost:6006';

  return (
    <div className="flex flex-col h-full w-full">
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center gap-4">
          <Link href="/">
            <Button variant="ghost" size="sm">
              <ChevronLeft className="h-4 w-4 mr-2" />
              Back to App
            </Button>
          </Link>
          <h1 className="text-xl font-semibold">Design System</h1>
        </div>
        <Link href={externalUrl} target="_blank">
          <Button variant="outline" size="sm">
            Open in New Window
            <ExternalLink className="h-4 w-4 ml-2" />
          </Button>
        </Link>
      </div>
      <StorybookFrame />
    </div>
  );
} 