import type { InscriptionEnregistree } from "../App";
import { Carte } from "./Carte";
import { Badge } from "./Badge";
import { Bouton } from "./Bouton";

export interface ListeInscriptionsProps {
  inscriptions: InscriptionEnregistree[];
  onSuppression?: (id: number) => void;
}

export function ListeInscriptions({
  inscriptions,
  onSuppression,
}: ListeInscriptionsProps) {
  if (inscriptions.length === 0) {
    return (
      <div className="p-8 text-center bg-gray-50 border border-dashed border-gray-300 rounded-lg text-gray-500">
        Aucune inscription enregistrée pour le moment.
      </div>
    );
  }

  return (
    <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {inscriptions.map((inscription) => (
        <li key={inscription.id} className="list-none">
          <Carte
            titre={inscription.prenom}
            sousTitre={inscription.email}
            actions={
              onSuppression && (
                <Bouton
                  libelle="Supprimer"
                  variante="danger"
                  onClick={() => onSuppression(inscription.id)}
                />
              )
            }
          >
            <div>
              <Badge texte="CGV acceptées" ton="succes" />
            </div>
          </Carte>
        </li>
      ))}
    </ul>
  );
}