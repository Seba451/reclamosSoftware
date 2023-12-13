import React, { useState, useEffect } from 'react';
import '../../../tabla-areas-comunes.css'; 
import usuarios from '../Usuarios/Usuarios';

function ObtenerUnidades(){
    const [unidades, setUnidades] = useState([]);

   

    useEffect(() => {
        // Obtiene el token JWT almacenado en localStorage
        const token = sessionStorage.getItem("fullToken")
    
        // Verifica si se ha almacenado un token
        if (token) {
          // Realiza la solicitud GET con el token JWT en el encabezado de autorización
          fetch('http://localhost:8080/apis/unidades', {
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
              setUnidades(data); // Actualiza el estado con los datos recibidos
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
            <h1>Unidades</h1>
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
                    {unidades.map((unidad) => (
                        <tr key={unidad.idUnidad}>
                            
                            <td>{unidad.edificio}</td>
                            <td>{unidad.dueño}</td>
                            <td>{unidad.inquilino}</td>
                            <td>{unidad.piso}</td>
                            <td>{unidad.numero}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ObtenerUnidades;