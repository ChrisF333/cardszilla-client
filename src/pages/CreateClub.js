
//CreateClub.js

import {useEffect, useState} from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const API_URL = "http://localhost:5005";

//const API_URL = "https://cardszilla.herokuapp.com"

function CreateClub() {
    const [name, setName ] = useState("");
    const [games, setGames] = useState([]);
    const [errorMessage, setErrorMessage] = useState(undefined);
    //to handle the checkbox
    const [checkedGames, setCheckedGames] = useState([]);
      
    const navigate = useNavigate();
    const storedToken = localStorage.getItem("authToken");

    //Get the list of games for selection in a drop down list
    const getGamesList = () => {
        axios.get(`${API_URL}/club/create`)
        .then((response) => {
            const gamesFromServer = response.data;
            setGames(gamesFromServer.game);
        })
    }

    useEffect(() => {
        getGamesList();
    }, [] ); 

    
    const handleName = (e) => {setName(e.target.value)}
    // This is the handler method that gets triggered when a checkbox get's checked/unchecked
    // ..and toggles the state of the checkbox
    const handleCheckboxChange = (item) => {
        const isChecked = checkedGames.some(checkedGame => checkedGame === item)
        if (isChecked) {
            setCheckedGames(
            checkedGames.filter(
                (checkedGame) => checkedGame !== item
            )
            );
        } else {
            setCheckedGames(checkedGames.concat(item));
        }
        }

    const handleClubSubmit = (e) => {
        e.preventDefault();
        const requestBody = { name, games: checkedGames };
        
        axios.post(`${API_URL}/club/create`, requestBody, { headers: { Authorization: `Bearer ${storedToken}`} })
         .then((response) => {
             const newClubId = response.data.club;
             navigate(`/clubDetails/${newClubId._id}`); 
         })
         .catch((error) => {
             const errorDescription = error.response.data.message; //to avoid setting the state directly
             setErrorMessage(errorDescription);
         })
    }
    

    return (
        <div className="CreateClub">
            <h1>Create a club</h1>

            <form onSubmit={handleClubSubmit}>
            <p>What's the name of your club?</p>
            <input 
                type="text"
                name="name"
                value={name}
                onChange={handleName}
            />
            <p>Which games do you play?</p>            
            {games.map(( { _id, name }, index) => {
                return (
                    <div className="GamesListCheckBox" key={_id}>
                    <label htmlFor={`GamesList_${index}`}>{name}
                        <input                     
                            type="checkbox"
                            id={`GamesList_${index}`}
                            name={name}
                            value={name}
                            onChange={() => handleCheckboxChange(_id)}                          
                        /></label>
                    </div>
                )
            })}
            <button type="submit" className="GeneralButton">Create</button>
            { errorMessage && <p className="error-message">{errorMessage}</p> }
            </form>
         {/*<h5>State:</h5>*/}
         {/*<pre>{JSON.stringify(checkedGames, null, 2)}</pre>*/}
           

        </div>
    )

}

export default CreateClub;