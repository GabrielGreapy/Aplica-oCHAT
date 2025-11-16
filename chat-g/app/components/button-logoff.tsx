'use client'

import React from 'react';
import { auth } from "@/Firebase/FirebaseConfig";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { Button } from "@mui/material";
export default function LogoffButton() {
    const router = useRouter();
    const handleLogoffGoogle = async () => {
        await signOut(auth);
        await fetch ('/api/session', { method : 'DELETE'});
        router.push('/login');
    }

    return(
        <Button 
            variant="outlined" 
            color="error"
            onClick={handleLogoffGoogle}
        >
            Sair da conta
        </Button>
    )
};