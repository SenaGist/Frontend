import { useState } from "react";
import SidebarContext from "./SidebarContext.js";

export const SidebarProvider = ({children}) => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    
    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    return(
        <SidebarContext.Provider value={{sidebarOpen, toggleSidebar}}>
            {children}
        </SidebarContext.Provider>
    )
}