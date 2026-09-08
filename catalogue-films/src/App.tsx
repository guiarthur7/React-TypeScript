import type { Film } from "./lib/utils";
import { FILMS, trierPar, filtrerParGenre } from "./lib/utils";
import { ListeFilms } from "./composants/ListeFilms";

function App() {
  const filmsTries = trierPar(FILMS, "titre");
  const filmsSF = filtrerParGenre(FILMS, "SF");
  const filmsVide = filtrerParGenre(FILMS, "Horreur");

  const gererSelection = (film: Film) => {
    alert(`Plus d'informations sur : ${film.titre} (${film.annee})`);
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans p-6 md:p-10">
      <div className="max-w-7xl mx-auto space-y-12">

        <header>
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">
            Vidéothèque TP2
          </h1>
          <p className="mt-2 text-lg text-gray-600">
            Design system typé avec React et Tailwind CSS.
          </p>
        </header>

        <main className="space-y-12">
          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-6 pb-2 border-b border-gray-200">
              Tous les films (A-Z)
            </h2>
            <ListeFilms
              films={filmsTries}
              onSelection={gererSelection}
            />
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-6 pb-2 border-b border-gray-200">
              Science-Fiction
            </h2>
            <ListeFilms
              films={filmsSF}
              onSelection={gererSelection}
            />
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-6 pb-2 border-b border-gray-200">
              Comédies Musicales
            </h2>
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