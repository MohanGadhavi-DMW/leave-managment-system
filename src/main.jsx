import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@material-tailwind/react";
import { SnackbarProvider } from "notistack";

const root = ReactDOM.createRoot(document.getElementById("root"));

async function enableMocking() {}

enableMocking().then(() => {
  root.render(
    // <React.StrictMode>
    <ThemeProvider>
      <BrowserRouter>
        <SnackbarProvider maxSnack={3} autoHideDuration={3000}>
          <App />
        </SnackbarProvider>
      </BrowserRouter>
    </ThemeProvider>,
    // </React.StrictMode>,
  );
});
