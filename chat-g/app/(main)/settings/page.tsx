// src/app/(main)/settings/page.tsx
'use client';

import { useState } from 'react';
import {
  Box,
  Typography,
  Avatar,
  TextField,
  Button,
  Divider,
  Switch,
  FormControlLabel,
  Stack,
  Alert
} from '@mui/material';

export default function SettingsPage() {
  // Estados para controlar os switches (deixando a UI interativa)
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  const handleNotificationsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNotifications(event.target.checked);
  };

  const handleDarkModeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDarkMode(event.target.checked);
    // Em uma aplicação real, aqui você chamaria uma função do seu context de tema
    // para de fato trocar o tema da aplicação.
  };

  return (
    <Box sx={{ p: { xs: 2, sm: 3 } }}>
      <Stack spacing={4}>
        {/* --- Seção de Perfil --- */}
        <Box>
          <Typography variant="h5" gutterBottom>
            Perfil
          </Typography>
          <Stack spacing={2} direction="row" alignItems="center">
            <Avatar
              sx={{ width: 80, height: 80 }}
              src="https://i.pravatar.cc/150?u=a042581f4e29026704d" // Avatar de exemplo
            />
            <Button variant="outlined">Mudar Foto</Button>
          </Stack>
          <Stack spacing={2} sx={{ mt: 3 }}>
            <TextField
              label="Nome de Usuário"
              variant="outlined"
              defaultValue="Seu Nome"
              fullWidth
            />
            <TextField
              label="Email"
              variant="outlined"
              defaultValue="seuemail@exemplo.com"
              fullWidth
            />
          </Stack>
        </Box>

        <Divider />

        {/* --- Seção de Preferências --- */}
        <Box>
          <Typography variant="h5" gutterBottom>
            Preferências
          </Typography>
          <Stack>
            <FormControlLabel
              control={<Switch checked={notifications} onChange={handleNotificationsChange} />}
              label="Receber notificações no desktop"
            />
            <FormControlLabel
              control={<Switch checked={darkMode} onChange={handleDarkModeChange} />}
              label="Modo Escuro (Dark Mode)"
            />
            {darkMode && <Alert severity="info" sx={{mt: 1}}>O modo escuro é apenas uma demonstração visual neste componente.</Alert>}
          </Stack>
        </Box>

        <Divider />

        {/* --- Seção da Conta --- */}
        <Box>
          <Typography variant="h5" gutterBottom>
            Conta
          </Typography>
          <Stack spacing={2} direction={{xs: 'column', sm: 'row'}} alignItems="flex-start">
            <Button variant="contained">Salvar Alterações</Button>
            <Button variant="outlined" color="error">
              Desativar Conta
            </Button>
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
}