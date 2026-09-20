import type { ReactNode } from "react";

export type VarianteBouton = "primaire" | "secondaire" | "danger";
export type TypeBouton = "button" | "submit";

export interface BoutonProps {
  libelle: string;
  variante?: VarianteBouton;
  desactive?: boolean;
  onClick?: () => void;
  type?: TypeBouton;
}

const stylesVariantes: Record<VarianteBouton, string> = {
  primaire: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500",
  secondaire: "bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-400",
  danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500",
};

export function Bouton({
  libelle,
  variante = "primaire",
  desactive = false,
  onClick,
  type = "button",
}: BoutonProps) {
  return (
    <button
      type={type}
      disabled={desactive}
      onClick={onClick}
      className={`px-4 py-2 rounded font-medium transition focus:outline-none focus:ring-2 focus:ring-offset-2 ${
        stylesVariantes[variante]
      } ${desactive ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
    >
      {libelle}
    </button>
  );
}