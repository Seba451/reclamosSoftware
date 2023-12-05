package com.example.app.DAOs.model;

import com.example.app.DAOs.interfaces.IUnidadDAO;
import com.example.app.model.Unidad;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.Query;
import org.hibernate.Session;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public class UnidadDAO implements IUnidadDAO {
    @PersistenceContext
    private EntityManager entityManager;

    @Transactional
    public void guardarUnidad(Unidad unidad) {
        Session currentSession = entityManager.unwrap(Session.class);
        currentSession.persist(unidad);
    }

    @Transactional
    public Unidad obtenerUnidadPorID(Long id) {
        Session currentSession = entityManager.unwrap(Session.class);
        Unidad unidad = currentSession.get(Unidad.class, id);
        return unidad;
    }

    @Transactional
    public List<Unidad> obtenerTodasLasUnidades() {
        Session currentSession = entityManager.unwrap(Session.class);
        Query getQuery = currentSession.createQuery("FROM Unidad", Unidad.class);
        List<Unidad> unidades = getQuery.getResultList();

        for (Unidad unidad : unidades) {
            System.out.println(unidad.toString());
        }
        return unidades;
    }

    @Transactional
    public void eliminarUnidad(Long id) {
        Session currentSession = entityManager.unwrap(Session.class);
        Query query = currentSession.createQuery("delete from Unidad where id=:idUnidad");
        query.setParameter("idUnidad", id);
        query.executeUpdate();
    }
}
