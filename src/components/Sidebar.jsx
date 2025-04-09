import { Link } from 'react-router-dom';

function Sidebar() {
  return (
    <>
      <h2>SENAGIST</h2>
      <nav>
        <ul>
          <li><Link to="/">Inicio</Link></li>
          <li><Link to="/usuarios">Usuarios</Link></li>
          <li><Link to="/equipos">Equipos</Link></li>
          <li><Link to="/configuracion">Configuración</Link></li>
        </ul>
      </nav>
      <div className="profile">
        <span>Perfil del Usuario</span>
        <button>Cerrar sesión</button>
      </div>
    </>
  );
}

export default Sidebar;
