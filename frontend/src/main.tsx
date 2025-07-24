// frontend/src/main.tsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { MainProvider } from "./contexts/MainContext.tsx"; // Already correct

createRoot(document.getElementById("root")!).render(
  <MainProvider>
    <App />
  </MainProvider>
);