import { useRef, useState } from "react";
import { TableFetching } from "../../components/TableFetching";
import { useAssets } from "../../hooks/useAssets";
import { Modal } from "../../components/Modal";
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";

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

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Equipos");

    const headers = [
        { header: "ID", key: "id", width: 10 },
        { header: "Placa", key: "inventoryNumber", width: 25 },
        { header: "Ubicación", key: "location", width: 25 },
        { header: "Marca", key: "brand", width: 20 },
        { header: "Modelo", key: "model", width: 20 },
        { header: "Centro", key: "centerName", width: 35 },
        { header: "Grupo Principal", key: "mainGroup", width: 25 },
        { header: "Descripción", key: "description", width: 40 },
        { header: "Tecnología", key: "technology", width: 20 },
        { header: "Potencia (KW)", key: "powerKW", width: 15 },
        { header: "Tipo Refrigerante", key: "refrigerantType", width: 20 },
        { header: "Capacidad Refrigerante (Kg)", key: "refrigerantCapacityKg", width: 25 },
        { header: "Clasificación Energética", key: "energyClassification", width: 25 },
        { header: "Fecha de Creación", key: "created_at", width: 20 }
    ];

    worksheet.columns = headers;

    detailedAssets.forEach((asset) => {
        worksheet.addRow({
            id: asset.id,
            inventoryNumber: asset.inventoryNumber,
            location: asset.location,
            brand: asset.brand,
            model: asset.model,
            centerName: asset.center?.name ?? 'No aplica',
            mainGroup: asset.mainGroup ?? 'No aplica',
            description: asset.description ?? 'No aplica',
            technology: asset.technology ?? 'No aplica',
            powerKW: asset.powerKW ?? 'No aplica',
            refrigerantType: asset.refrigerantType ?? 'No aplica',
            refrigerantCapacityKg: asset.refrigerantCapacityKg ?? 'No aplica',
            energyClassification: asset.energyClassification ?? 'No aplica',
            created_at: asset.created_at?.split("T")[0] ?? 'No aplica',
        });
    });

    worksheet.getRow(1).eachCell((cell) => {
        cell.font = { bold: true };
        cell.alignment = { vertical: "middle", horizontal: "center", wrapText: true };
        cell.fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: 'FFDDEEFF' }
        };
        cell.border = {
            top: { style: "thin" },
            left: { style: "thin" },
            bottom: { style: "thin" },
            right: { style: "thin" }
        };
    });

    worksheet.eachRow({ includeEmpty: false }, (row, rowNumber) => {
        if (rowNumber === 1) return;
        row.eachCell((cell) => {
            cell.alignment = { vertical: "middle", wrapText: true };
            cell.border = {
                top: { style: "thin" },
                left: { style: "thin" },
                bottom: { style: "thin" },
                right: { style: "thin" }
            };
        });
    });

    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    saveAs(blob, "equipos.xlsx");
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
