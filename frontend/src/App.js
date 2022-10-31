import { Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Landing from './pages/Landing';
import Registration from './pages/Registration';

function App() {
  return (
    <div>
          <Routes>
            <Route path="/registration" element={<Registration />} />
            <Route path="/login" element={<Login />} />
            <Route path="/landing" element={<Landing />} />
          </Routes>
    </div>
  );
}

export default App;
