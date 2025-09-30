'use client';

// Importe os hooks do React que vamos usar
import React, { useState, useEffect } from 'react';

// ... todos os outros imports do Firebase e Material-UI ...
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
import { useChatInfo } from '@/context/ChatInfoContext';

// 👇 1. IMPORTE O SEU NOVO COMPONENTE 👇
import ChatListHeader from '@/app/components/ChatListHeader'; // ⚠️ Ajuste o caminho se necessário

// ... sua interface Chat ...
interface Chat {
  id: string;
  chatName: string;
  lastMessage?: string;
  avatarUrl?: string;
  unreadCount?: number;
  timestamp?: Date;
}

export default function ChatsPage() {
    // ... toda a sua lógica de hooks e useEffects fica igual ...
    const { selectedChatUid, setSelectedChatUid } = useChatInfo();
    const [chats, setChats] = useState<Chat[]>([]);
    const [loading, setLoading] = useState(true);
    const [currentUser, setCurrentUser] = useState(auth.currentUser);

    useEffect(() => {
        // ... sua lógica de autenticação ...
        const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
        });
        return () => unsubscribeAuth();
    }, []);

    useEffect(() => {
        // ... sua lógica de busca de chats ...
        if (!currentUser) {
            setLoading(false);
            setChats([]);
            return;
        };
        setLoading(true);
        const chatsRef = collection(db, 'chats');
        const q = query(chatsRef, where('participantIDs', 'array-contains', currentUser.uid), orderBy('lastMessageTimestamp', 'desc'));
        const unsubscribeFirestore = onSnapshot(q, (querySnapshot) => {
            const chatsData: Chat[] = querySnapshot.docs.map(doc => {
                const data = doc.data();
                const otherParticipantId = data.participantIDs.find((id: string) => id !== currentUser.uid);
                const otherParticipantInfo = data.participantsInfo[otherParticipantId];
                return {
                    id: doc.id,
                    chatName: otherParticipantInfo?.name || 'Chat',
                    avatarUrl: otherParticipantInfo?.avatarUrl || '',
                    lastMessage: data.lastMessage || '',
                    timestamp: data.lastMessageTimestamp?.toDate(),
                    unreadCount: data.unreadCount?.[currentUser.uid] || 0,
                };
            });
            setChats(chatsData);
            setLoading(false);
        });
        return () => unsubscribeFirestore();
    }, [currentUser]);

    // ... sua lógica de loading e lista vazia fica igual ...
    if (loading) {
        return <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}><CircularProgress /></Box>;
    }
    if (chats.length === 0) {
        // Podemos melhorar a UI da lista vazia para incluir o cabeçalho
        return (
            <Box sx={{ bgcolor: 'background.paper', height: '100%'}}>
                <ChatListHeader />
                <Typography sx={{ p: 3, textAlign: 'center' }}>Nenhuma conversa encontrada. Crie uma nova!</Typography>
            </Box>
        );
    }

    return (
        <Box sx={{ bgcolor: 'background.paper', height: '100%', display: 'flex', flexDirection: 'column' }}>
            {/* 👇 2. USE O COMPONENTE AQUI, SIMPLES E LIMPO 👇 */}
            <ChatListHeader />

            {/* A lista de contatos agora tem rolagem interna */}
            <Box sx={{ flexGrow: 1, overflowY: 'auto' }}>
                <List sx={{ padding: 0 }}>
                    {chats.map((chat) => (
                        <React.Fragment key={chat.id}>
                          {/* ... seu ListItem continua igual ... */}
                          <ListItem disablePadding>
                                <ListItemButton
                                    sx={{ p: { xs: 1.5, sm: 2 } }}
                                    onClick={() => setSelectedChatUid(chat.id)}
                                    selected={selectedChatUid === chat.id}
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