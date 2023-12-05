package com.example.app.DTOs;

import com.example.app.enums.EnumEstadoReclamo;
import com.example.app.model.AreaComun;
import com.example.app.model.Unidad;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;

import java.util.Date;

public class ReclamoDTO {

    private Long idReclamo;

    private String descripcion;
    private Date fechaCreacion;

    @Enumerated(EnumType.STRING)
    private EnumEstadoReclamo estadoReclamo;
    /**
     * abierto, finalizado, en proceso
     **/

    private byte[] fotoArchivo;

    private String medidaTomada;

    private Long idUsuario;

    private Long idUnidad;

    private Long idAreaComun;





    public ReclamoDTO() {
    }

    public ReclamoDTO(String descripcion, EnumEstadoReclamo estadoReclamo, String medidaTomada, Date fechaCreacion) {

        this.descripcion = descripcion;
        this.estadoReclamo = estadoReclamo;
        this.medidaTomada = medidaTomada;
        this.fechaCreacion = fechaCreacion;
    }



    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
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

    public Long getIdReclamo() {
        return idReclamo;
    }

    public void setIdReclamo(Long idReclamo) {
        this.idReclamo = idReclamo;
    }


    public Long getIdUsuario() {
        return idUsuario;
    }

    public void setIdUsuario(Long idUsuario) {
        this.idUsuario = idUsuario;
    }

    public Long getIdUnidad() {
        return idUnidad;
    }

    public void setIdUnidad(Long idUnidad) {
        this.idUnidad = idUnidad;
    }

    public Long getIdAreaComun() {
        return idAreaComun;
    }

    public void setIdAreaComun(Long idAreaComun) {
        this.idAreaComun = idAreaComun;
    }

    public Date getFechaCreacion() {
        return fechaCreacion;
    }

    public void setFechaCreacion(Date fechaCreacion) {
        this.fechaCreacion = fechaCreacion;
    }

    public byte[] getFotoArchivo() {
        return fotoArchivo;
    }

    public void setFotoArchivo(byte[] fotoArchivo) {
        this.fotoArchivo = fotoArchivo;
    }
}
