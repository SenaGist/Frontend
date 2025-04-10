import { useSidebar } from "../context/useSidebar";

function Topbar() {
  const {toggleSidebar} = useSidebar();
    return (
      <header className="topbar">
        <button className="menu-button" onClick={toggleSidebar}>☰</button>
        <p className="title">Panel de Control</p>
        <div className="profile-info">
          <span>Perfil del Usuario</span>
        </div>
      </header>
    );
  }
  
  export default Topbar;
  