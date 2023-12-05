import React, { useState, useEffect } from 'react';
import Select from 'react-select';

function EliminarEdificios() {
  const [id, setId] = useState('');
  const [feedbackMessage, setFeedbackMessage] = useState('');
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

  const eliminarEdificio = () => {
    const edificioSeleccionado = edificioOptions.find(option => option.value === edificio);

    if (edificioSeleccionado) {
      const token = sessionStorage.getItem("fullToken");

      if (token) {
        fetch(`http://localhost:8080/apis/edificios/${edificioSeleccionado.value}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        })
          .then((response) => {
            if (response.ok) {
              setFeedbackMessage("Edificio eliminado con éxito");
            } else if (response.status === 404) {
              throw new Error('Edificio no encontrado');
            } else {
              throw new Error('Error al eliminar el Edificio');
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
      <h1>Eliminar Edificio</h1>
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
        <button className='button-style' onClick={eliminarEdificio}>Eliminar Edificio</button>
      </div>
    </div>
  );
}

export default EliminarEdificios;
