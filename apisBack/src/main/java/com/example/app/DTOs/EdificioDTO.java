package com.example.app.DTOs;

import com.example.app.model.AreaComun;
import com.example.app.model.Unidad;

import java.util.List;

public class EdificioDTO {

    private Long idEdificio;
    private String nombre;
    private String direccion;


    public EdificioDTO(String nombre, String direccion) {
        this.nombre = nombre;
        this.direccion = direccion;
    }

    public EdificioDTO() {
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getDireccion() {
        return direccion;
    }

    public void setDireccion(String direccion) {
        this.direccion = direccion;
    }


    public Long getIdEdificio() {
        return idEdificio;
    }

    public void setIdEdificio(Long idEdificio) {
        this.idEdificio = idEdificio;
    }
}
