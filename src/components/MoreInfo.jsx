import { useEffect, useState } from "react";
import "../styles/Modal.css";
import { useUsers } from "../hooks/useUsers";

export const MoreInfo = ({ data, handleModalMore, moreRef }) => {
    const API_URL = import.meta.env.VITE_API_URL;
    const [technician, setTechnician] = useState(null);
    const { getById } = useUsers(API_URL);

    useEffect(() => {
        async function fetchTechnician() {
            if (!data?.length || data[0]?.user) return;
            try {
                const user = await getById(data[0].id_user);
                setTechnician(user);
            } catch (error) {
                console.error("Error al obtener el técnico:", error);
            }
        }
        fetchTechnician();
    }, [data, getById]);

    return (
        <dialog ref={moreRef} className="modal-fade-in">
            <div className="modal-content">
                <button onClick={handleModalMore} className="close-button-more">✖️</button>
                <h2>Información Detallada</h2>
                {data.map((item) => {
                    const asset = item.asset;
                    const user = item.user || technician;

                    return (
                        <div key={item.id} className="info-section">
                            <h3>Activo #{item.id}</h3>
                            <p><strong>Número de Inventario:</strong> {asset?.inventoryNumber}</p>
                            <p><strong>Técnico:</strong> {user?.name || "Cargando..."}</p>
                            <p><strong>Ubicación:</strong> {asset?.location}</p>
                            <p><strong>Marca:</strong> {asset?.brand}</p>
                            <p><strong>Modelo:</strong> {asset?.model}</p>
                            <p><strong>Tipo de Activo:</strong> {item.assetType}</p>
                            <p><strong>Fecha Inicio:</strong> {item.start_date}</p>
                            <p><strong>Fecha Fin:</strong> {item.end_date}</p>
                            <p><strong>Tipo de Mantenimiento:</strong> {item.type}</p>
                            <p><strong>Descripción:</strong> {item.description}</p>
                            <p><strong>Repuestos:</strong> {item.spare_parts}</p>
                            <p><strong>Observaciones:</strong> {item.remarks}</p>

                            {item.image1Base64 && (
                                <div className="image-container">
                                    <strong>Evidencia 1:</strong>
                                    <img
                                        src={item.image1Base64}
                                        alt={`Evidencia 1 del activo ${asset?.inventoryNumber}`}
                                        className="maintenance-image"
                                    />
                                </div>
                            )}

                            {item.image2Base64 && (
                                <div className="image-container">
                                    <strong>Evidencia 2:</strong>
                                    <img
                                        src={item.image2Base64}
                                        alt={`Evidencia 2 del activo ${asset?.inventoryNumber}`}
                                        className="maintenance-image"
                                    />
                                </div>
                            )}

                            {item.assetDetails && (
                                <div className="details">
                                    <h4>Detalles del Activo:</h4>
                                    {Object.entries(item.assetDetails).map(([key, value]) => (
                                        <p key={key}>
                                            <strong>{key}:</strong> {value}
                                        </p>
                                    ))}
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </dialog>
    );
};
