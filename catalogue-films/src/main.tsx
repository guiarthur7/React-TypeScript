import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./contextes/AuthContext";
import { FavorisProvider } from "./contextes/FavorisContext";
import App from "./App";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <FavorisProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </FavorisProvider>
    </AuthProvider>
  </StrictMode>
);