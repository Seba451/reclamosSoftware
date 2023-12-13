import React, { useState, useEffect } from 'react';
import Select from 'react-select';

function EliminarUnidad() {
  const [id, setId] = useState('');
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [unidadOptions, setUnidadOptions] = useState([]);
  const [unidad, setUnidad] = useState('');


  useEffect(() => {
    const apiUrl = 'http://localhost:8080/apis/unidades'; // Reemplaza con la URL correcta
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
          throw new Error('Error al obtener la lista de unidades');
        })
        .then((data) => {
          const options = data.map((unidad) => ({
            label: `${unidad.edificio} - Unidad ${unidad.numero} - Piso ${unidad.piso}`,
            value: unidad.idUnidad,
          }));
          setUnidadOptions(options);
          console.log(options);
        })
        .catch((error) => {
          console.error('Error al obtener la lista de unidades', error);
        });
    } else {
      setFeedbackMessage('Token JWT no encontrado');
    }
  }, []);

  const eliminarUnidad = () => {

    const unidadSeleccionada = unidadOptions.find(option => option.value === unidad);
    if (unidadSeleccionada) {
      const token = sessionStorage.getItem("fullToken");

      if (token) {
        fetch(`http://localhost:8080/apis/unidades/${unidadSeleccionada.value}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        })
          .then((response) => {
            if (response.ok) {
              setFeedbackMessage("Unidad eliminada con éxito");
            } else if (response.status === 404) {
              throw new Error('Unidad no encontrada');
            } else {
              throw new Error('Error al eliminar la Unidad');
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
      <h1>Eliminar Unidad</h1>
      {feedbackMessage && <p>{feedbackMessage}</p>}
      <div>
        <p>Unidad</p>
      <Select
      className="react-select-container"
      classNamePrefix="react-select"
            options={unidadOptions}
            value={unidadOptions.find(option => option.value === unidad)}
            onChange={selectedOption => setUnidad(selectedOption.value)}
            placeholder=''
          />
        <button className='button-style' onClick={eliminarUnidad}>Eliminar Unidad</button>
      </div>
    </div>
  );
}

export default EliminarUnidad;
