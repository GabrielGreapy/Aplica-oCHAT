// src/components/ChatListHeader.tsx
'use client';

import React from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

export default function ChatListHeader() {

  // Você pode adicionar a lógica para abrir um modal ou navegar para outra página aqui
  const handleAddNewChat = () => {
    console.log("Botão de adicionar nova conversa foi clicado!");
    // TODO: Adicione sua lógica aqui (ex: abrir um modal de busca de usuários)
  };

  return (
    <Box
      sx={{
        p: 2,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottom: 1,
        borderColor: 'divider',
        flexShrink: 0, // Impede que esta área encolha
      }}
    >
      <Typography variant="h6" component="h2" fontWeight="bold">
        Conversas
      </Typography>

      {/* Botão de Adicionar Conversa */}
      <IconButton 
        color="primary" 
        aria-label="iniciar nova conversa"
        onClick={handleAddNewChat}
      >
        <AddIcon />
      </IconButton>
    </Box>
  );
}