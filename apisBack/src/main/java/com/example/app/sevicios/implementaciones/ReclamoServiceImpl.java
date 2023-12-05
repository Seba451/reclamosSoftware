package com.example.app.sevicios.implementaciones;

import com.example.app.DAOs.interfaces.IReclamoDAO;

import com.example.app.model.Reclamo;
import com.example.app.model.Unidad;
import com.example.app.model.Usuario;
import com.example.app.sevicios.interfaces.IReclamoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReclamoServiceImpl implements IReclamoService {

    @Autowired
    private IReclamoDAO reclamoDAO;

    @Override
    public void guardarReclamo(Reclamo reclamo) throws Exception {
        if(puedeCrearReclamo(reclamo)){
            reclamoDAO.guardarReclamo(reclamo);
        }else{
            throw new Exception("No se puede guardar el reclamo ya que no tiene permiso para hacer dicho reclamo.");
        }

    }

    private boolean puedeCrearReclamo(Reclamo reclamo){
        Usuario usuario = reclamo.getUsuario();

        if(reclamo.getAreaComun() != null){
            return true;
        }




        if(reclamo.getUnidad()!= null){
            Unidad unidad = reclamo.getUnidad();



            if(unidad.getInquilino() != null ){
                return unidad.getInquilino().equals(usuario);
            }else{
                return unidad.getDueño() != null && unidad.getDueño().equals(usuario);
            }
        }

        return false;
    }

    @Override
    public Reclamo obtenerReclamoPorID(Long id) {
        return reclamoDAO.obtenerReclamoPorID(id);
    }

    @Override
    public List<Reclamo> obtenerTodosLosReclamos() {
        return reclamoDAO.obtenerTodosLosReclamos();
    }

    @Override
    public void actualizarReclamo(Long id, Reclamo reclamo) throws Exception {
        Reclamo reclamoExistente = reclamoDAO.obtenerReclamoPorID(id);



        if (reclamoExistente != null) {




                reclamoExistente.setEstadoReclamo(reclamo.getEstadoReclamo());
                reclamoExistente.setMedidaTomada(reclamo.getMedidaTomada());



                reclamoDAO.guardarReclamo(reclamoExistente);



        }
    }

    @Override
    public void eliminarReclamo(Long id) throws Exception {


        reclamoDAO.eliminarReclamo(id);


    }
}
