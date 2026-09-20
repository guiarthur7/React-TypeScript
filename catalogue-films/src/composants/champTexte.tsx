import type { ChangeEvent } from "react";

export interface ChampTexteProps {
  nom: string;
  label: string;
  valeur: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  type?: "text" | "email" | "password";
  erreur?: string;
  placeholder?: string;
}

export function ChampTexte({
  nom,
  label,
  valeur,
  onChange,
  type = "text",
  erreur,
  placeholder,
}: ChampTexteProps) {
  const erreurId = `${nom}-erreur`;

  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={nom} className="text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        id={nom}
        name={nom}
        type={type}
        value={valeur}
        onChange={onChange}
        placeholder={placeholder}
        aria-invalid={!!erreur}
        aria-describedby={erreur ? erreurId : undefined}
        className={`px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 transition ${
          erreur
            ? "border-red-500 focus:ring-red-400"
            : "border-gray-300 focus:ring-blue-400"
        }`}
      />
      {erreur && (
        <p id={erreurId} className="text-xs text-red-600 mt-0.5">
          {erreur}
        </p>
      )}
    </div>
  );
}