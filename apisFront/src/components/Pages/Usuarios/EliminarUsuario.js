import React, { useState, useEffect } from 'react';
import Select from 'react-select';

function EliminarUsuario() {
  
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [usuario, setUsuario] = useState('');
  const [usuarioOptions, setUsuarioOptions] = useState([]);

  useEffect(() => {
    const apiUrl = 'http://localhost:8080/apis/usuarios'; // Reemplaza con la URL correcta
    const token = sessionStorage.getItem("fullToken");

    if (token) {
      fetch(apiUrl, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          throw new Error('Error al obtener la lista de usuarios');
        })
        .then((data) => {
          const options = data.map((usuario) => ({
            label: usuario.usuario,
            value: usuario.idUsuario,
            
          }));
          setUsuarioOptions(options);
          console.log(options);
        })
        .catch((error) => {
          console.error('Error al obtener la lista de usuarios', error);
        });
    } else {
      setFeedbackMessage('Token JWT no encontrado');
    }
  }, []);

  const eliminarUsuario = () => {

    const usuarioSeleccionado = usuarioOptions.find(option => option.value === usuario);

    if (usuarioSeleccionado) {
      const token = sessionStorage.getItem("fullToken");

      if (token) {
        fetch(`http://localhost:8080/apis/usuarios/${usuarioSeleccionado.value}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        })
          .then((response) => {
            if (response.ok) {
              setFeedbackMessage("Usuario eliminado con éxito");
            } else if (response.status === 404) {
              throw new Error('Usuario no encontrado');
            } else {
              throw new Error('Error al eliminar el Usuario');
            }
          })
          .catch((error) => setFeedbackMessage(error.message));
      } else {
        setFeedbackMessage('Token JWT no encontrado');
      }
    }
  };

  return (
    <div>
      <h1>Eliminar Usuario</h1>
      {feedbackMessage && <p>{feedbackMessage}</p>}
      <div>
        <p>Usuario</p>
      <Select
      className="react-select-container"
      classNamePrefix="react-select"
            options={usuarioOptions}
            value={usuarioOptions.find(option => option.value === usuario)}
            onChange={selectedOption => setUsuario(selectedOption.value)}
            placeholder=''
          />
        <button className='button-style' onClick={eliminarUsuario}>Eliminar Usuario</button>
      </div>
    </div>
  );
}

export default EliminarUsuario;
