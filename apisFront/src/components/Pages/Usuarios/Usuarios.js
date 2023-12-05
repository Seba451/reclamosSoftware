import React from 'react';
import { Link } from 'react-router-dom';

function Usuarios() {
  return (
    <div>
      <h1>Usuarios</h1>

      <Link className='link-styles' to="/obtenerusuarios">
        <button className='button-style'>Obtener Usuarios</button>
      </Link>

      {/* <button>
          <Link to="/usuariosid">Obtener Usuarios por ID</Link>
      </button> */}
      
      <Link className='link-styles' to="/guardarusuario">
        <button className='button-style'>Guardar Usuario</button>
      </Link>

      <Link className='link-styles' to="/actualizarusuario">
        <button className='button-style'>Actualizar Usuario</button>
      </Link>

      <Link className='link-styles' to="/eliminarusuario">
        <button className='button-style'>Eliminar Usuario</button>
      </Link>
    </div>
  );
}

export default Usuarios;
