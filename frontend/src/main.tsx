import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
    <div className="text-center text-blue-500">Hello, Tailwind!</div>
  </StrictMode>,
);
