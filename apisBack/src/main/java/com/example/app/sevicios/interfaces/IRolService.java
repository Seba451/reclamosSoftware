package com.example.app.sevicios.interfaces;

import com.example.app.model.Rol;

import java.util.List;

public interface IRolService {
    void guardarRol(Rol rol);

    Rol obtenerRolPorID(Long id);

    List<Rol> obtenerTodosLosRoles();

    void actualizarRol(Long idRol, Rol rol);

    void eliminarRol(Long id);
}
