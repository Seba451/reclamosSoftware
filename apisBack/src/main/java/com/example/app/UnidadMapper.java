package com.example.app;

import com.example.app.DTOs.UnidadDTO;
import com.example.app.model.Unidad;
import com.example.app.sevicios.interfaces.IEdificioService;
import com.example.app.sevicios.interfaces.IUsuarioService;
import org.springframework.beans.factory.annotation.Autowired;

public class UnidadMapper {

    @Autowired
    private IUsuarioService usuarioService;

    @Autowired
    private IEdificioService edificioService;
    public Unidad convertToEntity(UnidadDTO unidadDTO){
        Unidad unidad = new Unidad();
        unidad.setIdUnidad(unidadDTO.getIdUnidad());
        unidad.setDueño(usuarioService.obtenerUsuarioPorID(unidadDTO.getIdDueño()));
        if(unidadDTO.getIdInquilino() != null){
            unidad.setInquilino(usuarioService.obtenerUsuarioPorID(unidadDTO.getIdInquilino()));
        }
        unidad.setEdificio(edificioService.obtenerEdificioPorID(unidadDTO.getIdEdificio()));

        unidad.setPiso(unidadDTO.getPiso());
        unidad.setNumero(unidadDTO.getNumero());

        return unidad;
    }

    public UnidadDTO convertToDTO(Unidad unidad){
        UnidadDTO unidadDTO = new UnidadDTO();

        unidadDTO.setIdUnidad(unidad.getIdUnidad());
        unidadDTO.setIdEdificio(unidad.getEdificio().getId());
        unidadDTO.setNumero(unidad.getNumero());
        unidadDTO.setPiso(unidad.getPiso());

        unidadDTO.setIdDueño(unidad.getDueño().getIdUsuario());
        if(unidad.getInquilino() != null){
            unidadDTO.setIdInquilino(unidad.getInquilino().getIdUsuario());
        }

        return unidadDTO;
    }


}
