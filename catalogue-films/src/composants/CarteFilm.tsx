import type { FilmOmdb } from "../lib/omdb";
import { Carte } from "./Carte";
import { Badge, type TonBadge } from "./Badge";

export interface CarteFilmProps {
  film: FilmOmdb;
}

const libellesType: Record<string, { label: string; ton: TonBadge }> = {
  movie: { label: "Film", ton: "info" },
  series: { label: "Série", ton: "succes" },
  game: { label: "Jeu vidéo", ton: "attention" },
};

export function CarteFilm({ film }: CarteFilmProps) {
  const infoType = libellesType[film.Type] ?? {
    label: film.Type,
    ton: "neutre" as TonBadge,
  };

  return (
    <Carte titre={film.Title} sousTitre={film.Year}>
      <div className="space-y-3">
        {film.Poster === "N/A" ? (
          <div className="h-64 bg-gray-200 flex items-center justify-center rounded text-gray-500 text-sm">
            Pas d'affiche disponible
          </div>
        ) : (
          <img
            src={film.Poster}
            alt={`Affiche de ${film.Title}`}
            className="w-full h-64 object-cover rounded shadow-inner"
          />
        )}

        <div>
          <Badge texte={infoType.label} ton={infoType.ton} />
        </div>
      </div>
    </Carte>
  );
}