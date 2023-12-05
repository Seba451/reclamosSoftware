import React from 'react';
import { Link } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

function Edificios() {
  const token = sessionStorage.getItem('fullToken');
  const decoded = jwtDecode(token);
  const userRole = decoded.rol;

  return (
    <div>
      <h1>Edificios</h1>
      {userRole.includes('ADMIN') ? (
        <div>
          <Link className='link-styles' to="/obteneredificios">
            <button className='button-style'>Obtener Edificios</button>
          </Link>
          <Link className='link-styles' to="/guardaredificio">
            <button className='button-style'>Guardar Edificio</button>
          </Link>
          {/* <button>
                <Link to="/edificiosid">Obtener Edificios por ID</Link>
            </button> */}
          <Link className='link-styles' to="/actualizaredificio">
            <button className='button-style'>Actualizar Edificio</button>
          </Link>
          <Link className='link-styles' to="/eliminaredificio">
            <button className='button-style'>Eliminar Edificio</button>
          </Link>
        </div>
      ) : (
        <div>
          <Link className='link-styles' to="/obteneredificios">
            <button className='button-style'>Obtener Edificios</button>
          </Link>
          {/* <button>
                <Link className='link-styles' to="/edificiosid">Obtener Edificios por ID</Link>
            </button> */}
        </div>
      )}
    </div>
  );
}

export default Edificios;
