package com.example.app.sevicios.interfaces;

import com.example.app.model.Edificio;


import java.util.List;

public interface IEdificioService {
    public void guardarEdificio(Edificio edificio);
    public Edificio obtenerEdificioPorID(Long id);
    public List<Edificio> obtenerTodosLosEdificios();
    public void actualizarEdificio(long idEdificio, Edificio edificio);
    public void eliminarEdificio(Long id);
}