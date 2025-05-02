export function UserForm({ formData, onChange, onSubmit,  onCancel }) {
    return (
        <form className="form-registro" onSubmit={onSubmit}>
            <input
                type="text"
                name="name"
                placeholder="Nombre"
                value={formData.name}
                onChange={onChange}
                required
            />
            <input
                type="email"
                name="email"
                placeholder="Correo"
                value={formData.email}
                onChange={onChange}
                required
            />
            <input
                type="password"
                name="password"
                placeholder="Contraseña"
                value={formData.password}
                onChange={onChange}
                required
            />
            <select name="role" value={formData.role} onChange={onChange} required>
                <option value="">Seleccione un rol</option>
                <option value="admin">Administrador</option>
                <option value="tech">Técnico</option>
            </select>
            <div className="modal-buttons">
                <button type="submit" className="guardar">Guardar</button>
                <button type="button" className="cancelar" onClick={onCancel}>
                    Cancelar
                </button>
            </div>
        </form>
    );
}
