import { Container } from "@mui/material";
import MainTabs from "@/app/components/Main-Tabs"; 

export default function MainLayout({ children }: { children: React.ReactNode }) {
    return (
        <Container maxWidth="md">
            <MainTabs /> 
            <main>{children}</main> 
        </Container>
    );
}