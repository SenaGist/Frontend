import { useAuth } from '../context/useAuth';
import { useSidebar } from '../context/useSidebar';
export const SidebarFooter = () => {
    const {toggleSidebar} = useSidebar();
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
            <button className="close-button" onClick={toggleSidebar}>✖ Cerrar</button>
        </>
    )
}