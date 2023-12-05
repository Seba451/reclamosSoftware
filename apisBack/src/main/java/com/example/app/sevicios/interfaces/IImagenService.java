package com.example.app.sevicios.interfaces;


import com.example.app.model.Imagen;

public interface IImagenService {
    public Imagen findById(Long id);

    public void save(Imagen cliente);
}

