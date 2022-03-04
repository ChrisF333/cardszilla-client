
//HomePage.js

import { Link } from "react-router-dom";

function HomePage(props) {

    return (
        <div className="HomePage">
            <h1>You have reached the homepage</h1>

            <Link to="../createClub">
                Create a new club!
            </Link>
        </div>
    )
}

export default HomePage;