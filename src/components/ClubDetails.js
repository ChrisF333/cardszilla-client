
//ClubDetails.js

import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';

const API_URL = "http://localhost:5005";

//const API_URL = "https://cardszilla.herokuapp.com"

function ClubDetails(props) {
    const { _id, name, games, createdAt } = props.club
    
    const navigate = useNavigate()

    const storedToken = localStorage.getItem("authToken");

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
            <h2>{name}</h2>

            <h4>Purveyors of:</h4>
            <ul>
            {games.map(game => {
                    return (
                        <li key={game._id}>{game.name}</li>
                    )
                })}
            </ul>            
            <p>Established: {formattedDate}</p>
            {storedToken &&
            <Link to={`/editClubDetails/${_id}`}>
                Edit club details
            </Link>}
                {storedToken && <button 
                    className="deleteItemButton"
                    type="submit"
                    alt="Delete this club?"
                    onClick={() => {handleDeleteClub(_id)}}
                >Delete club</button>}
            

            

        </div>
    );

}

export default ClubDetails;