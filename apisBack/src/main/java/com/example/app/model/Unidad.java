package com.example.app.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import java.util.ArrayList;
import java.util.List;




@Entity
@Table (name ="Unidades")

public class Unidad {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Estrategia de generación de identidad
    private Long idUnidad;


    private Integer numero;
    /**
     * numero de unidad (101,102,103)
     **/

    private Integer piso;

    @ManyToOne
    @JoinColumn(name = "edificio_id")
    @JsonIgnore
    private Edificio edificio;
    @ManyToOne
    @JoinColumn(name = "dueño_id")
    private Usuario dueño;
    @OneToOne
    @JoinColumn(name = "inquilino_id")
    private Usuario inquilino;

    @OneToMany(mappedBy = "unidad", cascade = CascadeType.ALL)
    private List<Reclamo> reclamos = new ArrayList<Reclamo>();


    public Unidad() {

    }

    public Unidad(Integer numero, Integer piso, String estado) {
        this.numero = numero;
        this.piso = piso;

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



    public Edificio getEdificio() {
        return edificio;
    }

    public void setEdificio(Edificio edificio) {
        System.out.println("OK");
        this.edificio = edificio;
    }


    public List<Reclamo> getReclamos() {
        return reclamos;
    }

    public void setReclamos(List<Reclamo> reclamos) {
        this.reclamos = reclamos;
    }


    public Usuario getDueño() {
        return dueño;
    }

    public void setDueño(Usuario dueño) {
        this.dueño = dueño;
    }


    @Override
    public String toString() {
        return "Unidad{" +
                "id=" + idUnidad +
                ", numero=" + numero +
                ", piso=" + piso +
                ", edificio=" + edificio +
                ", dueño=" + dueño +
                ", inquilino=" + inquilino +
                // ", reclamos=" + getReclamos()+
                '}';
    }

    public Usuario getInquilino() {
        return inquilino;
    }

    public void setInquilino(Usuario inquilino) {
        this.inquilino = inquilino;
    }

    public Long getIdUnidad() {
        return idUnidad;
    }

    public void setIdUnidad(Long idUnidad) {
        this.idUnidad = idUnidad;
    }
}