'use client';

import { useEffect, useRef } from 'react';
import { setupThemeSync } from './theme-sync';
import { useSearchParams } from 'next/navigation';

export default function StorybookFrame() {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const searchParams = useSearchParams();
  const path = searchParams.get('path') || '';

  useEffect(() => {
    if (iframeRef.current) {
      const cleanup = setupThemeSync(iframeRef.current);
      return cleanup;
    }
  }, []);

  // Use the full Storybook URL structure
  const storybookUrl = path
    ? `/storybook${path}`
    : '/storybook/iframe.html';

  return (
    <iframe
      ref={iframeRef}
      src={storybookUrl}
      className="w-full h-[calc(100vh-4rem)]"
      style={{
        border: "none",
        margin: 0,
        padding: 0,
      }}
    />
  );
} 