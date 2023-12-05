package com.example.app.sevicios.implementaciones;

import com.example.app.DAOs.interfaces.IUnidadDAO;
import com.example.app.model.Unidad;
import com.example.app.sevicios.interfaces.IUnidadService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UnidadServiceImpl implements IUnidadService {

    @Autowired
    private IUnidadDAO unidadDAO;

    @Override
    public void guardarUnidad(Unidad unidad) {
        unidadDAO.guardarUnidad(unidad);
    }

    @Override
    public Unidad obtenerUnidadPorID(Long id) {
        return unidadDAO.obtenerUnidadPorID(id);
    }

    @Override
    public List<Unidad> obtenerTodasLasUnidades() {
        return unidadDAO.obtenerTodasLasUnidades();
    }

    @Override
    public void actualizarUnidad(Long idUnidad, Unidad unidad) {
        Unidad unidadExistente = unidadDAO.obtenerUnidadPorID(idUnidad);

        if (unidadExistente != null) {
            if (unidad.getNumero() != null) {
                unidadExistente.setNumero(unidad.getNumero());
            }

            if (unidad.getPiso() != null) {
                unidadExistente.setPiso(unidad.getPiso());
            }

            if (unidad.getEdificio() != null) {
                unidadExistente.setEdificio(unidad.getEdificio());
            }

            if (unidad.getDueño() != null) {
                unidadExistente.setDueño(unidad.getDueño());
            }

            if (unidad.getInquilino() != null) {
                unidadExistente.setInquilino(unidad.getInquilino());
            }

            unidadDAO.guardarUnidad(unidadExistente);
        }
    }


    @Override
    public void eliminarUnidad(Long id) {
        unidadDAO.eliminarUnidad(id);
    }
}
