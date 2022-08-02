const IFRRouteAnalyzer = (): JSX.Element | null => {
  return (
    <div>
      <h1>IFR Route Analyzer</h1>
      <div>
        <p>
          Need to find a flight? Simply enter an origin and destination airport
          code below and see all the flights for that given origin/destination
          pair in the last 24 hours.
        </p>
        <p>
          For IFR flight planning, be certain to note altitude, type of aircraft
          and verify on terminal procedures that you are eligible for that
          SID/STAR/routing. Hover your mouse over an aircraft type or suffix for
          more details.
        </p>
        <p>IFR Route Analyzer</p>
      </div>
    </div>
  );
};

export default IFRRouteAnalyzer;
