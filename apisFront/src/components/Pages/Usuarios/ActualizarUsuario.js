import React, { useState, useEffect } from 'react';

import Select from 'react-select';

function ActualizarUsuario() {
  const [usuario, setUsuario] = useState('');
  const [usuarioOptions, setUsuarioOptions] = useState([]);
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [nuevoNombre, setNuevoNombre] = useState('');
  const [nuevoApellido, setNuevoApellido] = useState('');
  const [nuevoUsuario, setNuevoUsuario] = useState('');
  const [nuevaPassword, setNuevaPassword] = useState('');
  const [nuevoEmail, setNuevoEmail] = useState('');




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




  const actualizarUsuario = () => {
    const usuarioSeleccionado = usuarioOptions.find(option => option.value === usuario);
  
    if (usuarioSeleccionado) {
      const token = sessionStorage.getItem("fullToken");
      if (token) {
        const apiUrl = `http://localhost:8080/apis/usuarios/${usuarioSeleccionado.value}`;
  
        const requestBody = {
          idUsuario: usuarioSeleccionado.value,
        };
  
        // Condiciones para agregar campos solo si se han completado y no están vacíos
        if (nuevoNombre.trim() !== '') {
          requestBody.nombre = nuevoNombre;
        }
        if (nuevoApellido.trim() !== '') {
          requestBody.apellido = nuevoApellido;
        }
        if (nuevoUsuario.trim() !== '') {
          requestBody.usuario = nuevoUsuario;
        }
        if (nuevaPassword.trim() !== '') {
          requestBody.password = nuevaPassword;
        }
        if (nuevoEmail.trim() !== '') {
          requestBody.email = nuevoEmail;
        }
  
        if (Object.keys(requestBody).length > 1) {
          // Solo realiza la solicitud si hay cambios en el objeto requestBody
          fetch(apiUrl, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(requestBody),
          })
            .then((response) => {
              if (response.ok) {
                setFeedbackMessage("Usuario actualizado con éxito");
              } else if (response.status === 404) {
                setFeedbackMessage("Usuario no encontrado");
              } else {
                setFeedbackMessage('Error al actualizar el usuario');
                throw new Error('Error al actualizar el usuario');
              }
            })
            .catch((error) => {
              setFeedbackMessage(error.message);
            });
        } else {
          setFeedbackMessage('No se han realizado cambios en el usuario.');
        }
      } else {
        setFeedbackMessage('Token JWT no encontrado');
      }
    } else {
      setFeedbackMessage('Por favor, seleccione un usuario.');
    }
  };
  
  

  return (
    <div>
      <h1>Actualizar Usuario</h1>
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
          <p>Nuevo Nombre</p>
        <input
          type='text'
          placeholder=''
          value={nuevoNombre}
          onChange={(e) => setNuevoNombre(e.target.value)}
        />
        <p>Nuevo Apellido</p>
        <input
          type='text'
          placeholder=''
          value={nuevoApellido}
          onChange={(e) => setNuevoApellido(e.target.value)}
        />
        <p>Nuevo Nombre de Usuario</p>
        <input
          type='text'
          placeholder=''
          value={nuevoUsuario}
          onChange={(e) => setNuevoUsuario(e.target.value)}
        />
        <p>Nueva Contraseña del Usuario</p>
        <input
          type='password'
          placeholder=''
          value={nuevaPassword}
          onChange={(e) => setNuevaPassword(e.target.value)}
        />
        <p>Nuevo Email del Usuario</p>
        <input
          type='text'
          placeholder=''
          value={nuevoEmail}
          onChange={(e) => setNuevoEmail(e.target.value)}
        />
        <button className='button-style' onClick={actualizarUsuario}>Actualizar Usuario</button>
      </div>
    </div>
  )
}

export default ActualizarUsuario;
