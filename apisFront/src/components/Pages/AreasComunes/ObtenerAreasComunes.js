import React, { useState, useEffect } from 'react';
import '../../../tabla-areas-comunes.css'; 

function ObtenerAreasComunes(){
    const [areasComunes, setAreasComunes] = useState([]);

   

    useEffect(() => {
        // Obtiene el token JWT almacenado en localStorage
        const token = sessionStorage.getItem("fullToken")
    
        // Verifica si se ha almacenado un token
        if (token) {
          // Realiza la solicitud GET con el token JWT en el encabezado de autorización
          fetch('http://localhost:8080/apis/areascomunes', {
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
              setAreasComunes(data); // Actualiza el estado con los datos recibidos
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
            <h1>Areas Comunes</h1>
            <table className='table-areas-comunes'>
                <thead>
                    <tr>
                        
                        <th>Edificio Asignado</th>
                        <th>Descripcion</th>
                    </tr>
                </thead>
                <tbody>
                    {areasComunes.map((areaComun) => (
                        <tr key={areaComun.idArea}>
                            
                            <td>{areaComun.edificio}</td>
                            <td>{areaComun.descripcion}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ObtenerAreasComunes;