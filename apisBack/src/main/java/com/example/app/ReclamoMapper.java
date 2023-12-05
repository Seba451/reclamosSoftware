/*package com.example.app;

import com.example.app.DTOs.ReclamoDTO;
import com.example.app.model.Reclamo;
import com.example.app.model.Usuario;
import com.example.app.sevicios.interfaces.IAreaComunService;
import com.example.app.sevicios.interfaces.IUnidadService;
import com.example.app.sevicios.interfaces.IUsuarioService;
import com.example.app.sevicios.implementaciones.UsuarioServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;

public class ReclamoMapper {

    @Autowired
    private IUsuarioService usuarioService;
    @Autowired
    private IUnidadService unidadService;
    @Autowired
    private IAreaComunService areaComunService;

    public Reclamo convertToEntity(ReclamoDTO reclamoDTO){
        Reclamo reclamo = new Reclamo();
        reclamo.setUsuario(usuarioService.obtenerUsuarioPorID(reclamoDTO.getIdUsuario()));
        reclamo.setEstadoReclamo(reclamoDTO.getEstadoReclamo());
        if(reclamoDTO.getIdUnidad() != null){
            reclamo.setUnidad(unidadService.obtenerUnidadPorID(reclamoDTO.getIdUnidad()));
        }
        reclamo.setId(reclamoDTO.getIdReclamo());
        reclamo.setEstadoReclamo(reclamoDTO.getEstadoReclamo());
        reclamo.setDescripcion(reclamoDTO.getDescripcion());
        if(reclamoDTO.getIdAreaComun() != null){
            reclamo.setAreaComun(areaComunService.obtenerAreaComunPorID(reclamoDTO.getIdAreaComun()));
        }

        return reclamo;
    }

    public ReclamoDTO convertToDTO(Reclamo reclamo){
        ReclamoDTO reclamoDTO = new ReclamoDTO();

        if(reclamo.getAreaComun() != null){
            reclamoDTO.setIdAreaComun(reclamo.getAreaComun().getIdArea());
        }
        if(reclamo.getUnidad() != null){
            reclamoDTO.setIdUnidad(reclamo.getUnidad().getId());
        }
        reclamoDTO.setIdUsuario(reclamo.getUsuario().getId());
        reclamoDTO.setDescripcion(reclamo.getDescripcion());
        reclamoDTO.setEstadoReclamo(reclamo.getEstadoReclamo());
        reclamoDTO.setMedidaTomada(reclamo.getMedidaTomada());

        return reclamoDTO;
    }
}*/
