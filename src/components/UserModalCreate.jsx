import { useState } from "react";
import "../styles/CreateUserModal.css";
import { fetchPostUser } from "../services/userService";

export const UserModalCreate = ({ handleModal, dialogRef, setUsers }) => {
    const API_URL = import.meta.env.VITE_API_URL;
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: "",
        role: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetchPostUser(API_URL, formData)
        .then((newUser) => {
            setUsers((prevState) => [...prevState, newUser.data])
            handleModal(dialogRef);
        })
        .catch(console.error)
    };

    return (
        <dialog ref={dialogRef} className="modal-usuario">
            <form className="form-registro" onSubmit={handleSubmit}>
                <h3>Registrar Nuevo Usuario</h3>
                <input
                    type="text"
                    name="name"
                    placeholder="Nombre"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Correo"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Contraseña"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />
                <select
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    required
                >
                    <option value="">Seleccione un rol</option>
                    <option value="admin">Administrador</option>
                    <option value="tech">Técnico</option>
                </select>
                <div className="modal-buttons">
                    <button type="submit" className="guardar">Guardar</button>
                    <button type="button" className="cancelar" onClick={() => handleModal(dialogRef)}>Cancelar</button>
                </div>
            </form>
        </dialog>
    );
};
