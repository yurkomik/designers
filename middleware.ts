import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Ensure password is set in environment variables
const CORRECT_PASSWORD = process.env.SITE_PASSWORD;
if (!CORRECT_PASSWORD) {
  throw new Error('SITE_PASSWORD environment variable must be set');
}

const AUTH_TOKEN = 'design_prototype_auth';
const LOGOUT_TOKEN = 'logging_out';

// Simple hash function for cookie value
const hashPassword = (pwd: string) => {
  return Buffer.from(pwd + AUTH_TOKEN).toString('base64');
};

// Generate a random challenge string
const generateChallenge = () => {
  return Math.random().toString(36).substring(2);
};

export function middleware(request: NextRequest) {
  // Skip authentication for static files
  if (
    request.nextUrl.pathname.startsWith('/_next') ||
    request.nextUrl.pathname.startsWith('/static') ||
    request.nextUrl.pathname.startsWith('/api') ||
    request.nextUrl.pathname.includes('favicon.ico')
  ) {
    return NextResponse.next();
  }

  // Check if we're logging out
  const logoutCookie = request.cookies.get(LOGOUT_TOKEN);
  if (logoutCookie) {
    // Clear both cookies and force re-authentication with a new challenge
    const challenge = generateChallenge();
    const response = new NextResponse(null, {
      status: 401,
      headers: {
        'WWW-Authenticate': `Basic realm="Password required (${challenge})"`,
      },
    });
    response.cookies.delete(AUTH_TOKEN);
    response.cookies.delete(LOGOUT_TOKEN);
    return response;
  }

  // Check the Authorization header
  const authHeader = request.headers.get('authorization');
  
  if (authHeader) {
    try {
      // Remove 'Basic ' from the beginning and decode from base64
      const credentials = atob(authHeader.split(' ')[1]);
      // Split into username and password
      const [username, providedPassword] = credentials.split(':');
      
      // Extract timestamp from the password if it's a saved one
      const [basePassword, timestamp] = providedPassword.split('|');
      
      // We only care about the password matching and ensuring it's a fresh attempt
      if (basePassword === CORRECT_PASSWORD && !timestamp) {
        const response = NextResponse.next();
        // Store hashed password in cookie instead of plain text
        response.cookies.set(AUTH_TOKEN, hashPassword(CORRECT_PASSWORD));
        return response;
      }
    } catch (e) {
      // If there's any error in parsing the auth header, just continue to auth prompt
      console.error('Error parsing auth header:', e);
    }
  }

  // Check cookies as well
  const authCookie = request.cookies.get(AUTH_TOKEN);
  if (authCookie?.value === hashPassword(CORRECT_PASSWORD)) {
    return NextResponse.next();
  }

  // If no valid auth, prompt for password with a new challenge
  const challenge = generateChallenge();
  return new NextResponse(null, {
    status: 401,
    headers: {
      'WWW-Authenticate': `Basic realm="Password required (${challenge})"`,
    },
  });
}

export const config = {
  matcher: '/((?!_next/static|_next/image|favicon.ico).*)',
}; 