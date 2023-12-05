package com.example.app.sevicios.interfaces;

import com.example.app.model.AreaComun;

import java.util.List;

public interface IAreaComunService {
    void guardarAreaComun(AreaComun areaComun);
    AreaComun obtenerAreaComunPorID(Long id);
    List<AreaComun> obtenerTodasLasAreasComunes();
    void eliminarAreaComun(Long id);
    void printReclamos(Long id);
    void actualizarAreaComun(Long id, AreaComun areaComun);

}
