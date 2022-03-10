
//ClubDetailsPage.js

import axios from 'axios'
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from 'react';
import ClubDetails from '../components/ClubDetails';
import ClubMembers from '../components/ClubMembers';
import ClubEvents from '../components/ClubEvents';


//const API_URL = "http://localhost:5005";

const API_URL = "https://cardszilla.herokuapp.com"

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
            <div className="ClubDetailsColOne">
                <div className="ClubDetails">
                    <ClubDetails club={clubInfo} />
                </div>
                <div className="ClubRecord">
                    <ClubEvents club={clubInfo} />
                </div>
            </div>
            <div className="ClubDetailsColTwo">
                <div className="ClubMembers">
                    <ClubMembers club={clubInfo}/>                    
                </div>
            </div>
        </div>
    );
}
}

export default ClubDetailsPage;





