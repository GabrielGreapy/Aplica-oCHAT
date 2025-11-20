"use client"

import { useEffect, useState } from "react"
import { db, auth } from "@/Firebase/FirebaseConfig"
import {  collection, getDocs, onSnapshot, query, where } from "firebase/firestore"
import { Badge, IconButton, Tooltip } from "@mui/material";

import NotificationsIcon from '@mui/icons-material/Notifications';

export default function RequestsNotifications(){
    const [unreadNotifications, setUnreadNotifications] = useState(0);
    
    
    useEffect(() => {
        

        const requestsRef = collection(db, 'users', auth.currentUser?.uid, 'requests');
        const q = query(requestsRef, where('unread', '==', true))


        const unsubscribe = onSnapshot( q,( querySnapshot) => {
            setUnreadNotifications(querySnapshot.size);
            console.log("Notificações carregadas " + unreadNotifications)

        }, (error) => {
            console.error("Opa, ocorreu um erro : " + error);
        })
        return () => unsubscribe();
    }, [])
   
    return(
        <Tooltip title="Solicitações de amizade">
            <IconButton color="inherit">
                
                <Badge badgeContent={unreadNotifications} color="error">
                     <NotificationsIcon />
                </Badge>
            </IconButton>
        </Tooltip>
    )
}