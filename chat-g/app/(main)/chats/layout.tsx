'use client'

import { Box } from "@mui/material";
import { useParams } from "next/navigation"
import SidebarList from "./chatComponents/SideBarList";



export default function ChatsLayout({ children } : {children: React.ReactNode}) {
    const params = useParams()
    const isChatOpen = !!params.id;
    return(
        <Box sx={{ display: 'flex', height: '100vh', width: '100%' }}>
            
            <Box sx={{ 
                width: { xs: '100%', md: '350px' }, 
                
                display: { xs: isChatOpen ? 'none' : 'block', md: 'block' } ,
                borderRight: '1px solid #ddd'
            }}>
                <SidebarList />
            </Box>
            <Box sx={{ 
                flex: 1, 
                display: { xs: isChatOpen ? 'block' : 'none', md: 'block' }
            }}>
                {children}
            </Box>
            
        </Box>
    )
}