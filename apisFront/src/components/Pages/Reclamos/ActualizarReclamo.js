import React, { useState, useEffect } from 'react';
import Select from 'react-select'

function ActualizarReclamos() {
  
  const [nuevoEstadoReclamo, setNuevoEstadoReclamo] = useState('');
  const [nuevaMedidaTomada, setNuevaMedidaTomada] = useState('');
  const [feedbackMessage, setFeedbackMessage] = useState('');
  
  const [reclamo, setReclamo] = useState('');
  const [reclamoOptions, setReclamoOptions] = useState([]);


  const estadoReclamoOptions = [
    { value: 'ABIERTO', label: 'Abierto' },
    { value: 'EN_PROCESO', label: 'En Proceso' },
    { value: 'NUEVO', label: 'Nuevo' },
    { value: 'DESESTIMADO', label: 'Desestimado' },
    { value: 'ANULADO', label: 'Anulado' },
    { value: 'TERMINADO', label: 'Terminado' },
  ];



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
          console.error('Error al obtener la lista de reclamos', error);
        });
    } else {
      setFeedbackMessage('Token JWT no encontrado');
    }
  }, []);





  const actualizarReclamo = () => {

    const reclamoSeleccionado = reclamoOptions.find(option => option.value === reclamo);

    if (reclamoSeleccionado) {
      const token = sessionStorage.getItem("fullToken");

      if (token) {
        const apiUrl = `http://localhost:8080/apis/reclamos/${reclamoSeleccionado.value}`;

        const requestBody = {
          estadoReclamo: nuevoEstadoReclamo,
          medidaTomada: nuevaMedidaTomada,
        };
        

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
              setFeedbackMessage("Reclamo actualizado con éxito");
            } else if (response.status === 404) {
              setFeedbackMessage("Reclamo no encontrado");
            } else {
              setFeedbackMessage('Error al actualizar el reclamo');
              throw new Error('Error al actualizar el reclamo');
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
      <h1>Actualizar Reclamo</h1>
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
          <p>Nuevo Estado del Reclamo</p>
        <Select
        className="react-select-container"
        classNamePrefix="react-select"
        options={estadoReclamoOptions}
        value={estadoReclamoOptions.find((option) => option.value === nuevoEstadoReclamo)}
        onChange={(selectedOption) => setNuevoEstadoReclamo(selectedOption.value)}
        placeholder=''
      />
        {/* <input
          type='text'
          placeholder='Nueva Descripcion'
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
        /> */}
        <p>Nueva Medida Tomada</p>
        <input
          type='text'
          placeholder=''
          value={nuevaMedidaTomada}
          onChange={(e) => setNuevaMedidaTomada(e.target.value)}
        />
        {/* <input
          type='text'
          placeholder='Nuevo ID de Unidad'
          value={idUnidad}
          onChange={(e) => setIdUnidad(e.target.value)}
        /> */}
        {/* <input
          type='text'
          placeholder='Nuevo ID de Área Común'
          value={idAreaComun}
          onChange={(e) => setIdAreaComun(e.target.value)}
        /> */}

        <button className='button-style' onClick={actualizarReclamo}>Actualizar Reclamo</button>
      </div>
    </div>
  )
}

export default ActualizarReclamos;
