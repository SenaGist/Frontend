export async function fetchUsers(apiUrl) {
    const response = await fetch(`${apiUrl}/users`);
    if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
    return response.json();
}
export async function fetchPostUser(apiUrl, formData) {
    const response = await fetch(`${apiUrl}/users`, {
        method: "POST",
        headers: {"Content-type": "application/json"},
        body: JSON.stringify(formData)
    })
    if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
    return response.json();
}
export async function fetchDeleteUser(apiUrl, userId) {
    const response = await fetch(`${apiUrl}/users/${userId}`, {
        method: "DELETE",
    })
    if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
    return response.json();
}
export async function fetchPutUser(apiUrl, formData) {
    const response = await fetch(`${apiUrl}/users`, {
        method: "PUT",
        headers: {"Content-type": "application/json"},
        body: JSON.stringify(formData)
    })
    if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
    return response.json();
}