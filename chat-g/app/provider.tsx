"use client";

import { AuthContextProvider } from "@/context/AuthContext";
import { ChatInfoProvider } from "@/context/ChatInfoContext";
import React from "react";

export function Providers({ children} : {children : React.ReactNode}){
    return(
        <AuthContextProvider>
        <ChatInfoProvider>
            {children}
        </ChatInfoProvider>
        </AuthContextProvider>
    )
}