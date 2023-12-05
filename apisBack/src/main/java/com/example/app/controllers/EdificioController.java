package com.example.app.controllers;

import com.example.app.DTOs.EdificioDTO;
import com.example.app.model.Edificio;
import com.example.app.sevicios.interfaces.IEdificioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping({"/apis",""})
public class EdificioController {

    @Autowired
    private IEdificioService edificioService;

    @GetMapping("/edificios")
    public List<Edificio> obtenerTodosLosEdificios() {
        return edificioService.obtenerTodosLosEdificios();
    }

    @GetMapping("/edificios/{id}")
    public Edificio obtenerEdificioPorID(@PathVariable Long id) {
        return edificioService.obtenerEdificioPorID(id);
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @PostMapping("/edificios")
    public ResponseEntity<?> guardarEdificio(@RequestBody EdificioDTO edificioDTO) {
        try{
            Edificio edificio = convertToEntity(edificioDTO);

            if(edificio.getDireccion() != null){
                edificioService.guardarEdificio(edificio);
                EdificioDTO nuevoEdificioDTO = convertToDTO(edificio);
                return new ResponseEntity<>(nuevoEdificioDTO, HttpStatus.CREATED);
            }else{
                return new ResponseEntity<>("El campo (direccion) es requerido.", HttpStatus.BAD_REQUEST);
            }
        }catch (Exception e){
            return new ResponseEntity<>("Error al registrar el edificio.", HttpStatus.BAD_REQUEST);
        }
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @PutMapping("/edificios/{id}")
    public ResponseEntity<String> actualizarEdificio(@PathVariable Long id, @RequestBody EdificioDTO edificioDTO) {
        try {
            if (id == null) {
                return new ResponseEntity<>("El valor de ID es nulo o inválido.", HttpStatus.BAD_REQUEST);
            }

            // Verifica si el edificio con ID existe en la base de datos
            Edificio existingEdificio = edificioService.obtenerEdificioPorID(id);
            if (existingEdificio == null) {
                return new ResponseEntity<>("El edificio con ID " + id + " no existe en la base de datos.", HttpStatus.BAD_REQUEST);
            }



            // Actualiza el edificio con los datos proporcionados en el DTO
            Edificio edificio = convertToEntity(edificioDTO);
            edificioService.actualizarEdificio(id, edificio);

            return new ResponseEntity<>("Edificio actualizado con éxito", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("Error al actualizar el edificio: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @PreAuthorize("hasAuthority('ADMIN')")
    @DeleteMapping("/edificios/{id}")
    public ResponseEntity<String> eliminarEdificio(@PathVariable Long id) {
        Edificio edificio = edificioService.obtenerEdificioPorID(id);

        if (edificio != null) {
            edificioService.eliminarEdificio(id);
            return new ResponseEntity<>("Edificio eliminado con éxito", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("No se encontró Edificio con el ID proporcionado", HttpStatus.NOT_FOUND);
        }
    }

    public Edificio convertToEntity(EdificioDTO edificioDTO){
        Edificio edificio = new Edificio();

        edificio.setId(edificioDTO.getIdEdificio());
        if(edificioDTO.getNombre()!= null){
            edificio.setNombre(edificioDTO.getNombre());
        }

        if(edificioDTO.getDireccion() != null){
            edificio.setDireccion(edificioDTO.getDireccion());
        }


        return edificio;
    }

    public EdificioDTO convertToDTO(Edificio edificio){
        EdificioDTO edificioDTO = new EdificioDTO();

        edificioDTO.setIdEdificio(edificio.getId());
        edificioDTO.setDireccion(edificio.getNombre());
        edificioDTO.setNombre(edificio.getNombre());

        return edificioDTO;
    }
}
