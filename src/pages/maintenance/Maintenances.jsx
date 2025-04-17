import { useEffect, useState, useRef } from "react";
import { useAuth } from "../../context/useAuth";
import "../../styles/Maintenances.css";
import { MaintenanceForm } from "../../components/MaintenanceForm";
import { fetchUserMaintenances } from "../../services/maintenanceService";
import { TableFetching } from "../../components/TableFetching";
import { MoreInfo } from "../../components/MoreInfo";

function Maintenances() {
  const API_URL = import.meta.env.VITE_API_URL;
  const { userId } = useAuth();
  const dialogRef = useRef(null);
  const moreRef = useRef(null);
  const [maintenances, setMaintenances] = useState([]);
  const [selectedMaintenance, setSelectedMaintenance] = useState(null);

  function handleModal() {
    if (!dialogRef.current) return;
    const dialog = dialogRef.current;
    if (!dialog.open) {
      dialogRef.current.showModal();
    } else {
      dialogRef.current.close();
    }
  }
  function handleModalMore(m) {
    setSelectedMaintenance(m);
  }
  useEffect(() => {
    if (selectedMaintenance && moreRef.current && !moreRef.current.open) {
      moreRef.current.showModal();
    }
  }, [selectedMaintenance]);

  useEffect(() => {
    fetchUserMaintenances(API_URL, userId)
      .then(setMaintenances)
      .catch(console.error);
  }, [API_URL, userId]);

  return (
    <div className="container">
      <MaintenanceForm handleModal={handleModal} dialogRef={dialogRef} userId={userId} setMaintenances={setMaintenances} />
      <h1 className="title">Mantenimientos Realizados</h1>
      <div className="create-button-wrapper">
        <button className="create-button" onClick={handleModal}>
          Crear Mantenimiento
        </button>
      </div>
      <TableFetching
        headers={["ID", "Fecha", "Tipo", "Descripción", "Acciones"]}
        data={maintenances}
        rowRenderer={(m) => (
          <>
            <td>{m.id}</td>
            <td>{new Date(m.start_date).toLocaleDateString()}</td>
            <td>{m.type}</td>
            <td>{m.description}</td>
            <td>
              <button onClick={() => handleModalMore(m)}>Ver más</button>
            </td>
          </>
        )}
        emptyMessage="No hay mantenimientos registrados."
      />
      {selectedMaintenance && (
        <MoreInfo data={[selectedMaintenance]} handleModalMore={() => handleModalMore(null)} moreRef={moreRef} />
      )}
    </div>
  );
}

export default Maintenances;
