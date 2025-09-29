// src/app/chats/page.tsx
'use client'; // Necessário para usar hooks e eventos do Material-UI no Next.js App Router

import React from 'react';
import {
  Container,
  Box,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Divider,
  Badge,
} from '@mui/material';

// --- Dados Falsos (Mock Data) ---
// Em uma aplicação real, isso viria de uma API.
const mockChats = [
  {
    id: 1,
    name: 'Alice',
    lastMessage: 'Vamos pegar um café amanhã?',
    avatarUrl: 'https://i.pravatar.cc/150?img=1',
    unreadCount: 2,
    timestamp: '10:42 AM',
  },
  {
    id: 2,
    name: 'Bruno',
    lastMessage: 'Me envia o relatório, por favor.',
    avatarUrl: 'https://i.pravatar.cc/150?img=2',
    unreadCount: 0,
    timestamp: '10:30 AM',
  },
  {
    id: 3,
    name: 'Carla',
    lastMessage: 'Ok, combinado!',
    avatarUrl: 'https://i.pravatar.cc/150?img=3',
    unreadCount: 0,
    timestamp: 'Ontem',
  },
  {
    id: 4,
    name: 'Daniel',
    lastMessage: 'Você viu o último episódio da série?',
    avatarUrl: 'https://i.pravatar.cc/150?img=4',
    unreadCount: 5,
    timestamp: 'Ontem',
  },
    {
    id: 5,
    name: 'Equipe de Marketing',
    lastMessage: 'Daniel: A campanha foi aprovada!',
    avatarUrl: 'https://i.pravatar.cc/150?img=5',
    unreadCount: 1,
    timestamp: 'Sexta-feira',
  },
  {
    id: 6,
    name: 'Fernanda',
    lastMessage: '😂😂😂',
    avatarUrl: 'https://i.pravatar.cc/150?img=6',
    unreadCount: 0,
    timestamp: 'Sexta-feira',
  },
];
// --- Fim dos Dados Falsos ---

const ChatsPage = () => {
  return (
    // Container principal que centraliza o conteúdo e define uma largura máxima.
    // É essencial para a responsividade em telas grandes.
    <Container maxWidth="md">
      <Box
        sx={{
          my: { xs: 2, sm: 4 }, // Margem vertical responsiva (menor em telas pequenas)
          bgcolor: 'background.paper', // Cor de fundo padrão (branco no tema claro)
          borderRadius: 2,
          boxShadow: 1, // Sombra sutil para destacar o container
          overflow: 'hidden', // Garante que nada saia dos cantos arredondados
        }}
      >
        <Box sx={{ p: { xs: 2, sm: 3 } }}>
            {/* Título da Página */}
            <Typography 
                variant="h4" 
                component="h1" 
                fontWeight="bold" 
                color="text.primary" // Cor primária do texto (preto no tema claro)
            >
                Chats
            </Typography>
        </Box>
        
        {/* A lista de contatos */}
        <List sx={{ padding: 0 }}>
          {mockChats.map((chat, index) => (
            // Usamos React.Fragment para conseguir colocar a key e o Divider corretamente.
            <React.Fragment key={chat.id}>
              <ListItem alignItems="flex-start" disablePadding>
                {/* ListItemButton dá o efeito de clique e a semântica correta */}
                <ListItemButton sx={{ p: { xs: 1.5, sm: 2 } }}>
                  <ListItemAvatar>
                    {/* Badge para mostrar mensagens não lidas */}
                    <Badge
                      color="primary"
                      badgeContent={chat.unreadCount}
                      invisible={chat.unreadCount === 0}
                    >
                      <Avatar alt={chat.name} src={chat.avatarUrl} />
                    </Badge>
                  </ListItemAvatar>
                  {/* Textos do item: nome, última mensagem e timestamp */}
                  <ListItemText
                    primary={
                      <Typography variant="body1" component="span" fontWeight="500">
                        {chat.name}
                      </Typography>
                    }
                    secondary={
                      <React.Fragment>
                        <Typography
                          sx={{ display: 'block' }} // Garante que a mensagem não vá para o lado do timestamp
                          component="span"
                          variant="body2"
                          color="text.secondary"
                          noWrap // Impede que a mensagem quebre linha
                        >
                          {chat.lastMessage}
                        </Typography>
                      </React.Fragment>
                    }
                  />
                  {/* Timestamp alinhado à direita */}
                  <Typography variant="caption" color="text.secondary" sx={{ ml: 2, alignSelf: 'center' }}>
                    {chat.timestamp}
                  </Typography>
                </ListItemButton>
              </ListItem>
              {/* Adiciona um divisor entre os itens, menos no último */}
              {index < mockChats.length - 1 && <Divider variant="inset" component="li" />}
            </React.Fragment>
          ))}
        </List>
      </Box>
    </Container>
  );
};

export default ChatsPage;