"use client"

import { createContext, useEffect, useState } from "react";
import { auth } from "../Firebase/FirebaseConfig";
import { onAuthStateChanged, User } from "firebase/auth";

export const AuthContext = createContext<User | null>(null);

export const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false); // Adicionando o estado de montagem

  useEffect(() => {
    // Apenas executa a lógica de autenticação após o componente ser montado no cliente
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    setMounted(true); // O componente está montado no cliente

    return () => unsubscribe();
  }, []);

  // Na renderização inicial do servidor, o 'mounted' é false, então renderiza os 'children'.
  if (!mounted) {
    return children;
  }

  // No cliente, após a montagem, a lógica de carregamento é aplicada.
  if (loading) {
    return (
      <div>
        Loading...
      </div>
    );
  }

  return (
    <AuthContext.Provider value={user}>
      {children}
    </AuthContext.Provider>
  );
}