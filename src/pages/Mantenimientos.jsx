import { useEffect, useState } from "react";
import { useAuth } from "../context/useAuth";
import "./Maintenances.css";

function Mantenimientos() {
  const API_URL = import.meta.env.VITE_API_URL;
  const { userId } = useAuth();
  const [maintenances, setMaintenances] = useState([]);

  useEffect(() => {
    async function getMaintenances() {
      try {
        const response = await fetch(`${API_URL}/maintenances/user/${userId}`);
        if (!response.ok) {
          console.error("Error HTTP:", response.status);
          return;
        }
        const data = await response.json();
        setMaintenances(data);
      } catch (error) {
        console.error("Error de red:", error);
      }
    }

    getMaintenances();
  }, [API_URL, userId]);

  return (
    <div className="container">
      <h1 className="title">Mantenimientos Realizados</h1>
      <div className="table-responsive">
        <table className="maintenance-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Fecha</th>
              <th>Tipo</th>
              <th>Descripción</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {maintenances.map((m) => (
              <tr key={m.id}>
                <td>{m.id}</td>
                <td>{new Date(m.start_date).toLocaleDateString()}</td>
                <td>{m.type}</td>
                <td>{m.description}</td>
                <td>
                  <button onClick={() => alert(JSON.stringify(m, null, 2))}>
                    Ver más
                  </button>
                </td>
              </tr>
            ))}
            {maintenances.length === 0 && (
              <tr>
                <td colSpan="5" className="no-data">
                  No hay mantenimientos registrados.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Mantenimientos;
