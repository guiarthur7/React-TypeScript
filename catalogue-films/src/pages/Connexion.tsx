import { useState, type FormEvent, type ChangeEvent } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../contextes/AuthContext";
import { Bouton } from "../composants/Bouton";

interface EtatNavigation {
  de?: { pathname: string };
}

export function Connexion() {
  const [pseudoSaisi, setPseudoSaisi] = useState("");
  const [erreur, setErreur] = useState("");
  const { connecter } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const destination = (location.state as EtatNavigation)?.de?.pathname || "/";

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (pseudoSaisi.trim().length === 0) {
      setErreur("Veuillez saisir un pseudo.");
      return;
    }
    connecter(pseudoSaisi.trim());
    navigate(destination, { replace: true });
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <h1 className="text-2xl font-bold text-gray-900 mb-4">Connexion</h1>
      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        <div>
          <label htmlFor="pseudo" className="block text-sm font-medium text-gray-700 mb-1">
            Votre pseudo
          </label>
          <input
            id="pseudo"
            type="text"
            value={pseudoSaisi}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setPseudoSaisi(e.target.value);
              setErreur("");
            }}
            placeholder="Ex: Alice"
            className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          {erreur && <p className="text-xs text-red-600 mt-1">{erreur}</p>}
        </div>

        <Bouton type="submit" libelle="Se connecter" />
      </form>
    </div>
  );
}