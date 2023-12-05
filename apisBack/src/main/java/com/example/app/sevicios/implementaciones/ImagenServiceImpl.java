package com.example.app.sevicios.implementaciones;

import java.util.Optional;

import com.example.app.model.Imagen;
import com.example.app.sevicios.interfaces.IImagenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.app.DAOs.interfaces.ImagenRepository;


@Service
public class ImagenServiceImpl implements IImagenService {

    @Autowired
    private ImagenRepository imagenRepository;

    @Override
    public Imagen findById(Long id) {
        Optional<Imagen> imagenOpt = imagenRepository.findById(id);
        return imagenOpt.orElse(null);
    }

    @Override
    public void save(Imagen imagen) {
        imagenRepository.save(imagen);
    }

}
