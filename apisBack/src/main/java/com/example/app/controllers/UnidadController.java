package com.example.app.controllers;

import com.example.app.DTOs.AreaComunDTO;
import com.example.app.DTOs.MostrarUnidadDTO;
import com.example.app.DTOs.MostrarUnidadDTO2;
import com.example.app.DTOs.UnidadDTO;
import com.example.app.model.Edificio;
import com.example.app.model.Unidad;
import com.example.app.sevicios.interfaces.IEdificioService;
import com.example.app.sevicios.interfaces.IUsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.example.app.sevicios.interfaces.IUnidadService;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/apis")
public class UnidadController {

    @Autowired
    private IUnidadService unidadService;

    @Autowired
    private IEdificioService edificioService;

    @Autowired
    private IUsuarioService usuarioService;

    @GetMapping({"/unidades", ""})
    public List<MostrarUnidadDTO> obtenerTodasLasUnidades() {

        List<Unidad> unidades = unidadService.obtenerTodasLasUnidades();
        List<MostrarUnidadDTO> unidadesDTO = unidades.stream()
                .map(this::convertToDTO2) // Utiliza tu función convertToDTO para convertir un objeto AreaComun a AreaComunDTO
                .collect(Collectors.toList());

        return unidadesDTO;
    }

    @GetMapping("/unidades/{id}")
    public MostrarUnidadDTO obtenerUnidadPorID(@PathVariable Long id) {

        Unidad unidad = unidadService.obtenerUnidadPorID(id);
        MostrarUnidadDTO unidadDTO = convertToDTO2(unidad);
        return unidadDTO;
    }


