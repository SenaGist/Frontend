import "../styles/ModalUsers.css";

export const Modal = ({ dialogRef, title, children }) => {
    return (
        <dialog ref={dialogRef} className="modal-usuario">
            <h3>{title}</h3>
            {children}
        </dialog>
    );
};
