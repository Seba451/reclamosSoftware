import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import Navbar from './Navbar';
import Home from './components/Pages/Home';
import Reclamos from './components/Pages/Reclamos/Reclamos';
import Unidades from './components/Pages/Unidades/Unidades';
import Usuarios from './components/Pages/Usuarios/Usuarios';
import Edificios from './components/Pages/Edificios/Edificios';
import AreasComunes from './components/Pages/AreasComunes/AreasComunes'
import Login from './components/Login/Login'
import ObtenerAreasComunes from './components/Pages/AreasComunes/ObtenerAreasComunes';
import AreasComunesId from './components/Pages/AreasComunes/AreasComunesId'
import EliminarAreaComun from './components/Pages/AreasComunes/EliminarAreaComun'
import GuardarAreaComun from './components/Pages/AreasComunes/GuardarAreaComun';
import ActualizarAreaComun from './components/Pages/AreasComunes/ActualizarAreaComun'
import ObtenerEdificios from './components/Pages/Edificios/ObtenerEdificios';
import EdificiosId from './components/Pages/Edificios/EdificiosId';
import EliminarEdificio from './components/Pages/Edificios/EliminarEdificio';
import GuardarEdificio from './components/Pages/Edificios/GuardarEdificio'
import ActualizarEdificio from './components/Pages/Edificios/ActualizarEdificio'
import ObtenerUsuarios from './components/Pages/Usuarios/ObtenerUsuarios'
import UsuariosId from './components/Pages/Usuarios/UsuariosId'
import GuardarUsuario from './components/Pages/Usuarios/GuardarUsuario'
import EliminarUsuario from './components/Pages/Usuarios/EliminarUsuario'
import ActualizarUsuario from './components/Pages/Usuarios/ActualizarUsuario'
import ObtenerReclamos from './components/Pages/Reclamos/ObtenerReclamos'
import ReclamosId from './components/Pages/Reclamos/ReclamosId'
import GuardarReclamo from './components/Pages/Reclamos/GuardarReclamo'
import GuardarReclamoUnidad from './components/Pages/Reclamos/GuardarReclamoUnidad'
import GuardarReclamoAreaComun from './components/Pages/Reclamos/GuardarReclamoAreaComun'
import ActualizarReclamo from './components/Pages/Reclamos/ActualizarReclamo'
import EliminarReclamo from './components/Pages/Reclamos/EliminarReclamo'
import ObtenerUnidades from './components/Pages/Unidades/ObtenerUnidades'
import UnidadesId from './components/Pages/Unidades/UnidadesId'
import GuardarUnidad from './components/Pages/Unidades/GuardarUnidad'
import EliminarUnidad from './components/Pages/Unidades/EliminarUnidad'
import ActualizarUnidad from './components/Pages/Unidades/ActualizarUnidad'
import Roles from './components/Pages/Roles/Roles'
import ObtenerRoles from'./components/Pages/Roles/ObtenerRoles'
import RolesId from './components/Pages/Roles/RolesId'
import GuardarRol from './components/Pages/Roles/GuardarRol'
import EliminarRol from './components/Pages/Roles/EliminarRol'
import ActualizarRol from './components/Pages/Roles/ActualizarRol'

function App() {

  const estaAutenticado = sessionStorage.getItem('token');

  return (
    <>
    {estaAutenticado ? (
      <div>
      <Navbar />
      <div className='container'>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/reclamos" element={<Reclamos />} />
          <Route path="/unidades" element={<Unidades />} />
          <Route path="/edificios" element={<Edificios />} />
          <Route path="/areascomunes" element={<AreasComunes />} />
          <Route path="/usuarios" element={<Usuarios />} />
          <Route path="/roles" element={<Roles />} />
          <Route path="/obtenerareascomunes" element={<ObtenerAreasComunes />} />
          <Route path="/areascomunesid" element={<AreasComunesId />} />
          <Route path="/guardarareacomun" element={<GuardarAreaComun />} />
          <Route path="/eliminarareacomun" element={<EliminarAreaComun />} />
          <Route path="/actualizarareacomun" element={<ActualizarAreaComun />} />
          <Route path="/obteneredificios" element={<ObtenerEdificios/>} />
          <Route path="/edificiosid" element={<EdificiosId />} />
          <Route path="/eliminaredificio" element={<EliminarEdificio />} />
          <Route path="/guardaredificio" element={<GuardarEdificio />} />
          <Route path="/actualizaredificio" element={<ActualizarEdificio />} />
          <Route path="/obtenerusuarios" element={<ObtenerUsuarios />} />
          <Route path="/usuariosid" element={<UsuariosId />} />
          <Route path="/guardarusuario" element={<GuardarUsuario />} />
          <Route path="/eliminarusuario" element={<EliminarUsuario />} />
          <Route path="/actualizarusuario" element={<ActualizarUsuario />} />
          <Route path="/obtenerreclamos" element={<ObtenerReclamos />} />
          <Route path="/reclamosid" element={<ReclamosId />} />
          <Route path="/guardarreclamo" element={<GuardarReclamo />} />
          <Route path="/guardarreclamoareacomun" element={<GuardarReclamoAreaComun />} />
          <Route path="/guardarreclamounidad" element={<GuardarReclamoUnidad />} />
          <Route path="/actualizarreclamo" element={<ActualizarReclamo />} />
           <Route path="/eliminarreclamo" element={<EliminarReclamo />} />
          <Route path="/obtenerunidades" element={<ObtenerUnidades />} />
          <Route path="/unidadesid" element={<UnidadesId />} /> 
          <Route path="/guardarunidad" element={<GuardarUnidad />} />
          <Route path="/eliminarunidad" element={<EliminarUnidad />} />
          <Route path="/actualizarunidad" element={<ActualizarUnidad />} />
          <Route path="/obtenerroles" element={<ObtenerRoles />} />  
          <Route path="/rolesid" element={<RolesId />} />
          <Route path="/guardarrol" element={<GuardarRol />} />
          <Route path="/eliminarrol" element={<EliminarRol />} />
          <Route path="/actualizarrol" element={<ActualizarRol />} />
         </Routes>
      </div>
      </div>
      ) : (
        <Login />
      )
    }
    </>
  );
}

export default App;
