export const fetchAllAssets = async (apiUrl) => {
    const response = await fetch(`${apiUrl}/assets`);
    if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
    return response.json();
}
export const fetchMaintenancesPerAsset = async (apiUrl, assetId) => {
    const response = await fetch(`${apiUrl}/maintenances/asset/${assetId}`)
    if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
    return response.json();
}
export const fetchAssetByInventoryNumber = async (apiUrl, inventoryNumber) => {
    const res = await fetch(`${apiUrl}/assets/inventory/${inventoryNumber}`);
    if (!res.ok) {
        throw new Error(`Error al buscar activo: ${res.status}`);
    }
    return await res.json();
};