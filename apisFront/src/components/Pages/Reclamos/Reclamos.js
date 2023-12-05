import React from 'react';
import { Link } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

function Reclamos() {
  const token = sessionStorage.getItem('fullToken');
  const decoded = jwtDecode(token);
  const userRole = decoded.rol;

  return (
    <div>
      <h1>Reclamos</h1>
      <div className='container-buttons'>
        {userRole.includes('ADMIN') ? (
          <div>
            <Link className='link-styles' to="/obtenerreclamos">
              <button className='button-style'>Obtener Reclamos</button>
            </Link>
            {/* <button>
                    <Link to="/reclamosid">Obtener Reclamos por ID</Link>
                </button> */}
            <Link className='link-styles' to="/actualizarreclamo">
              <button className='button-style'>Actualizar Reclamo</button>
            </Link>
            <Link className='link-styles' to="/eliminarreclamo">
              <button className='button-style'>Eliminar Reclamo</button>
            </Link>
          </div>
        ) : (
          <div>
            <Link className='link-styles' to="/obtenerreclamos">
              <button className='button-style'>Obtener Reclamos</button>
            </Link>
            <Link className='link-styles' to="/guardarreclamo">
              <button className='button-style'>Hacer Reclamo</button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default Reclamos;
