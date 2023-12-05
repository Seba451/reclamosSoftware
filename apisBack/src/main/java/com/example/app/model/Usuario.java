package com.example.app.model;


import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name="Usuarios")
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Estrategia de generación de identidad
    private Long idUsuario;

    private String email;
    private String nombre;
    private String apellido;

    private String usuario;

    private String password;

    @OneToMany (mappedBy = "dueño", cascade = CascadeType.PERSIST)
    @JsonIgnore
    private List<Unidad> unidadesDueño = new ArrayList<>();

    @OneToMany (mappedBy = "usuario", cascade = CascadeType.PERSIST)
    @JsonIgnore
    private List<Rol> roles = new ArrayList<>();
    @OneToOne (mappedBy = "inquilino",cascade = CascadeType.PERSIST)
    @JsonIgnore
    @JoinColumn (name= "unidad_inquilino")
    private Unidad esInquilino;

    @OneToMany (mappedBy = "usuario", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<Reclamo> reclamos = new ArrayList<Reclamo>();

    public Usuario(){

    }

    public Usuario(String email, String nombre, String apellido, String usuario, String password) {


        this.email = email;
        this.nombre = nombre;
        this.apellido = apellido;
        this.usuario = usuario;
        this.password = password;

    }


    public Long getIdUsuario() {
        return idUsuario;
    }

    public void setIdUsuario(Long idUsuario) {
        this.idUsuario = idUsuario;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getApellido() {
        return apellido;
    }

    public void setApellido(String apellido) {
        this.apellido = apellido;
    }

    public String getUsuario() {
        return usuario;
    }

    public void setUsuario(String usuario) {
        this.usuario = usuario;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public List<Reclamo> getReclamos() {
        return reclamos;
    }

    public void setReclamos(List<Reclamo> reclamos) {
        this.reclamos = reclamos;
    }



    public Unidad getEsInquilino() {
        return esInquilino;
    }

    public void setEsInquilino(Unidad esInquilino) {
        this.esInquilino = esInquilino;
    }



    public List<Unidad> getUnidadesDueño() {
        return unidadesDueño;
    }

    public void setUnidadesDueño(List<Unidad> unidadesDueño) {
        this.unidadesDueño = unidadesDueño;
    }


    @Override
    public String toString() {
        return "Usuario{" +
                "id=" + idUsuario +
                ", email='" + email + '\'' +
                ", nombre='" + nombre + '\'' +
                ", apellido='" + apellido + '\'' +
                ", usuario='" + usuario + '\'' +
                ", password='" + password + '\'' +
                // ", unidadesDueño=" + getUnidadesDueño() +
                //  ", esInquilino=" + esInquilino +
                //  ", reclamos=" + getReclamos() +
                '}';
    }



    public List<Rol> getRoles() {
        return roles;
    }

    public void setRoles(List<Rol> roles) {
        this.roles = roles;
    }
}
