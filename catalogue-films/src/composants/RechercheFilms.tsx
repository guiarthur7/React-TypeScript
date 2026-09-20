import { useState, useEffect, type ChangeEvent } from "react";
import type { FilmOmdb, ReponseRecherche } from "../lib/omdb";
import { construireUrlRecherche } from "../lib/omdb";
import { CarteFilm } from "./CarteFilm";

export function RechercheFilms() {
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
    const recherchePropre = termeDiffere.trim();

    if (!recherchePropre) {
      setFilms([]);
      setErreur(null);
      setChargement(false);
      return;
    }

    const controleur = new AbortController();

    async function executerRecherche() {
      setChargement(true);
      setErreur(null);

      try {
        const url = construireUrlRecherche(recherchePropre);
        const reponse = await fetch(url, { signal: controleur.signal });

        if (!reponse.ok) {
          throw new Error(`Erreur HTTP : ${reponse.status}`);
        }

        const donnees: ReponseRecherche = await reponse.json();

        // Gestion du format métier d'OMDB (Response: "False")
        if (donnees.Response === "False") {
          if (donnees.Error === "Movie not found!") {
            setFilms([]);
          } else {
            setErreur(donnees.Error || "Erreur lors de la recherche");
          }
        } else {
          setFilms(donnees.Search ?? []);
        }
      } catch (e: unknown) {
        if (e instanceof DOMException && e.name === "AbortError") {
          return;
        }
        setErreur(e instanceof Error ? e.message : "Une erreur inconnue est survenue");
      } finally {
        setChargement(false);
      }
    }

    executerRecherche();

    return () => {
      controleur.abort();
    };
  }, [termeDiffere]);

  const gererChangement = (e: ChangeEvent<HTMLInputElement>) => {
    setTerme(e.target.value);
  };

  const afficherContenu = () => {
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
          Chargement en cours…
        </p>
      );
    }

    if (erreur) {
      return (
        <div className="p-4 bg-red-50 border border-red-200 rounded text-red-700 text-center">
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
            <CarteFilm film={film} />
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <label htmlFor="recherche" className="block text-sm font-semibold text-gray-700 mb-2">
          Rechercher un film (via OMDB)
        </label>
        <input
          id="recherche"
          type="search"
          value={terme}
          onChange={gererChangement}
          placeholder="Ex: Batman, Inception, Matrix..."
          className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="min-h-[250px]">{afficherContenu()}</div>
    </div>
  );
}