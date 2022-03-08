
//Clubmembers.js

import { Link } from 'react-router-dom';
import axios from 'axios';

const API_URL = "http://localhost:5005";   

function ClubMembers(props) {
    const { members } = props.club
    
    const linkToCreate = "/createMember/"+props.club._id;

    const handleDeleteEvent = (e) => {
        console.log('handleDeleteMemberCalled');
        const requestBody = { memberId: e };
        axios.post(`${API_URL}/club/deleteMember/`, requestBody);
    }
    
    return (
        <div className="ClubMembersCard">
            <h3>This is the club members card</h3>

            {(members.length === 0 || members.length === undefined) && 
                <div>
                    <p>No members yet</p>
                </div>
            
            }

            {members.length > 0 && 
                members.map((member) => {
                    return (
                        <div key={member._id} className="MemberDetails">
                            <h5>{member.name}</h5>
                            <p>Wins: {member.wins}</p>
                            <p>Losses: {member.losses}</p>
                            <button 
                                className="deleteItemButton"
                                type="submit"
                                onClick={() => {handleDeleteEvent(member._id)}}
                            >X</button>
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