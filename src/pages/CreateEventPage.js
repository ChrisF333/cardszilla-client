
//CreateEventPage.js

import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios';

const API_URL = "http://localhost:5005";

function CreateEventPage() {
    const { id } = useParams();
    const [isLoading, setLoading] = useState(true);

    //Get the club details for the props
    const [ clubInfo, setClubInfo ] = useState([]);
    
    const retrieveClub = () => {
        axios.get(`${API_URL}/club/clubDetails/${id}`)
        .then((response) => {
            const retrievedClub = response.data.club;
            setClubInfo(retrievedClub);
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

    //declare the rest of the variables
    const [ game, setGame ] = useState("");
    const [ winner, setWinner ] = useState("");
    //const [ participants, setParticipants ] = useState(0);
    const [checkedMembers, setCheckedMembers] = useState([]);
    const [ errorMessage, setErrorMessage ] = useState(undefined);
    const navigate = useNavigate(); 
    const record = clubInfo.record;
    

    //handle events
    const handleGames = (e) => {setGame(e.target.value)};
    const handleWinner = (e) => {setWinner(e.target.value)};

    const handleCheckboxChange = (item) => {
        const isChecked = checkedMembers.some(checkedMember => checkedMember === item)
        if (isChecked) {
            setCheckedMembers(
            checkedMembers.filter(
                (checkedMember) => checkedMember !== item
            )
            );
        } else {
            setCheckedMembers(checkedMembers.concat(item));
        }
        }

    const handleRecordSubmit = (e) => {
        e.preventDefault();
        const requestBody = { record: record, game, winner, participants: checkedMembers };
        console.log(requestBody);
        axios.post(`${API_URL}/club/createEvent/${id}`, requestBody)
         .then((response) => {
             navigate(`/clubDetails/${id}`); 
         })
         .catch((error) => {
             const errorDescription = error.response.data.message; 
             setErrorMessage(errorDescription);
         })
    };

    if(isLoading){
        return (
            <h2><i>Loading...</i></h2>
        );
    } else {
    return (
        <div className="CreateEventPage">
            <h3>This is the create event page</h3>
        
        <form onSubmit={handleRecordSubmit}>
            <label>Game played: 
                <select 
                    id="games" 
                    name="games"
                    onChange={handleGames}
                >
                <option value="">Select game</option>
                    {clubInfo.games.map(( { _id, name }, index) => {
                        return (
                            <option 
                                key={_id} 
                                value={_id}
                            >{name}
                            </option>
                        )
                    })}
                </select>
            </label>
            <label>Participants: 
                {clubInfo.members.map(( { _id, name }, index) => {
                    return (
                        <div className="MembersListCheckBox" key={_id}>
                        <label htmlFor={`MembersList_${index}`}>{name}</label>
                            <input                     
                                type="checkbox"
                                id={`MembersList_${index}`}
                                name={name}
                                value={name}
                                onChange={() => handleCheckboxChange(_id)}                          
                            />
                        </div>
                    )
                })}
            </label>
            <label>Winner: 
                <select 
                    id="games" 
                    name="games"
                    onChange={handleWinner}
                >
                <option value="">Select winner</option>
                    {clubInfo.members.map(( { _id, name }, index) => {
                        return (
                            <option 
                                key={_id} 
                                value={_id}
                            >{name}
                            </option>
                        )
                    })}
                </select>
            </label>
            <button type="submit">Add event</button>
        </form>
        
        </div>


    );
    }
}


export default CreateEventPage;