import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../context/useAuth';
import { FaHome, FaUsers, FaCogs, FaLaptop } from 'react-icons/fa';
import logo from "../assets/logo.png"
function Sidebar({toggleSidebar}) {
  const {logout} = useAuth();
  function handleLogout() {
    logout();
  }
  return (
    <>
      <div className="sidebar-header">
        <img src={logo} alt="Logo SENA" className="sidebar-logo" />
        <span className="sidebar-title">SENAGIST</span>
      </div>
      <nav>
        <ul>
          <li><FaHome /><Link to="/">Inicio</Link></li>
          <li><FaUsers /><Link to="/usuarios">Usuarios</Link></li>
          <li><FaLaptop /><Link to="/equipos">Equipos</Link></li>
          <li><FaCogs /><Link to="/configuracion">Configuración</Link></li>
        </ul>
      </nav>
      <div className="profile">
        <span>Perfil del Usuario</span>
        <button onClick={handleLogout}>Cerrar sesión</button>
      </div>
      <button className="close-button" onClick={toggleSidebar}>✖ Cerrar</button>
    </>
  );
}

export default Sidebar;
