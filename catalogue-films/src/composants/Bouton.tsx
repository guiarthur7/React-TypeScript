export type VarianteBouton = "primaire" | "secondaire" | "danger";

export interface BoutonProps {
  libelle: string;
}

export function Bouton({libelle}: BoutonProps) {
    return (<button>{libelle}</button>);
}
