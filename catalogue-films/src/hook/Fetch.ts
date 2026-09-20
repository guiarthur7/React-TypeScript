import { useState, useEffect } from "react";

export interface ResultatFetch<T> {
  donnees: T | null;
  chargement: boolean;
  erreur: string | null;
}

export function useFetch<T>(url: string | null): ResultatFetch<T> {
  const [donnees, setDonnees] = useState<T | null>(null);
  const [chargement, setChargement] = useState<boolean>(false);
  const [erreur, setErreur] = useState<string | null>(null);

  useEffect(() => {
    if (!url) {
      setDonnees(null);
      setChargement(false);
      setErreur(null);
      return;
    }

    const controleur = new AbortController();
    setChargement(true);
    setErreur(null);

    fetch(url, { signal: controleur.signal })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Erreur HTTP : ${res.status}`);
        }
        return res.json() as Promise<T>;
      })
      .then((data) => {
        setDonnees(data);
        setChargement(false);
      })
      .catch((err: unknown) => {
        if (err instanceof DOMException && err.name === "AbortError") {
          return;
        }
        setErreur(err instanceof Error ? err.message : "Erreur inconnue");
        setChargement(false);
      });

    return () => {
      controleur.abort();
    };
  }, [url]);

  return { donnees, chargement, erreur };
}

export default useFetch;

