import React, { useState, useEffect } from 'react';

function UnidadesId() {
  const [unidad, setUnidad] = useState(null);
  const [id, setId] = useState('');
  const [error, setError] = useState(null);

  const obtenerUnidad = () => {
    setUnidad(null);
    setId('');
    setError(null);

    if (id) {
      const token = sessionStorage.getItem("fullToken");

      if (token) {
        fetch(`http://localhost:8080/apis/unidades/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error('Número de Unidad inválido');
            }
            return response.json();
          })
          .then((data) => {
            setUnidad(data);
          })
          .catch((catchError) => {
            setError('Número de Unidad inválido');
          });
      } else {
        setError('Token JWT no encontrado');
      }
    }
  }

  return (
    <div>
      <h1>Unidad por ID</h1>
      <div className='table-areas-comunes'>
        {error ? (
          <div>
            <p>{error}</p>
            <button onClick={obtenerUnidad}>Reintentar</button>
          </div>
        ) : (
          <div>
            <input
              type='text'
              placeholder='ID de la Unidad'
              value={id}
              onChange={(e) => setId(e.target.value)}
            />
            <button onClick={obtenerUnidad}>Obtener Unidad</button>

            {unidad && (
              <table className='table-areas-comunes'>
                <thead>
                  <tr>
                    
                    <th>Edificio</th>
                    <th>Dueño</th>
                    <th>Inquilino</th>
                    <th>Piso</th>
                    <th>Numero</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    
                    <td>{unidad.edificio}</td>
                    <td>{unidad.dueño}</td>
                    <td>{unidad.inquilino}</td>
                    <td>{unidad.piso}</td>
                    <td>{unidad.numero}</td>
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

export default UnidadesId;
