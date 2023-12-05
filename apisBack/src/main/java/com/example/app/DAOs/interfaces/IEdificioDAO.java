package com.example.app.DAOs.interfaces;

import com.example.app.model.Edificio;

import java.util.List;

public interface IEdificioDAO {
    public void guardarEdificio(Edificio edificio);
    public Edificio obtenerEdificioPorID(Long id);
    public List<Edificio> obtenerTodosLosEdificios();

    public void eliminarEdificio(Long id);

    void printUnidades(Long id);

}
