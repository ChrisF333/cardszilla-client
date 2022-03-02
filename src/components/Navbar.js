
//Navbar.js

import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="Navbar">
      ♢♧ Cardszilla ♡♤
      <Link to="/login">
        <button>Login</button>
      </Link>

      <Link to="/signup">
        <button>Signup</button>
      </Link>
    </nav>
  );
}

export default Navbar;
