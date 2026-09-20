import { Link } from "react-router-dom";

export function PageIntrouvable() {
  return (
    <div className="text-center py-12 space-y-4">
      <h1 className="text-4xl font-extrabold text-gray-900">404</h1>
      <p className="text-gray-600">Cette page n'existe pas.</p>
      <Link to="/" className="text-blue-600 underline font-medium">
        Retour à l'accueil
      </Link>
    </div>
  );
}