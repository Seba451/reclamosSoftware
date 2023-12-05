package com.example.app.DTOs;

import com.example.app.model.Rol;

import java.util.List;

public class UsuarioDTO {
    private Long idUsuario;
    private String email;
    private String nombre;
    private String apellido;

    private String usuario;

    private String password;





    public UsuarioDTO() {
    }

    public UsuarioDTO(String email, String nombre, String apellido, String usuario, String password) {
        this.email = email;
        this.nombre = nombre;
        this.apellido = apellido;
        this.usuario = usuario;
        this.password = password;

    }

    public Long getId() {
        return idUsuario;
    }

    public void setId(Long id) {
        this.idUsuario = id;
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



}
