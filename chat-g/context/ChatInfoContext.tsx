'use client';

import { createContext, useState, useContext, ReactNode } from "react";

// Supondo que a interface ChatSelecionado seja algo assim:
// (Coloque a definição real do seu tipo aqui)
export interface ChatSelecionado {
    id: number;
    name: "string";
    avatarUrl: "string";
}

// 1. Tipagem para o valor do Contexto
// Incluímos o estado e a função para atualizá-lo.
type ChatInfoContextType = {
    chatSelecionado: ChatSelecionado | null;
    setChatSelecionado: (chat: ChatSelecionado | null) => void;
};

// 2. Criação do Contexto com a tipagem e um valor padrão
// O valor padrão é undefined porque vamos garantir que ele só seja
// acessado dentro do Provider.
export const ChatInfoContext = createContext<ChatInfoContextType | undefined>(undefined);

// 3. Criação do Componente Provedor (Provider)
export const ChatInfoProvider = ({ children }: { children: ReactNode }) => {
    const [chatSelecionado, setChatSelecionado] = useState<ChatSelecionado | null>(null);

    // O valor que será compartilhado com todos os componentes filhos
    const value = {
        chatSelecionado,
        setChatSelecionado,
    };

    return (
        <ChatInfoContext.Provider value={value}>
            {children}
        </ChatInfoContext.Provider>
    );
};

// 4. Hook customizado para consumir o Contexto
// Esta é a melhor prática para usar seu contexto em outros componentes.
export const useChatInfo = () => {
    const context = useContext(ChatInfoContext);

    // Garante que o hook só seja usado dentro de um ChatInfoProvider
    if (context === undefined) {
        throw new Error("useChatInfo deve ser usado dentro de um ChatInfoProvider");
    }

    return context;
};