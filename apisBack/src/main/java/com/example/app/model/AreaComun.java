package com.example.app.model;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Entity
public class AreaComun {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Estrategia de generación de identidad
    private Long idArea;

    private String descripcion;

    @ManyToOne
    @JoinColumn(name = "edificio_id")
    @JsonIgnore
    private Edificio edificio;

    @OneToMany(mappedBy = "areaComun", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<Reclamo> reclamos = new ArrayList<Reclamo>();

    public AreaComun(String descripcion) {

        this.descripcion = descripcion;
    }

    public AreaComun() {
    }



    public long getIdArea() {
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

    public Edificio getEdificio() {
        return edificio;
    }

    public void setEdificio(Edificio edificio) {
        this.edificio = edificio;
    }

    public List<Reclamo> getReclamos() {
        return reclamos;
    }

    public void setReclamos(List<Reclamo> reclamos) {
        this.reclamos = reclamos;
    }
}

