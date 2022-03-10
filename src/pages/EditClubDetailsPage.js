
// EditClubDetailsPage.js

import axios from 'axios';
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from 'react';

//const API_URL = "http://localhost:5005";

const API_URL = "https://cardszilla.herokuapp.com"

function EditClubDetailsPage(){
    const [isLoading, setLoading] = useState(true);
    const [ clubInfo, setClubInfo ] = useState([]);
    const [name, setName ] = useState("");
    const [games, setGames] = useState([]);
    const [errorMessage, setErrorMessage] = useState(undefined);
    //to handle the checkbox
    const [checkedGames, setCheckedGames] = useState([]);
    const { id } = useParams();
    const navigate = useNavigate();
    const storedToken = localStorage.getItem("authToken");

        //Get the club details for the starting values
        const retrieveClub = () => {
            axios.get(`${API_URL}/club/clubDetails/${id}`)
            .then((response) => {
                const retrievedClub = response.data.club;
                setClubInfo(retrievedClub);
                setName(retrievedClub.name);
                setLoading(false);
             })
            .catch((error) => {
                const errorDescription = error.response.data.message;
                console.log(errorDescription);
            }); 
        }
    
        useEffect(() => {
            retrieveClub();        
        }, []);
        

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
        
        axios.put(`${API_URL}/club/update/${id}`, requestBody, { headers: { Authorization: `Bearer ${storedToken}`} })
         .then((response) => {
             navigate(`/clubDetails/${id}`); 
         })
         .catch((error) => {
             const errorDescription = error.response.data.message; //to avoid setting the state directly
             setErrorMessage(errorDescription);
         })
    }
    
       
    if(isLoading){
        return (
               <h2><i>Loading...</i></h2>
           );
       } else {
        return (
            <div className="EditClubDetailsPage">
                <h1>Editing {clubInfo.name}</h1>

                <form onSubmit={handleClubSubmit}>
                <label>club name</label>
                <input 
                    type="text"
                    name="name"
                    value={name}
                    onChange={handleName}
                />
                <label>Which games do you play?</label>
                {games.map(( { _id, name }, index) => {
                    return (
                        <div className="GamesListCheckBox" key={_id}>
                        <label htmlFor={`GamesList_${index}`}>{name}</label>
                            <input                     
                                type="checkbox"
                                id={`GamesList_${index}`}
                                name={name}
                                value={name}
                                onChange={() => handleCheckboxChange(_id)}                          
                            />
                        </div>
                    )
                })}
                <button type="submit" className="GeneralButton">Submit changes</button>
                { errorMessage && <p className="error-message">{errorMessage}</p> }
                </form>
            </div>
        );
    }
}

export default EditClubDetailsPage;