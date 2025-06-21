import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/index.css";
import ManageRoutes from "./routes/ManageRoutes";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ManageRoutes />
  </StrictMode>
);
