import { useState } from "react"
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import { useAlert } from "../context/useAlert";
import Alert from "../components/alert/Alert";

function Login() {
    const API_URL = import.meta.env.VITE_API_URL;
    const [form, setForm] = useState({ email: "", password: "" });
    const { login } = useAuth();
    const { alert, showAlert, closeAlert } = useAlert();
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${API_URL}/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(form)
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            login(data.token, data.role, data.id);
            navigate("/home");
        } catch (error) {
            showAlert("error", "Correo o contraseña incorrecta")
            console.error("Error en el login:", error);
        }
    };

    const togglePassword = () => {
        setShowPassword(!showPassword);
    }
    return (
        <div className="login-container">
            <form className="login-form" onSubmit={handleSubmit}>
                <div className="logo">
                    <div className="logo-circle"></div>
                    <div className="logo-title">SENAGIST</div>
                </div>
                <div className="email-wrapper">
                    <label>Correo</label>
                    <input name="email" type="email" placeholder="Ingrese su correo"
                        onChange={handleChange} />
                </div>
                <div className="password-wrapper">
                    <label>Contraseña</label>
                    <input type={showPassword ? "text" : "password"}
                        placeholder="Ingrese su contraseña"
                        id="password" onChange={handleChange} name="password" />
                    <button className="toggle-password"
                        type="button"
                        onClick={togglePassword}>
                        {showPassword ? '👁️' : '👁️‍🗨️'}
                    </button>
                </div>
                <button className="login-button" type="submit">Iniciar Sesión</button>
                {/* <div className="login-links">
                    <a href="#">¿No tienes cuenta?</a>
                    <a href="#">¿Olvidó su contraseña?</a>
                </div> */}
            </form>
            {alert && (
                <Alert
                    type={alert.type}
                    message={alert.text}
                    onClose={closeAlert}
                />
            )}
        </div>
    )
}

export default Login