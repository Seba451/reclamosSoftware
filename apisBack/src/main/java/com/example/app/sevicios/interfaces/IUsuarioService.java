package com.example.app.sevicios.interfaces;

import com.example.app.model.Usuario;

import java.util.List;

public interface IUsuarioService {
    public void guardarUsuario(Usuario usuario) throws Exception;
    public Usuario obtenerUsuarioPorID(Long id);
    public List<Usuario> obtenerTodosLosUsuarios();
    public void actualizarUsuario(long idUsuario, Usuario usuario);
    public void eliminarUsuario(Long id);

    public Usuario obtenerUsuarioPorUsername(String user);

    Usuario findUser(String username, String password);
}
