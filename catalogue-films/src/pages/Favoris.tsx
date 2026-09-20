import { Link } from "react-router-dom";
import { useFavoris } from "../contextes/FavorisContext";
import { CarteFilm } from "../composants/CarteFilm";
import { Bouton } from "../composants/Bouton";

export function Favoris() {
  const { favoris, dispatch } = useFavoris();

  if (favoris.length === 0) {
    return (
      <div className="p-8 text-center bg-gray-50 border border-dashed border-gray-300 rounded-lg text-gray-500">
        Vous n'avez aucun film enregistré dans vos favoris.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Mes Favoris ({favoris.length})</h1>
        <Bouton
          libelle="Tout vider"
          variante="danger"
          onClick={() => dispatch({ type: "vider" })}
        />
      </div>

      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {favoris.map((film) => (
          <li key={film.imdbID} className="list-none space-y-2">
            <Link to={`/films/${film.imdbID}`}>
              <CarteFilm film={film} />
            </Link>
            <Bouton
              libelle="Retirer"
              variante="danger"
              onClick={() => dispatch({ type: "retirer", id: film.imdbID })}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}