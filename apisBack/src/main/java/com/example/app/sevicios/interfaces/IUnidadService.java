package com.example.app.sevicios.interfaces;

import com.example.app.model.Unidad;
import java.util.List;

public interface IUnidadService {


    void guardarUnidad(Unidad unidad);

    Unidad obtenerUnidadPorID(Long id);

    List<Unidad> obtenerTodasLasUnidades();

    void actualizarUnidad(Long idUnidad, Unidad unidad);

    void eliminarUnidad(Long id);
}
