import { Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Landing from './pages/Landing';
import Registration from './pages/Registration';
import AddingPage from './pages/AddingPage';
import NavBar from './components/Header';

function App() {
  return (
    <div>
      <NavBar/>
      <div>
          <Routes>
            <Route path="/registration" element={<Registration />} />
            <Route path="/login" element={<Login />} />
            <Route path="/landing" element={<Landing />} />
            <Route path="/addPage" element={<AddingPage />} />
          </Routes>
      </div>
    </div>
  );
}

export default App;
