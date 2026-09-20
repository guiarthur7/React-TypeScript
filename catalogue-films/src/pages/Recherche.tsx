import { useState, useEffect, type ChangeEvent } from "react";
import { Link } from "react-router-dom";
import type { FilmOmdb, ReponseRecherche } from "../lib/omdb";
import { construireUrlRecherche } from "../lib/omdb";
import { CarteFilm } from "../composants/CarteFilm";

export function Recherche() {
  const [terme, setTerme] = useState("");
  const [termeDiffere, setTermeDiffere] = useState("");
  const [films, setFilms] = useState<FilmOmdb[]>([]);
  const [chargement, setChargement] = useState(false);
  const [erreur, setErreur] = useState<string | null>(null);

  useEffect(() => {
    const id = window.setTimeout(() => setTermeDiffere(terme), 400);
    return () => window.clearTimeout(id);
  }, [terme]);

  useEffect(() => {
    const propre = termeDiffere.trim();
    if (!propre) {
      setFilms([]);
      setErreur(null);
      setChargement(false);
      return;
    }

    const controleur = new AbortController();
    setChargement(true);
    setErreur(null);

    async function chercher() {
      try {
        const res = await fetch(construireUrlRecherche(propre), {
          signal: controleur.signal,
        });
        if (!res.ok) throw new Error(`Erreur HTTP : ${res.status}`);
        const data: ReponseRecherche = await res.json();

        if (data.Response === "False") {
          if (data.Error === "Movie not found!") {
            setFilms([]);
          } else {
            setErreur(data.Error || "Erreur de recherche");
          }
        } else {
          setFilms(data.Search ?? []);
        }
      } catch (e: unknown) {
        if (e instanceof DOMException && e.name === "AbortError") return;
        setErreur(e instanceof Error ? e.message : "Erreur inconnue");
      } finally {
        setChargement(false);
      }
    }

    chercher();
    return () => controleur.abort();
  }, [termeDiffere]);

  const afficherResultats = () => {
    if (!terme.trim()) {
      return (
        <p className="text-gray-500 italic text-center py-8">
          Tapez un titre pour lancer la recherche.
        </p>
      );
    }
    if (chargement) {
      return (
        <p className="text-blue-600 font-medium text-center py-8">
          Chargement…
        </p>
      );
    }
    if (erreur) {
      return (
        <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded text-center">
          {erreur}
        </div>
      );
    }
    if (films.length === 0) {
      return (
        <p className="text-gray-600 text-center py-8">
          Aucun film ne correspond à « {termeDiffere} ».
        </p>
      );
    }
    return (
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {films.map((film) => (
          <li key={film.imdbID} className="list-none">
            <Link
              to={`/films/${film.imdbID}`}
              className="block hover:opacity-95 transition"
            >
              <CarteFilm film={film} />
            </Link>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <label
          htmlFor="recherche-input"
          className="block text-sm font-semibold text-gray-700 mb-2"
        >
          Recherche de films
        </label>
        <input
          id="recherche-input"
          type="search"
          value={terme}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setTerme(e.target.value)}
          placeholder="Ex: Batman, Matrix..."
          className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="min-h-[200px]">{afficherResultats()}</div>
    </div>
  );
}