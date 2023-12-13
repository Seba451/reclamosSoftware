import React, { useState, useEffect } from 'react';
import Select from 'react-select';

function EliminarReclamo() {
  const [id, setId] = useState('');
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [reclamo, setReclamo] = useState('');
  const [reclamoOptions, setReclamoOptions] = useState([]);

  useEffect(() => {
    const apiUrl = 'http://localhost:8080/apis/reclamos'; // Reemplaza con la URL correcta
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
          throw new Error('Error al obtener la lista de reclamos');
        })
        .then((data) => {
          const options = data.map((reclamo) => ({
            label: `Descripcion: ${reclamo.descripcion} - Usuario: ${reclamo.usuario}`,
            value: reclamo.idReclamo,
          }));
          setReclamoOptions(options);
          console.log(options);
        })
        .catch((error) => {
          console.error('Error al obtener la lista de edificios', error);
        });
    } else {
      setFeedbackMessage('Token JWT no encontrado');
    }
  }, []);

  const eliminarReclamo = () => {
    

    const reclamoSeleccionado = reclamoOptions.find(option => option.value === reclamo);


    if (reclamoSeleccionado) {
      const token = sessionStorage.getItem("fullToken");

      if (token) {
        fetch(`http://localhost:8080/apis/reclamos/${reclamoSeleccionado.value}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        })
          .then((response) => {
            if (response.ok) {
              setFeedbackMessage("Reclamo eliminado con éxito");
            } else if (response.status === 404) {
              throw new Error('Reclamo no encontrado');
            } else {
              throw new Error('Error al eliminar el reclamo');
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
      <h1>Eliminar Reclamo</h1>
      {feedbackMessage && <p>{feedbackMessage}</p>}
      <div>
        <p>Reclamo</p>
      <Select
      className="react-select-container"
      classNamePrefix="react-select"
            options={reclamoOptions}
            value={reclamoOptions.find(option => option.value === reclamo)}
            onChange={selectedOption => setReclamo(selectedOption.value)}
            placeholder=''
          />
        <button className='button-style' onClick={eliminarReclamo}>Eliminar Reclamo</button>
      </div>
    </div>
  );
}

export default EliminarReclamo;
