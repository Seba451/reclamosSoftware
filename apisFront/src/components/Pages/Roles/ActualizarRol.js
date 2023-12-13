import React, { useState, useEffect } from 'react';
import Select from 'react-select';

function ActualizarRol() {
  const [rol, setRol] = useState('');
  const [rolOptions, setRolOptions] = useState([]);
  const [tipoRol, setTipoRol] = useState('');
  const [feedbackMessage, setFeedbackMessage] = useState('');

  const tipoRolOptions = [
    { value: 'ADMIN', label: 'Admin' },
    { value: 'DUEÑO', label: 'Dueño' },
    { value: 'INQUILINO', label: 'Inquilino' },
    
  ];


  useEffect(() => {
    const apiUrl = 'http://localhost:8080/apis/roles'; // Reemplaza con la URL correcta
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
          throw new Error('Error al obtener la lista de roles');
        })
        .then((data) => {
          const options = data.map((rol) => ({
            label: `Rol: ${rol.tipoRol} - Usuario: ${rol.usuario}`,
            value: rol.idRol,
          }));
          setRolOptions(options);
          console.log(options);
        })
        .catch((error) => {
          console.error('Error al obtener la lista de roles', error);
        });
    } else {
      setFeedbackMessage('Token JWT no encontrado');
    }
  }, []);

  const actualizarRol = () => {


    const rolSeleccionado = rolOptions.find(option => option.value === rol);


    if (rolSeleccionado && tipoRol) {
      const token = sessionStorage.getItem("fullToken");

      if (token) {
        const requestBody = { tipoRol: tipoRol };


        fetch(`http://localhost:8080/apis/roles/${rolSeleccionado.value}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify(requestBody)
        })
          .then((response) => {
            if (response.ok) {
              setFeedbackMessage("Rol actualizado con éxito");
            } else if (response.status === 404) {
              setFeedbackMessage("Rol no encontrado");
            } else {
              setFeedbackMessage('Error al actualizar el Rol');
              throw new Error('Error al actualizar el Rol');
            }
          })
          .catch((error) => {
            setFeedbackMessage(error.message);
          });

      } else {
        setFeedbackMessage('Token JWT no encontrado');
      }
    } else {
      setFeedbackMessage('Por favor, complete los campos obligatorios (ID y Tipo Rol).');
    }
  }

  return (
    <div>
      <h1>Actualizar Rol</h1>
      {feedbackMessage && <p>{feedbackMessage}</p>}
      <div>
        <p>Rol</p>
      <Select
      className="react-select-container"
      classNamePrefix="react-select"
            options={rolOptions}
            value={rolOptions.find(option => option.value === rol)}
            onChange={selectedOption => setRol(selectedOption.value)}
            placeholder=''
          />
          <p>Nuevo Tipo Rol</p>
          <Select
        className="react-select-container"
        classNamePrefix="react-select"
        options={tipoRolOptions}
        value={tipoRolOptions.find((option) => option.value === tipoRol)}
        onChange={(selectedOption) => setTipoRol(selectedOption.value)}
        placeholder=''
      />
        
        <button className='button-style' onClick={actualizarRol}>Actualizar Rol</button>
      </div>
    </div>
  )
}

export default ActualizarRol;
