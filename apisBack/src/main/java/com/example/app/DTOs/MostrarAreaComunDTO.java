package com.example.app.DTOs;

public class MostrarAreaComunDTO {
    private Long idArea;
    private String descripcion;
    private String edificio;

    public MostrarAreaComunDTO(String descripcion) {
        this.descripcion = descripcion;
    }

    public MostrarAreaComunDTO() {
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

    public String getEdificio() {
        return edificio;
    }

    public void setEdificio(String edificio) {
        this.edificio = edificio;
    }
}
