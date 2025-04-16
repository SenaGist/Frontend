import { useState } from "react";
import "../styles/CreateUserModal.css";

export const UserForm = ({ handleModal, dialogRef }) => {
    const [formData, setFormData] = useState({
        nombre: '',
        correo: '',
        rol: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Aquí iría la lógica para guardar el usuario
    };

    return (
        <dialog ref={dialogRef} className="modal-usuario">
            <form className="form-registro" onSubmit={handleSubmit}>
                <h3>Registrar Nuevo Usuario</h3>
                <input
                    type="text"
                    name="nombre"
                    placeholder="Nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    required
                />
                <input
                    type="email"
                    name="correo"
                    placeholder="Correo"
                    value={formData.correo}
                    onChange={handleChange}
                    required
                />
                <select
                    name="rol"
                    value={formData.rol}
                    onChange={handleChange}
                    required
                >
                    <option value="">Seleccione un rol</option>
                    <option value="admin">Administrador</option>
                    <option value="tech">Técnico</option>
                </select>
                <div className="modal-buttons">
                    <button type="submit" className="guardar">Guardar</button>
                    <button type="button" className="cancelar" onClick={handleModal}>Cancelar</button>
                </div>
            </form>
        </dialog>
    );
};
