import React, { useState, useEffect } from 'react';

function RolesId() {
  const [rol, setRol] = useState(null);
  const [id, setId] = useState('');
  const [error, setError] = useState(null);

  const obtenerRol = () => {
    setRol(null);
    setId('');
    setError(null);

    if (id) {
      const token = sessionStorage.getItem("fullToken");

      if (token) {
        fetch(`http://localhost:8080/apis/roles/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error('Número de Rol inválido');
            }
            return response.json();
          })
          .then((data) => {
            setRol(data);
          })
          .catch((catchError) => {
            setError('Número de Rol inválido');
          });
      } else {
        setError('Token JWT no encontrado');
      }
    }
  };

  return (
    <div>
      <h1>Rol por ID</h1>
      <div className='table-areas-comunes'>
        {error ? (
          <div>
            <p>{error}</p>
            <button onClick={obtenerRol}>Reintentar</button>
          </div>
        ) : (
          <div>
            <input
              type='text'
              placeholder='ID del Rol'
              value={id}
              onChange={(e) => setId(e.target.value)}
            />
            <button onClick={obtenerRol}>Obtener Rol</button>

            {rol && (
              <table className='table-areas-comunes'>
                <thead>
                  <tr>
                    
                    <th>Tipo Rol</th>
                    <th>Usuario</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    
                    <td>{rol.tipoRol}</td>
                    <td>{rol.usuario}</td>
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

export default RolesId;
