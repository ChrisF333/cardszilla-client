
//Clubmembers.js

import { Link } from 'react-router-dom';

function ClubMembers(props) {
    const { members } = props.club
    
    const linkToCreate = "/createMember/"+props.club._id;
    
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