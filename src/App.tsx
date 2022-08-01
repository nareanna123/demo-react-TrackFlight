import React from "react";
import { BrowserRouter , Routes, Route } from 'react-router-dom'
import "./App.css";
import Header from "./components/Header/Header";
import Search from "./components/FlightSearch/Search";
import SearchResults from "./components/FlightSearch/SearchResults";

const App: React.FC = () => {
  return (
    <div className="App">
      <span className="h1">TRACK FLIGHTS</span>
      <Header />
      <BrowserRouter>
        <Routes>
          <Route path='search-flight' element={<Search/>}/>
          <Route path='search-flight-results' element={<SearchResults/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
