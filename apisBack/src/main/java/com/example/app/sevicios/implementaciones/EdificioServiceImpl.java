package com.example.app.sevicios.implementaciones;


import com.example.app.DAOs.interfaces.IEdificioDAO;
import com.example.app.model.Edificio;
import com.example.app.sevicios.interfaces.IEdificioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class EdificioServiceImpl implements IEdificioService {

    @Autowired
    private IEdificioDAO edificioDAO;

    @Override
    public void guardarEdificio(Edificio edificio) {
        edificioDAO.guardarEdificio(edificio);
    }

    @Override
    public Edificio obtenerEdificioPorID(Long id) {
        Edificio edificio= edificioDAO.obtenerEdificioPorID(id);
        return edificio;
    }





    @Override
    public List<Edificio> obtenerTodosLosEdificios() {
        List<Edificio> edificios = edificioDAO.obtenerTodosLosEdificios();
        return edificios;
    }

    @Override
    public void actualizarEdificio(long idEdificio, Edificio edificio) {
        Edificio edificioExistente = edificioDAO.obtenerEdificioPorID(idEdificio);

        if (edificioExistente != null){

            if(edificio.getNombre() != null){
                edificioExistente.setNombre(edificio.getNombre());
            }

            if(edificio.getDireccion() != null){
                edificioExistente.setDireccion(edificio.getDireccion());
            }


            edificioDAO.guardarEdificio(edificioExistente);
        }
    }

    @Override
    public void eliminarEdificio(Long id) {
        edificioDAO.eliminarEdificio(id);

    }
}
