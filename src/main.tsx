import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
// import App from "./App.tsx";
import { Providers } from "./context/providers.tsx";
import { Toaster } from "./components/ui/toast.tsx";
import { RouterProvider } from "react-router-dom";
import { router } from "./router.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Providers>
      <RouterProvider router={router} />
      <Toaster />
    </Providers>
  </StrictMode>
);
