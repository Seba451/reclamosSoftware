package com.example.app.sevicios.interfaces;

import com.example.app.model.Reclamo;
import java.util.List;

public interface IReclamoService {
    void guardarReclamo(Reclamo reclamo) throws Exception;

    Reclamo obtenerReclamoPorID(Long id);

    List<Reclamo> obtenerTodosLosReclamos();

    void actualizarReclamo(Long id, Reclamo reclamo) throws Exception;

    void eliminarReclamo(Long id) throws Exception;
}
