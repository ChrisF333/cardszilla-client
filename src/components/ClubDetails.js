
//ClubDetails.js

import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';

const API_URL = "http://localhost:5005";

function ClubDetails(props) {
    const { _id, name, games, createdAt } = props.club
    
    const navigate = useNavigate()
    
    let formattedDate = Date(createdAt);
    formattedDate = formattedDate.substring(0,15);

    const handleDeleteClub = (e) => {
        console.log('handleDeleteClubCalled');
        const requestBody = { clubId: e };
        axios.post(`${API_URL}/club/delete/`, requestBody);
        navigate('/home');
    }

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
            
            <Link to={`/editClubDetails/${_id}`}>
                Edit club details
            </Link>
                <button 
                    className="deleteItemButton"
                    type="submit"
                    alt="Delete this club?"
                    onClick={() => {handleDeleteClub(_id)}}
                >Delete club</button>
            

            

        </div>
    );

}

export default ClubDetails;