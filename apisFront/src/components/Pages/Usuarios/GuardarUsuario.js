import React, { useState } from 'react';

function GuardarUsuario() {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [usuario, setUsuario] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [feedbackMessage, setFeedbackMessage] = useState('');

  const guardarUsuario = () => {
    // Lógica para guardar el usuario
    if (nombre && apellido && usuario && password && email) {
      const token = sessionStorage.getItem("fullToken");

      if (token) {
        const apiUrl = 'http://localhost:8080/apis/usuarios';

        fetch(apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({
            nombre: nombre,
            apellido: apellido,
            usuario: usuario,
            password: password,
            email: email,
          }),
        })
          .then((response) => {
            if (response.ok) {
              return response.json();
            }
            throw new Error('Error al guardar el usuario');
          })
          .then(() => {
            setFeedbackMessage('Usuario guardado con éxito');
          })
          .catch((error) => {
            setFeedbackMessage(error.message);
          });
      } else {
        setFeedbackMessage('Token JWT no encontrado');
      }
    } else {
      setFeedbackMessage('Por favor, complete todos los campos.');
    }
  };

  return (
    <div>
      <h1>Guardar Usuario</h1>
      <div>
        {feedbackMessage && <p>{feedbackMessage}</p>}
        <div>
          <p>Nombre</p>
          <input
            type='text'
            placeholder=''
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
          <p>Apellido</p>
          <input
            type='text'
            placeholder=''
            value={apellido}
            onChange={(e) => setApellido(e.target.value)}
          />
          <p>Correo electrónico</p>
          <input
            type='text'
            placeholder=''
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <p>Nombre de usuario</p>
          <input
            type='text'
            placeholder=''
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
          />
          <p>Contraseña</p>
          <input
            type='password'
            placeholder=''
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className='button-style' onClick={guardarUsuario}>Guardar Usuario</button>
        </div>
      </div>
    </div>
  );
}

export default GuardarUsuario;
