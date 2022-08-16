import { Autocomplete, TextField } from "@mui/material";
import React, { Component, useEffect, useState } from "react";
import axios from "axios";
import FlightDetails from "./FlightDetails";
import IconButton from "@mui/material/IconButton";
import SearchIcon from '@mui/icons-material/Search';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const FlightFinder = (): JSX.Element | null => {
  const top100Flights = [
    { label: "John F Kennedy Intl (New York)", code: "JFK" },
    { label: "Indira Gandhi Int'l (New Delhi)", code: "DEL" },
    { label: "Newark Liberty Intl (Newark)", code: "EWR" },
    { label: "LaGuardia (New York)", code: "LGA" },
  ];

  const [departureFlights, setDepartureFlights] = useState([]);
  const [flights, setFlights] = useState<any>([]);
  const [searchFlights, setSearchFlights] = useState<any>([]);

  const [origin, setOrigin] = useState<string[]>([]);
  const [destination, setDestination] = useState<string[]>([]);
  let originTempArray: string[] = [];
  let destinationTempArray: string[] = [];

  const [selectedOrigin, setSelectedOrigin] = useState<string | null>();
  const [selectedDestination, setSelectedDestination] = useState<
    string | null
  >();
  const toastId = 'toastId';

  type Order = "asc" | "desc";

  interface Data {
    airline: string;
    aircraft: string;
    status: string;
    departure: string;
    arrival: string;
  }

  const [order, setOrder] = useState<Order>("asc");
  const [orderBy, setOrderBy] = useState<keyof Data | string>("");

  useEffect(() => {
    getFlights();
  }, []);
  console.log("Check Flights API Call start......");

  const getFlights = () => {
    // const flightsApiurl = 'http://api.aviationstack.com/v1/flights?access_key=77e3db56beae869517171f8a55ab9141';
    const flightsApiurl =
      "http://api.aviationstack.com/v1/flights?access_key=70d2f03dd8f234f9bbca672b268cf6dc";
    // var params = new URLSearchParams();
    //params.append("access_key", '7701d00a6d906ff847152d3c46b15e78');

    // var request = { params: params };
    axios
      .get(flightsApiurl)

      .then((resp) => {
        console.log(
          "getAllFlights response list -> " + JSON.stringify(resp.data)
        );
        setFlights(resp.data.data);
        for (var i = 0; i < resp.data.data.length; i++) {
          //originTempArray.push(resp.data.data[i].departure.airport + "-" + resp.data.data[i].departure.iata + "-" + resp.data.data[i].departure.icao);
          //destinationTempArray.push(resp.data.data[i].arrival.airport + "-" + resp.data.data[i].arrival.iata + "-" + resp.data.data[i].arrival.icao);
          originTempArray.push(resp.data.data[i].departure.airport);
          destinationTempArray.push(resp.data.data[i].arrival.airport);
        }
        originTempArray = originTempArray.filter(
          (data, index) => originTempArray.indexOf(data) === index
        );
        setOrigin(originTempArray);

        destinationTempArray = destinationTempArray.filter(
          (data, index) => destinationTempArray.indexOf(data) === index
        );
        setDestination(destinationTempArray);

        var response = resp.data.data.map((flight: any) => {
          return {
            airline: flight.airline.name,
            aircraft: flight.flight.number,
            status: flight.flight_status,
            departure: flight.departure.airport,
            arrival: flight.arrival.airport,
          };
        });
        setFlights(response);
      })
      .catch((err) => {
        console.error("Error " + err);
      });
  };

  useEffect(() => {
    getFlights();
  }, [])
  console.log(
    "CHeck Flights API Call start......"
  )

  const getFlightsbySearchTerm = () => {
    console.log("inside flights search 2");
    console.log(selectedOrigin);
    console.log(selectedDestination);
    toast("No Flights Found", { toastId: toastId })
    let filterlist = flights.filter((flight: any) => {
      //return flight.departure.airport.toLowerCase().includes(searchFlights.toLowerCase())
      return (
        flight.departure === selectedOrigin &&
        flight.arrival === selectedDestination
      );
    });
    setSearchFlights(filterlist);
  };

  const handleSort = (property: keyof Data) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
    setFlights((prev: any[]) => {
      return prev.sort((a, b) => {
        const nameA = a[property]?.toUpperCase(); // ignore upper and lowercase
        const nameB = b[property]?.toUpperCase(); // ignore upper and lowercase
        if (!isAsc) {
          if (nameA < nameB) {
            return -1;
          }
          if (nameA > nameB) {
            return 1;
          }
          return 0;
        } else {
          if (nameA < nameB) {
            return 1;
          }
          if (nameA > nameB) {
            return -1;
          }
          return 0;
        }
      });
    });
  };

  return (
    <div>
      <h1>Flight Finder</h1>
      <p>Search for flights by origin and destination airport</p>
      <div style={{ display: "flex" }}>
        <Autocomplete
          disablePortal
          id="combo-box-demo1"
          onChange={(event, value) => setSelectedOrigin(value)}
          options={origin}
          getOptionLabel={(origin) => origin}
          //  defaultValue={top100Flights.find(top100Flights => top100Flights.label[1])}
          sx={{ width: 300, marginRight: "20px" }}
          renderInput={(params) => (
            <TextField {...params} value={origin} label="Origin" />
          )}
        />
        <Autocomplete
          disablePortal
          id="combo-box-demo2"
          onChange={(event, value) => setSelectedDestination(value)}
          options={destination}
          getOptionLabel={(destination) => destination}
          // defaultValue={top100Flights.find(top100Flights => top100Flights.label[0])}
          sx={{ width: 300 }}
          renderInput={(params) => (
            <TextField {...params} label="Destination" value={destination} />
          )}
        />

        <IconButton
          type="submit"
          aria-label="search"
          onClick={() => getFlightsbySearchTerm()}
        >
          <SearchIcon style={{ fill: "blue" }} />
        </IconButton>
      </div>
      <div>
        {searchFlights.length > 0 && (
          <FlightDetails flights={searchFlights}></FlightDetails>
        )}
        {searchFlights.length === 0 && (
          <>
            <FlightDetails
              flights={flights}
              sort={handleSort}
              order={order}
              orderBy={orderBy}
            ></FlightDetails>
            <ToastContainer />
          </>
        )}
      </div>

    </div>
  );
};

export default FlightFinder;
