
// AboutPage.js
import { Link } from 'react-router-dom';

function AboutPage() {
    return (
        <div className="HomePage">
            <div className="HomePageContent">
                <div className="LandingCard">
                    <h1>About Cardszilla</h1>
                    <h5>Cardszilla is a site for managers of card clubs to store and administer their club's details. Create a club, add your members and create a club details page to keep everyone up to date on events!</h5>
                </div>
                <span className="AboutSpan">
                        <Link to='/signup'>
                            Signup
                        </Link>
                </span>
            </div>
        </div>
    )
}

export default AboutPage;