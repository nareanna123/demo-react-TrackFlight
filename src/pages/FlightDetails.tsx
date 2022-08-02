import Flight from './Flight'


const FlightsList = (props: any) : JSX.Element | null => {
     console.log("inside Flights List----");
     console.log(props.flights.length);
   
          return (
             
                    <div style={{ color: 'white'}}> 
                          
                              {props.flights.map((flight : any, index : any) => 
                                    <li key={index}>
                                    <Flight flightDate={flight.flight_date} flightStatus={flight.flight_status} departure={flight.departure.airport} arrival={flight.arrival.airport} airline={flight.airline.name} flightNum={flight.flight.number}></Flight>
                                   </li>
                                  
                              )}
                       
                    </div>
               
          )
    
  }

export default FlightsList