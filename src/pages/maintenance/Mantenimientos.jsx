import { useEffect, useState, useRef } from "react";
import { useAuth } from "../../context/useAuth";
import "./Maintenances.css";
import { MaintenanceForm } from "./MaintenanceForm";
import { fetchUserMaintenances } from "../../services/maintenanceService";

function Mantenimientos() {
  const API_URL = import.meta.env.VITE_API_URL;
  const { userId } = useAuth();
  const dialogRef = useRef(null);
  const [maintenances, setMaintenances] = useState([]);

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
    fetchUserMaintenances(API_URL, userId)
      .then(setMaintenances)
      .catch(console.error);
  }, [API_URL, userId]);

  return (
    <div className="container">
      <MaintenanceForm handleModal={handleModal} dialogRef={dialogRef} userId={userId} />
      <h1 className="title">Mantenimientos Realizados</h1>
      <div className="create-button-wrapper">
        <button className="create-button" onClick={handleModal}>
          Crear Mantenimiento
        </button>
      </div>
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
