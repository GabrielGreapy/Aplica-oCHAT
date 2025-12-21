'use client'

import { Box, Typography, useTheme } from "@mui/material"
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';

export default function ChatsIndexPage(){
    const theme = useTheme();


    return(
        <Box sx={{ 
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', 
            height: '100%', bgcolor: theme.palette.background.paper, color: theme.palette.chat.textPrimary
        }}>
            <ChatBubbleOutlineIcon sx={{ fontSize: 80, mb: 2, opacity: 0.5 }} />
            <Typography variant="h6">Selecione uma conversa para começar</Typography>
        </Box>
    )
}