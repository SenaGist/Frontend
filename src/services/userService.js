export async function fetchUsers(apiUrl) {
    const response = await fetch(`${apiUrl}/users`);
    if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
    return response.json();
}