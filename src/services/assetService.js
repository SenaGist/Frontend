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