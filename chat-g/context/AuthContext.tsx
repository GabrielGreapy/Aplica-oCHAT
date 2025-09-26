"use client"

import { createContext, useEffect, useState } from "react";
import { auth } from "../Firebase/FirebaseConfig";
import { onAuthStateChanged, User } from "firebase/auth";


export const AuthContext = createContext<User | null>(null)


export const AuthContextProvider = ({children}: {children : React.ReactNode}) => {


  const [user, setUser] = useState< User | null>(null);
  const [loading , setLoading] = useState(true);

  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged( auth, ( currentUser) => {
      setUser(currentUser);
      setLoading(false);
    })

    return () => unsubscribe();
  }, []);
  

  return(
    <AuthContext.Provider value={user}>
      { loading? 
        <div>
          Carregando...
        </div>  : children
      }
    </AuthContext.Provider>
  )


}