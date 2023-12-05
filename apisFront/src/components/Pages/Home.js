import { Link } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

export default function Home() {
    const token = sessionStorage.getItem('fullToken');
  const decoded = jwtDecode(token);
  const userRole = decoded.rol;
  return (
    <div>
      <h1>Bienvenido!</h1>
      {userRole.includes('ADMIN') ? (
      <div className='container-home'>
        <Link className='link-home' to="/reclamos">
          <button className='button-home1'>Reclamos</button>
        </Link>

        <Link className='link-home' to="/edificios">
          <button className='button-home2'>Edificios</button>
        </Link>

        <Link className='link-home' to="/areascomunes">
          <button className='button-home3'>Areas Comunes</button>
        </Link>

        <Link className='link-home' to="/unidades">
          <button className='button-home4'>Unidades</button>
        </Link>

        <Link className='link-home' to="/usuarios">
          <button className='button-home5'>Usuarios</button>
        </Link>

        <Link className='link-home' to="/roles">
          <button className='button-home6'>Roles</button>
        </Link>
      </div>
      ) : (
<div className='container-home'>
        <Link className='link-home' to="/reclamos">
          <button className='button-home1'>Reclamos</button>
        </Link>

        <Link className='link-home' to="/edificios">
          <button className='button-home2'>Edificios</button>
        </Link>

        <Link className='link-home' to="/areascomunes">
          <button className='button-home3'>Areas Comunes</button>
        </Link>

        <Link className='link-home' to="/unidades">
          <button className='button-home4'>Unidades</button>
        </Link>

        
      </div>
      )}
    </div>
  );
}
