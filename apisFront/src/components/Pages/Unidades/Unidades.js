import React from 'react';
import { Link } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

function Unidades() {
  const token = sessionStorage.getItem('fullToken');
  const decoded = jwtDecode(token);
  const userRole = decoded.rol;

  return (
    <div>
      <h1>Unidades</h1>
      {userRole.includes('ADMIN') ? (
        <div>
          <Link className='link-styles' to="/obtenerunidades">
            <button className='button-style'>Obtener Unidades</button>
          </Link>

          {/* <button>
                <Link to="/unidadesid">Obtener Unidades por ID</Link>
            </button> */}

          <Link className='link-styles' to="/guardarunidad">
            <button className='button-style'>Guardar Unidad</button>
          </Link>

          <Link className='link-styles' to="/actualizarunidad">
            <button className='button-style'>Actualizar Unidad</button>
          </Link>

          <Link className='link-styles' to="/eliminarunidad">
            <button className='button-style'>Eliminar Unidad</button>
          </Link>
        </div>
      ) : (
        <div>
          <Link className='link-styles' to="/obtenerunidades">
            <button className='button-style'>Obtener Unidades</button>
          </Link>

          {/* <button>
                <Link className='link-styles' to="/unidadesid">Obtener Unidades por ID</Link>
            </button> */}
        </div>
      )}
    </div>
  );
}

export default Unidades;
