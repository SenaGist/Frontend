import "../../styles/Modal.css";


export const MoreInfo = ({ data, handleModalMore, moreRef }) => {
    return (
        <dialog ref={moreRef} className="modal-fade-in">
            <div className="modal-content">
                <button onClick={handleModalMore} className="close-button-more">✖️</button>
                <h2>Información Detallada</h2>
                {data.map((item, index) => (
                    <div key={index} className="info-section">
                        <h3>Activo #{index + 1}</h3>
                        <p><strong>Número de Inventario:</strong> {item.asset?.inventory_number}</p>
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
                        <p><strong>Evidencias: </strong> {item.image_1}</p>
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
