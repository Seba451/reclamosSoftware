package com.example.app.DAOs.model;

import com.example.app.DAOs.interfaces.IRolDAO;
import com.example.app.model.Rol;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.Query;
import org.hibernate.Session;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public class RolDAO implements IRolDAO {
    @PersistenceContext
    private EntityManager entityManager;

    @Transactional
    public void guardarRol(Rol rol) {
        Session currentSession = entityManager.unwrap(Session.class);
        currentSession.persist(rol);
    }

    @Transactional
    public Rol obtenerRolPorID(Long id) {
        Session currentSession = entityManager.unwrap(Session.class);
        Rol rol = currentSession.get(Rol.class, id);
        return rol;
    }

    @Transactional
    public List<Rol> obtenerTodosLosRoles() {
        Session currentSession = entityManager.unwrap(Session.class);
        Query getQuery = currentSession.createQuery("FROM Rol", Rol.class);
        List<Rol> roles = getQuery.getResultList();

        for (Rol rol : roles) {
            System.out.println(rol.toString());
        }


        return roles;
    }

    @Transactional
    public void eliminarRol(Long id) {
        Session currentSession = entityManager.unwrap(Session.class);
        Query query = currentSession.createQuery("delete from Rol where id=:idRol");
        query.setParameter("idRol", id);
        query.executeUpdate();
    }
}
