package com.example.app.DTOs;

public class MostrarUnidadDTO2 {
    private Long idUnidad;


    private Integer numero;


    private Long idEdificio;
    private Integer piso;

    private String dueño;

    private String inquilino;

    public MostrarUnidadDTO2(Integer numero, Integer piso) {
        this.numero = numero;
        this.piso = piso;
    }

    public MostrarUnidadDTO2() {
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

    public Long getEdificio() {
        return idEdificio;
    }

    public void setEdificio(Long idEdificio) {
        this.idEdificio = idEdificio;
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
