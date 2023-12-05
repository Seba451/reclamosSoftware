import { Link, useMatch, useResolvedPath } from "react-router-dom"
import { jwtDecode } from "jwt-decode";

export default function Navbar(){
  const token = sessionStorage.getItem('fullToken');
    const decoded = jwtDecode(token);
    const userRole = decoded.rol;

    return (<nav className="nav">
        <Link to="/" className="site-title">Software de Reclamos</Link>
        {userRole.includes('ADMIN') ? (
          <ul>
            
          <CustomLink to="/reclamos">Reclamos</CustomLink>
          
          <CustomLink to="/edificios">Edificios</CustomLink>
          
          <CustomLink to="/areascomunes">Areas Comunes</CustomLink>
      
          <CustomLink to="/unidades">Unidades</CustomLink>
          
          <CustomLink to="/usuarios">Usuarios</CustomLink>

          <CustomLink to="/roles">Roles</CustomLink>
          
      </ul>
        ) : (
          <ul>
            <CustomLink to="/reclamos">Reclamos</CustomLink>
          
          <CustomLink to="/edificios">Edificios</CustomLink>
          
          <CustomLink to="/areascomunes">Areas Comunes</CustomLink>
      
          <CustomLink to="/unidades">Unidades</CustomLink>
          </ul>
        )}
        
    </nav>)}

function CustomLink({ to, children, ...props }) {
    const resolvedPath = useResolvedPath(to)
    const isActive = useMatch({ path: resolvedPath.pathname, end: true })
  
    return (
      <li className={isActive ? "active" : ""}>
        <Link to={to} {...props}>
          {children}
        </Link>
      </li>
    )
}