    @PreAuthorize("hasAuthority('ADMIN')")
    @PostMapping("/unidades")
    public ResponseEntity<?> guardarUnidad(@RequestParam ("idEdificio") Long idEdificio, @RequestBody MostrarUnidadDTO2 unidadDTO) {

        try{

            Edificio edificio = edificioService.obtenerEdificioPorID(idEdificio);


            if(edificio == null){
                return new ResponseEntity<>("El edificio indicado no existe", HttpStatus.BAD_REQUEST);
            }


            unidadDTO.setEdificio(idEdificio);


            Unidad unidad = convertToEntity3(unidadDTO);



            if(unidad.getDueño() == null || unidad.getNumero() == null){
                return new ResponseEntity<>("Los campos (dueño, numero) son requeridos", HttpStatus.BAD_REQUEST);
            }else{

                unidadService.guardarUnidad(unidad);

                MostrarUnidadDTO2 nuevoUnidadDTO = convertToDTO3(unidad);

                return new ResponseEntity<>(nuevoUnidadDTO, HttpStatus.CREATED);
            }
        }catch (Exception e){

            return new ResponseEntity<>("Error al registrar la unidad", HttpStatus.BAD_REQUEST);
        }
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @PutMapping("/unidades/{id}")
    public ResponseEntity<String> actualizarUnidad(@PathVariable Long id, @RequestBody MostrarUnidadDTO2 unidadDTO) {
        try {
            if (id == null) {
                return new ResponseEntity<>("El valor de ID es nulo o inválido.", HttpStatus.BAD_REQUEST);
            }

            // Verifica si la unidad con el ID existe en la base de datos
            Unidad existingUnidad = unidadService.obtenerUnidadPorID(id);
            if (existingUnidad == null) {
                return new ResponseEntity<>("La Unidad con ID " + id + " no existe en la base de datos.", HttpStatus.NOT_FOUND);
            }




            Unidad unidad = convertToEntity3(unidadDTO);
            unidadService.actualizarUnidad(id, unidad);

            return new ResponseEntity<>("Unidad actualizada con éxito", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("Error al actualizar la Unidad: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @DeleteMapping("/unidades/{id}")
    public ResponseEntity<String> eliminarUnidad(@PathVariable Long id) {
        Unidad unidad = unidadService.obtenerUnidadPorID(id);

        if (unidad != null) {
            unidadService.eliminarUnidad(id);
            return new ResponseEntity<>("Unidad eliminada con éxito", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("No se encontró Unidad con el ID proporcionado", HttpStatus.NOT_FOUND);
        }
    }

    public Unidad convertToEntity(UnidadDTO unidadDTO) {
        Unidad unidad = new Unidad();

        unidad.setIdUnidad(unidadDTO.getIdUnidad());

        System.out.println("inquilino: " + unidadDTO.getIdInquilino());

        if (unidadDTO.getIdDueño() != null) {
            unidad.setDueño(usuarioService.obtenerUsuarioPorID(unidadDTO.getIdDueño()));
        }

        if (unidadDTO.getIdInquilino() != null) {

            unidad.setInquilino(usuarioService.obtenerUsuarioPorID(unidadDTO.getIdInquilino()));

        }

        if (unidadDTO.getIdEdificio() != null) {
            unidad.setEdificio(edificioService.obtenerEdificioPorID(unidadDTO.getIdEdificio()));
        }

        if (unidadDTO.getPiso() != null) {
            unidad.setPiso(unidadDTO.getPiso());
        }

        if (unidadDTO.getNumero() != null) {
            unidad.setNumero(unidadDTO.getNumero());
        }

        return unidad;
    }

    public Unidad convertToEntity3(MostrarUnidadDTO2 unidadDTO) {
        Unidad unidad = new Unidad();

        unidad.setIdUnidad(unidadDTO.getIdUnidad());

        System.out.println("inquilino: " + unidadDTO.getInquilino());

        if (unidadDTO.getDueño() != null) {
            unidad.setDueño(usuarioService.obtenerUsuarioPorUsername(unidadDTO.getDueño()));
        }

        if (unidadDTO.getInquilino() != null) {

            unidad.setInquilino(usuarioService.obtenerUsuarioPorUsername(unidadDTO.getInquilino()));

        }

        if (unidadDTO.getEdificio() != null) {
            unidad.setEdificio(edificioService.obtenerEdificioPorID(unidadDTO.getEdificio()));
        }

        if (unidadDTO.getPiso() != null) {
            unidad.setPiso(unidadDTO.getPiso());
        }

        if (unidadDTO.getNumero() != null) {
            unidad.setNumero(unidadDTO.getNumero());
        }

        return unidad;
    }

    public MostrarUnidadDTO2 convertToDTO3(Unidad unidad){
        MostrarUnidadDTO2 unidadDTO = new MostrarUnidadDTO2();

        unidadDTO.setIdUnidad(unidad.getIdUnidad());
        unidadDTO.setEdificio(unidad.getEdificio().getId());
        unidadDTO.setNumero(unidad.getNumero());
        unidadDTO.setPiso(unidad.getPiso());


        unidadDTO.setDueño(unidad.getDueño().getUsuario());
        if(unidad.getInquilino() != null){
            unidadDTO.setInquilino(unidad.getInquilino().getUsuario());
        }

        return unidadDTO;
    }

    public UnidadDTO convertToDTO(Unidad unidad){
        UnidadDTO unidadDTO = new UnidadDTO();

        unidadDTO.setIdUnidad(unidad.getIdUnidad());
        unidadDTO.setIdEdificio(unidad.getEdificio().getId());
        unidadDTO.setNumero(unidad.getNumero());
        unidadDTO.setPiso(unidad.getPiso());


        unidadDTO.setIdDueño(unidad.getDueño().getIdUsuario());
        if(unidad.getInquilino() != null){
            unidadDTO.setIdInquilino(unidad.getInquilino().getIdUsuario());
        }

        return unidadDTO;
    }

    public MostrarUnidadDTO convertToDTO2(Unidad unidad){
        MostrarUnidadDTO unidadDTO = new MostrarUnidadDTO();

        unidadDTO.setIdUnidad(unidad.getIdUnidad());
        unidadDTO.setDueño(unidad.getDueño().getUsuario());
        if(unidad.getInquilino() != null){
            unidadDTO.setInquilino(unidad.getInquilino().getUsuario());
        }

        unidadDTO.setEdificio(unidad.getEdificio().getNombre());
        unidadDTO.setNumero(unidad.getNumero());
        unidadDTO.setPiso(unidad.getPiso());

        return unidadDTO;
    }
}

