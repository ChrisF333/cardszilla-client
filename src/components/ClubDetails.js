
//ClubDetails.js

import { Link } from "react-router-dom";
import { useEffect, useState, useContext } from 'react';
import { useNavigate} from 'react-router-dom';

function ClubDetails(props) {
    const { _id, name, games, createdAt } = props.club
    
    let formattedDate = Date(createdAt);
    formattedDate = formattedDate.substring(0,15);

    return (
        <div className="ClubDetailsCard">
            <h3>this is the club details card</h3>

            <h4>{name}</h4> 

            <h5>Purveyors of:</h5>
            <ul>
            {games.map(game => {
                    return (
                        <li key={game._id}>{game.name}</li>
                    )
                })}
            </ul>            
            <p>Established: {formattedDate}</p>
            

        </div>
    );

}

export default ClubDetails;