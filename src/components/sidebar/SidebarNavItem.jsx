import { FaHome, FaUsers, FaCogs } from 'react-icons/fa';
import { MdDevices } from 'react-icons/md';
import { GrVmMaintenance } from "react-icons/gr";
import { useAuth } from '../../context/useAuth';
import { Link, NavLink } from 'react-router-dom';
import { useSidebar } from '../../context/useSidebar';

export const SidebarNavItem = () => {
    const { role } = useAuth();
    const { toggleSidebar } = useSidebar();
    const navItemsAdmin = [
        { icon: FaUsers, label: 'Usuarios', path: '/admin/usuarios' },
        { icon: GrVmMaintenance, label: 'Mantenimientos', path: '/admin/mantenimientos' },
        { icon: MdDevices, label: 'Equipamentos', path: '/admin/equipamentos' },
        { icon: FaCogs, label: 'Configuración', path: '/configuracion' },
    ];

    const navItemsTech = [
        { icon: GrVmMaintenance, label: 'Mantenimientos', path: '/mantenimientos' },
        { icon: FaCogs, label: 'Configuración', path: '/configuracion' },
    ];

    const navItems = role == 'admin' ? navItemsAdmin : navItemsTech;

    return (
        <>
            {navItems.map((item) => {
                const Icon = item.icon;
                return (
                    <Link to={item.path} key={item.path} onClick={toggleSidebar}>
                        <li key={item.path}><Icon />
                            {item.label}
                        </li>
                    </Link>
                )
            })}
        </>
    );
};
