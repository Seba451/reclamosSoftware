package com.example.app.controllers;

import com.example.app.DTOs.UsuarioDTO;
import com.example.app.model.Usuario;
import com.example.app.sevicios.interfaces.IUsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/apis/usuarios")
public class UsuarioController {

    @Autowired
    private IUsuarioService usuarioService;

    @PreAuthorize("hasAuthority('ADMIN')")
    @PostMapping
    public ResponseEntity<?> guardarUsuario(@RequestBody UsuarioDTO usuarioDTO) {
        try{
            Usuario usuario = convertToEntity(usuarioDTO);

            if(usuario.getPassword() == null || usuario.getUsuario() == null || usuario.getEmail() == null){
                return new ResponseEntity<>("Los campos (usuario, password, email) son requeridos.", HttpStatus.BAD_REQUEST);
            }else{
                usuarioService.guardarUsuario(usuario);
                UsuarioDTO nuevoUsuarioDTO = convertToDTO(usuario);
                return new ResponseEntity<>(nuevoUsuarioDTO, HttpStatus.CREATED);
            }
        }catch(Exception e){
            return new ResponseEntity<>("Error al crear usuario.",HttpStatus.BAD_REQUEST);

        }
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @GetMapping("/{id}")
    public Usuario obtenerUsuarioPorID(@PathVariable Long id) {

        return usuarioService.obtenerUsuarioPorID(id);
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @GetMapping({"/usuarios",""})
    public List<Usuario> obtenerTodosLosUsuarios() {

        return usuarioService.obtenerTodosLosUsuarios();
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @PutMapping("/{id}")
    public ResponseEntity<String> actualizarUsuario(@PathVariable Long id, @RequestBody UsuarioDTO usuarioDTO) {
        // Verificar si el usuario con el ID proporcionado existe en la base de datos
        Usuario existingUsuario = usuarioService.obtenerUsuarioPorID(id);
        if (existingUsuario == null) {
            return new ResponseEntity<>("No se encontró usuario con el ID proporcionado", HttpStatus.NOT_FOUND);
        }

        // Verificar campos requeridos


        // Actualizar el usuario
        Usuario usuario = convertToEntity(usuarioDTO);
        usuarioService.actualizarUsuario(id, usuario);

        return new ResponseEntity<>("Usuario actualizado con éxito", HttpStatus.OK);
    }


    @PreAuthorize("hasAuthority('ADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<String> eliminarUsuario(@PathVariable Long id) {
        Usuario usuario = usuarioService.obtenerUsuarioPorID(id);

        if (usuario != null) {
            usuarioService.eliminarUsuario(id);
            return new ResponseEntity<>("Usuario eliminado con éxito", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("No se encontró usuario con el ID proporcionado", HttpStatus.NOT_FOUND);
        }
    }


    public UsuarioDTO convertToDTO(Usuario usuario) {
        UsuarioDTO usuarioDTO = new UsuarioDTO();

        if (usuario.getApellido() != null) {
            usuarioDTO.setApellido(usuario.getApellido());
        }

        if (usuario.getUsuario() != null) {
            usuarioDTO.setUsuario(usuario.getUsuario());
        }

        if (usuario.getEmail() != null) {
            usuarioDTO.setEmail(usuario.getEmail());
        }

        usuarioDTO.setId(usuario.getIdUsuario());


        if (usuario.getNombre() != null) {
            usuarioDTO.setNombre(usuario.getNombre());
        }

        if (usuario.getPassword() != null) {
            usuarioDTO.setPassword(usuario.getPassword());
        }

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
