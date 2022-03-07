
//ClubDetailsPage.js

import axios from 'axios'
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from 'react';
import ClubDetails from '../components/ClubDetails';
import ClubMembers from '../components/ClubMembers';
import ClubEvents from '../components/ClubEvents';


const API_URL = "http://localhost:5005";

function ClubDetailsPage() {
    const [isLoading, setLoading] = useState(true);
    const [ clubInfo, setClubInfo ] = useState([]);
    const { id } = useParams();
      
    //Get the club details for the props
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
    
   //Must handle loading othrwise on refresh components will be passed no data
   if(isLoading){
       return (
           <h2><i>Loading...</i></h2>
       );
   } else {
    return (
        <div className="ClubDetailsPage">
            <ClubDetails club={clubInfo} />
            <ClubMembers club={clubInfo}/>
            <ClubEvents club={clubInfo} />
        </div>
    );
}
}

export default ClubDetailsPage;



