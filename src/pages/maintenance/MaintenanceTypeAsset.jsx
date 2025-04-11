import { useEffect, useState } from "react";
import { fetchCenters } from "../../services/centerService";

export const MaintenanceTypeAsset = ({ type, dialogRef }) => {
    const API_URL = import.meta.env.VITE_API_URL;
    const [centers, setCenters] = useState([]);
    useEffect(() => {
        fetchCenters(API_URL)
            .then(setCenters)
            .catch(console.error)
    }, [API_URL, dialogRef]);

    let content;

    switch (type) {
        case "refrigeration":
            content = (
            <fieldset>
                <legend>Detalles del Activo</legend>
                <div className="field-group">
                    <label>
                        Centro ID:
                        <select name="centerId" >
                            {centers.map((c) => (
                                <option key={c.id} value={c.id}>{c.name}</option>
                            ))}
                        </select>
                    </label>
                    <label>
                        Grupo Principal:
                        <input
                            type="text"
                            name="mainGroup"
                        />
                    </label>
                    <label>
                        Tecnología:
                        <input type="text" name="technology" />
                    </label>
                    <label>
                        Potencia (kW):
                        <input
                            type="number"
                            step="0.1"
                            name="powerKW"
                        />
                    </label>
                    <label>
                        Tipo de Refrigerante:
                        <input
                            type="text"
                            name="refrigerantType"
                        />
                    </label>
                    <label>
                        Capacidad de Refrigerante (kg):
                        <input
                            type="text"
                            name="refrigerantCapacityKg"
                        />
                    </label>
                    <label>
                        Clasificación Energética:
                        <input
                            type="text"
                            name="energyClassification"
                        />
                    </label>
                </div>
                <label>
                    Descripción:
                    <textarea name="description"></textarea>
                </label>
            </fieldset>
            )
            break;
        case"lighting":
            content = (
                <fieldset>
                    <legend>Detalles del Activo</legend>
                    <div className="field-group">
                        <label>
                            Centro ID:
                            <select name="centerId" >
                                {centers.map((c) => (
                                    <option key={c.id} value={c.id}>{c.name}</option>
                                ))}
                            </select>
                        </label>
                        <label>
                            Tecnología:
                            <input type="text" name="technology" />
                        </label>
                        <label>
                            Potencia (kW):
                            <input
                                type="number"
                                step="0.1"
                                name="powerKW"
                            />
                        </label>
                    </div>
                </fieldset>
            )
            break;
        case "general":
            content = (
                <fieldset>
                    <legend>Detalles del Activo</legend>
                    <div className="field-group">
                        <label>
                            Centro ID:
                            <select name="centerId" >
                                {centers.map((c) => (
                                    <option key={c.id} value={c.id}>{c.name}</option>
                                ))}
                            </select>
                        </label>
                        <label>
                            Grupo Principal:
                            <input
                                type="text"
                                name="mainGroup"
                            />
                        </label>
                        <label>
                            Potencia (kW):
                            <input
                                type="number"
                                step="0.1"
                                name="powerKW"
                            />
                        </label>
                        <label>
                            Horas de uso diario:
                            <input
                                type="number"
                                step="0.1"
                                name="dailyUsageHours"
                            />
                        </label>
                    </div>
                    <label>
                        Descripción:
                        <textarea name="description"></textarea>
                    </label>
                </fieldset>
            )
            break;
        default:
            content = (
                <fieldset>
                    <legend>Detalles del Activo</legend>
                    <div className="field-group">
                        <label>
                            Centro ID:
                            <select name="centerId" >
                                {centers.map((c) => (
                                    <option key={c.id} value={c.id}>{c.name}</option>
                                ))}
                            </select>
                        </label>
                        <label>
                            Grupo Principal:
                            <input
                                type="text"
                                name="mainGroup"
                            />
                        </label>
                        <label>
                            Tecnología:
                            <input type="text" name="technology" />
                        </label>
                        <label>
                            Potencia (kW):
                            <input
                                type="number"
                                step="0.1"
                                name="powerKW"
                            />
                        </label>
                        <label>
                            Tipo de Refrigerante:
                            <input
                                type="text"
                                name="refrigerantType"
                            />
                        </label>
                        <label>
                            Capacidad de Refrigerante (kg):
                            <input
                                type="text"
                                name="refrigerantCapacityKg"
                            />
                        </label>
                        <label>
                            Clasificación Energética:
                            <input
                                type="text"
                                name="energyClassification"
                            />
                        </label>
                    </div>
                    <label>
                        Descripción:
                        <textarea name="description"></textarea>
                    </label>
                </fieldset>
            )
            break;
    }
    return(
        <>
        {content}
        </>
    );
}