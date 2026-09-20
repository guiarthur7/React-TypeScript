import { NavLink, Outlet } from "react-router-dom";
import { useAuth } from "../contextes/AuthContext";
import { useFavoris } from "../contextes/FavorisContext";
import { Bouton } from "./Bouton";

export function Layout() {
  const { pseudo, deconnecter } = useAuth();
  const { favoris } = useFavoris();

  const styleLien = ({ isActive }: { isActive: boolean }) =>
    isActive
      ? "font-bold text-blue-600"
      : "text-slate-600 hover:text-blue-500 transition";

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-900 font-sans">
      <header className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <nav className="flex items-center gap-6">
            <NavLink to="/" className={styleLien} end>
              Accueil
            </NavLink>
            <NavLink to="recherche" className={styleLien}>
              Recherche
            </NavLink>
            <NavLink to="favoris" className={styleLien}>
              Favoris ({favoris.length})
            </NavLink>
          </nav>

          <div className="flex items-center gap-4">
            {pseudo ? (
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-700">
                  Connecté en tant que <strong>{pseudo}</strong>
                </span>
                <Bouton
                  libelle="Déconnexion"
                  variante="secondaire"
                  onClick={deconnecter}
                />
              </div>
            ) : (
              <NavLink to="connexion" className={styleLien}>
                Connexion
              </NavLink>
            )}
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-7xl w-full mx-auto p-6 md:p-10">
        <Outlet />
      </main>

      <footer className="border-t border-gray-200 bg-white py-6 text-center text-sm text-gray-500">
        CineList
      </footer>
    </div>
  );
}