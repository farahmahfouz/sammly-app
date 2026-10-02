import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

//context
import { useContext } from 'react';
import AuthContext from '../context/AuthContext';

export default function Logout() {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    logout();
    navigate('/login');
  }, [logout, navigate]);

  return null;
}