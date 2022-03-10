
//ClubEvents.js

//this component should return the last five events for the club
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link, Navigate } from 'react-router-dom';

const API_URL = "http://localhost:5005";    

//const API_URL = "https://cardszilla.herokuapp.com"

function ClubEvents(props) {
    const { record } = props.club
    const linkToCreateEvent = "/createEvent/"+props.club._id;

    const [ recentEvents, setRecentEvents ] = useState(undefined);
    const [ latestEvents, setLatestEvents ] = useState(undefined);
    const [ isLoading, setLoading] = useState(true);


    //function to filter latest events
    function filterLatestEvents(allEvents) {
        let latestEvents = allEvents
        latestEvents = latestEvents.sort(function(a, b) {
            return new Date(b.eventDate) - new Date(a.eventDate);
         });
         latestEvents = latestEvents.slice(0,5);
         setLatestEvents(latestEvents);
    }

    const retrieveRecordCard = () => {
        axios.get(`${API_URL}/club/clubRecordCard/${record}`)
        .then((response) => {
            if (response.data.message === "No record found for this club") {
                setRecentEvents(0);
                setLoading(false);
            } else {
                const retrievedRecordCard = response.data.recordCard.record;
                setRecentEvents(retrievedRecordCard);
                filterLatestEvents(retrievedRecordCard);
                setLoading(false);                
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

    const handleDeleteEvent = (e) => {
        console.log('handleDeleteEventCalled');
        const requestBody = { eventId: e };
        axios.post(`${API_URL}/club/deleteEvent/${record}`, requestBody);
        window.location.reload(false);
    }
    

    if(isLoading){
        return (
            <h2><i>Loading...</i></h2>
        );
        } else {
    return (
        <div className="ClubEventsCard">
            <h3>Club record</h3>

            {(recentEvents === 0 || recentEvents === undefined) && 
                <div>
                    <p>No events yet</p>
                </div>
            }

            {recentEvents.length > 0 && 
                latestEvents.map((event) => {
                    return (
                        <div className="ClubRows" key={event._id}>
                            <p>{(new Date(event.eventDate)).toLocaleDateString('en-GB')}</p>
                            <p>-</p>
                            <p>Game: {event.game.name} </p>
                            <p>-</p>
                            {event.winner && <p>Winner: {event.winner.name} </p>}
                            {!event.winner && <p>Winner: Other club member </p>}
                            <button 
                                className="deleteItemButton"
                                type="submit"
                                onClick={() => {handleDeleteEvent(event._id)}}
                            >X</button>
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