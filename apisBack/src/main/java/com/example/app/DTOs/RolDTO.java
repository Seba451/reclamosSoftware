package com.example.app.DTOs;

import com.example.app.enums.EnumRoles;
import com.example.app.model.Usuario;

public class RolDTO {
    private Long idRol;
    private EnumRoles tipoRol;
    private Long idUsuario;

    public RolDTO(EnumRoles tipoRol) {
        this.tipoRol = tipoRol;
    }

    public RolDTO() {
    }


    public EnumRoles getTipoRol() {
        return tipoRol;
    }

    public void setTipoRol(EnumRoles tipoRol) {
        this.tipoRol = tipoRol;
    }


    public Long getIdRol() {
        return idRol;
    }

    public void setIdRol(Long idRol) {
        this.idRol = idRol;
    }

    public Long getIdUsuario() {
        return idUsuario;
    }

    public void setIdUsuario(Long idUsuario) {
        this.idUsuario = idUsuario;
    }
}
