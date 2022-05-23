import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { Main } from "./components";
import "./index.css";

const App = () => {
  return (
    <div className="app">
      <Main />
    </div>
  );
};
ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById("app")
);