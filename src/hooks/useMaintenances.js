import { useEffect, useState } from "react";
import { fetchAllMaintenances, fetchTypeMaintenances, fetchUserMaintenances } from "../services/maintenanceService";

export function useMaintenances(apiUrl) {
    const [maintenances, setMaintenances] = useState([]);
    useEffect(() => {
        fetchAllMaintenances(apiUrl)
            .then(setMaintenances)
            .catch(console.error);
    }, [apiUrl]);

    const getMaintenancesByType = async (type) => {
        try {
            const data = await fetchTypeMaintenances(apiUrl, type);
            return data;
        } catch (err) {
            console.error("Error fetching maintenances:", err);
            return [];
        }
    }
    const getMaintenancesByUser = async (name) => {
        try {
            const data = await fetchUserMaintenances(apiUrl, name);
            return data;
        } catch (err) {
            console.error("Error fetching maintenances:", err);
            return [];
        }
    }
    return { maintenances, setMaintenances, getMaintenancesByType, getMaintenancesByUser }
}