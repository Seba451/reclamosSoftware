package com.example.app.DTOs;

import com.example.app.model.Usuario;

public class UnidadDTO {

    private Long idUnidad;


    private Integer numero;


    private Long idEdificio;
    private Integer piso;

    private Long idDueño;

    private Long idInquilino;

    public UnidadDTO(Integer numero, Integer piso) {
        this.numero = numero;

        this.piso = piso;
    }

    public UnidadDTO() {
    }

    public Integer getNumero() {
        return numero;
    }

    public void setNumero(Integer numero) {
        this.numero = numero;
    }



    public Integer getPiso() {
        return piso;
    }

    public void setPiso(Integer piso) {
        this.piso = piso;
    }






    public Long getIdEdificio() {
        return idEdificio;
    }

    public void setIdEdificio(Long idEdificio) {
        this.idEdificio = idEdificio;
    }

    public Long getIdUnidad() {
        return idUnidad;
    }

    public void setIdUnidad(Long idUnidad) {
        this.idUnidad = idUnidad;
    }


    public Long getIdDueño() {
        return idDueño;
    }

    public void setIdDueño(Long idDueño) {
        this.idDueño = idDueño;
    }

    public Long getIdInquilino() {
        return idInquilino;
    }

    public void setIdInquilino(Long idInquilino) {
        this.idInquilino = idInquilino;
    }
}
