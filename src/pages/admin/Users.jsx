import { useRef, useState } from "react";
import { TableFetching } from "../../components/TableFetching";
import { Modal } from "../../components/Modal";
import "../../styles/Maintenances.css";
import { useUsers } from "../../hooks/useUsers";
import { UserForm } from "../../components/UserForm";

function Users() {
  const API_URL = import.meta.env.VITE_API_URL;
  const { users, createUser, updateUser, deleteUser } = useUsers(API_URL);
  const [userDeletedId, setUserDeletedId] = useState(null);
  const [newUserData, setnewUserData] = useState({
    name: "",
    email: "",
    password: "",
    role: ""
  });
  const [editUserData, seteditUserData] = useState({
    id: 0,
    name: "",
    email: "",
    password: "",
    role: ""
  });

  const createDialogRef = useRef(null);
  const deleteDialogRef = useRef(null);
  const editDialogRef = useRef(null);

  const handleModal = (ref) => {
    if (!ref.current) return;
    ref.current.open ? ref.current.close() : ref.current.showModal();
  };

  const handleChange = (e, isEdit = false) => {
    const { name, value } = e.target;
    const updater = isEdit ? seteditUserData : setnewUserData;
    updater(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createUser(newUserData);
      setnewUserData({ name: "", email: "", password: "", role: "" });
      handleModal(createDialogRef);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async () => {
    if (!userDeletedId) return;
    try {
      await deleteUser(userDeletedId);
      setUserDeletedId(null);
      handleModal(deleteDialogRef);
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    try {
      await updateUser(editUserData);
      handleModal(editDialogRef);
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div className="container">
      <Modal dialogRef={createDialogRef} handleModal={handleModal} title="Registrar Nuevo Usuario">
        <UserForm
          formData={newUserData}
          onChange={(e) => handleChange(e, false)}
          onSubmit={handleSubmit}
          onCancel={() => handleModal(createDialogRef)}
        />
      </Modal>

      <Modal dialogRef={deleteDialogRef} handleModal={handleModal} title="¿Está seguro de querer eliminar este usuario?">
        <div className="modal-buttons">
          <button className="guardar" onClick={handleDelete}>Sí, eliminar</button>
          <button className="cancelar" onClick={() => handleModal(deleteDialogRef)}>Cancelar</button>
        </div>
      </Modal>

      <Modal dialogRef={editDialogRef} handleModal={handleModal} title="Editar usuario">
        <UserForm
          formData={editUserData}
          onChange={(e) => handleChange(e, true)}
          onSubmit={handleEdit}
          onCancel={() => handleModal(editDialogRef)}
        />
      </Modal>

      <div className="create-button-wrapper">
        <button className="create-button" 
        onClick={() => handleModal(createDialogRef)}
        >Crear Usuarios</button>
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
              <button
                className="actions-btn-edit"
                onClick={() => {
                  seteditUserData(u);
                  handleModal(editDialogRef);
                }}
              >
                Editar
              </button>
              <button
                className="actions-btn-delete"
                onClick={() => {
                  setUserDeletedId(u.id);
                  handleModal(deleteDialogRef);
                }}
              >
                Eliminar
              </button>
            </td>
          </>
        )}
        emptyMessage="No hay usuarios registrados."
      />
    </div>
  );
}

export default Users;
