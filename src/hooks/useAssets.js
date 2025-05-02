import { useEffect, useState } from "react";
import { fetchAllAssets, fetchAssetByInventoryNumber, fetchMaintenancesPerAsset } from "../services/assetService";

export function useAssets(apiUrl) {
    const [assets, setAssets] = useState([]);

    useEffect(() => {
        fetchAllAssets(apiUrl)
            .then(setAssets)
            .catch(console.error);
    }, [apiUrl]);

    const getMaintenancesPerAsset = async (id) => {
        try {
            const data = await fetchMaintenancesPerAsset(apiUrl, id);
            return data;
        } catch (err) {
            console.error("Error fetching maintenances:", err);
            return [];
        }
    };

    const getByInventoryNumber = async (inventoryNumber) => {
        try {
            const data = await fetchAssetByInventoryNumber(apiUrl, inventoryNumber);
            return data;
        } catch (err) {
            console.error("Error fetching asset: ", err);
            return null;
        }
    }
    return { assets, getMaintenancesPerAsset, getByInventoryNumber };
}

