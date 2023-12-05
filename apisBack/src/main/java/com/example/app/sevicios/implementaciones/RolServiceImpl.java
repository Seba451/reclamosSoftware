package com.example.app.sevicios.implementaciones;

import com.example.app.DAOs.interfaces.IRolDAO;
import com.example.app.model.Rol;
import com.example.app.sevicios.interfaces.IRolService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RolServiceImpl implements IRolService {

    @Autowired
    private IRolDAO rolDAO;

    @Override
    public void guardarRol(Rol rol) {
        rolDAO.guardarRol(rol);
    }

    @Override
    public Rol obtenerRolPorID(Long id) {
        return rolDAO.obtenerRolPorID(id);
    }

    @Override
    public List<Rol> obtenerTodosLosRoles() {
        return rolDAO.obtenerTodosLosRoles();
    }


    @Override
    public void actualizarRol(Long idRol, Rol rol) {
        Rol rolExistente = rolDAO.obtenerRolPorID(idRol);

        if (rolExistente != null) {
            rolExistente.setTipoRol(rol.getTipoRol());

            rolDAO.guardarRol(rolExistente);
        }
    }

    @Override
    public void eliminarRol(Long id) {
        rolDAO.eliminarRol(id);
    }
}
