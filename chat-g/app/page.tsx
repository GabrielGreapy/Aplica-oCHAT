// src/app/page.tsx
import { Container, Typography, Box } from "@mui/material";

export default function HomePage() {
  return (
    <Container maxWidth="md">
      <Box 
        sx={{ 
          my: 4, 
          display: 'flex', 
          flexDirection: 'column', 
          justifyContent: 'center', 
          alignItems: 'center',
          height: '60vh' // Ocupa uma boa parte da altura da tela
        }}
      >
        <Typography variant="h2" component="h1" gutterBottom>
          Bem-vindo ao Chat-G
        </Typography>
        <Typography variant="h5" color="text.secondary">
          Selecione uma conversa para começar.
        </Typography>
      </Box>
    </Container>
  );
}