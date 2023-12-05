package com.example.app.DTOs;

import com.example.app.model.Edificio;
import com.example.app.model.Reclamo;

import java.util.List;

public class AreaComunDTO {
    private Long idArea;
    private String descripcion;
    private Long idEdificio;



    public AreaComunDTO(String descripcion) {
        this.descripcion = descripcion;
    }

    public AreaComunDTO() {
    }

    public Long getIdArea() {
        return idArea;
    }

    public void setIdArea(Long idArea) {
        this.idArea = idArea;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }


    public Long getIdEdificio() {
        return idEdificio;
    }

    public void setIdEdificio(Long idEdificio) {
        this.idEdificio = idEdificio;
    }
}
