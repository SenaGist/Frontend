import { useEffect, useRef, useState } from "react";
import { fetchAllMaintenances } from "../../services/maintenanceService";
import { TableFetching } from "../../components/TableFetching";
import { MoreInfo } from "../../components/MoreInfo";
import { UserForm } from "../../components/UserForm";

function AdminMaintenances() {
  const API_URL = import.meta.env.VITE_API_URL;
  const moreRef = useRef(null);
  const [maintenances, setMaintenances] = useState([]);
  const [selectedMaintenance, setSelectedMaintenance] = useState(null);
  function handleModalMore(m) {
    setSelectedMaintenance(m);
  }
  useEffect(() => {
    if (selectedMaintenance && moreRef.current && !moreRef.current.open) {
      moreRef.current.showModal();
    }
  }, [selectedMaintenance]);
  useEffect(() => {
    fetchAllMaintenances(API_URL)
      .then(setMaintenances)
      .catch(console.error);
  }, [API_URL]);
  return (
    <div className="container">
      <h1 className="title">Todos los Mantenimientos Realizados</h1>
      
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
        <MoreInfo data={[{
          ...selectedMaintenance,
          image1Base64: `data:image/jpeg;base64,${selectedMaintenance.image_1}`,
          image2Base64: `data:image/jpeg;base64,${selectedMaintenance.image_2}`,
        }]} handleModalMore={() => handleModalMore(null)} moreRef={moreRef} />
      )}
    </div>
  )
}
export default AdminMaintenances;