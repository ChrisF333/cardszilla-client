import './App.css';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';

import IsPrivate from "./components/IsPrivate";  
import IsAnon from "./components/IsAnon"; 

function App() {
  return (
    <div className="App">
      <Navbar />

      <Routes>
        <Route exact path="/" element={<LandingPage />} />

        <Route path="/signup" element={<IsAnon> <SignupPage /> </IsAnon>} />
        <Route path="/login" element={<IsAnon> <LoginPage /> </IsAnon>} />
        <Route path="/home" element={<IsPrivate ><HomePage /> </IsPrivate>} />
      </Routes>
    </div>
  );
}

export default App;
