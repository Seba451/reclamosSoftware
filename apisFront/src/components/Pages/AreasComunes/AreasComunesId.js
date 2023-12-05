import React, { useState, useEffect } from 'react';
import Select from 'react-select';

function AreasComunesId() {
  
  const [areaComunOptions, setAreaComunOptions] = useState([]);
  const [areaComun, setAreaComun] = useState('');
  const [error, setError] = useState(null);
  const [feedbackMessage, setFeedbackMessage] = useState ('');

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
            label: areaComun.descripcion,
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

  const obtenerAreaComun = () => {
    setAreaComun('');
    
    setError(null);

    const areaComunSeleccionado = areaComunOptions.find(option => option.value === areaComun);

    if (areaComunSeleccionado) {
      const token = sessionStorage.getItem("fullToken");

      if (token) {
        fetch(`http://localhost:8080/apis/areascomunes/${areaComunSeleccionado.value}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error('Número de Área Común inválido');
            }
            return response.json();
          })
          .then((data) => {
            setAreaComun(data);
          })
          .catch((catchError) => {
            setError('Número de Área Común inválido');
          });
      } else {
        setError('Token JWT no encontrado');
      }
    }
  };


  return (
    <div>
      <h1>Área Común por ID</h1>
      <div className='table-areas-comunes'>
        {error ? (
          <div>
            <p>{error}</p>
            <button className='button-style' onClick={obtenerAreaComun}>Reintentar</button>
          </div>
        ) : (
          <div>
            <Select
          options={areaComunOptions}
          value={areaComunOptions.find(option => option.value === areaComun)}
          onChange={selectedOption => setAreaComun(selectedOption.value)}
          placeholder='Seleccione un área común'
        />
            <button onClick={obtenerAreaComun}>Obtener Área Común</button>

            {areaComun && (
              <table className='table-areas-comunes'>
                <thead>
                  <tr>
                    
                    <th>Edificio Asignado</th>
                    <th>Descripcion</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    
                    <td>{areaComun.edificio}</td>
                    <td>{areaComun.descripcion}</td>
                  </tr>
                </tbody>
              </table>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default AreasComunesId;
