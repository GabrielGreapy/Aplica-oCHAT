// src/components/MainTabs.tsx
'use client';

import { Tabs, Tab, Box } from '@mui/material';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function MainTabs() {
    const pathname = usePathname();

    // Lógica para o valor da Tab: queremos que /chats seja a aba ativa
    // mesmo que a URL seja algo como /chats/uid-123 no futuro.
    const activeTab = pathname.startsWith('/settings') ? '/settings' : '/chats';

    return (
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={activeTab} aria-label="abas de navegação">
                {/* 👇 A MUDANÇA ESTÁ AQUI 👇 */}
                <Tab label="Conversas" value="/chats" component={Link} href="/chats" />
                <Tab label="Configurações" value="/settings" component={Link} href="/settings" />
            </Tabs>
        </Box>
    );
}