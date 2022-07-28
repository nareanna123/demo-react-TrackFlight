import React from "react";
import "./App.css";
import Home from "./pages/Home";

const App: React.FC = () => {
  return (
    <div className="App">
      <span className="h1">TRACK FLIGHTS</span>
      <Home />
    </div>
  );
};

export default App;
