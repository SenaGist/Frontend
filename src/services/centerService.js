export async function fetchCenters(apiUrl) {
    const response = await fetch(`${apiUrl}/centers`);
    if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
    return response.json();
}