import { useContext } from "react";
import SidebarContext from "./SidebarContext.js";

export const useSidebar = () => useContext(SidebarContext);