import { Link } from "react-router-dom";

const FlightsList = (props: any) : JSX.Element | null => {
     console.log(props.flights.length);

          return (

                    <div> 
                <table border={1} className="table" >
                    <thead>
                        <tr>
                            <th align="left">Airline</th>
                            <th align="left">Air Craft</th>
                            <th align="left">Status</th>
                            <th align="left">Departure</th>
                            <th align="left">Arrival</th>
                        </tr>
                    </thead>
                    <tbody>
                        {props.flights.map((flight:any, index: any) => (
                            <tr key={index}>
                                <td align="left">{flight.airline.name}</td>
                                <Link to={`/post/${flight.flight.number}`}><td align="left">{flight.flight.number}</td></Link>
                                <td align="left">{flight.flight_status}</td>
                                <td align="left">{flight.departure.airport}</td>
                                <td align="left">{flight.arrival.airport}</td>
                            </tr>
                        ))}
                    </tbody>
                    </table>           
                    </div> 
          )
    
  }

export default FlightsList