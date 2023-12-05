import React, { useState, useEffect } from 'react';
import Select from 'react-select';

function GuardarReclamos() {
  const [descripcion, setDescripcion] = useState('');
  
  const [areaComun, setAreaComun] = useState('');
  
  const [feedbackMessage, setFeedbackMessage] = useState('');
  
  const [areaComunOptions, setAreaComunOptions] = useState([]);

  const [imagen, setImagen] = useState(null);


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
          throw new Error('Error al obtener la lista de areas comunes');
        })
        .then((data) => {
          const options = data.map((areaComun) => ({
            label: `${areaComun.edificio} - Descripcion: ${areaComun.descripcion}`,
            value: areaComun.idArea,
          }));
          setAreaComunOptions(options);
          console.log(options);
        })
        .catch((error) => {
          console.error('Error al obtener la lista de areas comunes', error);
        });
    } else {
      setFeedbackMessage('Token JWT no encontrado');
    }
  }, []);



  const guardarReclamo = () => {
    const areaComunSeleccionada = areaComunOptions.find(option => option.value === areaComun);
    // Lógica para guardar el reclamo
    if (areaComunSeleccionada && descripcion) {
      const token = sessionStorage.getItem("fullToken");
  
      const body = { descripcion, idAreaComun: areaComunSeleccionada.value };
  
      if (token) {
        const apiUrl = `http://localhost:8080/apis/reclamos`;
  
        // Primero, guardar la información del reclamo
        fetch(apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify(body),
        })
          .then((response) => {
            if (response.ok) {
              return response.json();
            }
            throw new Error('Error al guardar el reclamo');
          })
          .then((data) => {
            // Después de guardar el reclamo, obtener el ID asignado
            const reclamo = data;
  
            // Luego, subir la imagen asociada al reclamo
            const formData = new FormData();
            formData.append("archivo", imagen);

            console.log(imagen);
            
  
            return fetch(`http://localhost:8080/imagenes/subir/${reclamo.idReclamo}`, {
              method: 'POST',
              body: formData,
              headers: {
                'Authorization': `Bearer ${token}`,
              },
            });
          })
          .then((response) => {
            if (response.ok) {
              setFeedbackMessage('Reclamo guardado con éxito');
            } else {
              throw new Error('Error al subir la imagen');
            }
          })
          .catch((error) => {
            setFeedbackMessage(error.message);
          });
      } else {
        setFeedbackMessage('Token JWT no encontrado');
      }
    } else {
      setFeedbackMessage('Por favor, complete todos los campos requeridos.');
    }
  };

  return (
    <div>
      <h1>Guardar Reclamo</h1>
      <div>
        {feedbackMessage && <p>{feedbackMessage}</p>}
        <div>
        {/* <input
            type='text'
            placeholder='Ingrese su ID de Usuario'
            value={idUsuario}
            onChange={(e) => setIdUsuario(e.target.value)}
          /> */}
          <p>Area Comun</p>
        <Select
        className="react-select-container"
        classNamePrefix="react-select"
            options={areaComunOptions}
            value={areaComunOptions.find(option => option.value === areaComun)}
            onChange={selectedOption => setAreaComun(selectedOption.value)}
            placeholder=''
          />
          <p>Descripcion del Reclamo</p>
          <input
            type='text'
            placeholder=''
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
          />
        
          {/* <input
            type='text'
            placeholder='Estado del Reclamo'
            value={estadoReclamo}
            onChange={(e) => setEstadoReclamo(e.target.value)}
          /> */}
          
          {/* Agrega otros campos necesarios para un reclamo */}

          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImagen(e.target.files[0])}
          />
          <button className='button-style' onClick={guardarReclamo}>Guardar Reclamo</button>
        </div>
      </div>
    </div>
  );
}

export default GuardarReclamos;
