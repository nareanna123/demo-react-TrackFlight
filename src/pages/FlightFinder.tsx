import { Autocomplete, TextField } from "@mui/material";
import React, { Component, useEffect, useState } from 'react'
import axios from "axios";
import FlightDetails from "./FlightDetails";
import IconButton from "@mui/material/IconButton";
import SearchIcon from '@mui/icons-material/Search';


const FlightFinder = (): JSX.Element | null => {
  const top100Flights = [
    { label: "John F Kennedy Intl (New York)", code: "JFK" },
    { label: "Indira Gandhi Int'l (New Delhi)", code: "DEL" },
    { label: "Newark Liberty Intl (Newark)", code: "EWR" },
    { label: "LaGuardia (New York)", code: "LGA" },
  ];
  const[flights, setFlights] = useState([]);
    const [searchFlights, setSearchFlights] = useState('');

    useEffect(()=> {
        getFlights();   
    },[])
    console.log(
        "CHeck Flights API Call start......"
    )
    const getFlights=() => 
    {
        const flightsApiurl = 'http://api.aviationstack.com/v1/flights?access_key=ebf1a4a44debf05d39e5a197f578bd1e';
        var params = new URLSearchParams();
        params.append("access_key", '7701d00a6d906ff847152d3c46b15e78');
    
        var request = { params: params };
    
        axios.get(flightsApiurl , request)
        .then(resp => {
           console.log("getAllFlights response list -> " + JSON.stringify(resp.data));  
           setFlights(resp.data.data);
        })
        .catch(err => {
              console.error("Error " + err);
        })
     }

    
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
        <IconButton type="submit" aria-label="search">
      <SearchIcon style={{ fill: "blue" }} />
    </IconButton>
      </div>
      <div>
      <FlightDetails flights={flights}></FlightDetails>
      </div>
    </div>
  );
};

export default FlightFinder;
