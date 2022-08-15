import { Autocomplete, TextField } from "@mui/material";
import React, { Component, useEffect, useState } from 'react'
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
  

  const[departureFlights, setDepartureFlights] = useState([]);
  const[flights, setFlights] = useState([]);
  const [searchFlights, setSearchFlights] = useState([]);
  const toastId = 'toastId';
  
  const [origin, setOrigin] = useState<string[]>([]) 
  const [destination, setDestination] = useState<string[]>([]) 
  let originTempArray:string[]=[] ;
  let destinationTempArray:string[]=[] ;

  const[selectedOrigin, setSelectedOrigin] = useState<string | null>();
  const[selectedDestination, setSelectedDestination] = useState<string | null>();



    useEffect(()=> {
        getFlights();   
    },[])
    console.log(
        "CHeck Flights API Call start......"
    )


    

    
    const getFlights=() => 
    {
        //const flightsApiurl = 'http://api.aviationstack.com/v1/flights?access_key=01f5b1d8ab535ed201648b6f6cb04483';
        const flightsApiurl = 'flights.json';
       // var params = new URLSearchParams();
        //params.append("access_key", '7701d00a6d906ff847152d3c46b15e78');
    
       // var request = { params: params };
        axios.get(flightsApiurl)

        .then(resp => {
           console.log("getAllFlights response list -> " + JSON.stringify(resp.data));  
           setFlights(resp.data.data);
            for (var i = 0; i < resp.data.data.length; i++) {
              //originTempArray.push(resp.data.data[i].departure.airport + "-" + resp.data.data[i].departure.iata + "-" + resp.data.data[i].departure.icao);
              //destinationTempArray.push(resp.data.data[i].arrival.airport + "-" + resp.data.data[i].arrival.iata + "-" + resp.data.data[i].arrival.icao);
              originTempArray.push(resp.data.data[i].departure.airport);
              destinationTempArray.push(resp.data.data[i].arrival.airport);
            }
            originTempArray = originTempArray.filter((data,index)=>originTempArray.indexOf(data)=== index);
            setOrigin(originTempArray);

            destinationTempArray = destinationTempArray.filter((data,index)=>destinationTempArray.indexOf(data)=== index);
            setDestination(destinationTempArray);
           
           
        })
        .catch(err => {
              console.error("Error " + err);
        })
     }

     
     

     const getFlightsbySearchTerm = () => {
      console.log("inside flights search 2");
      console.log(selectedOrigin);
      console.log(selectedDestination);
         let filterlist=flights.filter((flight: any)=>{
          //return flight.departure.airport.toLowerCase().includes(searchFlights.toLowerCase())
        return flight.departure.airport === selectedOrigin && flight.arrival.airport === selectedDestination;
         })
         setSearchFlights(filterlist)
     
      }


 

  return (
    <div>
      <h1>Flight Finder</h1>
      <p>Search for flights by origin and destination airport</p>
      <div style={{ display: "flex" }}>
        <Autocomplete
          disablePortal
          id="combo-box-demo1"
          onChange={(event, value) => 
             setSelectedOrigin(value)
          }
          options={origin}
          getOptionLabel={origin => origin}
        //  defaultValue={top100Flights.find(top100Flights => top100Flights.label[1])} 
          sx={{ width: 300, marginRight: "20px" }}
          renderInput={(params) => <TextField {...params} value={origin} label="Origin" />}
        />
        <Autocomplete
          disablePortal
          id="combo-box-demo2"
          onChange={(event, value) => 
           setSelectedDestination(value)
          }
          options={destination}
          getOptionLabel={destination => destination}
         // defaultValue={top100Flights.find(top100Flights => top100Flights.label[0])} 
          sx={{ width: 300 }}
          renderInput={(params) => (
            <TextField {...params} label="Destination" value={destination} />
          )}
        />

        <IconButton type="submit" aria-label="search" onClick={() => getFlightsbySearchTerm()}>
      <SearchIcon style={{ fill: "blue" }} />
    </IconButton>
      </div>
      <div>
        {searchFlights.length > 0 && <FlightDetails flights={searchFlights}></FlightDetails>}
        {searchFlights.length === 0 && toast("No Flights Found", {toastId: toastId}) && <><FlightDetails flights={flights}></FlightDetails><ToastContainer /></>}
    
      </div>
      
    </div>
  );
  
};

export default FlightFinder;
