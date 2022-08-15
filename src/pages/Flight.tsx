import { useState, useEffect } from "react";
import { useParams, useNavigate  } from "react-router-dom";
import axios from "axios";


const Flight = () => {
     const { id } = useParams();
     const navigate = useNavigate();
     const[flights, setFlights] = useState([]);
     const[currentFlight, setCurrentFlight] = useState([]);
     const flightsApiurl = '../flights.json';

     useEffect(()=> {
        getFlights();   
     },[])

     const getFlights = () => {
        axios.get(flightsApiurl)
        .then(resp => {
        setFlights(resp.data.data);

        let filterlist=flights.filter((flight: any)=>{
            //return flight.departure.airport.toLowerCase().includes(searchFlights.toLowerCase())
          return flight.flight.number === id;
           })
           setCurrentFlight(filterlist)
           console.log(currentFlight)

        })
        .catch(err => {
            console.error("Error " + err);
        })
     }

    return (
        <div>
            <div>
              Aircraft Number: {id}
            </div>

            <button onClick={() => navigate("/flight-finder")}>Go back</button>
        </div>
    )
}

export default Flight;


   