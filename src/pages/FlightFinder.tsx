import { Autocomplete, TextField } from "@mui/material";

const FlightFinder = (): JSX.Element | null => {
  const top100Flights = [
    { label: "John F Kennedy Intl (New York)", code: "JFK" },
    { label: "Indira Gandhi Int'l (New Delhi)", code: "DEL" },
    { label: "Newark Liberty Intl (Newark)", code: "EWR" },
    { label: "LaGuardia (New York)", code: "LGA" },
  ];

  return (
    <div>
      <h1>Flight Finder</h1>
      <p>Search for flights by origin and destination airport</p>
      <div style={{ display: "flex" }}>
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={top100Flights}
          sx={{ width: 300, marginRight: "20px" }}
          renderInput={(params) => <TextField {...params} label="Origin" />}
        />
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={top100Flights}
          sx={{ width: 300 }}
          renderInput={(params) => (
            <TextField {...params} label="Destination" />
          )}
        />
      </div>
    </div>
  );
};

export default FlightFinder;
