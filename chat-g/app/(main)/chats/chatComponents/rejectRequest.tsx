'use client'

import { Tooltip } from "@mui/material"
import IconButton from "@mui/material/IconButton"
import CancelIcon from '@mui/icons-material/Cancel';
import { collection, deleteDoc, doc, query } from "firebase/firestore";
import { auth, db } from "@/Firebase/FirebaseConfig";


interface RejectRequestProps{
    requestId: string;
    currentUserId : string;
}

export default function RejectRequest({requestId, currentUserId} : RejectRequestProps){
           
        const handleReject = async () => {
            try{ 
                const requestsDocRef = doc(db, 'users' , currentUserId, 'requests', requestId)
                
                await deleteDoc(requestsDocRef)
            }catch(error){
                console.log("Deu erro ao tentar deletar: " + error)
            }
        }
    return(
        <Tooltip title="Recusar">
                                                
                                            
            <IconButton 
                edge="end" 
                aria-label="reject"
                color="error" 
                onClick={handleReject}
            >
                <CancelIcon />
            </IconButton>
        </Tooltip>
    )
}