'use client'

import { IconButton, Tooltip } from "@mui/material"
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { addDoc, collection, deleteDoc, doc, serverTimestamp} from "firebase/firestore";
import { db } from "@/Firebase/FirebaseConfig";
import { User } from "firebase/auth";

interface AcceptRequestProps{
    requestId: string;
    currentUser : User;
    requestSender : {
        uid : string;
        name : string;
        avatarUrl? : string;
    }
}

export default function AcceptRequest({ requestId, currentUser, requestSender} : AcceptRequestProps){
    const handleAccept = async () => {
        try{
            const chatsRef = collection(db, 'chats')
            await addDoc( chatsRef, {
                usersId : [currentUser.uid, requestSender.uid],
                usersData : {
                    [currentUser.uid] : {
                        displayName : currentUser.displayName,
                        photoUrl : currentUser.photoURL,
                        UnreadCount : 0
                    },
                    [requestSender.uid] : {
                        displayName : requestSender.name,
                        photoUrl : requestSender.avatarUrl || null,
                        UnreadCount : 0
                    },
                    
                },
                lastMessage : "Chat iniciado",
                timestamp : serverTimestamp()


            }
        )
            const requestRef = doc(db, 'users', currentUser.uid, 'requests', requestId)
            await deleteDoc(requestRef)
        }catch(error){
            console.log("Deu um erro ao tentar adicionar um documento: "
                 + error)
        }
        
    }
    return(
        <Tooltip title="Aceitar">
            <IconButton 
                edge="end" 
                aria-label="accept"
                color="success"
                onClick={handleAccept}
            >
                <CheckCircleIcon />
            </IconButton>
        </Tooltip>
    )
}