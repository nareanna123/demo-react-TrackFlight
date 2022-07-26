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
    departureTimeZone: string;
    departureTerminal: string;
    departureGate: string;
    departureScheduled: string;
    arrival: string;
    arrivalTimeZone: string;
    arrivalTerminal: string;
    arrivalGate: string;
    arrivalScheduled: string;
    longitude: string;
    latitude: string;
  }

  const [order, setOrder] = useState<Order>("asc");
  const [orderBy, setOrderBy] = useState<keyof Data | string>("");

  useEffect(() => {
    getFlights();
  }, []);

  const getFlights = () => {
    //const flightsApiurl = "http://api.aviationstack.com/v1/flights?access_key=89c5f6108b671e68c341aa6da66fb46b";
    const flightsApiurl = 'flights.json';
    // var params = new URLSearchParams();
    //params.append("access_key", '7701d00a6d906ff847152d3c46b15e78');

    // var request = { params: params };

    //sessionStorage.getItem('flightData') != null && sessionStorage.getItem('flightData') != undefined
    if (sessionStorage.getItem('flightData') != null && sessionStorage.getItem('flightData') != undefined)
    {
      console.log('FROM LOCAL STORAGE: ' + sessionStorage.getItem('flightData'))
      let flightParse = JSON.parse(sessionStorage.getItem('flightData') + '');
      console.log('FLIGHTPARSE: ' + flightParse[1].airline.name);

      for (var i = 0; i < flightParse.length; i++) {
        originTempArray.push(flightParse[i].departure.airport);
        destinationTempArray.push(flightParse[i].arrival.airport);
      }
      originTempArray = originTempArray.filter(
        (data, index) => originTempArray.indexOf(data) === index
      );
      setOrigin(originTempArray);

      destinationTempArray = destinationTempArray.filter(
        (data, index) => destinationTempArray.indexOf(data) === index
      );
      setDestination(destinationTempArray);

      var response = flightParse.map((flight: any) => {
        let latitude = 0;
        let longitude = 0;
        if (flight.live != null) {
          latitude = flight.live.latitude;
          longitude = flight.live.longitude;
        }

        return {
          airline: flight.airline.name,
          aircraft: flight.flight.number,
          status: flight.flight_status,
          departure: flight.departure.airport,
          departureTimeZone: flight.departure.timezone,
          departureTerminal: flight.departure.terminal,
          departureGate: flight.departure.gate,
          departureScheduled: flight.departure.scheduled,
          arrival: flight.arrival.airport,
          arrivalTimezone: flight.arrival.timezone,
          arrivalTerminal: flight.arrival.terminal,
          arrivalGate: flight.arrival.gate,
          arrivalScheduled: flight.arrival.scheduled,
          latitude,
          longitude,
        };
      });
      setFlights(response);

    }

    else {
      axios
      .get(flightsApiurl)

      .then((resp) => {
        console.log(
          "getAllFlights response list -> " + JSON.stringify(resp.data)
        );
        sessionStorage.setItem('flightData', JSON.stringify(resp.data.data));
        let flightParse = JSON.parse(sessionStorage.getItem('flightData') + '');
        setFlights(flightParse);
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
          let latitude = 0;
          let longitude = 0;
          if (flight.live != null) {
            latitude = flight.live.latitude;
            longitude = flight.live.longitude;
          }

          return {
            airline: flight.airline.name,
            aircraft: flight.flight.number,
            status: flight.flight_status,
            departure: flight.departure.airport,
            departureTimeZone: flight.departure.timezone,
            departureTerminal: flight.departure.terminal,
            departureGate: flight.departure.gate,
            departureScheduled: flight.departure.scheduled,
            arrival: flight.arrival.airport,
            arrivalTimezone: flight.arrival.timezone,
            arrivalTerminal: flight.arrival.terminal,
            arrivalGate: flight.arrival.gate,
            arrivalScheduled: flight.arrival.scheduled,
            latitude,
            longitude,
          };
        });
        setFlights(response);
      })
      .catch((err) => {
        console.error("Error " + err);
      });
    }
  };

  useEffect(() => {
    getFlights();
  }, [])

  const getFlightsbySearchTerm = () => {
    console.log("inside flights search 2");
    console.log(selectedOrigin);
    console.log(selectedDestination);
    toast.error("Please enter a valid origin and destination", { toastId: toastId })
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
