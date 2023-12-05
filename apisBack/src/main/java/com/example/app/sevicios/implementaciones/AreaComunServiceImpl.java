package com.example.app.sevicios.implementaciones;

import com.example.app.DAOs.interfaces.IAreaComunDAO;
import com.example.app.DTOs.AreaComunDTO;
import com.example.app.model.AreaComun;
import com.example.app.sevicios.interfaces.IAreaComunService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AreaComunServiceImpl implements IAreaComunService {
    @Autowired
    private IAreaComunDAO areaComunDAO;
    @Override
    public void guardarAreaComun(AreaComun areaComun) {
        areaComunDAO.guardarAreaComun(areaComun);
    }
    @Override
    public AreaComun obtenerAreaComunPorID(Long id) {
        AreaComun areaComun= areaComunDAO.obtenerAreaComunPorID(id);
        return areaComun;
    }

    @Override
    public List<AreaComun> obtenerTodasLasAreasComunes() {
        List<AreaComun> areascomunes = areaComunDAO.obtenerTodasLasAreasComunes();
        return areascomunes;
    }

    @Override
    public void eliminarAreaComun(Long id) {
        areaComunDAO.eliminarAreaComun(id);
    }

    @Override
    public void printReclamos(Long id) {

    }

    @Override
    public void actualizarAreaComun(Long id, AreaComun areaComun) {
        System.out.println("test2");
        AreaComun areaComunExistente = areaComunDAO.obtenerAreaComunPorID(id);
        if(areaComunExistente!=null){
            System.out.println("test3");
            if(areaComun.getDescripcion() != null){
                areaComunExistente.setDescripcion(areaComun.getDescripcion());
            }



            areaComunDAO.guardarAreaComun(areaComunExistente);
        }
    }

}
