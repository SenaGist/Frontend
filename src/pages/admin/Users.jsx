import { useEffect, useRef } from "react";
import { useState } from "react";
import { fetchUsers } from "../../services/userService";
import { TableFetching } from "../../components/TableFetching";
import "../../styles/Maintenances.css"
import { UserForm } from "../../components/UserForm";
function Users() {
  const [users, setUsers] = useState([]);
  const API_URL = import.meta.env.VITE_API_URL;
    const dialogRef = useRef(null);
    function handleModal() {
      if (!dialogRef.current) return;
      const dialog = dialogRef.current;
      if (!dialog.open) {
        dialogRef.current.showModal();
      } else {
        dialogRef.current.close();
      }
    }
  useEffect(() => {
    fetchUsers(API_URL)
      .then(setUsers)
      .catch(console.error)
  }, [API_URL]);
  return (
    <div className="container">
      <UserForm handleModal={handleModal} dialogRef={dialogRef} setUsers={setUsers}/>
      <div className="create-button-wrapper">
        <button className="create-button" onClick={handleModal}>
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
          <td>
            <button>Editar</button>
          </td>
        </>
      )}
      emptyMessage="No hay usuarios registrados."
    />
    </div>
  )
}
export default Users;
