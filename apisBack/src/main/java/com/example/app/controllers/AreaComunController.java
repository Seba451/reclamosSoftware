package com.example.app.controllers;

import com.example.app.DTOs.AreaComunDTO;
import com.example.app.DTOs.MostrarAreaComunDTO;
import com.example.app.model.AreaComun;
import com.example.app.model.Edificio;
import com.example.app.sevicios.interfaces.IAreaComunService;
import com.example.app.sevicios.interfaces.IEdificioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/apis")
public class AreaComunController {

    @Autowired
    private IAreaComunService areaComunService;

    @Autowired
    private IEdificioService edificioService;

    @GetMapping({"/areascomunes", ""})
    public List<MostrarAreaComunDTO> obtenerTodasLasAreasComunes() {
        List<AreaComun> areasComunes = areaComunService.obtenerTodasLasAreasComunes();

        // Utiliza stream y map para convertir la lista de AreaComun a AreaComunDTO
        List<MostrarAreaComunDTO> areasComunesDTO = areasComunes.stream()
                .map(this::convertToDTO2) // Utiliza tu función convertToDTO para convertir un objeto AreaComun a AreaComunDTO
                .collect(Collectors.toList());

        return areasComunesDTO;
    }


    @GetMapping("/areascomunes/{id}")
    public MostrarAreaComunDTO obtenerAreaComunPorID(@PathVariable Long id) {
        AreaComun areaComun = areaComunService.obtenerAreaComunPorID(id);
        MostrarAreaComunDTO areaComunDTO = convertToDTO2(areaComun);
        return areaComunDTO;
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @PostMapping("/areascomunes")
    public ResponseEntity<?> guardarAreaComun(@RequestParam ("idEdificio") Long idEdificio, @RequestBody AreaComunDTO areaComunDTO) {
        try{
            Edificio edificio = edificioService.obtenerEdificioPorID(idEdificio);


            if(edificio == null){
                return new ResponseEntity<>("El edificio indicado no existe", HttpStatus.BAD_REQUEST);
            }


            areaComunDTO.setIdEdificio(idEdificio);

            AreaComun areaComun = convertToEntity(areaComunDTO);


            if(areaComun.getDescripcion() != null){
                areaComunService.guardarAreaComun(areaComun);
                AreaComunDTO nuevoAreaComunDTO = convertToDTO(areaComun);
                return new ResponseEntity<>(nuevoAreaComunDTO, HttpStatus.CREATED);
            }else{
                return new ResponseEntity<>("El campo (descripcion) es requerido.", HttpStatus.BAD_REQUEST);
            }
        }catch (Exception e){
            return new ResponseEntity<>("Error al registrar el area comun", HttpStatus.BAD_REQUEST);
        }
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @PutMapping("/areascomunes/{id}")
    public ResponseEntity<String> actualizarAreaComun(
            @RequestParam("idEdificio") Long idEdificio,
            @PathVariable Long id,
            @RequestBody AreaComunDTO areaComunDTO) {

        try {
            if (id == null || idEdificio == null) {
                return new ResponseEntity<>("Los valores de id o idEdificio son nulos o inválidos.", HttpStatus.BAD_REQUEST);
            }

            // Verifica si el edificio con idEdificio existe en la base de datos
            Edificio edificio = edificioService.obtenerEdificioPorID(idEdificio);
            if (edificio == null) {
                return new ResponseEntity<>("El edificio con ID " + idEdificio + " no existe en la base de datos.", HttpStatus.BAD_REQUEST);
            }

            // Verifica si el Área Común con id existe en la base de datos
            AreaComun existingAreaComun = areaComunService.obtenerAreaComunPorID(id);
            if (existingAreaComun == null) {
                return new ResponseEntity<>("El Área Común con ID " + id + " no existe en la base de datos.", HttpStatus.BAD_REQUEST);
            }

            areaComunDTO.setIdEdificio(idEdificio);
            AreaComun areaComun = convertToEntity(areaComunDTO);



            areaComunService.actualizarAreaComun(id, areaComun);
            return new ResponseEntity<>("Área Común actualizada con éxito", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("Error al actualizar el Área Común: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @PreAuthorize("hasAuthority('ADMIN')")
    @DeleteMapping("/areascomunes/{id}")
    public ResponseEntity<String> eliminarAreaComun(@PathVariable Long id) {
        AreaComun areaComun = areaComunService.obtenerAreaComunPorID(id);

        if (areaComun != null) {
            areaComunService.eliminarAreaComun(id);
            return new ResponseEntity<>("Área Común eliminada con éxito", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("No se encontró Área Común con el ID proporcionado", HttpStatus.NOT_FOUND);
        }
    }

    public AreaComun convertToEntity(AreaComunDTO areaComunDTO){
        AreaComun areaComun = new AreaComun();

        areaComun.setIdArea(areaComunDTO.getIdArea());
        if(areaComunDTO.getDescripcion() != null){
            areaComun.setDescripcion(areaComunDTO.getDescripcion());
        }


        areaComun.setEdificio(edificioService.obtenerEdificioPorID(areaComunDTO.getIdEdificio()));
        return areaComun;
    }

    public AreaComunDTO convertToDTO(AreaComun areaComun){
        AreaComunDTO areaComunDTO = new AreaComunDTO();

        areaComunDTO.setIdArea(areaComun.getIdArea());
        areaComunDTO.setDescripcion(areaComun.getDescripcion());
        areaComunDTO.setIdEdificio(areaComun.getEdificio().getId());

        return areaComunDTO;
    }

    public MostrarAreaComunDTO convertToDTO2(AreaComun areaComun){
        MostrarAreaComunDTO areaComunDTO = new MostrarAreaComunDTO();

        areaComunDTO.setIdArea(areaComun.getIdArea());
        areaComunDTO.setDescripcion(areaComun.getDescripcion());
        areaComunDTO.setEdificio(areaComun.getEdificio().getNombre());

        return areaComunDTO;
    }
}
