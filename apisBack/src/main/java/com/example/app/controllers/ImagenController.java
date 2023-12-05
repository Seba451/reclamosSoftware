package com.example.app.controllers;

import java.io.IOException;
import java.util.Optional;

import com.example.app.model.Reclamo;
import com.example.app.sevicios.implementaciones.ReclamoServiceImpl;
import com.example.app.sevicios.interfaces.IReclamoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.app.model.Imagen;
import com.example.app.sevicios.implementaciones.ImagenServiceImpl;


@RestController
@RequestMapping("/imagenes")
public class ImagenController {
    @Autowired
    private ImagenServiceImpl imagenService;

    @Autowired
    private IReclamoService reclamoService;

    @PostMapping("/subir/{idReclamo}")
    public ResponseEntity<String> upload(@PathVariable Long idReclamo, @RequestParam("archivo") MultipartFile archivo) {
        try {
            Imagen imagen = new Imagen();
            imagen.setDatosImagen(archivo.getBytes());
            imagenService.save(imagen);

            Reclamo reclamo = reclamoService.obtenerReclamoPorID(idReclamo);
            reclamo.setFotoArchivo(imagen.getDatosImagen());
            reclamo.setIdImagen(imagen.getId());
            reclamoService.guardarReclamo(reclamo);

            return ResponseEntity.ok("Imagen subida exitosamente.");
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error al subir la imagen.");
        } catch (Exception e) {
            return new ResponseEntity<>("Error al cargar la imagen.", HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<byte[]> download(@PathVariable Long id) {
        System.out.println("test");
        Reclamo reclamo = reclamoService.obtenerReclamoPorID(id);
        System.out.println("id: " + reclamo.getIdImagen());
        Imagen imagen = imagenService.findById(reclamo.getIdImagen());
        if (imagen != null) {
            return ResponseEntity.ok().contentType(MediaType.IMAGE_JPEG).body(imagen.getDatosImagen());
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
