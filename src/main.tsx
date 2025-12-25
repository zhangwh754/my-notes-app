import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./style/index.css";
import RouteApp from "./route";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouteApp />
  </StrictMode>
);
