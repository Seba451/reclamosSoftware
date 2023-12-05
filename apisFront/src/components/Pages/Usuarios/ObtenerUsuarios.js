import React, { useState, useEffect } from 'react';
import '../../../tabla-areas-comunes.css'; 

function ObtenerUsuarios(){
    const [usuarios, setUsuarios] = useState([]);

   

    useEffect(() => {
        // Obtiene el token JWT almacenado en localStorage
        const token = sessionStorage.getItem("fullToken")
    
        // Verifica si se ha almacenado un token
        if (token) {
          // Realiza la solicitud GET con el token JWT en el encabezado de autorización
          fetch('http://localhost:8080/apis/usuarios', {
            headers: {
              Authorization: `Bearer ${token}`, // Agrega el token JWT al encabezado
            },
          })
            .then((response) => {
              if (!response.ok) {
                throw new Error('No se pudieron obtener las áreas comunes');
              }
              return response.json(); // Suponiendo que la respuesta es un JSON
            })
            .then((data) => {
              setUsuarios(data);
              console.log(data); // Actualiza el estado con los datos recibidos
            })
            .catch((error) => {
              console.error('Error:', error);
            });
        } else {
          // Manejar el caso en el que no se encuentra un token JWT
          console.error('Token JWT no encontrado');
        }
      }, []); 

    return (
        <div>
            <h1>Usuarios</h1>
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
                    {usuarios.map((usuario) => (
                        <tr key={usuario.idUsuario}>
                            
                            <td>{usuario.nombre}</td>
                            <td>{usuario.apellido}</td>
                            <td>{usuario.usuario}</td>
                            <td>{usuario.password}</td>
                            <td>{usuario.email}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ObtenerUsuarios;