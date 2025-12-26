import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./style/index.css";
import RouteApp from "./route";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <div className="p-20 h-screen">
      <div className="h-full rounded-2xl shadow-2xl overflow-hidden">
        <RouteApp />
      </div>
    </div>
  </StrictMode>
);
