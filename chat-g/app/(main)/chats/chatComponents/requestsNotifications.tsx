"use client"

import { useEffect, useState } from "react"
import { db, auth } from "@/Firebase/FirebaseConfig"
import {  collection, getDocs, onSnapshot, query, where } from "firebase/firestore"
import { Badge, IconButton, Tooltip } from "@mui/material";
import { onAuthStateChanged } from "firebase/auth";
import NotificationsIcon from '@mui/icons-material/Notifications';
import NotificationList from "./notificationsList";
export default function RequestsNotifications(){
    const [unreadNotifications, setUnreadNotifications] = useState(0);
    const [ open, setOpen] = useState(false)
    const [user, setUser] = useState(auth.currentUser)


    useEffect(() => {
        const unsubscribeAuth = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            if (currentUser) {
                console.log("Usuário detectado:", currentUser.uid);
            } else {
                console.log("Nenhum usuário logado ainda...");
            }
        });
        return () => unsubscribeAuth();
    }, []);
    useEffect(() => {
        if (!user) return; 

        console.log("Iniciando busca de notificações para:", user.uid);

        const requestsRef = collection(db, 'users', auth.currentUser?.uid, 'requests');
        const q = query(requestsRef, where('unread', '==', true))


        const unsubscribe = onSnapshot( q,( querySnapshot) => {
            setUnreadNotifications(querySnapshot.size);
            console.log("Notificações carregadas: " + querySnapshot.size)

        }, (error) => {
            console.error("Opa, ocorreu um erro : " + error);
        })
        return () => unsubscribe();
    }, [user])
   
    return(
        <>
            <Tooltip title="Solicitações de amizade">
                <IconButton color="inherit"
                onClick={() => setOpen(true)}>
                    
                    <Badge badgeContent={unreadNotifications} color="error">
                        <NotificationsIcon 
                        onClick={() => setOpen(true)}
                        />
                    </Badge>
                </IconButton>
            </Tooltip>
            <NotificationList 
                open={open}
                onClose={() => setOpen(false)}
            />
        </>
    )
}