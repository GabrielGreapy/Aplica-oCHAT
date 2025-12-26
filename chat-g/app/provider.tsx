"use client";

import { AuthContextProvider } from "@/context/AuthContext";
import { NotificationContextProvider } from "@/context/NotificationContext";
import { ThemeContextProvider } from "@/context/ThemeContext";
import React from "react";

export function Providers({ children} : {children : React.ReactNode}){
    return(
        <ThemeContextProvider>
            <AuthContextProvider>
                <NotificationContextProvider>
                    {children}
                </NotificationContextProvider>
            </AuthContextProvider>
        </ThemeContextProvider>
    )
}