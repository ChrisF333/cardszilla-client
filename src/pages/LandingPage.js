
// LandingPage.js
import { Link } from 'react-router-dom';

function LandingPage() {
    return (
        <div className="HomePage">
            <div className="HomePageContent">
                <div className="LandingCard">
                    <h1>Cardszilla</h1>
                    <h3>Home of the card club</h3>
                </div>
                <span className="AboutSpan">
                        <Link to='/about'>
                            About
                        </Link>
                </span>
            </div>
        </div>
    )
}

export default LandingPage;