"use client"

import { AuthContext } from "@/context/AuthContext"
import { useContext } from "react"
import { Typography } from "@mui/material"

export default function ProfileUserName(){
    const user = useContext(AuthContext)
    return(
        <Typography variant="body1" fontWeight="500">
            {user?.displayName}
        </Typography>
    )
}