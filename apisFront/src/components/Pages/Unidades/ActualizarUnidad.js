import React, { useState, useEffect } from 'react';
import Select from 'react-select';

function ActualizarUnidad() {
  const [piso, setPiso] = useState('');
  const [numero, setNumero] = useState('');
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [edificio, setEdificio] = useState('');
  const [edificioOptions, setEdificioOptions] = useState([]);
  const [dueño, setDueño] = useState('');
  const [dueñoOptions, setDueñoOptions] = useState([]);
  const [inquilino, setInquilino] = useState('');
  const [inquilinoOptions, setInquilinoOptions] = useState([]);
  const [unidad, setUnidad] = useState('');
  const [unidadOptions, setUnidadOptions] = useState([]);

  useEffect(() => {
    const apiUrl = 'http://localhost:8080/apis/roles'; // Reemplaza con la URL correcta
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
          throw new Error('Error al obtener la lista de roles');
        })
        
        
        .then((data) => {
          /* const filteredAreas = data.filter(areaComun => areaComun.edificio === selectedEdificio.label);
          const options = filteredAreas.map((areaComun) */
          
          const filteredUsers = data.filter(inquilino => inquilino.tipoRol === 'INQUILINO'); 
          
          const options = filteredUsers.map((inquilino) => ({
            label: inquilino.usuario,
            value: inquilino.idRol,
            
          }));

          setInquilinoOptions(options);
          console.log(options);
        })
        .catch((error) => {
          console.error('Error al obtener la lista de roles', error);
        });
    } else {
      setFeedbackMessage('Token JWT no encontrado');
    }
  }, []);


  



  useEffect(() => {
    const apiUrl = 'http://localhost:8080/apis/roles'; // Reemplaza con la URL correcta
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
          throw new Error('Error al obtener la lista de roles');
        })
        
        
        .then((data) => {
          /* const filteredAreas = data.filter(areaComun => areaComun.edificio === selectedEdificio.label);
          const options = filteredAreas.map((areaComun) */
          
          const filteredUsers = data.filter(dueño => dueño.tipoRol === 'DUEÑO'); 
          
          const options = filteredUsers.map((dueño) => ({
            label: dueño.usuario,
            value: dueño.idRol,
            
          }));

          setDueñoOptions(options);
          console.log(options);
        })
        .catch((error) => {
          console.error('Error al obtener la lista de roles', error);
        });
    } else {
      setFeedbackMessage('Token JWT no encontrado');
    }
  }, []);



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
            label: `${unidad.edificio} - Piso: ${unidad.piso} - Numero: ${unidad.numero}`,
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


  const actualizarUnidad = () => {

    const edificioSeleccionado = edificioOptions.find(option => option.value === edificio);
    const dueñoSeleccionado = dueñoOptions.find(option => option.value === dueño);
    const unidadSeleccionada = unidadOptions.find(option => option.value === unidad);
    const inquilinoSeleccionado = inquilinoOptions.find(option => option.value === inquilino);

    console.log("fubol");
    console.log(dueñoSeleccionado);
    console.log(inquilinoSeleccionado);
    console.log(unidadSeleccionada);
    
    if (unidadSeleccionada) {
      /* if(inquilinoSeleccionado){
        if(dueñoSeleccionado && dueñoSeleccionado.label === inquilinoSeleccionado.label){
          setFeedbackMessage('El dueño y el inquilino no pueden ser el mismo usuario.');
        console.log(dueñoSeleccionado.value);
        return;
        } else if ()
      } */
      
      const token = sessionStorage.getItem("fullToken");

      if (token) {
        const apiUrl = `http://localhost:8080/apis/unidades/${unidadSeleccionada.value}`;

        const requestBody = {
          
          idUnidad: unidadSeleccionada.value
          
        };

        if(piso){
          requestBody.piso = piso;
        }

        if(numero){
          requestBody.numero = numero;
        }

        if(dueñoSeleccionado){
          requestBody.dueño = dueñoSeleccionado.label;
        }

        if(edificioSeleccionado){
          requestBody.idEdificio = edificioSeleccionado.value;
        }

        if (inquilinoSeleccionado) {
          requestBody.inquilino = inquilinoSeleccionado.label;
        }


        fetch(apiUrl, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify(requestBody)
        })
        .then((response) => {
            if (response.ok) {
              setFeedbackMessage("Unidad actualizada con éxito");
            } else if (response.status === 404) {
              setFeedbackMessage("Unidad no encontrada");
            } else {
              setFeedbackMessage('Error al actualizar la Unidad');
              throw new Error('Error al actualizar la Unidad');
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
      <h1>Actualizar Unidad</h1>
      {feedbackMessage && <p>{feedbackMessage}</p>}
      <div>
        <p>Unidad</p>
      <Select className="react-select-container"
        classNamePrefix="react-select"
            options={unidadOptions}
            value={unidadOptions.find(option => option.value === unidad)}
            onChange={selectedOption => setUnidad(selectedOption.value)}
            placeholder=''
          />
          <p>Nuevo Edificio</p>
        <Select className="react-select-container"
        classNamePrefix="react-select"
            options={edificioOptions}
            value={edificioOptions.find(option => option.value === edificio)}
            onChange={selectedOption => setEdificio(selectedOption.value)}
            placeholder=''
          />
          <p>Nuevo Dueño</p>
        <Select className="react-select-container"
        classNamePrefix="react-select"
            options={dueñoOptions}
            value={dueñoOptions.find(option => option.value === dueño)}
            onChange={selectedOption => setDueño(selectedOption.value)}
            placeholder=''
          />
          <p>Nuevo Inquilino</p>
          <Select
          className="react-select-container"
          classNamePrefix="react-select"
            options={inquilinoOptions}
            value={inquilinoOptions.find(option => option.value === inquilino)}
            onChange={selectedOption => setInquilino(selectedOption.value)}
            placeholder=''
          />
<p>Nuevo Piso</p>
<input
            type='text'
            placeholder=''
            value={piso}
            onChange={(e) => setPiso(e.target.value)}
          />
<p>Nuevo Numero</p>
        <input
          type='text'
          placeholder=''
          value={numero}
          onChange={(e) => setNumero(e.target.value)}
        />
        
          
        <button className='button-style' onClick={actualizarUnidad}>Actualizar Unidad</button>
      </div>
    </div>
  )
}

export default ActualizarUnidad;
