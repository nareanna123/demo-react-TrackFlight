import { useState, useEffect } from "react";
import { useParams, useNavigate  } from "react-router-dom";
import axios from "axios";

const Flight = () => {
     const { id } = useParams();
     const navigate = useNavigate();



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


   