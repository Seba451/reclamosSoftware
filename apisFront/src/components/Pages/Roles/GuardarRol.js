import React, { useState, useEffect } from 'react';
import Select from 'react-select';

function GuardarRol() {
  const [idUsuario, setIdUsuario] = useState('');
  const [tipoRol, setTipoRol] = useState('');
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [usuario, setUsuario] = useState('');
  const [usuarioOptions, setUsuarioOptions] = useState([]);

  const rolOptions = [
    { value: 'ADMIN', label: 'Admin' },
    { value: 'DUEÑO', label: 'Dueño' },
    { value: 'INQUILINO', label: 'Inquilino' },
    
  ];

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
            rol: usuario.roles,
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


  const guardarRol = () => {

    const usuarioSeleccionado = usuarioOptions.find(option => option.value === usuario);
    // Lógica para guardar el Área Común
    if (usuarioSeleccionado && tipoRol) {
      const token = sessionStorage.getItem("fullToken");

      if (token) {
        // Construye la URL con los parámetros de consulta
        const apiUrl = `http://localhost:8080/apis/roles?idUsuario=${usuarioSeleccionado.value}`;

        fetch(apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({ tipoRol: tipoRol })
        })
          .then((response) => {
            if (response.ok) {
              return response.json();
            }
            throw new Error('Error al guardar el Rol');
          })
          .then(() => {
            setFeedbackMessage('Rol guardado con éxito');
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
      <h1>Guardar Rol</h1>
      <div>
        {feedbackMessage && <p>{feedbackMessage}</p>}
        <p>Usuario</p>
        <div>
        <Select
        className="react-select-container"
        classNamePrefix="react-select"
            options={usuarioOptions}
            value={usuarioOptions.find(option => option.value === usuario)}
            onChange={selectedOption => setUsuario(selectedOption.value)}
            placeholder=''
          />
          <p>Rol</p>
          
          <Select
        className="react-select-container"
        classNamePrefix="react-select"
        options={rolOptions}
        value={rolOptions.find((option) => option.value === tipoRol)}
        onChange={(selectedOption) => setTipoRol(selectedOption.value)}
        placeholder=''
      />
          <button className='button-style' onClick={guardarRol}>Guardar Rol</button>
        </div>
      </div>
    </div>
  );
}

export default GuardarRol;
