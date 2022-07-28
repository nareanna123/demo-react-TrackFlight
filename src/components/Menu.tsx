import { useState } from "react";
import ButtonComponent from "./ButtonComponent";
import SubMenu from "./SubMenu";
import "../styles.css";

export default function Menu(): JSX.Element | null {
  // State for the input text.  The <input> is a "controlled component".
  // State for whether the "..." has been clicked.
  type listType = {
    name: string;
  };
  const [isOpen, setIsOpen] = useState(false);
  const [menu, setMenu] = useState("");
  const [list, setList] = useState<listType[]>([]);

  const buttonHandler = (el: string) => {
    switch (el) {
      case "DC":
        setList([
          { name: "Cancellations" },
          { name: "Airport Delays" },
          { name: "MiseryMap" },
        ]);
        break;
      case "SF":
        setList([
          { name: "FlightFinder" },
          { name: "Browse by Operator" },
          { name: "Browse by Airport" },
          { name: "Browse by Aircraft Type" },
        ]);
        break;
      case "O":
        setList([
          { name: "Random Airport" },
          { name: "Random Flight" },
          { name: "IFR Route Analyzer" },
        ]);
        break;
      default:
        break;
    }
    setMenu(el);
    if (el === menu) {
      console.log("same");
      setIsOpen(false);
    } else {
      setIsOpen(true);
    }
  };

  return (
    <div className="button">
      <ButtonComponent
        buttonTitle="Delays and cancellations"
        // Toggle the `isOpen` state when clicked.
        onClick={() => buttonHandler("DC")}
        color="#ceffce"
        right="2em"
        name="DC"
        element={<h1></h1>}
      />
      <ButtonComponent
        buttonTitle="Search Flights"
        // Toggle the `isOpen` state when clicked.
        onClick={() => buttonHandler("SF")}
        color="#ceffce"
        right="2em"
        name="SF"
        element={<h1></h1>}
        //open={true} // This one is always open.
      />
      <ButtonComponent
        buttonTitle="Other"
        // Toggle the `isOpen` state when clicked.
        onClick={() => buttonHandler("O")}
        color="#ceffce"
        right="2em"
        name="Other"
        element={<h1></h1>}
        //open={true} // This one is always open.
      />
      {isOpen && <SubMenu list={list}></SubMenu>}
    </div>
  );
}
