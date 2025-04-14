import { useEffect } from "react";
import { useState } from "react";
import { fetchUsers } from "../../services/userService";
import { TableFetching } from "../../components/TableFetching";
import "../../styles/Maintenances.css"
function Users() {
  const [users, setUsers] = useState([]);
  const API_URL = import.meta.env.VITE_API_URL;
  useEffect(() => {
    fetchUsers(API_URL)
      .then(setUsers)
      .catch(console.error)
  }, [API_URL]);
  return (
    <div className="container">
      <div className="create-button-wrapper">
        <button className="create-button">
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
