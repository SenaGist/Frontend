import React from 'react';
import '../styles/Configuracion.css';

const Configuracion = () => {
  return (
    <div className="configuracion-page">
      <h2 className="titulo">Configuración del Administrador</h2>

      <div className="config-section">
        <h3>Seguridad</h3>
        <div className="config-item">
          <label htmlFor="cambioContrasena">
            Forzar cambio de contraseña en primer inicio de sesión
          </label>
          <input type="checkbox" id="cambioContrasena" />
        </div>
        <div className="config-item">
          <label htmlFor="intentosFallidos">
            Intentos fallidos antes de bloqueo:
          </label>
          <input type="number" min="1" max="10" id="intentosFallidos" />
        </div>
      </div>

      <div className="config-section">
        <h3>Notificaciones</h3>
        <div className="config-item">
          <label htmlFor="notificarMantenimiento">
            Enviar correo al asignar mantenimiento
          </label>
          <input type="checkbox" id="notificarMantenimiento" />
        </div>
        <div className="config-item">
          <label htmlFor="correoRemitente">Correo remitente:</label>
          <input
            type="email"
            placeholder="admin@senagist.com"
            id="correoRemitente"
          />
        </div>
      </div>

      <div className="config-section">
        <h3>Roles y Permisos</h3>
        <div className="config-item">
          <select>
            <option>Administrador</option>
            <option>Técnico</option>
            <option>Supervisor</option>
          </select>
          <button className="btn-secundario">Editar permisos</button>
        </div>
      </div>

      <div className="guardar-config">
        <button className="btn-principal">Guardar Cambios</button>
      </div>
    </div>
  );
};

export default Configuracion;
