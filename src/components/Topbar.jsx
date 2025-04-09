function Topbar({ toggleSidebar }) {
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
  