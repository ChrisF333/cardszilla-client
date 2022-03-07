import './App.css';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';

import IsPrivate from "./components/IsPrivate";  
import IsAnon from "./components/IsAnon"; 
import AccountPage from './pages/AccountPage';
import CreateClub from './pages/CreateClub';
import ClubDetailsPage from './pages/ClubDetailsPage';
import CreateMemberPage from './pages/CreateMemberPage';
import CreateEventPage from './pages/CreateEventPage';


function App() {
  return (
    <div className="App">
      <Navbar />

      <Routes>
        <Route exact path="/" element={<LandingPage />} />

        <Route path="/signup" element={<IsAnon> <SignupPage /> </IsAnon>} />
        <Route path="/login" element={<IsAnon> <LoginPage /> </IsAnon>} />
        <Route path="/home" element={<IsPrivate ><HomePage /> </IsPrivate>} />
        <Route path="/account" element={<IsPrivate> <AccountPage /> </IsPrivate>} />
        <Route path='/createClub' element={<CreateClub />} />
        <Route path='/clubDetails/:id' element={<ClubDetailsPage />} />
        <Route path='/createMember/:id' element={<CreateMemberPage />} />
        <Route path='/createEvent/:id' element={<CreateEventPage />} />
      </Routes>
    </div>
  );
}

export default App;
