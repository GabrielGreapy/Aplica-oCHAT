'use client'

import { Box, IconButton, Typography, Avatar, Divider, List, ListItem, ListItemText, ListItemButton, ListItemIcon, Switch } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import BlockIcon from '@mui/icons-material/Block';
import DeleteIcon from '@mui/icons-material/Delete';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { useEffect, useState } from "react";
import { collection, deleteDoc, doc, getDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { db } from "@/Firebase/FirebaseConfig";
interface ChatInfoSideBarProps{
    userData : {
        name : string;
        avatarUrl : string;
        id : string;
        chatId : string;
    };
    onClose : () => void;
}
export default function ChatInfoSideBar({ userData, onClose} : ChatInfoSideBarProps){
    const [userHeaderInfo,  setUserHeaderInfo] = useState({})
    const router = useRouter();
    


    useEffect(() => {
        if(!userData?.id) return;
        const fetchUserHeaderInfo = async () => {
            try{
                const userRef = doc(db, 'users', userData.id)
                const docSnap = await getDoc(userRef)
                if((docSnap).exists()){
                    const data = docSnap.data()
                    setUserHeaderInfo(data)
                }
            } catch(error){
                console.log("Deu erro tentando conseguir a info do usuário: " + error)
            }
        }
        fetchUserHeaderInfo()
    }, [userData.id])

    const handleDeleteChat = async () => {
        if(!userData.chatId) return;
        try{
            await deleteDoc(doc(db, 'chats', userData.chatId));
            router.push("/chats");
        }catch(error){
            console.log("Deu erro excluindo o chat: " + error )
        }
    }
    return(
        <Box sx={{ width: 350, height: '100%', display: 'flex', flexDirection: 'column', bgcolor: 'background.paper' }}>
            
            
            <Box sx={{ p: 2, display: 'flex', alignItems: 'center', borderBottom: '1px solid rgba(0,0,0,0.12)' }}>
                <IconButton onClick={onClose} sx={{ mr: 1 }}>
                    <CloseIcon />
                </IconButton>
                <Typography variant="h6">Dados do contato</Typography>
            </Box>
<Box sx={{ overflowY: 'auto', flex: 1 }}>
                
                
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: 4, bgcolor: 'background.default', mb: 1 }}>
                    <Avatar 
                        src={userData.avatarUrl} 
                        sx={{ width: 200, height: 200, mb: 2, fontSize: 80 }}
                    />
                    <Typography variant="h5" align="center">{userData.name}</Typography>
                    <Typography variant="body2" color="text.secondary">Código:{userData.id}</Typography>
                    
                </Box>

               
                <List sx={{ bgcolor: 'background.paper' }}>
                    <ListItem>
                        <Typography variant="body2" color="text.secondary">Mídia, links e docs</Typography>
                    </ListItem>
                  
                    <Box sx={{ p: 2, display: 'flex', gap: 1 }}>
                        <Box sx={{ width: 70, height: 70, bgcolor: '#ccc', borderRadius: 1 }} />
                        <Box sx={{ width: 70, height: 70, bgcolor: '#ccc', borderRadius: 1 }} />
                        <Box sx={{ width: 70, height: 70, bgcolor: '#ccc', borderRadius: 1 }} />
                    </Box>

                    <Divider />

                   

                    <Divider />

                   

                    <ListItem disablePadding>
                        <ListItemButton sx={{ color: 'error.main' }}
                        onClick={handleDeleteChat}
                        >
                            <ListItemIcon sx={{ color: 'error.main' }}><DeleteIcon /></ListItemIcon>
                            <ListItemText primary="Apagar conversa" />
                        </ListItemButton>
                    </ListItem>
                </List>
            </Box>
        </Box>

    )
}