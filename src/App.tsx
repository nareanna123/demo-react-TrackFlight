import React from 'react';
import './App.css';
import FlightTrackingComponent from "./FlightTrackingComponent";

const App: React.FC = () => {
  return (
    <div className="App">
    <span className="heading">TRACK FLIGHTS </span>
    <FlightTrackingComponent />  
    </div>
  );
}

export default App;
