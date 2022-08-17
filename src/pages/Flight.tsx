import { useState, useEffect } from "react";
import { useParams, useNavigate  } from "react-router-dom";
import axios from "axios";


const Flight = () => {
     const { id } = useParams();
     const navigate = useNavigate();
     const[flight, setFlight] = useState([]);
     const flightsApiurl = ('http://api.aviationstack.com/v1/flights?access_key=89c5f6108b671e68c341aa6da66fb46b&flight_number=' + id);

     useEffect(()=> {
        getFlights();   
     },[])

     const getFlights = () => {
        axios.get(flightsApiurl)
        .then(resp => {
        setFlight(resp.data.data);
        })
        .catch(err => {
            console.error("Error " + err);
        })
     }

     const flightInfo = () => {
            return (
                <div>
                    {flight.slice(0, 1).map((flight:any, index: any) => (
                            <div key={index}>
                                Airline Name: {flight.airline.name} <br /><br />
                                Flight Number: {flight.flight.number} <br /><br />
                                Departure: {flight.departure.airport} <br /><br />
                                Arrival: {flight.arrival.airport} <br /><br />
                                Date: {flight.flight_date} <br /> <br />
                                Status: {flight.flight_status}
                            </div>
                        ))}
                </div>
            )
    }

    return (
        <div>

            {flightInfo()}

            <button onClick={() => navigate("/flight-finder")}>Go back</button>
        </div>
    )
}

export default Flight;


   