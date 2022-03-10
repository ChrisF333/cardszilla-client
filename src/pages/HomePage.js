
//HomePage.js

import { Link } from "react-router-dom";
import axios from 'axios';
import { useState, useEffect } from 'react';

const API_URL = "http://localhost:5005";  

//const API_URL = "https://cardszilla.herokuapp.com"

function HomePage(props) {
    const [userClubs, setUserClubs] = useState([]);
    const [ isLoading, setLoading] = useState(true);

    //first get the token  
    const storedToken = localStorage.getItem("authToken");

    //then pass to the server via headings for security which allows server to read (if authenticated) via req.payload (useeffect to only run once)
    const getUserClubs = () => {
        axios.get(`${API_URL}/club/userClubs`, { headers: { Authorization: `Bearer ${storedToken}`} })
        .then((response) => {
            //handle the response data
            const returnedClubs = response.data.clubs;
            setUserClubs(returnedClubs);   
            setLoading(false);
        })
    }

    useEffect(()=> {
        getUserClubs();
    }, [] );
    
   
    if(isLoading){
        return (
            <h2><i>Loading...</i></h2>
        );
        } else {
            return (
                <div className="HomePage">
                    <div className="HomePageContent">
                    <h2>Welcome {userClubs.username}, What would you like to do today?</h2>
                    
                    {(userClubs.ownedClubs.length === 0 || userClubs.ownedClubs === undefined) && 
                        <div>
                            <p>You haven't created any clubs yet, would you like to create one?</p>
                        </div>
                    }

                    {userClubs.ownedClubs.length > 0 && 
                    <h4>Check in with your clubs: </h4>}
                    <div>
                        {userClubs.ownedClubs.map((club) => {
                            return (
                                <div key={club._id} className="UserClubs">
                                    <Link to={`/clubDetails/${club._id}`}>
                                        {club.name}
                                    </Link>
                                </div>
                            );
                        })}
                    </div>                    
                    <h4>Start something new: </h4>
                        <Link to="../createClub" className="UserClubs">
                            Create a new club
                        </Link>
                        <div>
                    </div>
                </div>
            </div>
            )
        }
}

export default HomePage;