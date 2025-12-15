Essa aqui9 tambem vai ser extensa
Layout.tsx / provider.tsx 
O Layout simplesmente define o layout do seu site. Ele irá explicar onde fica onde
No meu projeto podemos ver que 
    <Container> 
        <MainTabs /> Esse aqui são as abas que fiz, configuração e chats, com as abas colocadas desse jeito ela sempre ficará aparecendo
        <main> {children} </main> isso aqui quer dizer que ese conteudo será possivel mudar, ficará aqui
    </Container>