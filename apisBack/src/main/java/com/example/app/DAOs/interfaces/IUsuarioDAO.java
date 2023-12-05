package com.example.app.DAOs.interfaces;

import com.example.app.model.Usuario;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface IUsuarioDAO {

    public Usuario obtenerUsuarioPorUsername(String user);
    public void guardarUsuario(Usuario usuario);
    public Usuario obtenerUsuarioPorID(Long id);
    public List<Usuario> obtenerTodosLosUsuarios();
    public void eliminarUsuario(Long id);

    @Transactional(readOnly = true)
    Usuario findUser(String username, String password);
}
