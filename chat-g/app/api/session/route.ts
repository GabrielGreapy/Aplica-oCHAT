import { NextResponse } from "next/server"
import { adminAuth } from "@/firebaseAdmin";

export async function POST(req: Request) {
    const { idToken } = await req.json();
    if( !idToken ){
        return NextResponse.json( { error: "Token ausente"}, { status: 400})
    }
    const expiresIn = 6 * 60 * 24 * 5 * 1000;
    try{
        const sessionCookie = await adminAuth.createSessionCookie(idToken, { expiresIn });
        const response = NextResponse.json({ message: "Login Bem Sucedido"}, {status:200 });
        response.cookies.set('__session', sessionCookie, {
            maxAge: expiresIn,
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            path: '/'
        })
        return response;
    } catch(error){
        return NextResponse.json({ error:"Token invalido"}, { status: 401 })
    }
}