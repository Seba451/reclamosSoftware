package com.example.app.controllers;

import com.example.app.DTOs.AreaComunDTO;
import com.example.app.DTOs.MostrarRolDTO;
import com.example.app.DTOs.RolDTO;
import com.example.app.model.Rol;
import com.example.app.sevicios.interfaces.IRolService;
import com.example.app.sevicios.interfaces.IUsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import com.example.app.model.Usuario;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/apis")
public class RolController {

    @Autowired
    private IRolService rolService;

    @Autowired
    private IUsuarioService usuarioService;

    @PreAuthorize("hasAuthority('ADMIN')")
    @GetMapping({"/roles", ""})
    public List<MostrarRolDTO> obtenerTodosLosRoles() {

        List<Rol> roles = rolService.obtenerTodosLosRoles();
        List<MostrarRolDTO> rolesDTO = roles.stream()
                .map(this::convertToDTO2) // Utiliza tu función convertToDTO para convertir un objeto AreaComun a AreaComunDTO
                .collect(Collectors.toList());


        return rolesDTO;
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @GetMapping("/roles/{id}")
    public MostrarRolDTO obtenerRolPorID(@PathVariable Long id) {

        Rol rol = rolService.obtenerRolPorID(id);
        MostrarRolDTO rolDTO = convertToDTO2(rol);

        return rolDTO;
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @PostMapping("/roles")
    public ResponseEntity<?> guardarRol(@RequestParam ("idUsuario") Long idUsuario, @RequestBody RolDTO rolDTO) {
        try{
            Usuario usuario = usuarioService.obtenerUsuarioPorID(idUsuario);

            if(usuario == null){
                return new ResponseEntity<>("El usuario indicado no existe", HttpStatus.BAD_REQUEST);
            }

            rolDTO.setIdUsuario(idUsuario);

            Rol rol = convertToEntity(rolDTO);

            if(rol.getTipoRol() != null){
                rolService.guardarRol(rol);

                RolDTO nuevoRolDTO = convertToDTO(rol);

                return new ResponseEntity<>(nuevoRolDTO, HttpStatus.CREATED);
            }else{
                return new ResponseEntity<>("El campo (tipoRol) es requerido.",HttpStatus.BAD_REQUEST);
            }

        }catch (Exception e){
            return new ResponseEntity<>("Error al asignar el rol", HttpStatus.BAD_REQUEST);
        }
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @PutMapping("/roles/{id}")
    public ResponseEntity<String> actualizarRol(@PathVariable Long id, @RequestBody Rol rol) {
        try {
            if (id == null) {
                return new ResponseEntity<>("El valor de ID es nulo o inválido.", HttpStatus.BAD_REQUEST);
            }

            // Verifica si el rol con el ID proporcionado existe en la base de datos
            Rol existingRol = rolService.obtenerRolPorID(id);
            if (existingRol == null) {
                return new ResponseEntity<>("El Rol con ID " + id + " no existe en la base de datos.", HttpStatus.BAD_REQUEST);
            }

            if (rol.getTipoRol() == null) {
                return new ResponseEntity("El campo 'tipoRol' es requerido.", HttpStatus.BAD_REQUEST);
            }

            rolService.actualizarRol(id, rol);
            return new ResponseEntity<>("Rol actualizado con éxito", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("Error al actualizar el Rol: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @DeleteMapping("/roles/{id}")
    public ResponseEntity<String> eliminarRol(@PathVariable Long id) {
        Rol rol = rolService.obtenerRolPorID(id);

        if (rol != null) {
            rolService.eliminarRol(id);
            return new ResponseEntity<>("Rol eliminado con éxito", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("No se encontró un Rol con el ID proporcionado", HttpStatus.NOT_FOUND);
        }
    }

    public Rol convertToEntity(RolDTO rolDTO){
        Rol rol = new Rol();

        rol.setTipoRol(rolDTO.getTipoRol());
        rol.setId(rolDTO.getIdRol());
        rol.setUsuario(usuarioService.obtenerUsuarioPorID(rolDTO.getIdUsuario()));

        return rol;
    }

    public RolDTO convertToDTO(Rol rol){
        RolDTO rolDTO = new RolDTO();

        rolDTO.setIdRol(rol.getId());
        rolDTO.setTipoRol(rol.getTipoRol());
        rolDTO.setIdUsuario(rol.getUsuario().getIdUsuario());

        return rolDTO;
    }

    public MostrarRolDTO convertToDTO2(Rol rol){
        MostrarRolDTO rolDTO = new MostrarRolDTO();

        rolDTO.setIdRol(rol.getId());
        rolDTO.setTipoRol(rol.getTipoRol());
        rolDTO.setUsuario(rol.getUsuario().getUsuario());

        return rolDTO;
    }
}
