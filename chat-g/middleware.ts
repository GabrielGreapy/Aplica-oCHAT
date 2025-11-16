import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { adminAuth } from "./firebaseAdmin";


const publicPaths = ['/login'];

const isAuthenticated = async (req: NextRequest) => {
  const sessionCookies = req.cookies.get('__session')?.value;
  if(!sessionCookies) return false;
  try{
    await adminAuth.verifySessionCookie(sessionCookies, true);
    return true;
  } catch(error){
    return false;
  }
}

export async function middleware(request: NextRequest){
  const path = request.nextUrl.pathname;
  const isPublicPath = publicPaths.includes(path);
  const userIsAuthenticated = await isAuthenticated(request);

  if(!userIsAuthenticated && !isPublicPath){
    const loginUrl = new URL( '/login', request.url);
    return NextResponse.redirect(loginUrl);
  }


  if( userIsAuthenticated && isPublicPath){
    const homeUrl = new URL ( '/chats', request.url);
    return NextResponse.redirect(homeUrl);
  }

  return NextResponse.next();
}
export const config = {
    matcher: [
      '/',
      '/chat/:path*',
      '/login',
      '/settings',
      '/chats',
    ],
    runtime: 'nodejs'
}
