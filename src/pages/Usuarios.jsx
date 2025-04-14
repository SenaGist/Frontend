import React, { useEffect, useState } from 'react';
import '../css/Usuarios.css';
import RegistrarUsuarioModal from '../components/RegistrarUsuarioModal';

const Usuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [mostrarModal, setMostrarModal] = useState(false);

  useEffect(() => {
    const obtenerUsuarios = async () => {
      try {
        const response = await fetch('/api/usuarios');
        const data = await response.json();
        setUsuarios(data);
      } catch (error) {
        console.error('Error al obtener usuarios:', error);
      }
    };

    obtenerUsuarios();
  }, []);

  const guardarUsuario = (nuevoUsuario) => {
    // Aquí puedes hacer un POST a la API más adelante
    setUsuarios(prev => [...prev, nuevoUsuario]);
  };

  return (
    <div className="usuarios-page">
      <div className="usuarios-header">
        <h2>Gestión de Usuarios</h2>
        <button className="nuevo-usuario" onClick={() => setMostrarModal(true)}>Registrar Usuario</button>
      </div>

      <div className="usuarios-table-container">
        <table className="usuarios-table">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Correo</th>
              <th>Rol</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.length > 0 ? (
              usuarios.map((usuario, index) => (
                <tr key={index}>
                  <td>{usuario.nombre}</td>
                  <td>{usuario.correo}</td>
                  <td>{usuario.rol}</td>
                  <td>{usuario.estado}</td>
                  <td>
                    <button className="editar">Editar</button>
                    <button className="eliminar">Eliminar</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="sin-datos">No hay usuarios registrados.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <RegistrarUsuarioModal
        isOpen={mostrarModal}
        onClose={() => setMostrarModal(false)}
        onGuardar={guardarUsuario}
      />
    </div>
  );
};

export default Usuarios;
