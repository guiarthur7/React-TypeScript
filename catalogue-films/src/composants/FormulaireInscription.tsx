import { useState, type ChangeEvent, type FormEvent } from "react";
import { type Inscription, type Erreurs, valeursInitiales, valider } from "../lib/inscription";
import { ChampTexte } from "./champTexte";
import { Bouton } from "./Bouton";

export interface FormulaireInscriptionProps {
  onInscription: (donnees: Inscription) => void;
}

export function FormulaireInscription({ onInscription }: FormulaireInscriptionProps) {
  const [donnees, setDonnees] = useState<Inscription>(valeursInitiales);
  const [erreurs, setErreurs] = useState<Erreurs>({});
  const [envoiEnCours, setEnvoiEnCours] = useState(false);

  const gererSaisie = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    const valeur = type === "checkbox" ? checked : value;
    setDonnees((d) => ({ ...d, [name]: valeur }));
  };

  const gererEnvoi = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const erreursTrouvees = valider(donnees);
    setErreurs(erreursTrouvees);

    if (Object.keys(erreursTrouvees).length > 0) return;

    setEnvoiEnCours(true);
    window.setTimeout(() => {
      onInscription(donnees);
      setDonnees(valeursInitiales);
      setErreurs({});
      setEnvoiEnCours(false);
    }, 500);
  };

  return (
    <form
      onSubmit={gererEnvoi}
      noValidate
      className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 flex flex-col gap-4"
    >
      <h2 className="text-xl font-bold text-gray-800 mb-2">Inscription</h2>

      <ChampTexte
        nom="prenom"
        label="Prénom"
        valeur={donnees.prenom}
        onChange={gererSaisie}
        erreur={erreurs.prenom}
        placeholder="Ex: Camille"
      />

      <ChampTexte
        nom="email"
        label="Email"
        type="email"
        valeur={donnees.email}
        onChange={gererSaisie}
        erreur={erreurs.email}
        placeholder="nom@exemple.com"
      />

      <ChampTexte
        nom="motDePasse"
        label="Mot de passe"
        type="password"
        valeur={donnees.motDePasse}
        onChange={gererSaisie}
        erreur={erreurs.motDePasse}
      />

      <ChampTexte
        nom="confirmation"
        label="Confirmation du mot de passe"
        type="password"
        valeur={donnees.confirmation}
        onChange={gererSaisie}
        erreur={erreurs.confirmation}
      />

      {}
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <input
            id="cgv"
            name="cgv"
            type="checkbox"
            checked={donnees.cgv}
            onChange={gererSaisie}
            aria-invalid={!!erreurs.cgv}
            aria-describedby={erreurs.cgv ? "cgv-erreur" : undefined}
            className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <label htmlFor="cgv" className="text-sm text-gray-700">
            J'accepte les conditions générales
          </label>
        </div>
        {erreurs.cgv && (
          <p id="cgv-erreur" className="text-xs text-red-600">
            {erreurs.cgv}
          </p>
        )}
      </div>

      <div className="mt-2">
        <Bouton
          type="submit"
          libelle={envoiEnCour ? "Envoi en cours…" : "S'inscrire"}
          desactive={envoiEnCour}
        />
      </div>
    </form>
  );
}