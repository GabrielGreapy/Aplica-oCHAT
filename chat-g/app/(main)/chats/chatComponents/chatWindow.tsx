'use client'

import { db, auth } from "@/Firebase/FirebaseConfig";
import { Avatar, Box, CircularProgress, IconButton, Paper, TextField, Typography, useTheme, Drawer } from "@mui/material";
import { addDoc, collection, doc, getDoc, onSnapshot, orderBy, query, serverTimestamp, limitToLast, setDoc, updateDoc, increment } from "firebase/firestore";
import { useEffect, useRef, useState, useLayoutEffect } from "react";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SendIcon from '@mui/icons-material/Send';
import { useRouter } from 'next/navigation';
import ChatInfoSideBar from "./ChatInfoSideBar";

interface Message {
    id : string;
    text : string;
    senderId : string;
    timestamp : any;

}
export default function ChatWindow( { chatId} : { chatId: string}){
    const [receiverId , SetReceiverId] = useState<string | undefined>()
    const theme = useTheme()
    const[msgLimit, setMsgLimit] = useState(30);
    const[lastScrollHeight, setLastScrollHeight] = useState(0);
    const scrollContainer = useRef<HTMLDivElement>(null);
    const router = useRouter();

    const [isInfoOpen, setIsInfoOpen] = useState(false);
    

    const [ messages, setMessages] = useState<Message[]>([])
    const [ newMessage, setNewMessage] = useState("")
    const [ loading, setLoading] = useState(false)

    const [headerData, setHeaderData] = useState({ name: "", avatarUrl : "", id : "", chatId : ""})

    const scrolllToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth"})
    }

    const messagesEndRef = useRef<HTMLDivElement>(null);
    

    useEffect(() => {

        setMsgLimit(30);
    }, [chatId]);



    useEffect(() => {
        const fetchChatHeader = async () => {
            if(!chatId || !auth.currentUser) return;
            try{
                const chatDocRef = doc(db, 'chats', chatId)
                const docSnap = await getDoc(chatDocRef)
                if(docSnap.exists()){
                    const data = docSnap.data()
                    const usersList = data.usersId as string[]
                    const otherUserId = usersList.find( id => id !== auth.currentUser?.uid)

                    if( otherUserId && data.usersData && data.usersData[otherUserId]){
                        SetReceiverId(otherUserId)
                        const userData = data.usersData[otherUserId]
                        setHeaderData({
                            name : userData.displayName || "Usuario",
                            avatarUrl: userData.photoUrl || "",
                            id : otherUserId,
                            chatId : data.uid,
                        })
                    }
                    const myId = auth.currentUser.uid;
                    if(data.usersData && data.usersData[myId]){
                        const myUnreadCount = data.usersData[myId].unreadCount;
                        if (myUnreadCount > 0){
                            await updateDoc(chatDocRef,{
                                [`usersData.${myId}.unreadCount`] : 0
                            })
                            console.log("Contador zerado!");
                        }
                    }
                }
            }catch(error){
                console.error("Erro ao carregar topo do chat: ", error)
            }
        }
        
        fetchChatHeader()
    }, [chatId])




    useEffect(() => {
        if (!chatId) return;

        if(msgLimit === 30) setLoading(true);


        const messagesRef = collection(db, 'chats', chatId, 'messages')
        const q = query(messagesRef, orderBy('timestamp', 'asc'),  limitToLast(msgLimit))
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const loadedMessages = snapshot.docs.map(doc => ({
                id : doc.id,
                ...doc.data()
            } as Message))
            setMessages(loadedMessages)
            setLoading(false)
            if(msgLimit === 30){
                setTimeout( scrolllToBottom, 300)
            }
        })
        return () => unsubscribe();
    }, [chatId, msgLimit])


    useLayoutEffect(() =>{
        if(lastScrollHeight > 0 && scrollContainer.current){
            const diff = scrollContainer.current.scrollHeight - lastScrollHeight
            if(diff > 0){
                scrollContainer.current.scrollTop = diff;
                setLastScrollHeight(0);
            }
        }
    }, [messages, lastScrollHeight])


    const handleScroll = (e : React.UIEvent<HTMLDivElement>) => {
        const target = e.currentTarget
        if(target.scrollTop === 0 && !loading && messages.length >= msgLimit){
            setLastScrollHeight(target.scrollHeight)
            setMsgLimit((prev) => prev + 30)
        }
    }



    const handleSendMessage = async () => {
        if(!newMessage.trim() || !chatId || !auth.currentUser || !receiverId) return;
        try{
            const msgTemp = newMessage;
            setNewMessage("");
            await addDoc(collection(db, 'chats', chatId, 'messages'), {
                text : msgTemp,
                senderId: auth.currentUser.uid,
                timestamp : serverTimestamp(),
            } )
            const chatRef = doc(db, 'chats', chatId)
            
            await updateDoc(chatRef, { 
                lastMessage : msgTemp,
                timestamp : serverTimestamp(),
                [`usersData.${receiverId}.unreadCount`] : increment(1),
            })
        }catch(error){
            console.error("Erro ao enviar mensagem: " , error)
        }
    }
    if (!chatId) return null;
    

    return(
        <Box sx={{ display: 'flex',
        flexDirection: 'column',
        height: '100%', 
        bgcolor: theme.palette.chat.main,
        transition: 'background-color 0.3s ease'
        }}>
            
            
            <Paper square sx={{ p: 1, display: 'flex',
                
                alignItems: 'center', 
                bgcolor: theme.palette.background.default,
                cursor: 'pointer'
                }}
                onClick={() => setIsInfoOpen(true)}
                >
                <IconButton onClick={(e) => {
                    e.stopPropagation();
                    router.push('/chats');
                    }} sx={{ mr: 1 }}>
                    <ArrowBackIcon />
                </IconButton>

                <Avatar src={headerData.avatarUrl} alt={headerData.name} />
                <Typography variant="subtitle1" sx={{ ml: 2, fontWeight: 'bold', flexGrow: 1 }}>
                    {headerData.name || "Carregando..."}
                </Typography>
            </Paper>

           
            <Box sx={{ flex: 1, overflowY: 'auto', p: 2, display: 'flex', flexDirection: 'column', gap: 1 }}
                ref={scrollContainer}
                onScroll={handleScroll
                       
                }
            >
                
               
                {loading && <Box sx={{display:'flex', justifyContent:'center'}}><CircularProgress /></Box>}

                
                {messages.map((msg) => {
                    const isMe = msg.senderId === auth.currentUser?.uid;
                    return (
                        <Box key={msg.id} sx={{
                            alignSelf: isMe ? 'flex-end' : 'flex-start',
                            bgcolor: isMe ? theme.palette.chat.bubbleMe : theme.palette.chat.bubbleOther,
                            p: 1.5,
                            color: theme.palette.chat.textPrimary, 
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
            <Drawer
                anchor="right"
                open={isInfoOpen}
                onClose={() => setIsInfoOpen(false)}
                variant="temporary" 
                ModalProps={{
                    keepMounted: true,
                }}
            >
                
                <ChatInfoSideBar 
                    userData={headerData} 
                    onClose={() => setIsInfoOpen(false)} 
                />
            </Drawer>
        </Box>
    )
}