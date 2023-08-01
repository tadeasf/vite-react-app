/** @format */

import { ColorModeScript } from "@chakra-ui/react";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { App } from "./App";
import reportWebVitals from "./reportWebVitals";
import * as serviceWorker from "./serviceWorker";

const root = document.getElementById("root");
if (!root) throw new Error("Failed to find the root element");

if (root.hasChildNodes()) {
  ReactDOM.hydrate(
    <React.StrictMode>
      <ColorModeScript />
      <App />
    </React.StrictMode>,
    root
  );
} else {
  ReactDOM.render(
    <React.StrictMode>
      <ColorModeScript />
      <App />
    </React.StrictMode>,
    root
  );
}

serviceWorker.unregister();
reportWebVitals();
