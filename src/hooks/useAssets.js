import { useEffect, useState } from "react";
import { fetchAllAssets, fetchMaintenancesPerAsset } from "../services/assetService";

export function useAssets(apiUrl) {
    const [assets, setAssets] = useState([]);

    useEffect(() => {
        fetchAllAssets(apiUrl)
            .then(setAssets)
            .catch(console.error);
    }, [apiUrl]);

    const getMaintenancesPerAsset = async (id) => {
        try {
            const data = await fetchMaintenancesPerAsset(apiUrl, id); // ya es json
            return data;
        } catch (err) {
            console.error("Error fetching maintenances:", err);
            return [];
        }
    };

    return { assets, getMaintenancesPerAsset };
}

