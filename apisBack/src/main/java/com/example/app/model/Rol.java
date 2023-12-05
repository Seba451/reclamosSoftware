package com.example.app.model;

import com.example.app.enums.EnumRoles;
import jakarta.persistence.*;
@Entity
public class Rol {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    private EnumRoles tipoRol;
    @ManyToOne
    @JoinColumn(name = "usuario_id")
    private Usuario usuario;

    public Rol() {
    }

    public Rol(EnumRoles tipoRol) {

        this.tipoRol = tipoRol;

    }



    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public EnumRoles getTipoRol() {
        return tipoRol;
    }

    public void setTipoRol(EnumRoles tipoRol) {
        this.tipoRol = tipoRol;
    }

    public Usuario getUsuario() {
        return usuario;
    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }
}

