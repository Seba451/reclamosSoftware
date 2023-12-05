import React, { useState, useEffect } from 'react';
import Select from 'react-select';

function GuardarAreaComun() {
  const [edificio, setEdificio] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [edificioOptions, setEdificioOptions] = useState([]); // Lista de opciones para el select

  // Lógica para obtener la lista de edificios desde la base de datos
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

  const guardarAreaComun = () => {
    // Obtén el objeto de edificio seleccionado
    const edificioSeleccionado = edificioOptions.find(option => option.value === edificio);
  
    // Verifica si se seleccionó un edificio válido
    if (edificioSeleccionado && descripcion) {
      const token = sessionStorage.getItem("fullToken");
      const apiUrl = `http://localhost:8080/apis/areascomunes?idEdificio=${edificioSeleccionado.value}`;
  
      fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          edificio: edificioSeleccionado.value, // Utiliza edificioSeleccionado.value como el ID del edificio
          descripcion: descripcion,
        })
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          throw new Error('Error al guardar el Área Común');
        })
        .then(() => {
          setFeedbackMessage('Área Común guardada con éxito');
        })
        .catch((error) => {
          setFeedbackMessage(error.message);
        });
    } else {
      setFeedbackMessage('Por favor, complete todos los campos.');
    }
  };
  

  return (
    <div>
      <h1>Guardar Área Común</h1>
      <div>
        {feedbackMessage && <p>{feedbackMessage}</p>}
        <p>Edificio</p>
        <div>
          <Select
          className="react-select-container"
          classNamePrefix="react-select"
            options={edificioOptions}
            value={edificioOptions.find(option => option.value === edificio)}
            onChange={selectedOption => setEdificio(selectedOption.value)}
            placeholder=''
          />
          <p>Descripcion del Área Común</p>
          <input
            type='text'
            placeholder=''
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
          />
          <button className='button-style' onClick={guardarAreaComun}>Guardar Área Común</button>
        </div>
      </div>
    </div>
  );
}

export default GuardarAreaComun;
