package com.example.app.controllers;

import com.example.app.DTOs.MostrarReclamoDTO;
import com.example.app.DTOs.ReclamoDTO;

import com.example.app.enums.EnumEstadoReclamo;
import com.example.app.model.Imagen;
import com.example.app.model.Reclamo;
import com.example.app.model.Usuario;
import com.example.app.sevicios.interfaces.IAreaComunService;
import com.example.app.sevicios.interfaces.IReclamoService;
import com.example.app.sevicios.interfaces.IUnidadService;
import com.example.app.sevicios.interfaces.IUsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;


import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/apis")
public class ReclamoController {

    ImagenController imagenController = new ImagenController();

    @Autowired
    private IUnidadService unidadService;

    @Autowired
    private IAreaComunService areaComunService;

    @Autowired
    private IReclamoService reclamoService;

    @Autowired
    private IUsuarioService usuarioService;

    @GetMapping({"/reclamos",""})
    public List<MostrarReclamoDTO> obtenerTodosLosReclamos() {
        List<Reclamo> reclamos = reclamoService.obtenerTodosLosReclamos();
        List<MostrarReclamoDTO> reclamosDTO = reclamos.stream()
                .map(this::convertToDTO2) // Utiliza tu función convertToDTO para convertir un objeto AreaComun a AreaComunDTO
                .collect(Collectors.toList());


        return reclamosDTO;
    }

    @GetMapping("/reclamos/{id}")
    public MostrarReclamoDTO obtenerReclamoPorID(@PathVariable Long id) {

        Reclamo reclamo = reclamoService.obtenerReclamoPorID(id);
        MostrarReclamoDTO reclamoDTO = convertToDTO2(reclamo);

        return reclamoDTO;
    }

    @PostMapping("/reclamos")
    public ResponseEntity<?> guardarReclamo(@RequestBody ReclamoDTO reclamoDTO) {
        try{
            //Usuario usuario =  usuarioService.obtenerUsuarioPorID(idUsuario);
            Authentication auth = SecurityContextHolder.getContext().getAuthentication();

            System.out.println("user" + auth.getPrincipal().toString());

            Usuario usuario = usuarioService.obtenerUsuarioPorUsername(auth.getPrincipal().toString());

            System.out.println("usuario: " + usuario.getUsuario());

            if(usuario == null){
                return new ResponseEntity<>("El usuario indicado no existe", HttpStatus.BAD_REQUEST);
            }


            reclamoDTO.setIdUsuario(usuario.getIdUsuario());

            Reclamo reclamo = convertToEntity(reclamoDTO);


            if(reclamo.getAreaComun() == null && reclamo.getUnidad() == null){
                return new ResponseEntity<>("El reclamo debe estar ligado a alguna unidad o area comun.", HttpStatus.BAD_REQUEST);
            }else{
                if(reclamo.getDescripcion() == null){
                    return new ResponseEntity<>("Los campos (Descripcion) son requeridos",HttpStatus.BAD_REQUEST);
                }else{
                    reclamo.setEstadoReclamo(EnumEstadoReclamo.valueOf("NUEVO"));

                    //reclamo.setFotoArchivo(archivo.getBytes());

                    reclamoService.guardarReclamo(reclamo);


                    /*if(archivo != null){
                        imagenController.upload(reclamo.getId(), archivo);
                    }*/


                    ReclamoDTO nuevoReclamoDTO = convertToDTO(reclamo);


                    return new ResponseEntity<>(nuevoReclamoDTO, HttpStatus.CREATED);
                }
            }


        }catch(Exception e){
            return new ResponseEntity<>("Error al crear el reclamo.", HttpStatus.BAD_REQUEST);
        }

    }


