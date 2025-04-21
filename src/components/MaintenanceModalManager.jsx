import { useState } from "react"
import { Modal } from "./Modal"
import {useAssets} from "../hooks/useAssets"
import { MaintenanceForm } from "./MaintenanceForm";
export const MaintenanceModalManager = ({dialogRef, handleModal}) => {
    const API_URL = import.meta.env.VITE_API_URL;
    const [inventoryNumber, setInventoryNumber] = useState(null);
    const [existingAsset, setExistingAsset] = useState([]);
    const {getByInventoryNumber} = useAssets(API_URL);
    function handleChange(e) {
        setInventoryNumber(e.target.value)
    }
    async function handleSubmit () {
        const asset = await getByInventoryNumber(inventoryNumber);
        setExistingAsset(asset);
        handleModal(dialogRef)
    }
    return (
        <>
        <Modal dialogRef={dialogRef} title={"Ingrese el número de placa"}>
            <input type="text" placeholder="Numero de placa" onChange={(e) => handleChange(e)}/>
            <button onClick={handleSubmit}>Comprobar</button>
            <button onClick={handleModal}>Cancelar</button>
        </Modal>
        {existingAsset.length>0 && (
            <MaintenanceForm></MaintenanceForm>
        )}
        </>
        
    )
}