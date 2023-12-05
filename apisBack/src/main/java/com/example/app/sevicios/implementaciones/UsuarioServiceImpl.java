package com.example.app.sevicios.implementaciones;

import com.example.app.DAOs.interfaces.IUsuarioDAO;
import com.example.app.model.Usuario;
import com.example.app.sevicios.interfaces.IUsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class UsuarioServiceImpl implements IUsuarioService {

    @Autowired
    private IUsuarioDAO usuarioDAO;
    @Override
    public void guardarUsuario(Usuario usuario) throws Exception{
        List<Usuario> usuarios = obtenerTodosLosUsuarios();
        boolean esRepetido = false;

        for(Usuario user : usuarios){
            if(user.getUsuario().equals(usuario.getUsuario()) || user.getEmail().equals(usuario.getEmail())){
                esRepetido = true;
                break;
            }
        }

        if(esRepetido == false){
            usuarioDAO.guardarUsuario(usuario);

        }else{
            throw new Exception("El usuario ya existe.");
        }


    }

    @Override
    public Usuario obtenerUsuarioPorID(Long id) {
        Usuario usuario= usuarioDAO.obtenerUsuarioPorID(id);
        return usuario;
    }

    @Override
    public List<Usuario> obtenerTodosLosUsuarios() {
        List<Usuario> usuarios = usuarioDAO.obtenerTodosLosUsuarios();
        return usuarios;
    }

    public Usuario obtenerUsuarioPorUsername(String user){
        Usuario usuario = usuarioDAO.obtenerUsuarioPorUsername(user);
        return usuario;
    }



    @Override
    public void actualizarUsuario(long idUsuario, Usuario usuario) {
        Usuario usuarioExistente = usuarioDAO.obtenerUsuarioPorID(idUsuario);

        if (usuarioExistente != null) {
            if (usuario.getUsuario() != null) {
                usuarioExistente.setUsuario(usuario.getUsuario());
            }

            if (usuario.getNombre() != null) {
                usuarioExistente.setNombre(usuario.getNombre());
            }

            if (usuario.getApellido() != null) {
                usuarioExistente.setApellido(usuario.getApellido());
            }

            if (usuario.getEmail() != null) {
                usuarioExistente.setEmail(usuario.getEmail());
            }

            if (usuario.getPassword() != null) {
                usuarioExistente.setPassword(usuario.getPassword());
            }

            usuarioDAO.guardarUsuario(usuarioExistente);
        }
    }


    @Override
    public void eliminarUsuario(Long id) {
        usuarioDAO.eliminarUsuario(id);

    }

    @Override
    public Usuario findUser(String username, String password) {
        return usuarioDAO.findUser(username, password);
    }


}


