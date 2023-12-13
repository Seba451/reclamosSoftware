import React, { useState, useEffect } from 'react';
import '../../../tabla-areas-comunes.css'; 

function ObtenerRoles(){
    const [roles, setRoles] = useState([]);

   

    useEffect(() => {
        // Obtiene el token JWT almacenado en localStorage
        const token = sessionStorage.getItem("fullToken")
    
        // Verifica si se ha almacenado un token
        if (token) {
          // Realiza la solicitud GET con el token JWT en el encabezado de autorización
          fetch('http://localhost:8080/apis/roles', {
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
              setRoles(data); // Actualiza el estado con los datos recibidos
              console.log(data);
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
            <h1>Roles</h1>
            <table className='table-areas-comunes'>
                <thead>
                    <tr>
                        
                        <th>Tipo Rol</th>
                        <th>Usuario</th>
                    </tr>
                </thead>
                <tbody>
                    {roles.map((rol) => (
                        <tr key={rol.idRol}>
                           
                            <td>{rol.tipoRol}</td>
                            <td>{rol.usuario}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ObtenerRoles;