import { useState, useEffect, useCallback } from 'react';
import {
    fetchUsers,
    fetchPostUser,
    fetchDeleteUser,
    fetchPutUser,
    fetchUsersByRole,
    fetchUserById
} from '../services/userService';

export function useUsers(apiUrl) {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetchUsers(apiUrl)
            .then(setUsers)
            .catch(console.error);
    }, [apiUrl]);

    const getById = useCallback(async (id) => {
        try {
            const data = await fetchUserById(apiUrl, id);
            return data;
        } catch (err) {
            console.error(err);
            return [];
        }
    }, [apiUrl])
    const getByRole = useCallback(async (role) => {
        try {
            const data = await fetchUsersByRole(apiUrl, role);
            return data;
        } catch (err) {
            console.error(err);
            return [];
        }
    }, [apiUrl])

    const createUser = async (formData) => {
        const newUser = await fetchPostUser(apiUrl, formData);
        setUsers(prev => [...prev, newUser.data]);
        return newUser;
    };

    const updateUser = async (formDataEdit) => {
        const updated = await fetchPutUser(apiUrl, formDataEdit);
        setUsers(prev =>
            prev.map(user =>
                user.id === updated.data.id ? updated.data : user
            )
        );
        return updated;
    };

    const deleteUser = async (id) => {
        await fetchDeleteUser(apiUrl, id);
        setUsers(prev => prev.filter(user => user.id !== id));
    };

    return { users, createUser, updateUser, deleteUser, setUsers, getByRole, getById };
}
