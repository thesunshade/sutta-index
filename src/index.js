import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { register as registerServiceWorker } from "./serviceWorkerRegistration";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();

registerServiceWorker();
window.addEventListener("load", event => {
  let hash = window.location.hash;
  if (hash) {
    let target = document.querySelector(hash);
    if (target) {
      // Scroll to the element with a slight delay to ensure it's loaded
      setTimeout(() => {
        target.scrollIntoView();
      }, 500); // Adjust the timeout as needed
    }
  }
});
