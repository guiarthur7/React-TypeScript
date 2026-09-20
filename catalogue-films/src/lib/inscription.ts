export interface Inscription {
  prenom: string;
  email: string;
  motDePasse: string;
  confirmation: string;
  cgv: boolean;
}

export const valeursInitiales: Inscription = {
  prenom: "",
  email: "",
  motDePasse: "",
  confirmation: "",
  cgv: false,
};

export type Erreurs = Partial<Record<keyof Inscription, string>>;

export function valider(donnees: Inscription): Erreurs {
  const erreurs: Erreurs = {};

  if (donnees.prenom.trim().length < 2) {
    erreurs.prenom = "Le prénom doit comporter au moins 2 caractères.";
  }

  const morceauxArobase = donnees.email.trim().split("@");
  if (morceauxArobase.length !== 2) {
    erreurs.email = "L'adresse email doit comporter un unique « @ ».";
  } else {
    const [utilisateur, domaine] = morceauxArobase;
    const morceauxDomaine = domaine.split(".");

    const domaineValide =
      morceauxDomaine.length >= 2 &&
      morceauxDomaine.every((partie) => partie.length > 0);

    if (utilisateur.length === 0 || !domaineValide) {
      erreurs.email = "Format d'email invalide (attendu : xxx@yyy.zz).";
    }
  }

  if (donnees.motDePasse.length < 8) {
    erreurs.motDePasse = "Le mot de passe doit contenir au moins 8 caractères.";
  }

  if (donnees.confirmation !== donnees.motDePasse) {
    erreurs.confirmation = "La confirmation ne correspond pas au mot de passe.";
  }

  if (!donnees.cgv) {
    erreurs.cgv = "Vous devez accepter les conditions générales.";
  }

  return erreurs;
}