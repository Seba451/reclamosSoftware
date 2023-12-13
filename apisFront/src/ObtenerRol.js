/* import { jwtDecode } from "jwt-decode";

function ObtenerRol(){
    const token = sessionStorage.getItem('fullToken'); // Obtén el token almacenado

if (token) {
  try {
    const decodedToken = jwtDecode(token);
    
    // Comprueba el rol del usuario en el token
    const userRoles = decodedToken.rol; // Asumiendo que el rol se almacena en el campo 'rol'

    return userRoles;
  } catch (error) {
    console.error('Error al decodificar el token:', error);
    return null
  }
}
}


export default ObtenerRol;  */