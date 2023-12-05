import React, { useState, useEffect } from 'react';
import Select from 'react-select';

function ActualizarEdificio() {
  const [id, setId] = useState('');
  const [nombre, setNombre] = useState('');
  const [direccion, setDireccion] = useState('');
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [nuevaDireccion, setNuevaDireccion] = useState('');
  const [nuevoNombre, setNuevoNombre] = useState('');
  const [edificio, setEdificio] = useState('');
  const [edificioOptions, setEdificioOptions] = useState([]);

  useEffect(() => {
    const apiUrl = 'http://localhost:8080/apis/edificios'; // Reemplaza con la URL correcta
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
          throw new Error('Error al obtener la lista de edificios');
        })
        .then((data) => {
          const options = data.map((edificio) => ({
            label: edificio.nombre,
            value: edificio.id,
          }));
          setEdificioOptions(options);
          console.log(options);
        })
        .catch((error) => {
          console.error('Error al obtener la lista de edificios', error);
        });
    } else {
      setFeedbackMessage('Token JWT no encontrado');
    }
  }, []);

  const actualizarEdificio = () => {

    const edificioSeleccionado = edificioOptions.find(option => option.value === edificio);

    if (edificioSeleccionado) {
      const token = sessionStorage.getItem("fullToken");

      if (token) {
        const apiUrl = `http://localhost:8080/apis/edificios/${edificioSeleccionado.value}`;

        const requestBody = {};

        if (nuevoNombre) {
          requestBody.nombre = nuevoNombre;
        }
        if (nuevaDireccion) {
          requestBody.direccion = nuevaDireccion;
        }

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
              setFeedbackMessage("Edificio actualizado con éxito");
            } else if (response.status === 404) {
              setFeedbackMessage("Edificio no encontrado");
            } else {
              setFeedbackMessage('Error al actualizar el edificio');
              throw new Error('Error al actualizar el edificio');
            }
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
  }

  return (
    <div>
      <h1>Actualizar Edificio</h1>
      {feedbackMessage && <p>{feedbackMessage}</p>}
      <div>
        <p>Edificio</p>
      <Select
      className="react-select-container"
      classNamePrefix="react-select"
            options={edificioOptions}
            value={edificioOptions.find(option => option.value === edificio)}
            onChange={selectedOption => setEdificio(selectedOption.value)}
            placeholder=''
          />
<p>Nuevo Nombre del Edificio</p>
        <input
          type='text'
          placeholder=''
          value={nuevoNombre}
          onChange={(e) => setNuevoNombre(e.target.value)}
        />
        <p>Nueva Dirección</p>
        <input
          type='text'
          placeholder=''
          value={nuevaDireccion}
          onChange={(e) => setNuevaDireccion(e.target.value)}
        />
        <button className='button-style' onClick={actualizarEdificio}>Actualizar Edificio</button>
      </div>
    </div>
  )
}

export default ActualizarEdificio;
