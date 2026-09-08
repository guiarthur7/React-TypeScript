import type { ReactNode } from "react";

export interface CarteProps {
    titre: string;
    sousTitre?: string;
    children: ReactNode;
    actions?: ReactNode;
}

export function Carte({ titre, sousTitre, children, actions }: CarteProps) {
    return (
        <div className="flex flex-col bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden h-full">
            <div className="p-5 flex-grow flex flex-col gap-4">
                <header>
                    <h3 className="font-bold text-lg text-gray-900">{titre}</h3>
                    {sousTitre && <p className="text-sm text-gray-500 mt-1">{sousTitre}</p>}
                </header>

                <div className="flex-grow">
                    {children}
                </div>
            </div>

            {actions && (
                <footer className="p-4 bg-gray-50 border-t border-gray-200 mt-auto">
                    {actions}
                </footer>
            )}
        </div>
    );
}