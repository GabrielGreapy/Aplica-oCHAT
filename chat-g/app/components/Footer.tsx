// Em um arquivo como src/components/Footer.tsx
"use client"

import { Box, Container, Typography, Link } from "@mui/material";

export default function Footer() {
    return (
        <Box
            component="footer"
            sx={{
                py: 3, // Padding vertical (em cima e embaixo)
                px: 2, // Padding horizontal (nas laterais)
                mt: 'auto', // Este é o truque para fixá-lo no final da página!
                backgroundColor: (theme) =>
                    theme.palette.mode === 'light'
                        ? theme.palette.grey[200]
                        : theme.palette.grey[800],
                borderTop: '1px solid',
                borderColor: 'divider'
            }}
        >
            <Container maxWidth="lg">
                <Typography variant="body2" color="text.secondary" align="center">
                    {'Copyright © '}
                    <Link color="inherit" href="https://seusite.com/">
                        Chat-G
                    </Link>{' '}
                    {new Date().getFullYear()}
                    {'.'}
                </Typography>
            </Container>
        </Box>
    );
}