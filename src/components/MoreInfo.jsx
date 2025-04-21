import "../styles/Modal.css";

export const MoreInfo = ({ data, handleModalMore, moreRef }) => {
    return (
        <dialog ref={moreRef} className="modal-fade-in">
            <div className="modal-content">
                <button onClick={handleModalMore} className="close-button-more">✖️</button>
                <h2>Información Detallada</h2>
                {data.map((item, index) => (
                    <div key={index} className="info-section">
                        <h3>Activo #{item.id}</h3>
                        <p><strong>Número de Inventario:</strong> {item.asset?.inventoryNumber}</p>
                        <p><strong>Técnico:</strong> {item.user.name}</p>
                        <p><strong>Ubicación:</strong> {item.asset?.location}</p>
                        <p><strong>Marca:</strong> {item.asset?.brand}</p>
                        <p><strong>Modelo:</strong> {item.asset?.model}</p>
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
                                    alt={`Evidencia 1 del activo ${item.asset?.inventoryNumber}`}
                                    className="maintenance-image"
                                />
                            </div>
                        )}

                        {item.image2Base64 && (
                            <div className="image-container">
                                <strong>Evidencia 2:</strong>
                                <img
                                    src={item.image2Base64}
                                    alt={`Evidencia 2 del activo ${item.asset?.inventoryNumber}`}
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
                ))}
            </div>
        </dialog>
    );
};
