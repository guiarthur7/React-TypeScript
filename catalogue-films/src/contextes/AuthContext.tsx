import { createContext, useContext, useState, type ReactNode } from "react";

interface AuthContexte {
  pseudo: string | null;
  connecter: (pseudo: string) => void;
  deconnecter: () => void;
}

const Contexte = createContext<AuthContexte | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [pseudo, setPseudo] = useState<string | null>(() => {
    return localStorage.getItem("auth_pseudo");
  });

  const connecter = (nouveauPseudo: string) => {
    setPseudo(nouveauPseudo);
    localStorage.setItem("auth_pseudo", nouveauPseudo);
  };

  const deconnecter = () => {
    setPseudo(null);
    localStorage.removeItem("auth_pseudo");
  };

  return (
    <Contexte.Provider value={{ pseudo, connecter, deconnecter }}>
      {children}
    </Contexte.Provider>
  );
}

export function useAuth(): AuthContexte {
  const contexte = useContext(Contexte);
  if (contexte === undefined) {
    throw new Error("useAuth doit être utilisé dans un <AuthProvider>");
  }
  return contexte;
}