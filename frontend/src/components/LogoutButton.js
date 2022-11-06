import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

export default function LogoutButton() {
  const navigate = useNavigate();

  const handleLogout = () => {
    window.localStorage.removeItem('token');
    navigate('/login');
    window.location.reload();
  };

  return (
    <Button
      sx={{
        color: { xs: 'white'},
      }}
      onClick={handleLogout}
    >
      Logout
    </Button>
  );
}
