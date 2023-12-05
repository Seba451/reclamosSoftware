package com.example.app.DAOs.model;

import com.example.app.DAOs.interfaces.IEdificioDAO;
import com.example.app.model.Edificio;
import com.example.app.model.Unidad;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.Query;
import org.hibernate.Session;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public class EdificioDAO implements IEdificioDAO {
    @PersistenceContext
    private EntityManager entityManager;

    @Transactional
    public void guardarEdificio(Edificio edificio) {
        Session currentSession = entityManager.unwrap(Session.class);
        currentSession.persist(edificio);
    }

    @Transactional
    public Edificio obtenerEdificioPorID(Long id) {
        Session currentSession = entityManager.unwrap(Session.class);
        Edificio edificio = currentSession.get(Edificio.class, id);
        return edificio;
    }

    @Transactional
    public List<Edificio> obtenerTodosLosEdificios() {
        Session currentSession = entityManager.unwrap(Session.class);
        Query getQuery = currentSession.createQuery("FROM Edificio", Edificio.class);
        List<Edificio> edificios = getQuery.getResultList();

        for (Edificio edificio : edificios) {
            System.out.println(edificio.toString());
        }

        return edificios;
    }

    @Transactional
    public void eliminarEdificio(Long id) {
        Session currentSession = entityManager.unwrap(Session.class);
        Query query = currentSession.createQuery("delete from Edificio where id=:idEdificio");
        query.setParameter("idEdificio", id);
        query.executeUpdate();
    }

    @Transactional
    public void printUnidades(Long id) {
        Session currentSession = entityManager.unwrap(Session.class);

        try {
            Edificio edificio = currentSession.get(Edificio.class, id);
            List<Unidad> unidades = edificio.getUnidades();
            for (Unidad unidad : unidades) {
                System.out.println(unidad.getIdUnidad());
            }
        } catch (Exception e) {
            // Manejar excepciones aquí si es necesario
        }
    }
}
