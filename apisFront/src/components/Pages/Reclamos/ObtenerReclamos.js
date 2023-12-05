import React, { useState, useEffect } from 'react';
import '../../../tabla-areas-comunes.css'; 
import Select from 'react-select';

function ObtenerReclamos(){
    const [reclamos, setReclamos] = useState([]);
    const token = sessionStorage.getItem("fullToken")
    
   

    useEffect(() => {
        // Obtiene el token JWT almacenado en localStorage
        
    
        // Verifica si se ha almacenado un token
        if (token) {
          // Realiza la solicitud GET con el token JWT en el encabezado de autorización
          fetch('http://localhost:8080/apis/reclamos', {
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
              setReclamos(data);
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



      const handleDownload = (id) => {

        console.log(id);
        
        // Hacer una solicitud para descargar la imagen con el ID proporcionado
        // Puedes usar la URL de descarga que proporcionaste en el backend
        fetch(`http://localhost:8080/imagenes/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`, // Agrega el token JWT al encabezado
            },
            
          })
        
            .then((response) => {
                if (!response.ok) {
                    throw new Error('No se pudo descargar la imagen');
                }
                return response.blob();
            })
            .then((blob) => {
                // Crear un objeto URL para la imagen descargada
                const imageUrl = URL.createObjectURL(blob);
                
                // Abrir la imagen en una nueva ventana o pestaña
                window.open(imageUrl);
            })
            .catch((error) => {
                console.error('Error al descargar la imagen:', error);
            });
    };

    return (
        <div>
            <h1>Reclamos</h1>
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
                        <th>Imagen</th>
                        
                    </tr>
                </thead>
                <tbody>
                    {reclamos.map((reclamo) => (
                        <tr key={reclamo.id}
                        >
                            
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
                            <td>
                                {reclamo.fotoArchivo && (
                                  
                                    <button onClick={() => handleDownload(reclamo.idReclamo)}>
                                        Ver Imagen
                                    </button>
                                )}
                            </td>
                            
    


                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ObtenerReclamos;