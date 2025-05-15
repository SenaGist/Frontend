import { useAuth } from '../../context/useAuth';
export const SidebarFooter = () => {
    const {logout} = useAuth();
    function handleLogout() {
        logout();
    }
    return (
        <>
            <div className="profile">
                <button onClick={handleLogout}>Cerrar sesión</button>
            </div>
        </>
    )
}