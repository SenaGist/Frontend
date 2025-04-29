import React from "react";
import { useLocation } from "react-router-dom";
import { useSidebar } from "../context/useSidebar";

function Topbar() {
  const location = useLocation();
  const { toggleSidebar } = useSidebar();

  const titles = {
    "/usuarios": "Gestión de Usuarios",
    "/admin/usuarios": "Gestión de Usuarios",
    "/mantenimientos": "Mantenimentos",
    "/admin/mantenimientos": "Mantenimentos",
    "/admin/equipamentos": "Equipamentos",
    "/configuracion": "Configuración",
    "/admin/configuracion": "Configuración",
  };

  const pageTitle = titles[location.pathname] || "Panel de Control";

  return (
    <header className="topbar">
      <div className="topbar-left">
        <button className="menu-button" onClick={toggleSidebar}>
          ☰
        </button>
        <h1 className="brand">SENAGIST</h1>
      </div>

      <p className="title">{pageTitle}</p>

      <div className="profile-info"></div>
    </header>
  );
}

export default Topbar;
