package com.example.app.model;
import com.example.app.enums.EnumEstadoReclamo;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;

import java.util.Date;

@Entity
@Table(name = "Reclamos")
public class Reclamo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Estrategia de generación de identidad
    private Long idReclamo;




    private String descripcion;


    @Temporal(TemporalType.DATE)
    @CreationTimestamp
    private Date fechaCreacion;
    @Lob
    @Column(columnDefinition = "LONGBLOB")
    private byte[] fotoArchivo;

    private Long idImagen;
    @Enumerated(EnumType.STRING)
    private EnumEstadoReclamo estadoReclamo;
    /**
     * abierto, finalizado, en proceso
     **/


    private String medidaTomada;

    @ManyToOne
    @JoinColumn(name = "usuario_id")
    @JsonIgnore
    private Usuario usuario;
    @ManyToOne
    @JoinColumn(name = "unidad_id")
    @JsonIgnore
    private Unidad unidad;

    @ManyToOne
    @JoinColumn(name = "areaComun_id")
    @JsonIgnore
    private AreaComun areaComun;

    public Reclamo(String descripcion, EnumEstadoReclamo estadoReclamo, String medidaTomada) {
        super();


        this.descripcion = descripcion;
        this.estadoReclamo = estadoReclamo;
        this.medidaTomada = medidaTomada;


    }

    public Reclamo() {
        super();
    }

    public Long getId() {
        return idReclamo;
    }

    public void setId(Long id) {
        this.idReclamo = id;
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




    public String getMedidaTomada() {
        return medidaTomada;
    }

    public void setMedidaTomada(String medidaTomada) {
        this.medidaTomada = medidaTomada;
    }




    public Unidad getUnidad() {
        return unidad;
    }

    public void setUnidad(Unidad unidad) {
        this.unidad = unidad;
    }


    @Override
    public String toString() {
        return "Reclamo{" +
                "id=" + idReclamo +

                ", descripcion='" + descripcion + '\'' +
                ", fechaCreacion=" + fechaCreacion +
                //  ", fotoArchivo=" + Arrays.toString(fotoArchivo) +
                ", estadoReclamo='" + estadoReclamo + '\'' +
                ", medidaTomada='" + medidaTomada + '\'' +
                ", usuario=" + usuario +
                ", unidad=" + unidad +
                '}';
    }
    public Usuario getUsuario() {
        return usuario;
    }
    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }

    public AreaComun getAreaComun() {
        return areaComun;
    }

    public void setAreaComun(AreaComun areaComun) {
        this.areaComun = areaComun;
    }

    public EnumEstadoReclamo getEstadoReclamo() {
        return estadoReclamo;
    }

    public void setEstadoReclamo(EnumEstadoReclamo estadoReclamo) {
        this.estadoReclamo = estadoReclamo;
    }

    public byte[] getFotoArchivo() {
        return fotoArchivo;
    }

    public void setFotoArchivo(byte[] fotoArchivo) {
        this.fotoArchivo = fotoArchivo;
    }

    public Long getIdImagen() {
        return idImagen;
    }

    public void setIdImagen(Long idImagen) {
        this.idImagen = idImagen;
    }
}

