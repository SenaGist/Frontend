export async function fetchUserMaintenances(apiUrl, userId) {
    const response = await fetch(`${apiUrl}/maintenances/user/${userId}`);
    if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
    return response.json();
}
export async function fetchPostMaintenance(payload) {
    try {
        const API_URL = import.meta.env.VITE_API_URL;
        const response = await fetch(`${API_URL}/maintenances`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            const error = await response.text();
            throw new Error(`Error en el POST: ${error}`);
        }

        return await response.json();
    } catch (err) {
        console.error("Error al crear el mantenimiento:", err);
        throw err;
    }
}
