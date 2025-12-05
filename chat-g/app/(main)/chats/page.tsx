'use client'

import { Box, Typography } from "@mui/material"
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';

export default function ChatsIndexPage(){
    return(
        <Box sx={{ 
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', 
            height: '100%', bgcolor: '#f0f2f5', color: 'text.secondary' 
        }}>
            <ChatBubbleOutlineIcon sx={{ fontSize: 80, mb: 2, opacity: 0.5 }} />
            <Typography variant="h6">Selecione uma conversa para começar</Typography>
        </Box>
    )
}