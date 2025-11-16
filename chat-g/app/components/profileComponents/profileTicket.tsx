'use client'

import { AuthContext } from "@/context/AuthContext"
import { useContext } from "react"
import { Button } from "@mui/material"

export default function ProfileTicket(){
    const user = useContext(AuthContext)
    
    const copiarTicket = async () => {
        const ticket = user?.uid
        if(!ticket){
           console.warn("O ticket não foi definido corretamente")
        return;
        }
        try{
            await navigator.clipboard.writeText(ticket);
        }
        catch(err){
            console.log(err)
        }
        

    }
   
    return(
        <Button variant="contained"
        onClick={copiarTicket}
        disabled={!user}>Copiar codigo</Button>
    )
}