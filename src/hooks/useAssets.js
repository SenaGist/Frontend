import { useEffect, useState } from "react";
import { fetchAllAssets } from "../services/assetService";

export function useAssets(apiUrl) {
    const[assets, setAssets] = useState([]);
    useEffect(() => {
        fetchAllAssets(apiUrl)
        .then(setAssets)
        .catch(console.error)
    }, [apiUrl])
    return {assets};
}
