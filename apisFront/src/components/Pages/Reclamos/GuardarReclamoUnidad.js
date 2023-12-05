import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { jwtDecode } from 'jwt-decode';

function GuardarReclamos() {
  const [descripcion, setDescripcion] = useState('');
  const [unidad, setUnidad] = useState('');
  const username = sessionStorage.getItem('username');
  const token = sessionStorage.getItem('fullToken');
  const decoded = jwtDecode(token);
  const userRole = decoded.rol;
  const [imagen, setImagen] = useState(null);
  const [feedbackMessage, setFeedbackMessage] = useState('');
  
  const [unidadOptions, setUnidadOptions] = useState([]); // Lista de opciones para el select

  // Lógica para obtener la lista de unidades desde la base de datos
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
          let filteredUnidades = []; 
          console.log(userRole);
          
          if (userRole.includes('DUEÑO') && userRole.includes('INQUILINO')) {
            const unidadesDueño = data.filter(unidad => unidad.dueño === username && unidad.inquilino === null);
            const unidadesInquilino = data.filter(unidad => unidad.inquilino === username);
  
            filteredUnidades = [...unidadesDueño, ...unidadesInquilino];
          } else if (userRole.includes('DUEÑO')) {
            filteredUnidades = data.filter(unidad => unidad.dueño === username && unidad.inquilino === null);
          } else if (userRole.includes('INQUILINO')) {
            filteredUnidades = data.filter(unidad => unidad.inquilino === username);
          }
          
          console.log(username);
          const options = filteredUnidades.map((unidad) => ({
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



  const guardarReclamo = () =>{
    

    const unidadSeleccionada = unidadOptions.find(option => option.value === unidad);
    console.log(unidadSeleccionada);
    // Lógica para guardar el reclamo
    if (unidadSeleccionada && descripcion) {
      const token = sessionStorage.getItem("fullToken");
      

      /* const requestBody = {
        descripcion: descripcion,
        idUnidad: unidadSeleccionada.value,
      }  */
          
      const body = {  descripcion: descripcion,  idUnidad: unidadSeleccionada.value};
      
      /* formData.append('descripcion', descripcion);
      formData.append('idUnidad', unidadSeleccionada.value); */

      
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
          <p>Unidad</p>
          <Select
          className="react-select-container"
          classNamePrefix="react-select"
            options={unidadOptions}
            value={unidadOptions.find(option => option.value === unidad)}
            onChange={selectedOption => setUnidad(selectedOption.value)}
            placeholder=''
          />
          <p>Descripcion del Reclamo</p>
          <input
            type='text'
            placeholder=''
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
          />
           <p>Adjuntar Foto</p>
           <input
           type="file"
            accept="image/*"
           onChange={(e) => setImagen(e.target.files[0])}
           />  

          


          {/* Agrega otros campos necesarios para un reclamo */}
         
          <button className='button-style' onClick={guardarReclamo}>Guardar Reclamo</button>
          
         </div>
        </div>
        
    </div>
  );
}

export default GuardarReclamos;