    @PutMapping("/reclamos/{id}")
    public ResponseEntity<String> actualizarReclamo(
            @PathVariable Long id,
            @RequestBody ReclamoDTO reclamoDTO) {

        try {


            if (id == null || reclamoDTO == null) {
                return new ResponseEntity<>("Los valores de id o reclamoDTO son nulos o inválidos.", HttpStatus.BAD_REQUEST);
            }



            reclamoDTO.setIdReclamo(id);

            // Verifica si el reclamo con id existe en la base de datos
            Reclamo existingReclamo = reclamoService.obtenerReclamoPorID(id);
            if (existingReclamo == null) {
                return new ResponseEntity<>("El reclamo con ID " + id + " no existe en la base de datos.", HttpStatus.BAD_REQUEST);
            }


            Reclamo reclamo = convertToEntity(reclamoDTO);


            

            reclamoService.actualizarReclamo(id, reclamo);
            return new ResponseEntity<>("Reclamo actualizado con éxito", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("Error al actualizar el reclamo: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/reclamos/{id}")
    public ResponseEntity<String> eliminarReclamo(@PathVariable Long id) {
        try {
            // Verifica si el reclamo con el ID proporcionado existe en la base de datos
            Reclamo existingReclamo = reclamoService.obtenerReclamoPorID(id);

            if (existingReclamo != null) {
                reclamoService.eliminarReclamo(id);
                return new ResponseEntity<>("Reclamo eliminado con éxito", HttpStatus.OK);
            } else {
                return new ResponseEntity<>("No se encontró Reclamo con el ID proporcionado", HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            return new ResponseEntity<>("Error al eliminar el Reclamo: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    public Reclamo convertToEntity(ReclamoDTO reclamoDTO){
        Reclamo reclamo = new Reclamo();
        if(reclamoDTO.getIdUsuario() != null){
            reclamo.setUsuario(usuarioService.obtenerUsuarioPorID(reclamoDTO.getIdUsuario()));
        }

        if(reclamoDTO.getFotoArchivo() != null){
            reclamo.setFotoArchivo(reclamoDTO.getFotoArchivo());
        }

        if(reclamoDTO.getMedidaTomada() != null){
            reclamo.setMedidaTomada(reclamoDTO.getMedidaTomada());
        }

        if(reclamoDTO.getIdUnidad() != null){
            reclamo.setUnidad(unidadService.obtenerUnidadPorID(reclamoDTO.getIdUnidad()));
        }
        reclamo.setId(reclamoDTO.getIdReclamo());
        if(reclamoDTO.getEstadoReclamo() != null){
            reclamo.setEstadoReclamo(reclamoDTO.getEstadoReclamo());
        }

        if(reclamoDTO.getDescripcion() != null){
            reclamo.setDescripcion(reclamoDTO.getDescripcion());
        }

        if(reclamoDTO.getIdAreaComun() != null){
            reclamo.setAreaComun(areaComunService.obtenerAreaComunPorID(reclamoDTO.getIdAreaComun()));
        }
        if(reclamoDTO.getFechaCreacion() != null) {
            reclamo.setFechaCreacion(reclamoDTO.getFechaCreacion());
        }

        return reclamo;
    }

    public ReclamoDTO convertToDTO(Reclamo reclamo){
        ReclamoDTO reclamoDTO = new ReclamoDTO();

        if(reclamo.getFotoArchivo() != null){
            reclamoDTO.setFotoArchivo(reclamo.getFotoArchivo());
        }

        if(reclamo.getAreaComun() != null){
            reclamoDTO.setIdAreaComun(reclamo.getAreaComun().getIdArea());
        }
        if(reclamo.getUnidad() != null){
            reclamoDTO.setIdUnidad(reclamo.getUnidad().getIdUnidad());
        }
        reclamoDTO.setIdUsuario(reclamo.getUsuario().getIdUsuario());
        reclamoDTO.setDescripcion(reclamo.getDescripcion());
        reclamoDTO.setEstadoReclamo(reclamo.getEstadoReclamo());
        reclamoDTO.setMedidaTomada(reclamo.getMedidaTomada());
        reclamoDTO.setIdReclamo(reclamo.getId());
        reclamoDTO.setFechaCreacion(reclamo.getFechaCreacion());

        return reclamoDTO;
    }

    public MostrarReclamoDTO convertToDTO2(Reclamo reclamo){
        MostrarReclamoDTO reclamoDTO = new MostrarReclamoDTO();

        if(reclamo.getAreaComun() != null){
            reclamoDTO.setAreaComun(reclamo.getAreaComun().getDescripcion());
        }

        if(reclamo.getUnidad() != null){
            reclamoDTO.setNumeroUnidad(reclamo.getUnidad().getNumero());
            reclamoDTO.setPisoUnidad(reclamo.getUnidad().getPiso());
        }


        if(reclamo.getFotoArchivo() != null){
            reclamoDTO.setFotoArchivo(reclamo.getFotoArchivo());
        }
        reclamoDTO.setUsuario(reclamo.getUsuario().getUsuario());
        reclamoDTO.setDescripcion(reclamo.getDescripcion());
        reclamoDTO.setEstadoReclamo(reclamo.getEstadoReclamo());
        reclamoDTO.setFechaCreacion(reclamo.getFechaCreacion());
        reclamoDTO.setIdReclamo(reclamo.getId());
        reclamoDTO.setMedidaTomada(reclamo.getMedidaTomada());

        return reclamoDTO;
    }
    
}
