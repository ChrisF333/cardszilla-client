
//ClubEvents.js

//this component should return the last five events for the club
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const API_URL = "http://localhost:5005";    

function ClubEvents(props) {
    const { record } = props.club
    const linkToCreateEvent = "/createEvent/"+props.club._id;

    const [ recentEvents, setRecentEvents ] = useState(undefined);
    const [isLoading, setLoading] = useState(true);

    const retrieveRecordCard = () => {
        axios.get(`${API_URL}/club/clubRecordCard/${record}`)
        .then((response) => {
            if (response.data.message === "No record found for this club") {
                setRecentEvents(0);
                setLoading(false);
            } else {
                const retrievedRecordCard = response.data.recordCard;
                setRecentEvents(retrievedRecordCard);
                setLoading(false);
                console.log(retrievedRecordCard);
            }
            
         })
        .catch((error) => {
            const errorDescription = error.response.data.message;
            console.log(errorDescription);
        }); 
    }

    useEffect(() => {
        retrieveRecordCard();        
    }, []);

    if(isLoading){
        return (
            <h2><i>Loading...</i></h2>
        );
        } else {
    return (
        <div className="ClubEventsCard">
            <h3>This is the record card</h3>

            {(recentEvents === 0 || recentEvents === undefined) && 
                <div>
                    <p>No events yet</p>
                </div>
            }

            {recentEvents.length > 0 && 
                recentEvents.map((event) => {
                    return (
                        <div>
                            <p>{event.game}</p>
                        </div>
                    );
                })}
            <Link to={linkToCreateEvent} state={{from: "record"}}>
                    Add new event
                </Link>
        </div>
        );
    }
}

export default ClubEvents;