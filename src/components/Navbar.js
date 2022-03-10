
//Navbar.js

import { Link } from "react-router-dom";
import { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/auth.context';
import { useNavigate} from 'react-router-dom';

function Navbar() {
  //check for login status via presence of token
  const storedToken = localStorage.getItem("authToken");

  const [ buttonToggle, setButtonToggle ] = useState(storedToken);

  const { logOutUser } = useContext(AuthContext);
  const navigate = useNavigate()

  const buttonToggleSwitch = () => {
    if (!storedToken) {
      setButtonToggle(false);
    } else {
      setButtonToggle(true);
    }
  }

  useEffect(()=> {
    buttonToggleSwitch();
  }, [storedToken]);


  function handleLogout() {
    logOutUser();

    //navigate to landing page
     navigate("/")
  }

  return (
    <nav className="Navbar">
      <div className="NavbarLeft">
      <Link to="/home">
        ♢♧ Cardszilla ♡♤
        </Link>
      </div>

      <div classNAme="NavbarRight">
      {!buttonToggle && 
        <Link to="/login">
          <button className="GeneralButton">Login</button>
        </Link>
      }
      
      {!buttonToggle && 
        <Link to="/signup">
          <button className="GeneralButton">Signup</button>
        </Link>
      }

      {buttonToggle &&
        <Link to="/account">
          <button className="GeneralButton">Account</button>
        </Link>
      }

      {buttonToggle &&
        <Link to="/">
          <button className="GeneralButton" onClick={handleLogout}>Logout</button>
        </Link>
      }
      </div>
    </nav>
  );
}

export default Navbar;
