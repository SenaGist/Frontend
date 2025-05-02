import { useCallback, useState } from "react";
import { fetchAllMaintenances } from "../services/maintenanceService";

export function useMaintenances(apiUrl) {
    const [maintenances, setMaintenances] = useState([]);
    useCallback(() => {
        fetchAllMaintenances(apiUrl)
            .then(setMaintenances)
            .catch(console.error);
    }, [apiUrl]);

    return { maintenances, setMaintenances }
}