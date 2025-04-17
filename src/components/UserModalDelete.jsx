export const UserModalDelete = ({deleteDialogRef, handleModal}) => {
    return (
        <dialog className="modal-eliminar" ref={deleteDialogRef}>
            <h2>¿Estás seguro que quieres eliminar este usuario?</h2>
            <div className="modal-actions">
                <button onClick={() => {
                    // lógica para eliminar el usuario
                    handleModal(deleteDialogRef); // cerrar el modal
                }}>Sí</button>
                <button onClick={() => handleModal(deleteDialogRef)}>Cancelar</button>
            </div>
        </dialog>
    )
}