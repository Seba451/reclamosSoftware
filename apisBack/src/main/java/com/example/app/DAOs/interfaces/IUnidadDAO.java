package com.example.app.DAOs.interfaces;

import com.example.app.model.Unidad;

import java.util.List;

public interface IUnidadDAO {
    void guardarUnidad(Unidad unidad);
    public Unidad obtenerUnidadPorID(Long id);
    public List<Unidad> obtenerTodasLasUnidades();

    public void eliminarUnidad(Long id);

}
