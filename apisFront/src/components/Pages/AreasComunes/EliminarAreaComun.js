import React, { useState, useEffect } from 'react';
import Select from 'react-select';

function EliminarAreaComun() {
  
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [areaComunOptions, setAreaComunOptions] = useState([]);
  const [areaComun, setAreaComun] = useState('');


  useEffect(() => {
    const apiUrl = 'http://localhost:8080/apis/areascomunes'; // Reemplaza con la URL correcta
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
          throw new Error('Error al obtener la lista de áreas comunes');
        })
        .then((data) => {
          const options = data.map((areaComun) => ({
            label: `${areaComun.edificio} - ${areaComun.descripcion}`,
            //label: `Rol: ${rol.tipoRol} - Usuario: ${rol.usuario}`,
            value: areaComun.idArea
          }));
          setAreaComunOptions(options);
        })
        .catch((error) => {
          console.error('Error al obtener la lista de áreas comunes', error);
        });
    } else {
      setFeedbackMessage('Token JWT no encontrado');
    }
  }, []);


  const eliminarAreaComun = () => {

    const areaComunSeleccionado = areaComunOptions.find(option => option.value === areaComun);

    if (areaComunSeleccionado) {
      const token = sessionStorage.getItem("fullToken");

      if (token) {
        fetch(`http://localhost:8080/apis/areascomunes/${areaComunSeleccionado.value}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({
            areaComun: areaComunSeleccionado.value,
          })
        })
          .then((response) => {
            if (response.ok) {
              setFeedbackMessage("Área Común eliminada con éxito");
            } else if (response.status === 404) {
              throw new Error('Área Común no encontrada');
            } else {
              throw new Error('Error al eliminar el Área Común');
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
      <h1>Eliminar Área Común</h1>
      {feedbackMessage && <p>{feedbackMessage}</p>}
      <div>
        <p>Area Comun</p>
      <Select
      className="react-select-container"
      classNamePrefix="react-select"
          options={areaComunOptions}
          value={areaComunOptions.find(option => option.value === areaComun)}
          onChange={selectedOption => setAreaComun(selectedOption.value)}
          placeholder=''
        />
        <button className='button-style' onClick={eliminarAreaComun}>Eliminar Área Común</button>
      </div>
    </div>
  );
}

export default EliminarAreaComun;
