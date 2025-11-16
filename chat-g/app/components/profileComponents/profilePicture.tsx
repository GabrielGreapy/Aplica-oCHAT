"use client"

import React,{ useContext} from "react"
import { Avatar} from "@mui/material"
import { AuthContext } from "@/context/AuthContext"

export default function ProfilePicture(){
    const user = useContext(AuthContext)
    return(
        <Avatar
              sx={{ width: 80, height: 80 }}
              src={user?.photoURL}
              alt={user?.displayName}
        />
    )
}