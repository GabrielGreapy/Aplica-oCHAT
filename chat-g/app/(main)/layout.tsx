import { Container } from "@mui/material";
import MainTabs from "@/app/components/Main-Tabs"; // Ajuste o caminho se necessário

export default function MainLayout({ children }: { children: React.ReactNode }) {
    return (
        <Container maxWidth="md">
            <MainTabs /> {/* Nossas abas ficam aqui */}
            <main>{children}</main> {/* O conteúdo da página da rota ativa será injetado aqui */}
        </Container>
    );
}