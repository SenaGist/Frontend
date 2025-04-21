import { useEffect, useRef, useState } from "react";
import { fetchAllMaintenances } from "../../services/maintenanceService";
import { TableFetching } from "../../components/TableFetching";
import { MoreInfo } from "../../components/MoreInfo";
import { useMaintenances } from "../../hooks/useMaintenances";

function AdminMaintenances() {
  const API_URL = import.meta.env.VITE_API_URL;
  const moreRef = useRef(null);
  const [selectedMaintenance, setSelectedMaintenance] = useState(null);
  const { maintenances, setMaintenances, getMaintenancesByType} = useMaintenances(API_URL);
  const [filter, setFilter] = useState(null);
  function handleModalMore(m) {
    setSelectedMaintenance(m);
  }
  function handleChange(e) {
    setFilter(e.target.value);
  }
  useEffect(() => {
    if (selectedMaintenance && moreRef.current && !moreRef.current.open) {
      moreRef.current.showModal();
    }
  }, [selectedMaintenance]);

  useEffect(() => {
    const fetchMaintenances = async () => {
      try {
        if (filter) {
          const filtered = await getMaintenancesByType(filter);
          setMaintenances(filtered);
        } else {
          const all = await fetchAllMaintenances(API_URL);
          setMaintenances(all);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchMaintenances()
  }, [API_URL, filter, getMaintenancesByType, setMaintenances]);

  return (
    <div className="container">
      <h1 className="title">Todos los Mantenimientos Realizados</h1>
      <div className="create-button-wrapper">
        <select name="filter" value={filter ?? ""} onChange={handleChange}>
          <option value="" disabled>Filtrar por tipo de mantenimiento</option>
          <option value="preventivo">Preventivo</option>
          <option value="correctivo">Correctivo</option>
        </select>
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
              <button className="btn-more" onClick={() => handleModalMore(m)}>Ver más</button>
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