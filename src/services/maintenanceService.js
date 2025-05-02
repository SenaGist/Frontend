export async function fetchUserMaintenances(apiUrl, userId) {
    const response = await fetch(`${apiUrl}/maintenances/user/${userId}`);
    if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
    return response.json();
}
export async function fetchAllMaintenances(apiUrl) {
    const response = await fetch(`${apiUrl}/maintenances`);
    if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
    return response.json();
}
export async function fetchPostMaintenance(formData) {
    try {
        const API_URL = import.meta.env.VITE_API_URL;
        const jsonData = formData.get('json');
        if (jsonData) {
            const reader = new FileReader();
            reader.onload = function () {
                console.log("Datos JSON enviados:", JSON.parse(reader.result));
            };
            reader.readAsText(jsonData);
        }

        const response = await fetch(`${API_URL}/maintenances`, {
            method: "POST",
            body: formData
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