import React, { useState } from 'react';

function GuardarEdificios() {
  const [direccion, setDireccion] = useState('');
  const [nombre, setNombre] = useState('');
  const [feedbackMessage, setFeedbackMessage] = useState('');

  const guardarEdificio = () => {
    // Lógica para guardar el edificio
    if (direccion && nombre) {
      const token = sessionStorage.getItem("fullToken");

      if (token) {
        const apiUrl = 'http://localhost:8080/apis/edificios';

        fetch(apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({
            direccion: direccion,
            nombre: nombre,
          }),
        })
          .then((response) => {
            if (response.ok) {
              return response.json();
            }
            throw new Error('Error al guardar el edificio');
          })
          .then(() => {
            setFeedbackMessage('Edificio guardado con éxito');
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
      <h1>Guardar Edificio</h1>
      <div>
        {feedbackMessage && <p>{feedbackMessage}</p>}
        <div>
          <p>Direccion</p>
          <input
            type='text'
            placeholder=''
            value={direccion}
            onChange={(e) => setDireccion(e.target.value)}
          />
          <p>Nombre del Edificio</p>
          <input
            type='text'
            placeholder=''
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
          <button className='button-style' onClick={guardarEdificio}>Guardar Edificio</button>
        </div>
      </div>
    </div>
  );
}

export default GuardarEdificios;
