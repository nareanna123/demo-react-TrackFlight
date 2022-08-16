import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Cancellations from "./pages/Cancellations";
import AirportDelays from "./pages/AirportDelays";
import MiseryMap from "./pages/MiseryMap";
import FlightFinder from "./pages/FlightFinder";
import BrowseByOperator from "./pages/BrowseByOperator";
import BrowseByAirport from "./pages/BrowseByAirport";
import BrowseByAircraftType from "./pages/BrowseByAircraftType";
import RandomAirport from "./pages/RandomAirport";
import RandomFlight from "./pages/RandomFlight";
import IFRRouteAnalyzer from "./pages/IFRRouteAnalyzer";
import Flight from "./pages/Flight";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/cancellations" element={<Cancellations />} />
      <Route path="/airport-delays" element={<AirportDelays />} />
      <Route path="/misery-map" element={<MiseryMap />} />
      <Route path="/flight-finder" element={<FlightFinder />} />
      <Route path="post/:id" element={<Flight />} />
      <Route path="/browse-by-operator" element={<BrowseByOperator />} />
      <Route path="/browse-by-airport" element={<BrowseByAirport />} />
      <Route
        path="/browse-by-aircraft-type"
        element={<BrowseByAircraftType />}
      />
      <Route path="/random-airport" element={<RandomAirport />} />
      <Route path="/random-flight" element={<RandomFlight />} />
      <Route path="/ifr-route-analyzer" element={<IFRRouteAnalyzer />} />
    </Routes>
  );
};

export default Router;
