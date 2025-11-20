'use client';

import React, { useState} from 'react';
import { Box, Typography, IconButton, Dialog, DialogTitle, DialogContent } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ProfilePicture from '../profileComponents/profilePicture';
import PopUpAddNewChat from '@/app/components/chatComponents/popUpAddNewChat'
import RequestsNotifications from './requestsNotifications';
export default function ChatListHeader() {
  const [ open, setOpen] = useState(false)



  return (
    <>
      <Box
        sx={{
          p: 2,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: 1,
          borderColor: 'divider',
          flexShrink: 0, 
        }}
      >
        <ProfilePicture />
        

    
        <IconButton 
          color="primary" 
          aria-label="iniciar nova conversa"
          onClick={() => setOpen(true)}
        >
          <Typography variant="h6" component="h2" fontWeight="bold">
            Conversas
          </Typography>
          <AddIcon />
        </IconButton>
        <PopUpAddNewChat 
          open={open}
          onClose={() => setOpen(false)}
        />
        <RequestsNotifications />

      </Box>
      
      
      

      
    </>
  );
}