export interface FilmOmdb {
  imdbID: string;
  Title: string;
  Year: string;
  Type: string;
  Poster: string;
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