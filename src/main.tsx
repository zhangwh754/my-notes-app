import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router/dom";
import router from "./route";
import "./style/index.css";
import { StrictMode } from "react";

const root = document.getElementById("root")!;

ReactDOM.createRoot(root).render(
  <StrictMode>
    <div className="p-20 h-screen">
      <div className="h-full rounded-2xl shadow-2xl overflow-hidden">
        <RouterProvider router={router} />
      </div>
    </div>
  </StrictMode>
);
