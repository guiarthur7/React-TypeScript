import type { Film } from "../lib/utils";
import { Carte } from "./Carte";
import { Badge, type TonBadge } from "./Badge";
import { Bouton } from "./Bouton";

export interface ListeFilmsProps {
    films: Film[];
    messageVide?: string;
    onSelection?: (film: Film) => void;
}

type ConfigStatut = { libelle: string; ton: TonBadge };

const MAPPING_STATUT: Record<Film["statut"], ConfigStatut> = {
    vu: { libelle: "Déjà vu", ton: "succes" },
    a_voir: { libelle: "À voir", ton: "info" },
    abandonne: { libelle: "Abandonné", ton: "neutre" },
};

export function ListeFilms({
    films,
    messageVide = "Aucun film à afficher.",
    onSelection
}: ListeFilmsProps) {

    if (films.length === 0) {
        return (
            <div className="p-12 text-center bg-gray-100 rounded-xl border-2 border-dashed border-gray-300 text-gray-500 font-medium">
                {messageVide}
            </div>
        );
    }

    return (
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {films.map((film) => {
                const statut = MAPPING_STATUT[film.statut];

                return (
                    <li key={film.id}>
                        <Carte
                            titre={film.titre}
                            sousTitre={`${film.annee} — ${film.note}/10`}
                            actions={
                                onSelection ? (
                                    <Bouton
                                        libelle="Détails"
                                        variante="primaire"
                                        onClick={() => onSelection(film)}
                                    />
                                ) : undefined
                            }
                        >
                            <div className="flex flex-wrap gap-2 mt-2">
                                <Badge texte={statut.libelle} ton={statut.ton} />
                                { }
                                {film.genres.map((genre: string) => (
                                    <Badge key={genre} texte={genre} ton="neutre" />
                                ))}
                            </div>
                        </Carte>
                    </li>
                );
            })}
        </ul>
    );
}