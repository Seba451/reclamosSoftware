package com.example.app.DTOs;

import com.example.app.enums.EnumRoles;

public class MostrarRolDTO {
    private Long idRol;
    private EnumRoles tipoRol;
    private String usuario;

    public MostrarRolDTO() {
    }

    public MostrarRolDTO(EnumRoles tipoRol) {
        this.tipoRol = tipoRol;
    }

    public Long getIdRol() {
        return idRol;
    }

    public void setIdRol(Long idRol) {
        this.idRol = idRol;
    }

    public EnumRoles getTipoRol() {
        return tipoRol;
    }

    public void setTipoRol(EnumRoles tipoRol) {
        this.tipoRol = tipoRol;
    }

    public String getUsuario() {
        return usuario;
    }

    public void setUsuario(String usuario) {
        this.usuario = usuario;
    }
}
