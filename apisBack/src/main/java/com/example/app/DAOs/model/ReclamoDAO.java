package com.example.app.DAOs.model;

import com.example.app.DAOs.interfaces.IReclamoDAO;
import com.example.app.model.Reclamo;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.Query;
import org.hibernate.Session;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public class ReclamoDAO implements IReclamoDAO {
    @PersistenceContext
    private EntityManager entityManager;

    @Transactional
    public void guardarReclamo(Reclamo reclamo) {
        Session currentSession = entityManager.unwrap(Session.class);
        currentSession.persist(reclamo);
    }

    @Transactional
    public Reclamo obtenerReclamoPorID(Long id) {
        Session currentSession = entityManager.unwrap(Session.class);
        Reclamo reclamo = currentSession.get(Reclamo.class, id);
        return reclamo;
    }

    @Transactional
    public List<Reclamo> obtenerTodosLosReclamos() {
        Session currentSession = entityManager.unwrap(Session.class);
        Query getQuery = currentSession.createQuery("FROM Reclamo", Reclamo.class);
        List<Reclamo> reclamos = getQuery.getResultList();

        for (Reclamo reclamo : reclamos) {
            System.out.println(reclamo.toString());
        }

        return reclamos;
    }

    @Transactional
    public void eliminarReclamo(Long id) {
        Session currentSession = entityManager.unwrap(Session.class);
        Query query = currentSession.createQuery("delete from Reclamo where id=:idReclamo");
        query.setParameter("idReclamo", id);
        query.executeUpdate();
    }
}
