import { useState } from "react";
import ButtonComponent from "./ButtonComponent";

export default function FlightTrackingComponent() {
  // State for the input text.  The <input> is a "controlled component".
  const [text, setText] = useState("");
  // State for whether the "..." has been clicked.
  const [isOpen, setIsOpen] = useState(false);
  // Check if our text is valid.
  const isValid = text.length >= 5;
  return (
    <div>
      <div>
        <ButtonComponent
          buttonTitle="Delays and cancellations"
          // Toggle the `isOpen` state when clicked.
          onClick={() => setIsOpen(!isOpen)}
          color="#ceffce"
          open={true} // This one is always open.
        />
      </div>
      <div>
        <ButtonComponent
          buttonTitle="Search Flights"
          // Toggle the `isOpen` state when clicked.
          onClick={() => setIsOpen(!isOpen)}
          color="#ceffce"
          open={true} // This one is always open.
        />
      </div>
      <div>
        <ButtonComponent
          buttonTitle="Other"
          // Toggle the `isOpen` state when clicked.
          onClick={() => setIsOpen(!isOpen)}
          color="#ceffce"
          open={true} // This one is always open.
        />
      </div>
      <div>
        <ButtonComponent
          open={isOpen}
          buttonTitle="Cancel"
          // Clear the input when clicked.
          onClick={() => setText("")}
          // You can use an HTML color name or a hex code.
          color="pink"
        />
        <ButtonComponent
          open={isOpen}
          // Disable unless the text is valid.
          isValid={isValid}
          buttonTitle="Save"
          // Need to do something -- here we open an alert.
          onClick={() => alert("Saved text " + text)}
          color="#cca4d3"
        />
      </div>
    </div>
  );
}
