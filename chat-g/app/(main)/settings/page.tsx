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
import ThemeToggle from '@/app/components/themeToggle';
export default function SettingsPage() {
 


  return (
    <Box sx={{ p: { xs: 2, sm: 3 } }}>
      <Stack spacing={4}>
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
          
        </Box>
        <Box>
          <ThemeToggle />
        </Box>
        <Divider />

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