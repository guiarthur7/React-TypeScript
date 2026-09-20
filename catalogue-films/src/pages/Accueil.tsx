import { Link } from "react-router-dom";

export function Accueil() {
  return (
    <div className="space-y-6 max-w-2xl">
      <h1 className="text-3xl font-extrabold text-gray-900">
        Bienvenue
      </h1>
      <p className="text-gray-600 leading-relaxed">
        Explorez une base de données de milliers de films et sauvegardez vos coups de cœur dans votre liste de favoris.
      </p>
      <div>
        <Link
          to="/recherche"
          className="inline-block bg-blue-600 text-white font-medium px-5 py-2.5 rounded-lg hover:bg-blue-700 transition"
        >
          Lancer une recherche
        </Link>
      </div>
    </div>
  );
}