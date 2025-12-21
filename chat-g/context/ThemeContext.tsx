'use client';

import { createTheme, ThemeProvider, CssBaseline } from "@mui/material";
import { createContext, useContext, useEffect, useMemo, useState } from "react";


declare module '@mui/material/styles'{
    interface Pallete{
        chat:{
            main : string;
            bubbleMe: string;
            bubbleOther: string;
            textPrimary: string;
            textSecondary: string;
        };
    }
    interface PaletteOptions{
        chat?:{
            main?: string;
            bubbleMe?: string;
            bubbleOther?: string;
            textPrimary?: string;
            textSecondary?: string;
        };
    }
}

const ColorModeContext = createContext({ toggleColorMode: () => {} })

export const useColorMode = () => useContext(ColorModeContext)

export const ThemeContextProvider = ({ children}: { children : React.ReactNode}) => {




    const [mode, setMode] = useState<'light' | 'dark'>('light');

    useEffect(() => {
        const savedMode = localStorage.getItem("themeMode");
        if(savedMode === 'dark' || savedMode === 'light'){
            setMode(savedMode);
        }
    }, [])

    const colorMode = useMemo(
        () => ({
            toggleColorMode: () => {
                setMode((prevMode) => {
                    const newMode = prevMode === 'light' ? 'dark' : 'light';
                    localStorage.setItem("themeMode" , newMode);
                    return newMode;
                })
            },
        }),
        [],
    )

    
    const theme = useMemo(
        () => 
            createTheme({
                palette: {
                    mode, 
                    ...(mode == 'light' ? {
                        background: { default : "#f0f2f5", paper : "#ffffff"},
                        primary : { main: "#1976d2"},
                        chat : {
                            main: '#efe7dd',
                            bubbleMe : '#d9fdd3',
                            bubbleOther : '#ffffff',
                            textPrimary : '#000000',
                            textSecondary : 'gray'

                        },

                    } 
                    : {
                        background: { default : "#121212", paper : "#1e1e1e"},
                        primary : { main : "#90caf9"},
                        chat: {
                            main : '#0b141a', 
                            bubbleMe : '#005c4b',
                            bubbleOther : '#202c33',
                            textPrimary : '#e9edef',
                            textSecondary: '#8696a0'
                        },
                    }
                    )
                }
            }),
        [mode]
    )
    return(
        <ColorModeContext.Provider value= {colorMode}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                {children}
            </ThemeProvider>
        </ColorModeContext.Provider>
    )


}