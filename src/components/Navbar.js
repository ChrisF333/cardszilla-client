
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
      <Link to="/home">
        ♢♧ Cardszilla ♡♤
        </Link>
      {!buttonToggle && 
        <Link to="/login">
          <button>Login</button>
        </Link>
      }

      {!buttonToggle && 
        <Link to="/signup">
          <button>Signup</button>
        </Link>
      }

      {buttonToggle &&
        <Link to="/account">
          <button>Account</button>
        </Link>
      }

      {buttonToggle &&
        <Link to="/">
          <button onClick={handleLogout}>Logout</button>
        </Link>
      }
    </nav>
  );
}

export default Navbar;
