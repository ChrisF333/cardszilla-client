
//CreateMemberPage.js

import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios';

//const API_URL = "http://localhost:5005";

const API_URL = "https://cardszilla.herokuapp.com"

function CreateMemberPage(props) {
    const { id } = useParams();
    const [ name, setName ] = useState("");
    const [ nickname, setNickname ] = useState("");
    const [ wins, setWins ] = useState(0);
    const [ losses, setLosses ] = useState(0);

    const [ errorMessage, setErrorMessage ] = useState(undefined);
    const navigate = useNavigate();

    const handleName = (e) => {setName(e.target.value)};
    const handleNickname = (e) => {setNickname(e.target.value)};
    const handleWins = (e) => {setWins(e.target.value)};
    const handleLosses = (e) => {setLosses(e.target.value)};

    const handleSubmitMember = (e) => {
        e.preventDefault();
        const requestBody = { name, nickname, wins, losses };

        axios.post(`${API_URL}/club/createMember/${id}`, requestBody)
         .then((response) => {
             navigate(`/clubDetails/${id}`);
         })
         .catch((error) => {
             const errorDescription = error.response.data.message; 
             setErrorMessage(errorDescription);
         })
    }

    return (
        <div className="CreateMemberPage">
            <h3>Create a member</h3>

            <form onSubmit={handleSubmitMember}>
                <label>Member name:</label>
                    <input
                        type="text"
                        name="name"
                        value={name}
                        onChange={handleName}
                    ></input>
                
                <label>Nickname (if applicable):</label>
                    <input
                        type="text"
                        name="nickname"
                        value={nickname}
                        onChange={handleNickname}
                    ></input>
                
                <label>How may wins has this player had so far?</label>
                    <input
                        type="number"
                        name="name"
                        value={wins}
                        onChange={handleWins}
                    ></input>
                
                <label>And losses? </label>
                    <input
                        type="number"
                        name="name"
                        value={losses}
                        onChange={handleLosses}
                    ></input>
                
                <button type="submit" className="GeneralButton">Add member to the club</button>
            </form>
            
        </div>
    );
}


export default CreateMemberPage;