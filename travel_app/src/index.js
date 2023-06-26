import React from 'react';
import ReactDOM from 'react-dom/client';
// initiliaze css format
import "reset-css"
// global css
import "./assets/styles/global.scss"
import App from './App';
import { BrowserRouter } from "react-router-dom"
// import Router from "./router"

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* <Router /> */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
