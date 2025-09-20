"use client";

import { AuthContextProvider } from "@/context/AuthContext";
import React from "react";

export function Providers({ children} : {children : React.ReactNode}){
    return(
        <AuthContextProvider>
            {children}
        </AuthContextProvider>
    )
}