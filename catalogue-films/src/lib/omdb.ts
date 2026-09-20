export interface FilmOmdb {
  imdbID: string;
  Title: string;
  Year: string;
  Type: string;
  Poster: string;
}

export interface FilmDetailOmdb {
  imdbID: string;
  Director: string;
  Actors:string;
  Title: string;
  Year: string;
  Runtime: string;
  Genre: string;
  Plot: string;
  Poster: string;
  Type: string;
  Response: "True" | "False";
  Error?: string;
}

export interface ReponseRecherche {
  Search?: FilmOmdb[];
  totalResults?: string;
  Response: "True" | "False";
  Error?: string;
}

export function construireUrlRecherche(terme: string): string {
  const cle = import.meta.env.VITE_OMDB_KEY;
  const termeEncode = encodeURIComponent(terme.trim());
  return `https://www.omdbapi.com/?apikey=${cle}&s=${termeEncode}`;
}

export function urlDetail(id: string): string {
  const cle = (import.meta.env.VITE_OMDB_KEY as string) || "";
  return `https://www.omdbapi.com/?apikey=${cle}&i=${encodeURIComponent(id)}&plot=full`;
}