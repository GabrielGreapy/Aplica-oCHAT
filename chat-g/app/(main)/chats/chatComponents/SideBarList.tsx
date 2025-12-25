'use client';


import React, { useState, useEffect } from 'react';


import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemButton,
  Avatar,
  ListItemText,
  Divider,
  Badge,
  CircularProgress,
  ListItemAvatar,
} from '@mui/material';

import ChatListHeader from './ChatListHeader';

 
import { collection, onSnapshot, orderBy, query, where } from 'firebase/firestore';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth, db } from '@/Firebase/FirebaseConfig';
import { useRouter, useParams } from 'next/navigation';

interface Chats {
  id: string;
  chatName: string;
  lastMessage?: string;
  avatarUrl?: string;
  unreadCount?: number;
  timestamp?: Date;
}

export default function SidebarList() {
    const router = useRouter(); 
    const params = useParams();
    const activeChatId = params?.id as string;
    
    const [ chats, setChats] = useState<Chats[]>([]);
    const  [loading, setLoading] = useState(true);
    const [ user, setUser] = useState<User | null>(auth.currentUser)
    
    useEffect(() => {
        
        const unsubscribeAuth = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser)
            if(!currentUser){
                setLoading(false)
            }
        })
    }, [])


    useEffect(() => {
        if(!user) return;

        const chatsRef = collection(db, 'chats')
        const q = query(
            chatsRef, 
            where('usersId', 'array-contains', user.uid),
            orderBy('timestamp', 'desc'))

            
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const loadedChats = snapshot.docs.map( doc => {
                const data = doc.data();

                const otherUserId = data.usersId.find((id : string) => id !== user.uid);
                const otherUserData = otherUserId && data.usersData ? data.usersData[otherUserId] : null;
                const myData = data.usersData ? data.usersData[user.uid] : null;
                
                const count = myData?.unreadCount || 0;
                return{
                    id: doc.id,
                    chatName : otherUserData?.displayName || "Usuario desconhecido",
                    avatarUrl : otherUserData?.photoUrl || "",
                    lastMessage : data.lastMessage,
                    unreadCount : count,
                    timestamp : data.timestamp?.toDate(),
                }
            })

            setChats(loadedChats)
            setLoading(false)
        }, (error) =>{
            console.error("Erro ao buscar chats: " , error)
        })
        return () => unsubscribe();
    }, [user])


    
  

   
    if (loading) {
        return <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}><CircularProgress /></Box>;
    }
    if (chats.length === 0) {
        return (
            <Box sx={{ bgcolor: 'background.paper', height: '100%'}}>
                <ChatListHeader />
                <Typography sx={{ p: 3, textAlign: 'center' }}>Nenhuma conversa encontrada. Crie uma nova!</Typography>
            </Box>
        );
    }

    return (
        
            <Box sx={{ bgcolor: 'background.paper', height: '100%', display: 'flex', flexDirection: 'column' }}>
                
                <ChatListHeader />
                <Box sx={{ flexGrow: 1, overflowY: 'auto' }}>
                    
                    <List sx={{ padding: 0 }}>
                        {chats.map((chat) => (
                            <React.Fragment key={chat.id}>
                            
                            <ListItem disablePadding>
                                    <ListItemButton
                                        sx={{ p: { xs: 1.5, sm: 2 } }}
                                    
                                        selected={activeChatId === chat.id}
                                        onClick= {() => router.push(`/chats/` + chat.id)}
                                        
                                    >
                                        <ListItemAvatar>
                                            <Badge color="primary" badgeContent={chat.unreadCount} invisible={!chat.unreadCount || chat.unreadCount === 0}>
                                                <Avatar alt={chat.chatName} src={chat.avatarUrl} />
                                            </Badge>
                                        </ListItemAvatar>
                                        <ListItemText
                                            primary={chat.chatName}
                                            secondary={chat.lastMessage}
                                            primaryTypographyProps={{ fontWeight: '500' }}
                                            secondaryTypographyProps={{ noWrap: true }}
                                        />
                                        <Typography variant="caption" color="text.secondary" sx={{ ml: 2, alignSelf: 'flex-start', pt: '4px' }}>
                                            {chat.timestamp?.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                                        </Typography>
                                    </ListItemButton>
                                </ListItem>
                                <Divider variant="inset" component="li" />
                            </React.Fragment>
                        ))}
                    </List>
                </Box>
            </Box>
    );
};