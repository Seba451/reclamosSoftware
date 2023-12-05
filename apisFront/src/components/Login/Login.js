import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login(){
    const [usuario, setUsuario] = useState('');
    const [password, setPassword] = useState('');
    const [feedbackMessage, setFeedbackMessage] = useState('');

    const navigate = useNavigate();

   

    const handleSubmit = async (e) => {
        e.preventDefault();
    

    const credentials = {
        usuario,
        password,
    };

    try{
        const response = await fetch('http://localhost:8080/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
                
            },
            body:JSON.stringify(credentials),

        });

        if (response.ok) {
            const tokenData = await response.text();
            sessionStorage.setItem('fullToken', tokenData); // Obtener el token como una cadena
            const tokenParts = tokenData.split('.'); // Separar las partes del token
    
            if (tokenParts.length === 3) {
                const tokenBody = atob(tokenParts[1]); // Decodificar la parte del cuerpo
                const tokenObject = JSON.parse(tokenBody); // Analizar la parte del cuerpo como JSON
    
                sessionStorage.setItem('token', tokenObject); // Almacenar el token en localStorage
                sessionStorage.setItem('username', usuario);
                
                window.location.reload();

                setFeedbackMessage('Inicio de sesión exitoso');
                
            } else {
                setFeedbackMessage('Token JWT no válido');
            }
        } else {
            setFeedbackMessage('Error: Credenciales incorrectas');
        }
    }catch(error){
        console.error('Error de red', error)
    }
    };

    return(
        <div className='container-login'>
            <h1>Iniciar Sesión</h1>
            <form onSubmit={handleSubmit}>
                <p>Nombre de Usuario</p>
                <input type="text" 
                placeholder=""
                value={usuario}
                onChange={(e) => setUsuario(e.target.value)}
                />
                <p>Contraseña</p>
                <input type="password" 
                placeholder=""
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                />

                <button className="button-style"  type="submit">Iniciar Sesión</button>
            </form>

            {feedbackMessage && <p>{feedbackMessage}</p>}
        </div>
    );
}

export default Login;