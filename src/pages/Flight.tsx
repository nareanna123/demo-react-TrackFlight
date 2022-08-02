
const Flight = (props : any) => {
    console.log("----------Test Flight data final");
    console.log(props.flightDate + "  " + props.flightStatus + " " + props.departure + " " + props.arrival + " " + props.airline +  " " + props.flightNum);
    return (
        
        <div className="flight">
        <h1>Test Flight Data </h1>
            <div>
            <h2>{props.flightDate}</h2>
            <h2>{props.flightStatus}</h2>
            <h2>{props.departure}</h2>
            <h2>{props.arrival}</h2>
            <h2>{props.airline}</h2>
            <h2>{props.flightNum}</h2>
            </div>
        </div> 
    );
}

export default Flight;


   