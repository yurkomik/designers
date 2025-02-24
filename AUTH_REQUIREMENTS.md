# Authentication Requirements for Internal Dev Tool

## Overview
Simple password-based authentication system for protecting internal development tools and prototypes. This implementation prioritizes ease of use and maintenance while providing basic access control.

## Core Requirements

### 1. Environment Configuration
```env
# Required in .env file
SITE_PASSWORD=your-team-password  # Shared password for team access
```

### 2. Protected Routes
All routes should be protected except:
- `/_next/*` (Next.js system files)
- `/static/*` (Static assets)
- `/api/*` (API endpoints)
- `/favicon.ico`

### 3. Authentication Method
- HTTP Basic Authentication
- Single shared password for all team members
- Cookie-based session management
- No individual user accounts required

### 4. Implementation Details

#### Middleware Configuration
```typescript
const AUTH_TOKEN = 'dev_tool_auth';        // Cookie name for auth
const LOGOUT_TOKEN = 'logging_out';        // Cookie name for logout state
const MAX_ATTEMPTS = 5;                    // Max login attempts
const LOCKOUT_TIME = 15 * 60 * 1000;      // 15 minutes in milliseconds
```

#### Security Features
- HTTP-only cookies for session storage
- Basic challenge-response mechanism
- Automatic logout handling
- Simple password validation
- Brute force protection:
  - IP-based attempt tracking
  - Temporary lockout after failed attempts
  - Auto-reset after lockout period

#### User Experience
- One-click login (browser handles basic auth)
- Persistent sessions using cookies
- Clear logout mechanism
- Simple error messages

### 5. Required Components

#### Authentication Flow
1. User accesses protected route
2. Browser shows basic auth prompt if not authenticated
3. User enters password
4. System validates password and sets auth cookie
5. User remains authenticated until logout

#### Logout Process
1. User clicks logout
2. System clears auth cookies
3. Redirects to login prompt

### 6. Implementation Guidelines

#### Security Considerations
- Store password in environment variables only
- Use HTTPS in production
- Clear all cookies on logout
- No sensitive data exposure in error messages

#### Maintenance
- Keep implementation simple and readable
- Document any custom configurations
- Maintain list of protected routes
- Regular password rotation (recommended)

### 7. Example Usage

```typescript
// Example middleware implementation
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Simple in-memory store for login attempts
// In production, use Redis or similar for distributed systems
const loginAttempts = new Map<string, { count: number, timestamp: number }>();

function isLockedOut(ip: string): boolean {
  const attempts = loginAttempts.get(ip);
  if (!attempts) return false;
  
  // Reset if lockout period has passed
  if (Date.now() - attempts.timestamp > LOCKOUT_TIME) {
    loginAttempts.delete(ip);
    return false;
  }
  
  return attempts.count >= MAX_ATTEMPTS;
}

function recordLoginAttempt(ip: string, success: boolean) {
  if (success) {
    loginAttempts.delete(ip);
    return;
  }
  
  const attempts = loginAttempts.get(ip) || { count: 0, timestamp: Date.now() };
  attempts.count += 1;
  attempts.timestamp = Date.now();
  loginAttempts.set(ip, attempts);
}

export function middleware(request: NextRequest) {
  // Skip auth for public paths
  if (request.nextUrl.pathname.startsWith('/_next') ||
      request.nextUrl.pathname.startsWith('/static') ||
      request.nextUrl.pathname.startsWith('/api') ||
      request.nextUrl.pathname.includes('favicon.ico')) {
    return NextResponse.next();
  }

  // Get client IP
  const ip = request.ip || request.headers.get('x-forwarded-for') || 'unknown';
  
  // Check if IP is locked out
  if (isLockedOut(ip)) {
    return new NextResponse(null, {
      status: 429,
      headers: {
        'Retry-After': `${Math.ceil(LOCKOUT_TIME / 1000)}`,
        'Content-Type': 'text/plain'
      }
    });
  }

  // Check auth cookie
  const authCookie = request.cookies.get(AUTH_TOKEN);
  if (authCookie?.value === hashPassword(process.env.SITE_PASSWORD)) {
    recordLoginAttempt(ip, true); // Reset attempts on successful login
    return NextResponse.next();
  }

  // Check Basic Auth
  const authHeader = request.headers.get('authorization');
  if (authHeader) {
    try {
      const [, credentials] = authHeader.split(' ');
      const [, password] = atob(credentials).split(':');
      
      if (password === process.env.SITE_PASSWORD) {
        recordLoginAttempt(ip, true); // Reset attempts on successful login
        const response = NextResponse.next();
        response.cookies.set(AUTH_TOKEN, hashPassword(process.env.SITE_PASSWORD));
        return response;
      }
      
      // Record failed attempt
      recordLoginAttempt(ip, false);
    } catch (e) {
      recordLoginAttempt(ip, false);
    }
  }

  // Require authentication
  return new NextResponse(null, {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Internal Dev Tool"'
    }
  });
}
```

### 8. Testing Requirements
- Verify password protection works
- Confirm protected routes are secure
- Test logout functionality
- Ensure public routes remain accessible
- Test brute force protection:
  - Verify login attempts counting
  - Check lockout after max attempts
  - Confirm lockout duration
  - Test attempt reset after success

### 9. Deployment Checklist
- [ ] Set secure password in environment
- [ ] Configure protected routes
- [ ] Test authentication flow
- [ ] Verify logout functionality


## Notes
- This is intentionally simple for internal use only
- Not suitable for customer-facing applications
- Prioritizes developer experience over complex security
- Adequate for internal tools and prototypes 