package com.example.app;

import com.example.app.DTOs.UsuarioDTO;
import com.example.app.model.Usuario;
import org.springframework.stereotype.Component;


public class UsuarioMapper {
    public UsuarioDTO convertToDTO(Usuario usuario){
        UsuarioDTO usuarioDTO = new UsuarioDTO();
        usuarioDTO.setApellido(usuario.getApellido());
        usuarioDTO.setUsuario(usuario.getUsuario());
        usuarioDTO.setEmail(usuario.getEmail());
        usuarioDTO.setId(usuario.getIdUsuario());
        usuarioDTO.setNombre(usuario.getNombre());
        usuarioDTO.setPassword(usuario.getPassword());
        return usuarioDTO;
    }

    public Usuario convertToEntity(UsuarioDTO usuarioDTO){
        Usuario usuario = new Usuario();
        usuario.setPassword(usuarioDTO.getPassword());
        usuario.setUsuario(usuarioDTO.getUsuario());
        usuario.setIdUsuario(usuarioDTO.getId());

        usuario.setEmail(usuarioDTO.getEmail());
        usuario.setNombre(usuarioDTO.getNombre());
        usuario.setApellido(usuarioDTO.getApellido());

        return usuario;
    }
}
