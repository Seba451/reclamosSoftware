import React, { useState, useEffect } from 'react';
import '../../../tabla-areas-comunes.css';

function EdificiosId() {
  const [edificio, setEdificio] = useState(null);
  const [id, setId] = useState('');
  const [error, setError] = useState(null);

  const obtenerEdificio = () => {
    setEdificio(null);
    setId('');
    setError(null);

    if (id) {
      const token = sessionStorage.getItem("fullToken");

      if (token) {
        fetch(`http://localhost:8080/apis/edificios/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error('Número de Edificio inválido');
            }
            return response.json();
          })
          .then((data) => {
            setEdificio(data);
          })
          .catch((catchError) => {
            setError('Número de Edificio inválido');
          });
      } else {
        setError('Token JWT no encontrado');
      }
    }
  };

  return (
    <div>
      <h1>Edificio por ID</h1>
      <div className='table-areas-comunes'>
        {error ? (
          <div>
            <p>{error}</p>
            <button onClick={obtenerEdificio}>Reintentar</button>
          </div>
        ) : (
          <div>
            <input
              type='text'
              placeholder='ID del Edificio'
              value={id}
              onChange={(e) => setId(e.target.value)}
            />
            <button onClick={obtenerEdificio}>Obtener Edificio</button>

            {edificio && (
              <table className='table-areas-comunes'>
                <thead>
                  <tr>
                    
                    <th>Direccion</th>
                    <th>Nombre</th>
                  </tr>
                </thead>
                <tbody>
                  <tr key={edificio.id}>
                    
                    <td>{edificio.direccion}</td>
                    <td>{edificio.nombre}</td>
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

export default EdificiosId;
