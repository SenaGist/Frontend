import { useEffect, useRef, useState } from "react";
import { fetchUsers, fetchPostUser } from "../../services/userService";
import { TableFetching } from "../../components/TableFetching";
import { Modal } from "../../components/Modal";
import "../../styles/Maintenances.css";

function Users() {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: "",
    role: ''
  });

  const API_URL = import.meta.env.VITE_API_URL;
  const createDialogRef = useRef(null);
  const deleteDialogRef = useRef(null);

  const handleModal = (ref) => {
    if (!ref.current) return;
    ref.current.open ? ref.current.close() : ref.current.showModal();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchPostUser(API_URL, formData)
      .then((newUser) => {
        setUsers(prev => [...prev, newUser.data]);
        setFormData({ name: '', email: '', password: '', role: '' });
        handleModal(createDialogRef);
      })
      .catch(console.error);
  };

  useEffect(() => {
    fetchUsers(API_URL)
      .then(setUsers)
      .catch(console.error);
  }, [API_URL]);

  return (
    <div className="container">
      <Modal
        dialogRef={createDialogRef}
        handleModal={handleModal}
        title="Registrar Nuevo Usuario"
      >
        <form className="form-registro" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Nombre"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Correo"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Contraseña"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            required
          >
            <option value="">Seleccione un rol</option>
            <option value="admin">Administrador</option>
            <option value="tech">Técnico</option>
          </select>
          <div className="modal-buttons">
            <button type="submit" className="guardar">Guardar</button>
            <button
              type="button"
              className="cancelar"
              onClick={() => handleModal(createDialogRef)}
            >
              Cancelar
            </button>
          </div>
        </form>
      </Modal>
      <Modal
        dialogRef={deleteDialogRef}
        handleModal={handleModal}
        title="¿Está seguro de querer eliminar este usuario?"
      >
        <div className="modal-buttons">
          <button className="guardar">Sí, eliminar</button>
          <button className="cancelar" onClick={() => handleModal(deleteDialogRef)}>Cancelar</button>
        </div>
      </Modal>
      <div className="create-button-wrapper">
        <button className="create-button" onClick={() => handleModal(createDialogRef)}>
          Crear Usuarios
        </button>
      </div>

      <TableFetching
        headers={["ID", "Nombre", "Correo", "Rol", "Acciones"]}
        data={users}
        rowRenderer={(u) => (
          <>
            <td>{u.id}</td>
            <td>{u.name}</td>
            <td>{u.email}</td>
            <td>{u.role}</td>
            <td className="actions">
              <button className="actions-btn-edit">Editar</button>
              <button className="actions-btn-delete" onClick={() => handleModal(deleteDialogRef)}>Eliminar</button>
            </td>
          </>
        )}
        emptyMessage="No hay usuarios registrados."
      />
    </div>
  );
}

export default Users;
