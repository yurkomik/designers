import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const isDev = process.env.NODE_ENV === 'development';
  const storybookUrl = isDev ? 'http://localhost:6006' : '/storybook';

  if (isDev) {
    try {
      const path = request.nextUrl.pathname.replace('/api/storybook', '');
      const search = request.nextUrl.search || '';
      
      // Handle root path - redirect to Storybook's index
      if (path === '' || path === '/') {
        return NextResponse.redirect(new URL(`${storybookUrl}/iframe.html${search}`, request.url));
      }

      // Rewrite paths for Storybook's static assets
      const targetUrl = path.startsWith('/sb') || path.startsWith('/static')
        ? `${storybookUrl}${path}${search}`
        : `${storybookUrl}/iframe.html${search}`;

      const response = await fetch(targetUrl);
      
      if (!response.ok) {
        console.error(`Storybook responded with ${response.status} for ${targetUrl}`);
        if (response.status === 404) {
          return NextResponse.redirect(new URL('/api/storybook/', request.url));
        }
        throw new Error(`Storybook responded with ${response.status}`);
      }

      const data = await response.text();
      const contentType = response.headers.get('Content-Type') || 'text/html';

      // Forward all headers from Storybook
      const headers = new Headers({
        'Content-Type': contentType,
      });
      response.headers.forEach((value, key) => {
        if (key.toLowerCase() !== 'content-length') {
          headers.set(key, value);
        }
      });

      return new NextResponse(data, { headers });
    } catch (error) {
      console.error('Storybook proxy error:', error);
      return NextResponse.json({ error: 'Failed to proxy Storybook request' }, { status: 500 });
    }
  }

  return NextResponse.redirect(new URL(storybookUrl, request.url));
} 