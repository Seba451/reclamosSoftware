import React from 'react';
import { Link } from 'react-router-dom';

function Reclamos() {
  return (
    <div>
      <h1>¿Qué reclamo desea realizar?</h1>
      <Link className='link-styles' to="/guardarreclamounidad">
        <button className='button-style'>Reclamo sobre unidad</button>
      </Link>
      <Link className='link-styles' to="/guardarreclamoareacomun">
        <button className='button-style'>Reclamo sobre área común</button>
      </Link>
    </div>
  );
}

export default Reclamos;
