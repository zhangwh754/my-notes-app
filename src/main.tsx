import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router/dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import router from "./route";
import "./style/index.css";
import "animate.css";

const root = document.getElementById("root")!;

// Create a client
const queryClient = new QueryClient();

ReactDOM.createRoot(root).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <div className="p-20 h-screen">
        <div className="h-full rounded-2xl shadow-2xl overflow-hidden">
          <RouterProvider router={router} />
        </div>
      </div>
    </QueryClientProvider>
  </StrictMode>
);
