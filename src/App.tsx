import React from "react";
import "./App.css";
import Menu from "./components/Menu";
import Router from "./routes";

const App: React.FC = () => {
  return (
    <div className="App">
      <Menu></Menu>
      <div className="page">
        <Router />
      </div>
    </div>
  );
};

export default App;
