'use client'

import { useChatInfo } from "@/context/ChatInfoContext";
import { db, auth } from "@/Firebase/FirebaseConfig";
import { Avatar, Box, IconButton, Paper, TextField, Typography } from "@mui/material";
import { addDoc, collection, doc, onSnapshot, orderBy, query, serverTimestamp } from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SendIcon from '@mui/icons-material/Send';
import { useRouter } from "next/router";


interface Message {
    id : string;
    text : string;
    senderId : string;
    timestamp : any;
}
export default function ChatWindow( { chatId} : { chatId: string}){
    const router = useRouter();
    const { chatSelecionado, setChatSelecionado } = useChatInfo();
    const [ messages, setMessages] = useState<Message[]>([])
    const [ newMessage, setNewMessage] = useState("")
    const [ loading, setLoading] = useState(false)

    const messagesEndRef = useRef<HTMLDivElement>(null);
    
    useEffect(() => {
        if (!chatSelecionado?.id) return;

        const messagesRef = collection(db, 'chats', chatSelecionado.id, 'messages')
        const q = query(messagesRef, orderBy('timestamp', 'asc'))
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const loadedMessages = snapshot.docs.map(doc => ({
                id : doc.id,
                ...doc.data()
            } as Message))
            setMessages(loadedMessages)
            setLoading(false)
        })
        return () => unsubscribe();
    }, [chatSelecionado?.id])

    const handleSendMessage = async () => {
        if(!newMessage.trim() || !chatSelecionado?.id || !auth.currentUser) return;
        try{
            const msgTemp = newMessage;
            setNewMessage("");
            const messagesRef = collection(db, 'chats', chatSelecionado.id, 'messages')
            await addDoc(collection(db, 'chats', chatSelecionado.id, 'messages'), {
                text : msgTemp,
                senderId: auth.currentUser.uid,
                timestamp : serverTimestamp()
            } )
        }catch(error){
            console.error("Erro ao enviar mensagem: " , error)
        }
    }
    if (!chatSelecionado) return null;
    

    return(
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', bgcolor: '#efe7dd' }}>
            
            {/* --- HEADER --- */}
            <Paper square sx={{ p: 1, display: 'flex', alignItems: 'center', bgcolor: '#f0f2f5' }}>
                <IconButton onClick={() => setChatSelecionado(null)} sx={{ mr: 1 }}>
                    <ArrowBackIcon />
                </IconButton>

                <Avatar src={chatSelecionado.avatarUrl} />
                <Typography variant="subtitle1" sx={{ ml: 2, fontWeight: 'bold', flexGrow: 1 }}>
                    {chatSelecionado.name}
                </Typography>
            </Paper>

            {/* --- AREA DE MENSAGENS --- */}
            <Box sx={{ flex: 1, overflowY: 'auto', p: 2, display: 'flex', flexDirection: 'column', gap: 1 }}>
                
                {/* Loading opcional */}
                {loading && <Box sx={{display:'flex', justifyContent:'center'}}><CircularProgress /></Box>}

                {/* Map das mensagens */}
                {messages.map((msg) => {
                    const isMe = msg.senderId === auth.currentUser?.uid;
                    return (
                        <Box key={msg.id} sx={{
                            alignSelf: isMe ? 'flex-end' : 'flex-start',
                            bgcolor: isMe ? '#d9fdd3' : '#ffffff', // Verde pra mim, branco pro outro
                            p: 1.5,
                            borderRadius: 2,
                            maxWidth: '70%',
                            boxShadow: 1
                        }}>
                            <Typography variant="body1">{msg.text}</Typography>
                        
                            <Typography variant="caption" sx={{ display: 'block', textAlign: 'right', fontSize: '0.7rem', color: 'gray', mt: 0.5 }}>
                                {msg.timestamp?.toDate().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                            </Typography>
                        </Box>
                    )
                })}
                {/* Elemento invisível */}
                <div ref={messagesEndRef} />
            </Box>

           
            <Paper square sx={{ p: 2, display: 'flex', gap: 1 }}>
                <TextField 
                    fullWidth 
                    size="small" 
                    placeholder="Digite uma mensagem"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                />
                <IconButton color="primary" onClick={handleSendMessage}>
                    <SendIcon />
                </IconButton>
            </Paper>
        </Box>
    )
}