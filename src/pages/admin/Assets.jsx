import { useRef, useState } from "react";
import { TableFetching } from "../../components/TableFetching";
import { useAssets } from "../../hooks/useAssets";
import { Modal } from "../../components/Modal";

export const Assets = () => {
    const API_URL = import.meta.env.VITE_API_URL;
    const { assets, getMaintenancesPerAsset } = useAssets(API_URL);
    const [maintenances, setMaintenances] = useState([]);
    const maintenancesAssetRef = useRef(null);
    const [selectedAsset, setSelectedAsset] = useState(null);

    const handleModal = (ref) => {
        if (!ref.current) return;
        ref.current.open ? ref.current.close() : ref.current.showModal();
    };

    async function handleModalMaintenances(a) {
        setSelectedAsset(a);
        const data = await getMaintenancesPerAsset(a.id);
        setMaintenances(data);
        handleModal(maintenancesAssetRef);
    }
    return (
        <div className="container">
            <TableFetching
                headers={["ID", "# Inventario", "Ubicación", "Marca", "Modelo", "Acciones"]}
                data={assets}
                rowRenderer={(a) => (
                    <>
                        <td>{a.id}</td>
                        <td>{a.inventory_number}</td>
                        <td>{a.location}</td>
                        <td>{a.brand}</td>
                        <td>{a.model}</td>
                        <td className="actions">
                            <button
                                className="actions-btn-edit"
                                onClick={() => {
                                    handleModalMaintenances(a);
                                }}
                            >
                                Ver mantenimientos
                            </button>
                        </td>
                    </>
                )}
                emptyMessage="No hay equipamientos registrados."
            />
            <Modal dialogRef={maintenancesAssetRef} handleModal={handleModal} title="Mantenimientos del equipo">
                {selectedAsset && (
                    <div>
                        <h4>Equipo: {selectedAsset.inventory_number} - {selectedAsset.brand} {selectedAsset.model}</h4>
                        <p>Ubicación: {selectedAsset.location}</p>
                        <hr />
                        {maintenances.length > 0 ? (
                            <ul className="maintenance-list">
                                {maintenances.map((m) => (
                                    <li key={m.id}>
                                        <strong>{m.start_date}</strong> - {m.description}
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p>No hay mantenimientos registrados para este equipo.</p>
                        )}
                        <div className="modal-buttons">
                            <button className="cancelar" onClick={() => handleModal(maintenancesAssetRef)}>
                                Cerrar
                            </button>
                        </div>
                    </div>
                )}
            </Modal>
        </div>
    )
}