// Em um arquivo como src/components/Header.tsx
"use client"

import { AppBar, Toolbar, Typography, IconButton, Box } from "@mui/material";
import AccountCircle from '@mui/icons-material/AccountCircle';

export default function Header() {
    return (
        // AppBar é o container principal para headers.
        // position="static" o mantém no fluxo normal da página.
        // A prop `sx` nos permite customizar o estilo.
        <AppBar 
            position="static"
            elevation={1} // Adiciona uma sombra sutil para separar do conteúdo
            sx={{ 
                bgcolor: 'background.paper', // Fundo branco (no tema claro)
                color: 'text.primary',     // Texto preto (no tema claro)
            }}
        >
            {/* Toolbar organiza o conteúdo do header com um padding padrão. */}
            <Toolbar>
                {/* O Título "Chat-G" */}
                <Typography 
                    variant="h6" 
                    component="div" 
                    sx={{ 
                        flexGrow: 1, // Este é o truque! Faz o título ocupar todo o espaço, empurrando o resto para a direita.
                        fontWeight: 'bold',
                    }}
                >
                    Chat-G
                </Typography>

                {/* Ícones ou botões de ação ficam aqui */}
                <Box>
                    <IconButton
                        size="large"
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        color="inherit" // Herda a cor do pai (preto, neste caso)
                    >
                        <AccountCircle />
                    </IconButton>
                </Box>
            </Toolbar>
        </AppBar>
    );
}