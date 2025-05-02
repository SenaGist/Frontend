import { useAuth } from '../../context/useAuth';
export const SidebarFooter = () => {
    const {logout} = useAuth();
    function handleLogout() {
        logout();
    }
    return (
        <>
            <div className="profile">
                <span>Perfil del Usuario</span>
                <button onClick={handleLogout}>Cerrar sesión</button>
            </div>
        </>
    )
}