O authcontext é o que informa a aplicação inteira de informações de user após ter rolado o login, nada muito compliqueido cara.
Se liga que informamos as variaveis no proprio layout.tsx da aplicação mas envolvemos a applicação lá no layout.

como fazer um context hm? assim

imports necessarios { createContext, useEffect, useState } from "react";

cria a variavel do context e informa que pode ser o User ou nulo.
    export const AuthContext = createContext < User | null>(null)
Esse vai criar o entregador da variavel
    export const AuthContextProvider = ({children} _Isso aqui diz que as childrens podem ser englobadas e mesmo assim aparecerem_ : {children : React.ReactNode}) => {
    
      const [user, setUser] = useState< User | null>(null); Isso vai criar a variavel que vai ser preenchida
    }
    useEffect(() => {
        const unsubscribe = onAuthStateChanged( auth, ( currentUser) => {
            setUser(currentUser); mudando o user
            setLoading(false) loading desligado
        })
        return () => unsubscribe()
    }, []);

    return(
        </AuthContext.Provider value={ùser}>
        {loading?
            Tela de loading : children - Se estiver carregando então dá tela de loading e se não então mostra a aplicação normal. - 
        }
        </AuthContext.Provider>
    )