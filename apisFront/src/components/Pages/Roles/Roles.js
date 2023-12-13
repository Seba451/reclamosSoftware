import React from 'react';
import { Link } from 'react-router-dom';

function Roles() {
  return (
    <div>
      <h1>Roles</h1>
      <Link className='link-styles' to="/obtenerroles">
        <button className='button-style'>Obtener Roles</button>
      </Link>
      {/* <button>
          <Link to="/rolesid">Obtener Roles por ID</Link>
      </button> */}
      <Link className='link-styles' to="/guardarrol">
        <button className='button-style'>Guardar Rol</button>
      </Link>
      <Link className='link-styles' to="/actualizarrol">
        <button className='button-style'>Actualizar Rol</button>
      </Link>
      <Link className='link-styles' to="/eliminarrol">
        <button className='button-style'>Eliminar Rol</button>
      </Link>
    </div>
  );
}

export default Roles;
