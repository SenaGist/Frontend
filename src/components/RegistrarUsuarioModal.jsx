import React, { useState } from 'react';
import '../css/RegistrarUsuarioModal.css';

const RegistrarUsuarioModal = ({ isOpen, onClose, onGuardar }) => {
  const [formData, setFormData] = useState({
    nombre: '',
    correo: '',
    rol: '',
    estado: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onGuardar(formData); // Esto lo manejarás desde Usuarios.jsx
    onClose(); // Cierra el modal
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <h3>Registrar Nuevo Usuario</h3>
        <form onSubmit={handleSubmit} className="form-registro">
          <input type="text" name="nombre" placeholder="Nombre" value={formData.nombre} onChange={handleChange} required />
          <input type="email" name="correo" placeholder="Correo" value={formData.correo} onChange={handleChange} required />
          <input type="text" name="rol" placeholder="Rol" value={formData.rol} onChange={handleChange} required />
          <input type="text" name="estado" placeholder="Estado" value={formData.estado} onChange={handleChange} required />
          <div className="modal-buttons">
            <button type="submit" className="guardar">Guardar</button>
            <button type="button" className="cancelar" onClick={onClose}>Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegistrarUsuarioModal;
