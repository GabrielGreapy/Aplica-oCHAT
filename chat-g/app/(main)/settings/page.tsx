'use client';

import { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Divider,
  Switch,
  FormControlLabel,
  Stack,
  Alert
} from '@mui/material';
import ProfilePicture from '@/app/components/profileComponents/profilePicture';
import LogoffButton from '@/app/components/button-logoff';
import ProfileUserName from '@/app/components/profileComponents/profileUserName';
import ProfileEmail from '@/app/components/profileComponents/profileEmail';
import ProfileTicket from '@/app/components/profileComponents/profileTicket';
export default function SettingsPage() {
  // Estados para controlar os switches (deixando a UI interativa)
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  const handleNotificationsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNotifications(event.target.checked);
  };

  const handleDarkModeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDarkMode(event.target.checked);
    
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
            <ProfilePicture />
            <ProfileUserName />
            
          </Stack>
          <Stack spacing={2} sx={{ mt: 3 }}>
            <ProfileEmail />
          </Stack>
        </Box>

        <Divider />

       
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
            <ProfileTicket />
            <LogoffButton />

          </Stack>
        </Box>
      </Stack>
    </Box>
  );
}