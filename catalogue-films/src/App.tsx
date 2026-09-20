import type { ReactNode } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./contextes/AuthContext";
import { Layout } from "./composants/Layout";
import { Accueil } from "./pages/Accueil";
import { Recherche } from "./pages/Recherche";
import { DetailFilm } from "./pages/DetailFilm";
import { Favoris } from "./pages/Favoris";
import { Connexion } from "./pages/Connexion";
import { PageIntrouvable } from "./pages/PageIntrouvable";

function RouteProtegee({ children }: { children: ReactNode }) {
  const { pseudo } = useAuth();
  const emplacement = useLocation();

  if (!pseudo) {
    return <Navigate to="/connexion" state={{ de: emplacement }} replace />;
  }
  return <>{children}</>;
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Accueil />} />
        <Route path="recherche" element={<Recherche />} />
        <Route path="films/:id" element={<DetailFilm />} />
        <Route
          path="favoris"
          element={
            <RouteProtegee>
              <Favoris />
            </RouteProtegee>
          }
        />
        <Route path="connexion" element={<Connexion />} />
        <Route path="*" element={<PageIntrouvable />} />
      </Route>
    </Routes>
  );
}