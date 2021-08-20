import { useState, useEffect } from 'react';

import api from '../../api';
import history from '../../history';

export default function useAuth() {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`;
      setAuthenticated(true);
    }

    setLoading(false);
  }, []);
  
  async function handleLogin(dados) {

    const userName = dados.login
    const password = dados.password
    const response = "";

    try {
      const response = await api.post('/users/login', { userName, password });
      const nome = response.data.name;

      localStorage.setItem('name', JSON.stringify(response.data.name));
      localStorage.setItem('id', JSON.stringify(response.data.id));
      

      setAuthenticated(true);
      history.push({
        pathname: '/Users',
        state: nome,
      });
    } catch (err) {
      alert("Erro no login! verifique seus dados ");
    } 
    
  }

  function handleLogout() {
    setAuthenticated(false);
    localStorage.removeItem('token');
    api.defaults.headers.Authorization = undefined;
    history.push('/login');
  }
  
  return { authenticated, loading, handleLogin, handleLogout };
}