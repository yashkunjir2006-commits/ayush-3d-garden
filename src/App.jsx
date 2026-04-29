import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Database from './pages/Database';
import Garden3D from './pages/Garden3D';
import Help from './pages/Help';
import Quiz from './pages/Quiz';
import CharacterSelect from './pages/CharacterSelect';
import { useEconomy } from './store/useEconomy';
import VaidyaChat from './components/VaidyaChat';
import { useEffect } from 'react';

function App() {
  const claimDailyLogin = useEconomy((state) => state.claimDailyLogin);
  const addTime = useEconomy((state) => state.addTime);

  useEffect(() => {
    claimDailyLogin();
    
    // Track play time across the entire web session
    const timer = setInterval(() => {
      addTime(1);
    }, 1000);

    return () => clearInterval(timer);
  }, [claimDailyLogin, addTime]);

  return (
    <Router>
      <div className="font-sans text-slate-800 bg-slate-50 min-h-screen">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/database" element={<Database />} />
          <Route path="/garden" element={<Garden3D />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/character-select" element={<CharacterSelect />} />
          <Route path="/help" element={<Help />} />
        </Routes>
        <VaidyaChat />
      </div>
    </Router>
  );
}

export default App;
