package com.example.app.DAOs.interfaces;

import com.example.app.model.Reclamo;

import java.util.List;

public interface IReclamoDAO {
    public void guardarReclamo(Reclamo reclamo);
    public Reclamo obtenerReclamoPorID(Long id);
    public List<Reclamo> obtenerTodosLosReclamos();

    public void eliminarReclamo(Long id);
}

