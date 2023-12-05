package com.example.app.DTOs;

public class MostrarUnidadDTO {
    private Long idUnidad;


    private Integer numero;


    private String edificio;
    private Integer piso;

    private String dueño;

    private String inquilino;

    public MostrarUnidadDTO(Integer numero, Integer piso) {
        this.numero = numero;
        this.piso = piso;
    }

    public MostrarUnidadDTO() {
    }

    public Long getIdUnidad() {
        return idUnidad;
    }

    public void setIdUnidad(Long idUnidad) {
        this.idUnidad = idUnidad;
    }

    public Integer getNumero() {
        return numero;
    }

    public void setNumero(Integer numero) {
        this.numero = numero;
    }

    public String getEdificio() {
        return edificio;
    }

    public void setEdificio(String edificio) {
        this.edificio = edificio;
    }

    public Integer getPiso() {
        return piso;
    }

    public void setPiso(Integer piso) {
        this.piso = piso;
    }

    public String getDueño() {
        return dueño;
    }

    public void setDueño(String dueño) {
        this.dueño = dueño;
    }

    public String getInquilino() {
        return inquilino;
    }

    public void setInquilino(String inquilino) {
        this.inquilino = inquilino;
    }
}
