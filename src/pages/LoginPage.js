
//LoginPage.js

import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from '../context/auth.context';
import axios from "axios";

//const API_URL = "http://localhost:5005";

const API_URL = "https://cardszilla.herokuapp.com"

function LoginPage(props) {
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ errorMessage, setErrorMessage ] = useState(undefined);

    const navigate = useNavigate();
    const { storeToken, authenticateUser } = useContext(AuthContext);

    const handleEmail = (e) => setEmail(e.target.value);
    const handlePassword = (e) => setPassword(e.target.value);
    
    const handleLoginSubmit = (e) => {
        e.preventDefault();
        const requestBody = {email, password};

        const url = `${API_URL}/auth/login` 
        axios.post(url, requestBody)
         .then((response) => {
            storeToken(response.data.authToken); 
            authenticateUser();
             navigate("/home");
         })
         .catch((error) => {
             const errorDescription = error.response.data.message;
             setErrorMessage(errorDescription);
         })
    };

    return (
        <div className="LoginPage">
            <h1>Login</h1>
            <form onSubmit={handleLoginSubmit}>
                <label>Email:</label>
                    <input 
                    type="email"
                    name="email"
                    value={email}
                    onChange={handleEmail}
                    >
                    </input>
                
                <label>Password:</label>
                    <input
                    type="password"
                    name="password"
                    value={password}
                    onChange={handlePassword}
                    >
                    </input>
                
                <button type="submit" className="GeneralButton">login</button>
            </form>

            { errorMessage && <p className="error-message">{errorMessage}</p> }

        </div>
    )
}

export default LoginPage;