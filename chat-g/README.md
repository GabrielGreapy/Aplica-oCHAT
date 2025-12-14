Topicos desse README.md
    middleware.ts
    firebaseAdmin.ts



Middleware
    Antes do login acontecer, o client não tem cookies nem mandou informação para a aplicação saber quem está acessando, aí o Middleware entra,
    caso o client dar uma de esperto e tentar acessar o /chats ou /settings antes de dar o login, ele irá redirecionar para a pagina de login.
    Seria um tipo de porteiro vamos dizer
    Primeiramente ele define as rotas que todos podem usar.
        const publicPaths = ['/login'];
    Após isso será definido uma arrow function
    verifica se é autenticado( Se há cookies)
        const isAuthenticated = async (req: NextRequest) => {
            interessante é que o nextrequest é feito na hora que o client tenta entrar
            na aplicação

            const sessionCookies = req.cookie.get('__session')?.value;
            verifica se há cookies
            if(!sessionCookies) return false;
            try{
                await adminAuth.verifySessionCookie(sessionCookies, true);
                retorna true se tudo der certo
                return true;
            } cathc(error){
                return false;
            }
        }
    
    Agora será feita a função do middleware 
    note que a função tem a arrow function do isAuthenticated
        const userIsAuthenticated = await isAuthenticated(request);
        definido por uma constante para saber se está logado ou não

        if(!userIsAuthenticated && !isPublicPath) Se não estiver logado com credenciais
        é não está em um endereço publico e redireciona
            const loginUrl = new URL('/login') , request.url; define a url
            return NextResponse.redirect(loginUrl); e empurra o client invasor
        if(userIsAuthenticated && isPublicPath) se estiver logado e está na pagina de login ele empurra diretamente ao chats, não é necessario um outro login 
            const homeUrl = new URL ( '/chats', request.url);
            return NextResponse.redirect(homeUrl);
    Agora o seguinte são as configs da lista de endereços
    export const config = {
        matcher: [
            '/',
            '/chat:path', qualquer caminho que tenha chat
            'login',
            'settings',
            '/chats,

        ],
        runtime: node o firebaseadmin só roda em ambientes node, que são mais complexos e por isso tem o node aqui
    }

FirebaseAdmin
    Esse arquivo verifica se o Firebase está ligado e se não estiver ele liga( Se estiver ligado ele não liga, simples)
    if(!admin.apps.length)
    




















































            This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

            ## Getting Started

            First, run the development server:

            ```bash
            npm run dev
            # or
            yarn dev
            # or
            pnpm dev
            # or
            bun dev
            ```

            Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

            You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

            This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

            ## Learn More

            To learn more about Next.js, take a look at the following resources:

            - [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
            - [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

            You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

            ## Deploy on Vercel

            The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

            Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
