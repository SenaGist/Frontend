import { useState } from "react"

function Login() {
    const [showPassword, setShowPassword] = useState(false);

    const togglePassword = () => {
        setShowPassword(!showPassword);
    }
    return(
        <div className="login-container">
            <form className="login-form">
                <div className="logo">
                    <div className="logo-circle"></div>
                    <div className="logo-title">SENAGIST</div>
                </div>
                <div className="email-wrapper">
                    <label>Correo</label>
                    <input type="email" placeholder="Ingrese su correo" />
                </div>
                <div className="password-wrapper">
                    <label>Contraseña</label>
                    <input type={showPassword ? "text" : "password"} placeholder="Ingrese su contraseña" id="password" />

                    <button className="toggle-password" 
                        type="button"
                        onClick={togglePassword}>
                        {showPassword ? '👁️' :  '👁️‍🗨️'}
                    </button>
                </div>
                <button className="login-button" type="submit">Iniciar Sesión</button>
                <div className="login-links">
                    <a href="#">¿No tienes cuenta?</a>
                    <a href="#">¿Olvidó su contraseña?</a>
                </div>
            </form>
        </div>
        
    )
}

export default Login