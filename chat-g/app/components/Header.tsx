"use client"

import { AppBar, Toolbar, Typography, IconButton, Box } from "@mui/material";
import AccountCircle from '@mui/icons-material/AccountCircle';

export default function Header() {
    return (
       
        <AppBar 
            position="static"
            elevation={1} 
            sx={{ 
                bgcolor: 'background.paper',
                color: 'text.primary',    
            }}
        >
           
            <Toolbar>
                
                <Typography 
                    variant="h6" 
                    component="div" 
                    sx={{ 
                        flexGrow: 1, 
                        fontWeight: 'bold',
                    }}
                >
                    Chat-G
                </Typography>

                
                
            </Toolbar>
        </AppBar>
    );
}