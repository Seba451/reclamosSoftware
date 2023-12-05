package com.example.app.DTOs;

import com.example.app.enums.EnumEstadoReclamo;
import com.example.app.model.Unidad;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;

import java.util.Date;

public class MostrarReclamoDTO {

    private Long idReclamo;

    private String descripcion;
    private Date fechaCreacion;

    private byte[] fotoArchivo;

    @Enumerated(EnumType.STRING)
    private EnumEstadoReclamo estadoReclamo;
    /**
     * abierto, finalizado, en proceso
     **/

    private String medidaTomada;

    private String usuario;

    private Integer numeroUnidad;

    private Integer pisoUnidad;

    private String areaComun;

    public MostrarReclamoDTO(String descripcion) {
        this.descripcion = descripcion;
    }

    public MostrarReclamoDTO() {
    }

    public Long getIdReclamo() {
        return idReclamo;
    }

    public void setIdReclamo(Long idReclamo) {
        this.idReclamo = idReclamo;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public Date getFechaCreacion() {
        return fechaCreacion;
    }

    public void setFechaCreacion(Date fechaCreacion) {
        this.fechaCreacion = fechaCreacion;
    }

    public EnumEstadoReclamo getEstadoReclamo() {
        return estadoReclamo;
    }

    public void setEstadoReclamo(EnumEstadoReclamo estadoReclamo) {
        this.estadoReclamo = estadoReclamo;
    }

    public String getMedidaTomada() {
        return medidaTomada;
    }

    public void setMedidaTomada(String medidaTomada) {
        this.medidaTomada = medidaTomada;
    }

    public String getUsuario() {
        return usuario;
    }

    public void setUsuario(String usuario) {
        this.usuario = usuario;
    }



    public String getAreaComun() {
        return areaComun;
    }

    public void setAreaComun(String areaComun) {
        this.areaComun = areaComun;
    }

    public Integer getNumeroUnidad() {
        return numeroUnidad;
    }

    public void setNumeroUnidad(Integer numeroUnidad) {
        this.numeroUnidad = numeroUnidad;
    }

    public Integer getPisoUnidad() {
        return pisoUnidad;
    }

    public void setPisoUnidad(Integer pisoUnidad) {
        this.pisoUnidad = pisoUnidad;
    }

    public byte[] getFotoArchivo() {
        return fotoArchivo;
    }

    public void setFotoArchivo(byte[] fotoArchivo) {
        this.fotoArchivo = fotoArchivo;
    }
}
