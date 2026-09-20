import {
  createContext,
  useContext,
  useReducer,
  useEffect,
  type ReactNode,
  type Dispatch,
} from "react";
import type { FilmOmdb } from "../lib/omdb";

export type ActionFavoris =
  | { type: "ajouter"; film: FilmOmdb }
  | { type: "retirer"; id: string }
  | { type: "vider" };

export function reducerFavoris(
  etat: FilmOmdb[],
  action: ActionFavoris
): FilmOmdb[] {
  switch (action.type) {
    case "ajouter": {
      if (etat.some((f) => f.imdbID === action.film.imdbID)) {
        return etat;
      }
      return [...etat, action.film];
    }
    case "retirer": {
      return etat.filter((f) => f.imdbID !== action.id);
    }
    case "vider": {
      return [];
    }
  }
}

interface FavorisContexteType {
  favoris: FilmOmdb[];
  dispatch: Dispatch<ActionFavoris>;
}

const FavorisContexte = createContext<FavorisContexteType | undefined>(undefined);

export function FavorisProvider({ children }: { children: ReactNode }) {
  const [favoris, dispatch] = useReducer(
    reducerFavoris,
    [],
    () => {
      const stocke = localStorage.getItem("films_favoris");
      return stocke ? (JSON.parse(stocke) as FilmOmdb[]) : [];
    }
  );

  useEffect(() => {
    localStorage.setItem("films_favoris", JSON.stringify(favoris));
  }, [favoris]);

  return (
    <FavorisContexte.Provider value={{ favoris, dispatch }}>
      {children}
    </FavorisContexte.Provider>
  );
}

export function useFavoris(): FavorisContexteType {
  const ctx = useContext(FavorisContexte);
  if (ctx === undefined) {
    throw new Error("useFavoris doit être utilisé dans un <FavorisProvider>");
  }
  return ctx;
}