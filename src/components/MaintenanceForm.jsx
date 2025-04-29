import { useState } from "react";
import { fetchPostMaintenance } from "../services/maintenanceService";
import { MaintenanceTypeAsset } from "../pages/maintenance/MaintenanceTypeAsset";
import { useAssets } from "../hooks/useAssets";
import { useAlert } from "../context/useAlert";
import Alert from "./alert/Alert";

export const MaintenanceForm = ({ handleModal, dialogRef, userId, setMaintenances, apiUrl }) => {
    const [type, setType] = useState("");
    const [inventoryNumber, setInventoryNumber] = useState(null);
    const [existingAsset, setExistingAsset] = useState(undefined);
    const [isLoading, setIsLoading] = useState(false);
    const [comprobate, setComprobate] = useState(false);
    const {alert, showAlert, closeAlert} =  useAlert();

    const { getByInventoryNumber } = useAssets(apiUrl);

    const handleType = (e) => setType(e.target.value);
    const handleChange = (e) => setInventoryNumber(e.target.value);

    const handleComprobe = async (e) => {
        e.preventDefault();
        const asset = await getByInventoryNumber(inventoryNumber);
        setExistingAsset(asset);
        setComprobate(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        const formObject = Object.fromEntries(formData.entries());
    
        const requiredFields = ["start_date", "type", "maintenance_description"];
        const missing = requiredFields.filter(field => !formObject[field]);
    
        if (!existingAsset) {
            const assetFields = ["inventoryNumber", "location", "brand", "model", "asset_type"];
            assetFields.forEach(field => {
                if (!formObject[field]) missing.push(field);
            });
    
            if (type === "refrigeration") {
                const extraFields = ["centerId", "powerKW", "mainGroup", "description", "technology", "refrigerantType", "refrigerantCapacityKg", "energyClassification"];
                extraFields.forEach(field => {
                    if (!formObject[field]) missing.push(field);
                });
            } else if (type === "lighting") {
                const extraFields = ["centerId", "powerKW", "technology"];
                extraFields.forEach(field => {
                    if (!formObject[field]) missing.push(field);
                });
            } else if (type === "general") {
                const extraFields = ["centerId", "powerKW", "mainGroup", "description", "dailyUsageHours"];
                extraFields.forEach(field => {
                    if (!formObject[field]) missing.push(field);
                });
            }
        }
    
        if (missing.length > 0) {
            showAlert("error", "Faltan campos obligatorios: " + missing.join(", "));
            return;
        }
    
        const payload = buildFormData(formObject);
    
        try {
            setIsLoading(true);
            const newMaintenance = await fetchPostMaintenance(payload);
            form.reset();
            handleModal();
            showAlert("success", "Mantenimiento registrado");
            setComprobate(false);
            setExistingAsset(undefined);
            setMaintenances(prev => [...prev, newMaintenance]);
        } catch (err) {
            console.error("Error enviando mantenimiento:", err);
        } finally{
            setIsLoading(false);
        }
    };
    

    const buildFormData = (data) => {
        const asset = buildAssetPayload(data);
        const assetDetails = (!existingAsset && comprobate) ? buildAssetDetails(type, data) : {};

        const payload = {
            asset,
            assetType: data.asset_type,
            id_user: userId,
            start_date: data.start_date,
            end_date: data.end_date || "",
            type: data.type,
            description: data.maintenance_description,
            spare_parts: data.spare_parts || "",
            remarks: data.remarks || "",
            assetDetails,
        };

        const formData = new FormData();
        formData.append('maintenanceDTO', new Blob([JSON.stringify(payload)], { type: 'application/json' }));
        appendImagesToFormData(formData, data);

        return formData;
    };

    const buildAssetPayload = (data) => {
        if (existingAsset && comprobate) {
            const { inventoryNumber, location, brand, model } = existingAsset;
            return { inventoryNumber, location, brand, model };
        }

        return {
            inventoryNumber: data.inventoryNumber,
            location: data.location,
            brand: data.brand,
            model: data.model
        };
    };

    const buildAssetDetails = (type, data) => {
        const baseDetails = {
            centerId: parseInt(data.centerId, 10),
            powerKW: parseFloat(data.powerKW),
        };

        const detailsByType = {
            refrigeration: {
                ...baseDetails,
                mainGroup: data.mainGroup,
                description: data.description,
                technology: data.technology,
                refrigerantType: data.refrigerantType,
                refrigerantCapacityKg: data.refrigerantCapacityKg,
                energyClassification: data.energyClassification
            },
            lighting: {
                ...baseDetails,
                technology: data.technology,
            },
            general: {
                ...baseDetails,
                mainGroup: data.mainGroup,
                description: data.description,
                dailyUsageHours: parseFloat(data.dailyUsageHours)
            }
        };

        return detailsByType[type] || {};
    };

    const appendImagesToFormData = (formData, data) => {
        if (data.image_1 instanceof File) {
            formData.append("image_1", data.image_1);
        }
        if (data.image_2 instanceof File) {
            formData.append("image_2", data.image_2);
        }
    };

    const resetFormState = () => {
        handleModal();
        setComprobate(false);
        setExistingAsset(undefined);
    };

    return (
        <dialog ref={dialogRef} id="favDialog">
            {alert && (
                    <Alert
                      type={alert.type}
                      message={alert.text}
                      onClose={closeAlert}
                    />
                  )}
            <form className="form" onSubmit={handleSubmit}>
                <h2>Crear Mantenimiento</h2>

                {!comprobate && (
                    <fieldset>
                        <legend>Información del Activo</legend>
                        <div className="field-group">
                            <label>
                                Número de Inventario:
                                <input type="text" name="inventoryNumber" required onChange={handleChange} />
                            </label>
                            <button onClick={handleComprobe}>Comprobar</button>
                        </div>
                    </fieldset>
                )}

                {existingAsset === null && (
                    <>
                        <fieldset>
                            <legend>Información del Activo</legend>
                            <div className="field-group">
                                <label>
                                    Número de Inventario:
                                    <input type="text" name="inventoryNumber" required value={inventoryNumber} onChange={handleChange} />
                                </label>
                                <button onClick={handleComprobe}>Comprobar</button>
                            </div>
                        </fieldset>

                        <fieldset>
                            <legend>Detalles del Activo</legend>
                            <div className="field-group">
                                <label>Ubicación:<input type="text" name="location" /></label>
                                <label>Marca:<input type="text" name="brand" /></label>
                                <label>Modelo:<input type="text" name="model" /></label>
                                <label>
                                    Tipo:
                                    <select name="asset_type" onChange={handleType}>
                                        <option value="refrigeration">Equipo Refrigerante</option>
                                        <option value="lighting">Equipo de Luz</option>
                                        <option value="general">Equipo General</option>
                                    </select>
                                </label>
                            </div>
                        </fieldset>

                        <MaintenanceTypeAsset type={type} dialogRef={dialogRef} />
                    </>
                )}

                {comprobate && (
                    <fieldset>
                        <legend>Información del Mantenimiento</legend>
                        <div className="field-group">
                            <label>Fecha de Inicio:<input type="datetime-local" name="start_date" /></label>
                            <label>Fecha de Fin:<input type="datetime-local" name="end_date" /></label>
                            <label>
                                Tipo:
                                <select name="type">
                                    <option value="Preventivo">Preventivo</option>
                                    <option value="Correctivo">Correctivo</option>
                                </select>
                            </label>
                            <label>Repuestos:<input type="text" name="spare_parts" /></label>
                        </div>
                        <label>Descripción:<textarea name="maintenance_description" /></label>
                        <label>Observaciones:<textarea name="remarks" /></label>
                        <label>
                            Imágenes:
                            <input type="file" name="image_1" accept="image/*" />
                            <input type="file" name="image_2" accept="image/*" />
                        </label>
                    </fieldset>
                )}
                <menu>
                    <button type="button" onClick={resetFormState}>Cancelar</button>
                    {comprobate && (
                        <button type="submit" className="send-form" disabled={isLoading}>
                            {isLoading ? "Enviando..." : "Confirmar"}
                        </button>                    )}
                    
                </menu>
            </form>
        </dialog>
    );
};
