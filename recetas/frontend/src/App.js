import React, { useState, useEffect } from 'react';
import './App.css';
import InicioSesion from './paginas/inicio_sesion';
import Inicio from './paginas/inicio';
import { getAuth, saveAuth, clearAuth } from './utils/auth';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    if (auth && auth.user) setUser(auth.user);
  }, []);

  return (
    <div>
      {user ? (
        <Inicio user={user} onLogout={() => { clearAuth(); setUser(null); }} />
      ) : (
        <InicioSesion onLoginSuccess={(data) => { setUser(data); /* saveAuth handled at login */ }} />
      )}
    </div>
  );
}

export default App;
