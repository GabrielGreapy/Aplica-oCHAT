# Aplica-oCHAT
Uma aplicação de chat entre pessoas com NextJS.
A premissa dessa aplicação web é permitir que pessoas se conversem por meio de tickets que cada perfil tem.
    Como funciona? você primeiro dá login e isto criará sua conta caso não tenha logado antes. após ter criado a conta, um ticket seu será criado (Abra a aba das configurações para ve-lo), compartilhe-o ou receba o ticket de alguem e adicione essa pessoa a lista de chats na aba de chats.

Funções Disponiveis:
    Adicionar pessoas.
    Conversar com pessoas por meio de ticket.
    Ticket criado automaticamente.
    Login mantido por 6 dias mesmo saindo do site e fechando-o.
    Limite de mensagens de 30 ao entrar mas ao ir subindo tem scroll infinito
    Sair da conta.
    Tema claro e escuro.

Funções aa se adicionar:
    
    Possibilidade de enviar images/documentos/arquivos/videos
    


Ao login a aplicação é informada de algumas informações como e-mail, foto de perfil, nome de usuario. Importante para criação de uma conta na aplicação.

Cada arquivo que eu julgar importante terá informações sobre ele com README.md na pasta deles, pode olhar se quiser dar uma estudada.


Lembretes
    Firestore para utiliza-lo precisamos ajustar as regras de acesso e permisso~es da Database, configurando elas será melhor para evitar erros.
    Eu utilizei um adaptador do materialUi para evitar erros de hidratação, ele vai envelopar lá no layout.
    npm install @mui/material-nextjs