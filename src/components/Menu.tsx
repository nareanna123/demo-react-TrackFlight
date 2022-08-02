import { useState } from "react";
import ButtonComponent from "./ButtonComponent";
import SubMenu from "./SubMenu";
import "../styles.css";

export default function Menu(): JSX.Element | null {
  // State for the input text.  The <input> is a "controlled component".
  // State for whether the "..." has been clicked.
  type listType = {
    name: string;
    path: string;
  };
  const [isOpen, setIsOpen] = useState(false);
  const [menu, setMenu] = useState("");
  const [list, setList] = useState<listType[]>([]);

  const buttonHandler = (el: string) => {
    switch (el) {
      case "DC":
        setList([
          { name: "Cancellations", path: "/cancellations" },
          { name: "Airport Delays", path: "/airport-delays" },
          { name: "MiseryMap", path: "/misery-map" },
        ]);
        break;
      case "SF":
        setList([
          { name: "Flight Finder", path: "/flight-finder" },
          { name: "Browse by Operator", path: "/browse-by-operator" },
          { name: "Browse by Airport", path: "/browse-by-airport" },
          { name: "Browse by Aircraft Type", path: "/browse-by-aircraft-type" },
        ]);
        break;
      case "O":
        setList([
          { name: "Random Airport", path: "/random-airport" },
          { name: "Random Flight", path: "/random-flight" },
          { name: "IFR Route Analyzer", path: "/ifr-route-analyzer" },
        ]);
        break;
      default:
        break;
    }
    setMenu(el);
    if (el === menu && isOpen) {
      console.log("same");
      setIsOpen(false);
    } else {
      setIsOpen(true);
    }
  };

  return (
    <div
      // className="button"
      style={{
        padding: "20px",
        background: "linear-gradient(#002F5D, #002F5D 60%, #021624)",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        marginBottom: "50px",
      }}
    >
      <span className="h1">TRACK FLIGHTS</span>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <ButtonComponent
          buttonTitle="Delays and Cancellations"
          // Toggle the `isOpen` state when clicked.
          onClick={() => buttonHandler("DC")}
          color="#ceffce"
          right="2em"
          name="DC"
        />
        <ButtonComponent
          buttonTitle="Search Flights"
          onClick={() => buttonHandler("SF")}
          color="#ceffce"
          right="2em"
          name="SF"
        />
        <ButtonComponent
          buttonTitle="Other"
          onClick={() => buttonHandler("O")}
          color="#ceffce"
          right="2em"
          name="Other"
        />
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        {isOpen && <SubMenu list={list}></SubMenu>}
      </div>
    </div>
  );
}
