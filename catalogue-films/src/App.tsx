import { useState } from "react";
import type { Film } from "./lib/utils";
import { FILMS, trierPar, filtrerParGenre } from "./lib/utils";
import { ListeFilms } from "./composants/ListeFilms";

import type { Inscription } from "./lib/inscription";
import { FormulaireInscription } from "./composants/FormulaireInscription";
import { ListeInscriptions } from "./composants/ListeInscriptions";

import { RechercheFilms } from "./composants/RechercheFilms";

export type InscriptionEnregistree = Omit<
  Inscription,
  "motDePasse" | "confirmation"
> & { id: number };

function App() {
  const filmsTries = trierPar(FILMS, "titre");
  const filmsSF = filtrerParGenre(FILMS, "SF");
  const filmsVide = filtrerParGenre(FILMS, "Horreur");

  const gererSelection = (film: Film) => {
    alert(`Plus d'informations sur : ${film.titre} (${film.annee})`);
  };

  const [inscriptions, setInscriptions] = useState<InscriptionEnregistree[]>([]);

  const gererInscription = (nouvelle: Inscription) => {
    const enregistree: InscriptionEnregistree = {
      id: Date.now(),
      prenom: nouvelle.prenom,
      email: nouvelle.email,
      cgv: nouvelle.cgv,
    };
    setInscriptions((liste) => [enregistree, ...liste]);
  };

  const gererSuppression = (id: number) => {
    setInscriptions((liste) => liste.filter((item) => item.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans p-6 md:p-10">
      <div className="max-w-7xl mx-auto space-y-16">

        <header>
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">
            TP React/TS
          </h1>
          <p className="mt-2 text-lg text-gray-600">
            Design React et Typescript fait par Arthur Guillaume et Ethan Bacquier.
          </p>
        </header>

        <section className="space-y-6">
          <h2 className="text-3xl font-extrabold text-gray-900 pb-3 border-b-2 border-gray-300">
            TP4 — Recherche de films en direct (OMDB)
          </h2>
          <RechercheFilms />
        </section>

        <section className="space-y-6">
          <h2 className="text-3xl font-extrabold text-gray-900 pb-3 border-b-2 border-gray-300">
            TP3 — Formulaire d'inscription validé
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            <div>
              <FormulaireInscription onInscription={gererInscription} />
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-bold text-gray-800">
                Inscriptions validées ({inscriptions.length})
              </h3>
              <ListeInscriptions
                inscriptions={inscriptions}
                onSuppression={gererSuppression}
              />
            </div>
          </div>
        </section>

        <main className="space-y-12">
          <h2 className="text-3xl font-extrabold text-gray-900 pb-3 border-b-2 border-gray-300">
            TP2 — Mini design system (Films)
          </h2>

          <section>
            <h3 className="text-2xl font-bold text-gray-800 mb-6 pb-2 border-b border-gray-200">
              Tous les films (A-Z)
            </h3>
            <ListeFilms
              films={filmsTries}
              onSelection={gererSelection}
            />
          </section>

          <section>
            <h3 className="text-2xl font-bold text-gray-800 mb-6 pb-2 border-b border-gray-200">
              Science-Fiction
            </h3>
            <ListeFilms
              films={filmsSF}
              onSelection={gererSelection}
            />
          </section>

          <section>
            <h3 className="text-2xl font-bold text-gray-800 mb-6 pb-2 border-b border-gray-200">
              Comédies Musicales
            </h3>
            <ListeFilms
              films={filmsVide}
              messageVide="Aucun film de cette catégorie n'a été trouvé dans votre bibliothèque."
            />
          </section>
        </main>

      </div>
    </div>
  );
}

export default App;