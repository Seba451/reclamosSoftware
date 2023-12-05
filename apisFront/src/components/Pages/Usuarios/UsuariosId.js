import React, { useState, useEffect } from 'react';
import '../../../tabla-areas-comunes.css';

function UsuariosId() {
  const [usuario, setUsuario] = useState(null);
  const [id, setId] = useState('');
  const [error, setError] = useState(null);

  const obtenerUsuario = () => {
    setUsuario(null);
    setId('');
    setError(null);

    if (id) {
      const token = sessionStorage.getItem("fullToken");

      if (token) {
        fetch(`http://localhost:8080/apis/usuarios/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error('Número de Usuario inválido');
            }
            return response.json();
          })
          .then((data) => {
            setUsuario(data);
          })
          .catch((catchError) => {
            setError('Número de Usuario inválido');
          });
      } else {
        setError('Token JWT no encontrado');
      }
    }
  }

  return (
    <div>
      <h1>Usuario por ID</h1>
      <div className='table-areas-comunes'>
        {error ? (
          <div>
            <p>{error}</p>
            <button onClick={obtenerUsuario}>Reintentar</button>
          </div>
        ) : (
          <div>
            <input
              type='text'
              placeholder='ID del Usuario'
              value={id}
              onChange={(e) => setId(e.target.value)}
            />
            <button onClick={obtenerUsuario}>Obtener Usuario</button>

            {usuario && (
              <table className='table-areas-comunes'>
                <thead>
                  <tr>
                    
                    <th>Nombre</th>
                    <th>Apellido</th>
                    <th>Usuario</th>
                    <th>Contraseña</th>
                    <th>Email</th>
                  </tr>
                </thead>
                <tbody>
                  <tr key={usuario.idUsuario}>
                    
                    <td>{usuario.nombre}</td>
                    <td>{usuario.apellido}</td>
                    <td>{usuario.usuario}</td>
                    <td>{usuario.password}</td>
                    <td>{usuario.email}</td>
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

export default UsuariosId;
