import { useRef, useState } from "react";
import { TableFetching } from "../../components/TableFetching";
import { useAssets } from "../../hooks/useAssets";
import { Modal } from "../../components/Modal";

export const Assets = () => {
    const API_URL = import.meta.env.VITE_API_URL;
    const {assets} = useAssets(API_URL);
    const assetDialogRef = useRef(null);
    const [selectedAsset, setSelectedAsset] = useState(null);

    const handleModal = (ref) => {
        if (!ref.current) return;
        ref.current.open ? ref.current.close() : ref.current.showModal();
    };
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
                                    
                                }}
                            >
                                Ver mantenimientos
                            </button>
                        </td>
                    </>
                )}
                emptyMessage="No hay equipamientos registrados."
            />
            <Modal dialogRef={assetDialogRef} handleModal={handleModal} title={"Mantenimientos realizados"}>
                
            </Modal>
        </div>
    )
}