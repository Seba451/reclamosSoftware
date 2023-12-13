import React, { useState, useEffect } from 'react';
import Select from 'react-select';

function EliminarRol() {
  
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [rol, setRol] = useState('');
  const [rolOptions, setRolOptions] = useState([]);



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
            label: `${rol.usuario} - ${rol.tipoRol}`,
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



  const eliminarRol = () => {

    const rolSeleccionado = rolOptions.find(option => option.value === rol);

    if (rolSeleccionado) {
      const token = sessionStorage.getItem("fullToken");

      if (token) {
        fetch(`http://localhost:8080/apis/roles/${rolSeleccionado.value}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        })
          .then((response) => {
            if (response.ok) {
              setFeedbackMessage("Rol eliminado con éxito");
            } else if (response.status === 404) {
              throw new Error('Rol no encontrado');
            } else {
              throw new Error('Error al eliminar el Rol');
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
      <h1>Eliminar Rol</h1>
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
        <button className='button-style' onClick={eliminarRol}>Eliminar Rol</button>
      </div>
    </div>
  );
}

export default EliminarRol;
