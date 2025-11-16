'use client'

import { useContext } from "react"
import { Typography } from "@mui/material"
import { AuthContext } from "@/context/AuthContext"
export default function ProfileEmail(){
    const user = useContext(AuthContext)
    return(
        <Typography variant="body1" fontWeight="500">
            {user?.email}
        </Typography>
    )
}