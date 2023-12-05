package com.example.app.DAOs.interfaces;

import com.example.app.model.AreaComun;

import java.util.List;

public interface IAreaComunDAO {
    void guardarAreaComun(AreaComun areaComun);
    AreaComun obtenerAreaComunPorID(Long id);
    List<AreaComun> obtenerTodasLasAreasComunes();
    void eliminarAreaComun(Long id);
    void printReclamos(Long id);
}
