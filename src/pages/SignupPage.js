
//SignupPage.js

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

//const API_URL = "http://localhost:5005";

const API_URL = "https://cardszilla.herokuapp.com"

function SignupPage(props) {
    const [ username, setUsername ] = useState("");
    const [ email, setEmail ] = useState("");
    const [ password, setPassword] = useState("");
    const [ errorMessage, setErrorMessage ] = useState(undefined);

    const navigate = useNavigate();

    const handleUsername = (e) => setUsername(e.target.value);
    const handleEmail = (e) => setEmail(e.target.value);
    const handlePassword = (e) => setPassword(e.target.value);

    const handleSignupSubmit = (e) => {
        e.preventDefault();
        const requestBody = { username, email, password };

        axios.post(`${API_URL}/auth/signup`, requestBody)
         .then((response) => {
             navigate('/login');
         })
         .catch((error) => {
             const errorDescription = error.response.data.message; //to avoid setting the state directly
             setErrorMessage(errorDescription);
         })
    }

return (
    <div className="SignupPage">
         <h1>Sign up</h1>

        <form onSubmit={handleSignupSubmit}>
        <label>Username:</label>
        <input 
            type="text"
            name="username"
            value={username}
            onChange={handleUsername}
        />
        <label>Email:</label>
        <input 
            type="email"
            name="email"
            value={email}
            onChange={handleEmail}
        />
        <label>Password:</label>
        <input 
            type="password"
            name="password"
            value={password}
            onChange={handlePassword}
        />
        <button type="submit" className="GeneralButton">Sign Up</button>
        </form>

        { errorMessage && <p className="error-message">{errorMessage}</p> }

    </div>
    )
}

export default SignupPage;