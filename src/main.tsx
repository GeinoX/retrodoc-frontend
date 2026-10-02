import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import Providers from "./app/Providers";
import { router } from "./app/routes";
import "./i18n"; // starts the English/French text (skip if Providers already imports it)
import "./index.css"; // the theme

createRoot(document.getElementById("root")!).render(
  <Providers>
    <RouterProvider router={router} />
  </Providers>,
);
