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
          height: '60vh'
        }}
      >
        <Typography variant="h2" component="h1" gutterBottom>
          Bem-vindo ao Chat-G
        </Typography>
        <Typography variant="h5" color="text.secondary">
          Veja seus chats!
        </Typography>
      </Box>
    </Container>
  );
}