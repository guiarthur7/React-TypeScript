import { useParams, Link } from "react-router-dom";
import { useFetch } from "../hook/Fetch.ts";
import type { FilmDetailOmdb } from "../lib/omdb";
import { urlDetail } from "../lib/omdb";
import { useFavoris } from "../contextes/FavorisContext";
import { Bouton } from "../composants/Bouton";
import { Badge } from "../composants/Badge";

export function DetailFilm() {
  const { id } = useParams<{ id: string }>();
  const { donnees, chargement, erreur } = useFetch<FilmDetailOmdb>(
    id ? urlDetail(id) : null
  );

  const { favoris, dispatch } = useFavoris();

  if (chargement) {
    return <p className="text-blue-600 py-8 text-center font-medium">Chargement…</p>;
  }

  if (erreur) {
    return (
      <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded text-center">
        {erreur}
      </div>
    );
  }

  if (!donnees || donnees.Response === "False") {
    return (
      <div className="space-y-4 text-center py-8">
        <p className="text-gray-600">Film introuvable.</p>
        <Link to="/recherche" className="text-blue-600 underline">
          Retour à la recherche
        </Link>
      </div>
    );
  }

  const estFavori = favoris.some((f) => f.imdbID === donnees.imdbID);

  const gererActionFavori = () => {
    if (estFavori) {
      dispatch({ type: "retirer", id: donnees.imdbID });
    } else {
      dispatch({
        type: "ajouter",
        film: {
          imdbID: donnees.imdbID,
          Title: donnees.Title,
          Year: donnees.Year,
          Type: donnees.Type,
          Poster: donnees.Poster,
        },
      });
    }
  };

  return (
    <div className="space-y-6">
      <Link to="/recherche" className="text-blue-600 hover:underline text-sm font-medium">
        ← Revenir à la recherche
      </Link>

      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
        <div>
          {donnees.Poster === "N/A" ? (
            <div className="h-80 bg-gray-200 flex items-center justify-center rounded text-gray-500">
              Pas d'affiche
            </div>
          ) : (
            <img
              src={donnees.Poster}
              alt={donnees.Title}
              className="w-full rounded shadow"
            />
          )}
        </div>

        <div className="md:col-span-2 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <h1 className="text-3xl font-extrabold text-gray-900">{donnees.Title}</h1>
            <Bouton
              libelle={estFavori ? "Retirer des favoris" : "Ajouter aux favoris"}
              variante={estFavori ? "danger" : "primaire"}
              onClick={gererActionFavori}
            />
          </div>

          <div className="flex flex-wrap gap-2 items-center text-sm text-gray-600">
            <span>{donnees.Year}</span>
            <span>•</span>
            <span>{donnees.Runtime}</span>
            <span>•</span>
            <Badge texte={donnees.Genre} ton="info" />
          </div>

          <div>
            <h2 className="text-lg font-bold text-gray-800">Synopsis</h2>
            <p className="text-gray-700 mt-1 leading-relaxed">{donnees.Plot}</p>
          </div>

          <div className="text-sm space-y-1 text-gray-600">
            <p>
              <strong className="text-gray-800">Réalisateur :</strong> {donnees.Director}
            </p>
            <p>
              <strong className="text-gray-800">Acteurs :</strong> {donnees.Actors}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}