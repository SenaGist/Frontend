import { useState } from "react";
import { fetchPostMaintenance } from "../services/maintenanceService";
import { MaintenanceTypeAsset } from "../pages/maintenance/MaintenanceTypeAsset";

export const MaintenanceForm = ({ handleModal, dialogRef, userId, setMaintenances }) => {
    const [type, setType] = useState("");
    function handleType(e) {
        const select = e.target;
        let selectedOption = select.options[select.selectedIndex]
        setType(selectedOption.value);
    }
    function handleSubmit(e) {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        const data = {};

        formData.forEach((value, key) => {
            data[key] = value;
        });

        const payload = buildPayload(type, data, userId);
        console.log("Enviando payload:", payload);

        fetchPostMaintenance(payload)
            .then((newMaintenance) => {
                form.reset();
                handleModal();
                console.log(newMaintenance);
                
                setMaintenances(((prevState) => [...prevState, newMaintenance]))
            })
            .catch(console.error);
    }

    function buildPayload(type, data, userId) {
        console.log("Datos del formulario:", data);
        const payload = {
            asset: {
                inventoryNumber: data.inventoryNumber,
                location: data.location,
                brand: data.brand,
                model: data.model
            },
            assetType: data.asset_type,
            id_user: userId,
            start_date: data.start_date,
            end_date: data.end_date || "",
            type: data.type,
            description: data.maintenance_description,
            spare_parts: data.spare_parts || "",
            remarks: data.remarks || "",
            assetDetails: {}
        };
        const assetDetailsByType = {
            refrigeration: {
                centerId: parseInt(data.centerId, 10),
                mainGroup: data.mainGroup,
                description: data.description,
                technology: data.technology,
                powerKW: parseFloat(data.powerKW),
                refrigerantType: data.refrigerantType,
                refrigerantCapacityKg: data.refrigerantCapacityKg,
                energyClassification: data.energyClassification
            },
            lighting: {
                centerId: parseInt(data.centerId, 10),
                technology: data.technology,
                powerKW: parseFloat(data.powerKW),
            },
            general: {
                centerId: parseInt(data.centerId, 10),
                mainGroup: data.mainGroup,
                description: data.description,
                powerKW: parseFloat(data.powerKW),
                dailyUsageHours: parseFloat(data.dailyUsageHours)
            }
        };
        payload.assetDetails = assetDetailsByType[type] || {};
        const formData = new FormData();
        const jsonBlob = new Blob([JSON.stringify(payload)], { type: 'application/json' });
        formData.append('maintenanceDTO', jsonBlob);

        if (data.image_1 instanceof File) {
            formData.append("image_1", data.image_1);
        }

        if (data.image_2 instanceof File) {
            formData.append("image_2", data.image_2);
        }
        for (let [key, value] of formData.entries()) {
            console.log('FormData Key:', key, 'Value:', value);
        }
        return formData;
    }

    return (
        <dialog ref={dialogRef} id="favDialog">
            <form className="form" onSubmit={handleSubmit}>
                <h2>Crear Mantenimiento</h2>
                <fieldset>
                    <legend>Información del Activo</legend>
                    <div className="field-group">
                        <label>
                            Número de Inventario:
                            <input
                                type="text"
                                name="inventoryNumber"
                            />
                        </label>
                        <label>
                            Ubicación:
                            <input
                                type="text"
                                name="location"
                            />
                        </label>
                        <label>
                            Marca:
                            <input type="text" name="brand" />
                        </label>
                        <label>
                            Modelo:
                            <input type="text" name="model" />
                        </label>
                        <label>
                            Tipo:
                            <select name="asset_type" onChange={handleType}>
                                <option value="refrigeration">Equipo Refrigerante</option>
                                <option value="lighting">Equipo de luz</option>
                                <option value="general">Equipo general</option>
                            </select>
                        </label>
                    </div>
                </fieldset>

                <MaintenanceTypeAsset type={type} dialogRef={dialogRef} />

                <fieldset>
                    <legend>Información del Mantenimiento</legend>
                    <div className="field-group">
                        <label>
                            Fecha de Inicio:
                            <input
                                type="datetime-local"
                                name="start_date"
                            />
                        </label>
                        <label>
                            Fecha de Fin:
                            <input
                                type="datetime-local"
                                name="end_date"
                            />
                        </label>
                        <label>
                            Tipo:
                            <select name="type" >
                                <option value="Preventivo">Preventivo</option>
                                <option value="Correctivo">Correctivo</option>
                            </select>
                        </label>
                        <label>
                            Repuestos:
                            <input
                                type="text"
                                name="spare_parts"
                            />
                        </label>
                    </div>
                    <label>
                        Descripción:
                        <textarea name="maintenance_description">
                        </textarea>
                    </label>
                    <label>
                        Observaciones:
                        <textarea name="remarks">
                        </textarea>
                    </label>
                    <label>
                        Imagenes:
                        <input type="file" name="image_1" accept="image/*" />
                        <input type="file" name="image_2" accept="image/*" />
                    </label>
                </fieldset>

                <menu>
                    <button type="button" onClick={handleModal}>
                        Cancelar
                    </button>
                    <button type="submit" className="send-form">
                        Confirmar
                    </button>
                </menu>
            </form>
        </dialog>
    )
}