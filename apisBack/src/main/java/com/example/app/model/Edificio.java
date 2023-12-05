package com.example.app.model;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.util.List;


@Entity
@Table(name= "Edificios")
public class Edificio {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Estrategia de generación de identidad
    private Long id;
    private String nombre;
    private String direccion;

    @OneToMany (mappedBy = "edificio", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<Unidad> unidades;

    @OneToMany (mappedBy = "edificio", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<AreaComun> areasComunes;



    public Edificio() {

    }

    public Edificio(String nombre, String direccion) {

        this.nombre = nombre;
        this.direccion = direccion;

    }


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

    @Override
    public String toString() {
        return "Edificio{" +
                "id=" + id +
                ", nombre='" + nombre + '\'' +
                ", direccion='" + direccion + //'\'' +
                //", unidades=" + unidades+
                '}';
    }

    public List<Unidad> getUnidades() {
        return unidades;
    }

    public void setUnidades(List<Unidad> unidades) {
        this.unidades = unidades;
    }

    public List<AreaComun> getAreasComunes() {
        return areasComunes;
    }

    public void setAreasComunes(List<AreaComun> areasComunes) {
        this.areasComunes = areasComunes;
    }
}
