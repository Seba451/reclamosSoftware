import React, { useState, useEffect } from 'react';
import Select from 'react-select';

function ActualizarAreaComun() {
  const [edificio, setEdificio] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [edificioOptions, setEdificioOptions] = useState([]);
  const [areaComunOptions, setAreaComunOptions] = useState([]);
  const [areaComun, setAreaComun] = useState('');
  



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


  useEffect(() => {
    const apiUrl = 'http://localhost:8080/apis/areascomunes'; // Reemplaza con la URL correcta
    const token = sessionStorage.getItem("fullToken");

    
  
    const selectedEdificio = edificioOptions.find(option => option.value === edificio);

    console.log(selectedEdificio);

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
          // Filtra las áreas comunes que pertenecen al edificio seleccionado
          const filteredAreas = data.filter(areaComun => areaComun.edificio === selectedEdificio.label);
          const options = filteredAreas.map((areaComun) => ({
            label: areaComun.descripcion,
            value: areaComun.idArea,
            edificio: areaComun.edificio,
          }));
          setAreaComunOptions(options);
          console.log(options);
        })
        .catch((error) => {
          console.error('Error al obtener la lista de áreas comunes', error);
        });
    } else {
      setFeedbackMessage('Token JWT no encontrado');
    }
  }, [edificio]);
  


  const actualizarAreaComun = () => {

    const edificioSeleccionado = edificioOptions.find(option => option.value === edificio);
    const areaComunSeleccionado = areaComunOptions.find(option => option.value === areaComun);

    console.log(edificio);
    console.log(areaComunSeleccionado);

    if (edificioSeleccionado && areaComunSeleccionado && descripcion) {
      const token = sessionStorage.getItem("fullToken");

      if (token) {
        fetch(`http://localhost:8080/apis/areascomunes/${areaComunSeleccionado.value}?idEdificio=${edificioSeleccionado.value}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({ edificio: edificioSeleccionado.value, areaComun: areaComunSeleccionado.value, descripcion: descripcion })
        })
        .then((response) => {
            if (response.ok) {
              setFeedbackMessage("Área Común actualizada con éxito");
            } else if (response.status === 404) {
              setFeedbackMessage("Área Común no encontrada");
            } else {
              setFeedbackMessage('Error al actualizar el Área Común');
              throw new Error('Error al actualizar el Área Común');
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
      
      <h1>Actualizar Área Común</h1>
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

<p>Area Comun</p>
<Select
className="react-select-container"
classNamePrefix="react-select"
  options={areaComunOptions}
  value={areaComunOptions.find(option => option.value === areaComun)}
  onChange={selectedOption => setAreaComun(selectedOption.value)}
  placeholder=''
/>
<p>Nueva Descripción</p>
        <input
          type='text'
          placeholder=''
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
        />
        <button className='button-style' onClick={actualizarAreaComun}>Actualizar Área Común</button>
      </div>
    </div>
  )
}

export default ActualizarAreaComun;
