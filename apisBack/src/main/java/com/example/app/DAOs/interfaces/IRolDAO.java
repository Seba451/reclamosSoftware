package com.example.app.DAOs.interfaces;

import com.example.app.model.Rol;

import java.util.List;

public interface IRolDAO {
    void guardarRol(Rol rol);

    Rol obtenerRolPorID(Long id);

    List<Rol> obtenerTodosLosRoles();

    void eliminarRol(Long id);
}

