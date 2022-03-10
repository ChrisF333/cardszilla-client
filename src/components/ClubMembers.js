
//Clubmembers.js

import { Link } from 'react-router-dom';
import axios from 'axios';

const API_URL = "http://localhost:5005";   

//const API_URL = "https://cardszilla.herokuapp.com"

function ClubMembers(props) {
    const { members } = props.club;
    const { _id } = props.club;
    
    const linkToCreate = "/createMember/"+props.club._id;
    
    const storedToken = localStorage.getItem("authToken");

    const handleDeleteEvent = (e) => {
        console.log('handleDeleteMemberCalled');
        const requestBody = { memberId: e };
        axios.post(`${API_URL}/club/deleteMember/`, requestBody);
        window.location.reload(false);
    }
    
    return (
        <div className="ClubMembersCard">
            <h3>Club members</h3>

            {(members.length === 0 || members.length === undefined) && 
                <div>
                    <p>No members yet</p>
                </div>
            
            }

            {members.length > 0 && 
                members.map((member) => {
                    return (
                        <div key={member._id} className="ClubRows">
                            <p><b>{member.name}</b></p>
                            <p>Wins: {member.wins}</p>
                            <p>Losses: {member.losses}</p>
                            {storedToken &&<button 
                                className="deleteItemButton"
                                type="submit"
                                onClick={() => {handleDeleteEvent(member._id)}}
                            >x</button>}
                        </div>
                    );  
                })
            }
            <Link to={linkToCreate}>
                Add member
            </Link>
            

        </div>
    );
}

export default ClubMembers;