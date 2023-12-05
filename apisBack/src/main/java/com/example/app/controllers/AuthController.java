package com.example.app.controllers;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.crypto.SecretKey;

import com.example.app.DTOs.RolDTO;
import com.example.app.DTOs.UsuarioDTO;
import com.example.app.model.Rol;
import com.example.app.model.Usuario;
import com.example.app.sevicios.interfaces.IRolService;
import com.example.app.sevicios.interfaces.IUsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

@RestController
@RequestMapping("/auth")

public class AuthController {

    private final int EXPIRATION_TIME_IN_MIN = 100;

    @Autowired
    private IUsuarioService usuarioService;

    @Autowired
    private IRolService rolService;

    @Autowired
    private SecretKey secretKey; // Inyecta la clave secreta

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody UsuarioDTO credentials) {
        // Validar las credenciales aquí (puedes usar Spring Security u otros
        // mecanismos)
        Usuario usuario = usuarioService.findUser(credentials.getUsuario(), credentials.getPassword());

        if (usuario != null) {

            List<String> userRoles = new ArrayList<>();
            List<Rol> listaRoles = rolService.obtenerTodosLosRoles();


            for (Rol rol : listaRoles) {
                if(rol.getUsuario().getIdUsuario() == usuario.getIdUsuario()){
                    userRoles.add(rol.getTipoRol().toString());
                }
            }



            // Crear el token JWT
            String token = Jwts.builder().setSubject(credentials.getUsuario()).setIssuedAt(new Date())
                    .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME_IN_MIN * 60 * 1000))
                    .claim("rol", userRoles)
                    .signWith(secretKey, SignatureAlgorithm.HS256).compact();




            return new ResponseEntity<>(token, HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Credenciales inválidas.", HttpStatus.UNAUTHORIZED);
        }
    }

}
