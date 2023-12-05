import React from 'react';
import { Link } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

function AreasComunes() {
  const token = sessionStorage.getItem('fullToken');
  const decoded = jwtDecode(token);
  const userRole = decoded.rol;

  return (
    <div>
      <h1>Áreas Comunes</h1>

      {userRole.includes('ADMIN') ? (
        <div>
          <Link className='link-styles' to="/obtenerareascomunes">
            <button className='button-style'>Obtener Áreas Comunes</button>
          </Link>
          {/* <button>
                <Link to="/areascomunesid">Obtener Áreas Comunes por ID</Link>
            </button> */}
          <Link className='link-styles' to="/guardarareacomun">
            <button className='button-style'>Guardar Área Comun</button>
          </Link>
          <Link className='link-styles' to="/actualizarareacomun">
            <button className='button-style'>Actualizar Área Comun</button>
          </Link>
          <Link className='link-styles' to="/eliminarareacomun">
            <button className='button-style'>Eliminar Área Comun</button>
          </Link>
        </div>
      ) : (
        <div>
          <Link className='link-styles' to="/obtenerareascomunes">
            <button className='button-style'>Obtener Áreas Comunes</button>
          </Link>
          {/* <button>
                <Link className='link-styles' to="/areascomunesid">Obtener Áreas Comunes por ID</Link>
            </button> */}
        </div>
      )}
    </div>
  );
}

export default AreasComunes;
