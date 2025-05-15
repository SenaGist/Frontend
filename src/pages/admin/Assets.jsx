import { useRef, useState } from "react";
import { TableFetching } from "../../components/TableFetching";
import { useAssets } from "../../hooks/useAssets";
import { Modal } from "../../components/Modal";
import * as XLSX from "xlsx";

export const Assets = () => {
    const API_URL = import.meta.env.VITE_API_URL;
    const { assets, getMaintenancesPerAsset, getInfoAsset } = useAssets(API_URL);
    const [maintenances, setMaintenances] = useState([]);
    const maintenancesAssetRef = useRef(null);
    const [selectedAsset, setSelectedAsset] = useState(null);

    const handleModal = (ref) => {
        if (!ref.current) return;
        ref.current.open ? ref.current.close() : ref.current.showModal();
    };

    async function exportToExcel() {
        const detailedAssets = await Promise.all(
            assets.map((a) => getInfoAsset(a.id))
        );

        const dataToExport = detailedAssets.map((asset) => ({
            ID: asset.id,
            Placa: asset.inventoryNumber,
            Equipamento: asset.inventoryNumber,
            Ubicación: asset.location,
            Marca: asset.brand,
            Modelo: asset.model,
            Centro: asset.center?.name ?? "No aplica",
            GrupoPrincipal: asset.mainGroup ?? 'No aplica',
            Descripción: asset.description ?? 'No aplica',
            Tecnología: asset.technology ?? 'No aplica',
            PotenciaKW: asset.powerKW ?? 'No aplica',
            TipoRefrigerante: asset.refrigerantType ?? 'No aplica',
            CapacidadRefrigeranteKg: asset.refrigerantCapacityKg ?? 'No aplica',
            ClasificaciónEnergética: asset.energyClassification ?? 'No aplica',
            FechaCreación: asset.created_at?.split('T')[0] ?? ''
        }));

        const worksheet = XLSX.utils.json_to_sheet(dataToExport);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Equipos");

        XLSX.writeFile(workbook, "equipos.xlsx");
    }

    async function handleModalMaintenances(a) {
        setSelectedAsset(a);
        const data = await getMaintenancesPerAsset(a.id);
        setMaintenances(data);
        handleModal(maintenancesAssetRef);
    }
    return (
        <div className="container">
            <div className="create-button-wrapper">
                <button onClick={exportToExcel} className="btn-export">
                    Exportar a Excel
                </button>
            </div>
            <TableFetching
                headers={[
                    "ID",
                    "# Inventario",
                    "Ubicación",
                    "Marca",
                    "Modelo",
                    "Acciones",
                ]}
                data={assets}
                rowRenderer={(a) => (
                    <>
                        <td>{a.id}</td>
                        <td>{a.inventoryNumber}</td>
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
            <Modal
                dialogRef={maintenancesAssetRef}
                handleModal={handleModal}
                title="Mantenimientos del equipo"
            >
                {selectedAsset && (
                    <div className="mantenimiento-contenido">
                        <div className="mantenimiento-info">
                            <p>
                                <strong>Equipo:</strong> {selectedAsset.inventory_number} -{" "}
                                {selectedAsset.brand} {selectedAsset.model}
                            </p>
                            <p>
                                <strong>Ubicación:</strong> {selectedAsset.location}
                            </p>
                        </div>
                        <hr />
                        {maintenances.length > 0 ? (
                            <ul className="mantenimiento-lista">
                                {maintenances.map((m) => (
                                    <li key={m.id} className="mantenimiento-item">
                                        <p className="mantenimiento-fecha">
                                            {new Date(m.start_date).toLocaleString()}
                                        </p>
                                        <p className="mantenimiento-descripcion">
                                            Técnico: {m.user.name}
                                        </p>
                                        <p className="mantenimiento-descripcion">Tipo: {m.type}</p>
                                        <p className="mantenimiento-descripcion">
                                            Descripción: {m.description}
                                        </p>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="mensaje-vacio">
                                No hay mantenimientos registrados para este equipo.
                            </p>
                        )}
                        <div className="modal-buttons">
                            <button
                                className="cancelar"
                                onClick={() => handleModal(maintenancesAssetRef)}
                            >
                                Cerrar
                            </button>
                        </div>
                    </div>
                )}
            </Modal>
        </div>
    );
};
