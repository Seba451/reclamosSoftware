import React, { useState, useEffect } from 'react';
import Select from 'react-select';

function GuardarUnidad() {
  

  const [piso, setPiso] = useState('');
  const [numero, setNumero] = useState('');
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [edificio, setEdificio] = useState('');
  const [edificioOptions, setEdificioOptions] = useState([]);
  const [dueño, setDueño] = useState('');
  const [dueñoOptions, setDueñoOptions] = useState([]);
  const [inquilino, setInquilino] = useState('');
  const [inquilinoOptions, setInquilinoOptions] = useState([]);


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


  




  const guardarUnidad = () => {

    const edificioSeleccionado = edificioOptions.find(option => option.value === edificio);
    const dueñoSeleccionado = dueñoOptions.find(option => option.value === dueño);
    const inquilinoSeleccionado = inquilinoOptions.find(option => option.value === inquilino);

    

    
    
    // Lógica para guardar la Unidad
    if (edificioSeleccionado && dueñoSeleccionado && numero && piso) {
      if (dueñoSeleccionado.label === inquilinoSeleccionado.label) {
        setFeedbackMessage('El dueño y el inquilino no pueden ser el mismo usuario.');
        console.log(dueñoSeleccionado.value);
        return;
      }
      const token = sessionStorage.getItem("fullToken");

      if (token) {
        // Construye la URL con los parámetros de consulta
        const apiUrl = `http://localhost:8080/apis/unidades?idEdificio=${edificioSeleccionado.value}`;

        const requestBody = {
          idEdificio: edificioSeleccionado.value,
          piso: piso,
          numero: numero,
          dueño: dueñoSeleccionado.label,
          
        };

        if (inquilinoSeleccionado) {
          requestBody.inquilino = inquilinoSeleccionado.label;
        };

        fetch(apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify(requestBody)
        })
          .then((response) => {
            if (response.ok) {
              return response.json();
              
            }
            
            throw new Error('Error al guardar la Unidad. Este error puede surgir porque el inquilino elegido ya tiene una unidad asignada.');
          })
          .then(() => {
            setFeedbackMessage('Unidad guardada con éxito');
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
    <div className='container'>
      <h1>Guardar Unidad</h1>
      <div >
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
          <p>Dueño</p>
          <Select
          className="react-select-container"
          classNamePrefix="react-select"
            options={dueñoOptions}
            value={dueñoOptions.find(option => option.value === dueño)}
            onChange={selectedOption => setDueño(selectedOption.value)}
            placeholder=''
          />
          <p>Inquilino (opcional)</p>
          <Select
          className="react-select-container"
          classNamePrefix="react-select"
            options={inquilinoOptions}
            value={inquilinoOptions.find(option => option.value === inquilino)}
            onChange={selectedOption => setInquilino(selectedOption.value)}
            placeholder=''
          />
          <p>Piso</p>
          <input
            type='text'
            placeholder=''
            value={piso}
            onChange={(e) => setPiso(e.target.value)}
          />
          <p>Numero</p>
          <input
            type='text'
            placeholder=''
            value={numero}
            onChange={(e) => setNumero(e.target.value)}
          />
          <button className='button-style' onClick={guardarUnidad}>Guardar Unidad</button>
        </div>
      </div>
    </div>
  );
}

export default GuardarUnidad;
