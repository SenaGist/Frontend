import React from 'react';
import { useLocation } from 'react-router-dom';

function Topbar({ toggleSidebar }) {
  const location = useLocation();

  const titles = {
    '/home': 'Panel Principal',
    '/usuarios': 'Gestión de Usuarios',
    '/equipos': 'Gestión de Equipos',
    '/configuracion': 'Configuración',
  };

  const pageTitle = titles[location.pathname] || 'Panel de Control';

  return (
    <header className="topbar">
      <div className="topbar-left">
        <button className="menu-button" onClick={toggleSidebar}>☰</button>
        <h1 className="brand">SENAGIST</h1>
      </div>

      <p className="title">{pageTitle}</p>

      <div className="profile-info">
      </div>
    </header>
  );
}

export default Topbar;
