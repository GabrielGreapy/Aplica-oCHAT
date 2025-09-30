'use client';

// Importe os hooks do React que vamos usar
import React, { useState, useEffect } from 'react';

// Importe tudo que precisamos do Firebase
import { auth, db } from "@/Firebase/FirebaseConfig"; // Seu arquivo de configuração
import { collection, query, where, onSnapshot, orderBy } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';

// Importe os componentes do Material-UI
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
  CircularProgress, // Para o indicador de loading
} from '@mui/material';
import { useChatInfo } from '@/context/ChatInfoContext'; // Nosso contexto

// Definimos um tipo para os nossos dados de chat, para usar com TypeScript
interface Chat {
  id: string;
  chatName: string; // Simplificando para o nome do chat/contato
  lastMessage?: string;
  avatarUrl?: string;
  unreadCount?: number;
  timestamp?: Date; // O Firestore nos devolve um objeto Date
}

export default function ChatsPage() {
    const { selectedChatUid, setSelectedChatUid } = useChatInfo();
    
    // Estados do componente
    const [chats, setChats] = useState<Chat[]>([]);
    const [loading, setLoading] = useState(true);
    const [currentUser, setCurrentUser] = useState(auth.currentUser);

    // useEffect para lidar com a autenticação e buscar os dados
    useEffect(() => {
        // Ouve mudanças no estado de autenticação (login/logout)
        const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
        });
        return () => unsubscribeAuth();
    }, []);

    // useEffect para buscar os chats quando o usuário for identificado
    useEffect(() => {
        if (!currentUser) {
            setLoading(false);
            setChats([]);
            return;
        };

        setLoading(true);

        // 1. Criamos a query para a coleção 'chats'
        const chatsRef = collection(db, 'chats');
        
        // 2. A query busca documentos ONDE o array 'participantIDs' CONTÉM o UID do usuário logado
        //    E ordena pela data da última mensagem, da mais nova para a mais antiga.
        const q = query(
            chatsRef, 
            where('participantIDs', 'array-contains', currentUser.uid),
            orderBy('lastMessageTimestamp', 'desc')
        );

        // 3. onSnapshot cria um listener em tempo real
        const unsubscribeFirestore = onSnapshot(q, (querySnapshot) => {
            const chatsData: Chat[] = querySnapshot.docs.map(doc => {
                const data = doc.data();
                // Lógica para pegar o nome e avatar do *outro* participante
                // (Esta lógica depende de como você estruturou `participantsInfo`)
                const otherParticipantId = data.participantIDs.find((id: string) => id !== currentUser.uid);
                const otherParticipantInfo = data.participantsInfo[otherParticipantId];

                return {
                    id: doc.id,
                    chatName: otherParticipantInfo?.name || 'Chat',
                    avatarUrl: otherParticipantInfo?.avatarUrl || '',
                    lastMessage: data.lastMessage || '',
                    // O timestamp do Firestore precisa ser convertido para Date
                    timestamp: data.lastMessageTimestamp?.toDate(),
                    unreadCount: data.unreadCount?.[currentUser.uid] || 0,
                };
            });
            setChats(chatsData);
            setLoading(false);
        });

        // 4. Função de limpeza: remove o listener quando o componente é desmontado
        return () => unsubscribeFirestore();

    }, [currentUser]); // Este useEffect roda sempre que o `currentUser` mudar

    // Se estiver carregando, mostra um spinner
    if (loading) {
        return <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}><CircularProgress /></Box>;
    }

    // Se não tiver chats, mostra uma mensagem
    if (chats.length === 0) {
        return <Typography sx={{ p: 3, textAlign: 'center' }}>Nenhuma conversa encontrada.</Typography>
    }

    return (
        <Box sx={{ py: 2, bgcolor: 'background.paper' }}>
            <List sx={{ padding: 0 }}>
                {chats.map((chat) => (
                    <React.Fragment key={chat.id}>
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
    );
};