// src/providers/Providers.tsx
"use client";

import { AuthContextProvider } from "@/context/AuthContext";
import React from "react";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { lightTheme, darkTheme } from "../theme"; // Ajuste o caminho conforme necessário

export function Providers({ children }: { children: React.ReactNode }) {
  // Use um estado para gerenciar o modo de cor (claro/escuro)
  const [mode, setMode] = React.useState("light");

  // Você pode criar uma função para alternar o modo
  const toggleColorMode = () => {
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };

  // Selecione o tema correto com base no estado "mode"
  const theme = React.useMemo(() => {
    return mode === "light" ? lightTheme : darkTheme;
  }, [mode]);

  return (
    <ThemeProvider theme={theme}>
      {/* CssBaseline reinicia o CSS e aplica as cores de fundo do tema */}
      <CssBaseline />
      <AuthContextProvider>
        {children}
      </AuthContextProvider>
    </ThemeProvider>
  );
}