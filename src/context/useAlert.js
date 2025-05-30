import { useContext } from "react";
import AlertContext from "./AlertContext";

export const useAlert = () => useContext(AlertContext);