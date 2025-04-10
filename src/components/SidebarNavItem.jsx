import { FaHome, FaUsers, FaCogs, FaLaptop } from 'react-icons/fa';
import { useAuth } from '../context/useAuth';
import { Link, NavLink } from 'react-router-dom';

export const SidebarNavItem = () => {
    const { role } = useAuth();

    const navItemsAdmin = [
        { icon: FaHome, label: 'Inicio', path: '/' },
        { icon: FaUsers, label: 'Usuarios', path: '/usuarios' },
        { icon: FaLaptop, label: 'Equipos', path: '/equipos' },
        { icon: FaCogs, label: 'Configuración', path: '/configuracion' },
    ];

    const navItemsTech = [
        { icon: FaHome, label: 'Inicio', path: '/' },
        { icon: FaLaptop, label: 'Equipos', path: '/equipos' },
        { icon: FaCogs, label: 'Configuración', path: '/configuracion' },
    ];

    const navItems = role == 'admin' ? navItemsAdmin : navItemsTech;

    return (
        <>
            {navItems.map((item) => {
                const Icon = item.icon;
                return (
                    <li key={item.path}><Icon/><Link to={item.path}/>{item.label}</li>
                )
            })}
        </>
    );
};
