
//AccountPage.js
import { useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const API_URL = "http://localhost:5005"

function AccountPage(props) {
    const [ email, setEmail ] = useState("");
    const [ username, setUsername ] =useState("");
    const [ password, setPassword ] = useState("");
    const [ toggleUpdateSwitch, setToggleUpdateSwitch] = useState(false);
    const [ errorMessage, setErrorMessage ] = useState(undefined);

    let toggleUpdate = false;
    const navigate = useNavigate();

    //first get the token  
    const storedToken = localStorage.getItem("authToken");

    //then pass to the server via headings for security which allows server to read (if authenticated) via req.payload (useeffect to only run once)
    const getUser = () => {
        axios.get(`${API_URL}/auth/account`, { headers: { Authorization: `Bearer ${storedToken}`} })
        .then((response) => {
            //handle the response data
            const  returnedUser = response.data;
            setEmail(returnedUser.user.email);    
            setUsername(returnedUser.user.username);            
        })
    }

    useEffect(()=> {
        getUser();
      }, [] );

    //Use toggle to display/not display update user details form
    const handleUpdateToggle = () => {
        if(toggleUpdate === false) {
            setToggleUpdateSwitch(true);
        } else {
            setToggleUpdateSwitch(false);
        }
    }

    const handleUsername = (e) => setUsername(e.target.value);
    const handleEmail = (e) => setEmail(e.target.value);
    const handlePassword = (e) => setPassword(e.target.value);

    const handleUpdateDetails = (e) => {
        e.preventDefault();
        const requestBody = { username, email, password };
        
        axios.put(`${API_URL}/auth/account`, requestBody, { headers: { Authorization: `Bearer ${storedToken}`} })
        .then((response) => {
            console.log(response);
            setToggleUpdateSwitch(false);
        })        
        .catch((error) => {
             const errorDescription = error.response.data.message;
             setErrorMessage(errorDescription);
         }) 
    }

    const handleDelete = () => {
        const requestBody = { username, email, password };
        
        axios.post(`${API_URL}/auth/account/delete`, requestBody, { headers: { Authorization: `Bearer ${storedToken}`} })
        .then((response) => {
            localStorage.removeItem("authToken");
            navigate("/");
        })        
        .catch((error) => {
             const errorDescription = error.response.data.message;
             setErrorMessage(errorDescription);
         }) 
    }

    return (
        <div className="AccountPage">
            <h1>Your account details</h1>

            {!toggleUpdateSwitch && <p>Username: {username}</p>}            
            {!toggleUpdateSwitch && <p>Email address: {email}</p>}
            {!toggleUpdateSwitch && <button onClick={handleUpdateToggle}>Update details</button>}
            {!toggleUpdateSwitch && <button onClick={handleDelete}>Delete my account</button>}

            {toggleUpdateSwitch && 
                <form onSubmit={handleUpdateDetails}>
                <label>Username:
                    <input 
                    type="username"
                    name="username"
                    value={username}
                    onChange={handleUsername}
                    >
                    </input>
                </label>
                <label>Email:
                    <input 
                    type="email"
                    name="email"
                    value={email}
                    onChange={handleEmail}
                    >
                    </input>
                </label>
                <label>Password:
                    <input
                    type="password"
                    name="password"
                    value={password}
                    onChange={handlePassword}
                    >
                    </input>
                </label>
                <button type="submit">Submit changes</button>
                { errorMessage && <p className="error-message">{errorMessage}</p> }
            </form>}
        </div>
    )
}

export default AccountPage;