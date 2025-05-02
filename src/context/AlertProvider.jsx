    import { useState } from "react"
    import AlertContext from "./AlertContext";

    export const AlertProvider = ({children}) => {
        const [alert, setAlert] = useState(null);
        const showAlert = (type, text, duration = 3000) => {
            setAlert({type, text})
            setTimeout(() => {
                setAlert(null);
            }, duration);
        }
        const closeAlert = () => setAlert(null);

        return (
            <AlertContext.Provider value={{alert, showAlert, closeAlert}}>
                {children}
            </AlertContext.Provider>
        )
    }