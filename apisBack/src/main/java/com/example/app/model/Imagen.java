package com.example.app.model;

import java.util.Arrays;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;

@Entity
public class Imagen {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Lob
    @Column(columnDefinition = "LONGBLOB")
    private byte[] datosImagen;

    public Imagen() {
        super();
        // TODO Auto-generated constructor stub
    }

    public Imagen(byte[] datosImagen) {
        super();
        this.datosImagen = datosImagen;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public byte[] getDatosImagen() {
        return datosImagen;
    }

    public void setDatosImagen(byte[] datosImagen) {
        this.datosImagen = datosImagen;
    }

    @Override
    public String toString() {
        return "Imagen [id=" + id + ", datosImagen=" + Arrays.toString(datosImagen) + "]";
    }

}
