'use client'

import { Avatar, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, List, ListItem, ListItemAvatar, ListItemText, Stack, Tooltip } from "@mui/material"
import { useEffect, useState } from "react"
import { collection, onSnapshot, orderBy, query, where } from "firebase/firestore";
import { auth, db } from "@/Firebase/FirebaseConfig";
import RejectRequest from "./rejectRequest";
import AcceptRequest from "./acceptRequest";


interface RequestData {
    fromId: string;
    from?: string; 
    timestamp?: any;
    fromAvatarUrl?: string; 
}
interface notificationsListProps{
    open : boolean;
    onClose: () => void;
}
export default function NotificationList({ open, onClose} : notificationsListProps){
    const [requests, setRequests] = useState([])
    const [loading, setLoading] = useState(false)
    
    
    
    useEffect(() =>{
        if(!open)return;
        if(!auth.currentUser) return;
        setLoading(true)
        const requestRef = collection(db, 'users', auth.currentUser?.uid, 'requests')
        const q = query(requestRef, orderBy('timestamp', 'desc'))
        const unsubscribe = onSnapshot(q , (snapshot) => {
            const loadedRequests : RequestData[] = snapshot.docs.map( doc => ({
                id: doc.id,
                ...doc.data()
            } as unknown as RequestData))
            setRequests(loadedRequests)
            setLoading(false)
        }, (error) =>{
            console.log("Erro ao buscar a lista :" , error)
            setLoading(false)
        });
        return () => unsubscribe()
    }, [open])



    
    return(
        <>
            <Dialog open={open}
            onClose={onClose}
            >
                <DialogTitle>Pedidos</DialogTitle>
                <DialogContent dividers>
                    { loading ? (
                        <div style={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>
                            <CircularProgress />
                        </div>
                    ) : (
                        <List>
                            {requests.length === 0 ? (
                                <ListItem>
                                    <ListItemText primary="Nenhum pedido pendente." />
                                </ListItem>
                            ) : (
                                requests.map((request) => (
                                    <ListItem 
                                    key={request.id}
                                    
                                    secondaryAction={
                                        <Stack direction="row" spacing={1}>
                                            
                                            <AcceptRequest requestId={request.id}
                                                currentUser={auth.currentUser}                
                                                requestSender = {{
                                                    uid : request.fromId,
                                                    name : request.from,
                                                    avatarUrl : request.fromAvatarUrl
                                                }}
                                            />
                                            <RejectRequest 
                                                requestId={request.id}
                                                currentUserId = {auth.currentUser?.uid}
                                            />
                                            
                                        </Stack>
                                    }
                                > 
                                    
                                    <ListItemAvatar>
                                        <Avatar 
                                            src={request.fromAvatarUrl} 
                                            alt={request.from || "U"}
                                        >
                                           
                                            {request.from ? request.from[0].toUpperCase() : "?"}
                                        </Avatar>
                                    </ListItemAvatar>

                                    
                                    <ListItemText 
                                        primary={request.from || "Usuário"}
                                        secondary="Quer iniciar uma conversa"
                                    />
                                </ListItem>
                                ))   
                            )
                            }
                        </List>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button
                    onClick={onClose}
                    >
                        Voltar
                    </Button>
                </DialogActions>
            </Dialog>
        </>

    )
}