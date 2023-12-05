import React, { useState, useEffect } from 'react';
import '../../../tabla-areas-comunes.css';
import Select from 'react-select';

function ReclamosId() {
  const [reclamo, setReclamo] = useState(null);
  const [id, setId] = useState('');
  const [error, setError] = useState(null);

  const obtenerReclamo = () => {
    setReclamo(null);
    setError(null);
    setId(null);

    if (id) {
      const token = sessionStorage.getItem("fullToken");

      if (token) {
        fetch(`http://localhost:8080/apis/reclamos/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error('Número de Reclamo inválido');
            }
            return response.json();
          })
          .then((data) => {
            setReclamo(data);
          })
          .catch((catchError) => {
            setError('Número de Reclamo inválido');
          });
      } else {
        setError('Token JWT no encontrado');
      }
    }
  };

  return (
    <div>
      <h1>Reclamo por ID</h1>
      <div className='table-areas-comunes'>
        {error ? (
          <div>
            <p>{error}</p>
            <button onClick={obtenerReclamo}>Reintentar</button>
          </div>
        ) : (
          <div>
            <input
              type='text'
              placeholder='ID del Reclamo'
              value={id}
              onChange={(e) => setId(e.target.value)}
            />
            <button onClick={obtenerReclamo}>Obtener Reclamo</button>

            {reclamo && (
              <table className='table-areas-comunes'>
                <thead>
                  <tr>
                  <th>Usuario</th>
                        <th>Unidad Asignada</th>
                        <th>Area Comun Asignada</th>
                        <th>Descripcion</th>
                        <th>Fecha de Creacion</th>
                        <th>Estado del Reclamo</th>
                        <th>Medida Tomada</th>
                  </tr>
                </thead>
                <tbody>
                  <tr key={reclamo.id}>
                    <td>{reclamo.usuario}</td>
                    <td>{reclamo.numeroUnidad != null && reclamo.pisoUnidad != null ? (
                                    <Select
                                        options={[
                                            {
                                                label: `Unidad ${reclamo.numeroUnidad} - Piso ${reclamo.pisoUnidad}`,
                                                value: `${reclamo.numeroUnidad}-${reclamo.pisoUnidad}`,
                                            }
                                        ]}
                                        value={{
                                            label: `Unidad ${reclamo.numeroUnidad} - Piso ${reclamo.pisoUnidad}`,
                                            value: `${reclamo.numeroUnidad}-${reclamo.pisoUnidad}`,
                                        }}
                                    />
                                ) : null}</td>
                    <td>{reclamo.areaComun}</td>
                    <td>{reclamo.descripcion}</td>
                    <td>{reclamo.fechaCreacion}</td>
                    <td>{reclamo.estadoReclamo}</td>
                    <td>{reclamo.medidaTomada}</td>
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

export default ReclamosId;
