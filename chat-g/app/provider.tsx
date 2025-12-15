"use client";

import { AuthContextProvider } from "@/context/AuthContext";
import { ThemeContextProvider } from "@/context/ThemeContext";
import React from "react";

export function Providers({ children} : {children : React.ReactNode}){
    return(
        <ThemeContextProvider>
            <AuthContextProvider>
        
                {children}
        
            </AuthContextProvider>
        </ThemeContextProvider>
    )
}