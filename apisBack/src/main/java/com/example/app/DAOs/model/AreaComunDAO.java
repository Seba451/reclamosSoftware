package com.example.app.DAOs.model;

import com.example.app.DAOs.interfaces.IAreaComunDAO;
import com.example.app.model.AreaComun;
import com.example.app.model.Reclamo;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.Query;
import org.hibernate.Session;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public class AreaComunDAO implements IAreaComunDAO {
    @PersistenceContext
    private EntityManager entityManager;

    @Transactional
    public void guardarAreaComun(AreaComun areaComun) {
        Session currentSession = entityManager.unwrap(Session.class);
        currentSession.persist(areaComun);
    }

    @Transactional
    public AreaComun obtenerAreaComunPorID(Long id) {
        Session currentSession = entityManager.unwrap(Session.class);
        AreaComun areaComun = currentSession.get(AreaComun.class, id);
        return areaComun;
    }

    @Transactional
    public List<AreaComun> obtenerTodasLasAreasComunes() {
        Session currentSession = entityManager.unwrap(Session.class);
        Query getQuery = currentSession.createQuery("FROM AreaComun", AreaComun.class);
        List<AreaComun> areasComunes = getQuery.getResultList();

        for (AreaComun areaComun : areasComunes) {
            System.out.println(areaComun.toString());
        }

        return areasComunes;
    }

    @Transactional
    public void eliminarAreaComun(Long id) {
        Session currentSession = entityManager.unwrap(Session.class);
        Query query = currentSession.createQuery("delete from AreaComun where id=:idAreaComun");
        query.setParameter("idAreaComun", id);
        query.executeUpdate();
    }

    @Transactional
    public void printReclamos(Long id) {
        Session currentSession = entityManager.unwrap(Session.class);

        try {
            AreaComun areaComun = currentSession.get(AreaComun.class, id);
            List<Reclamo> reclamos = areaComun.getReclamos();
            for (Reclamo reclamo : reclamos) {
                System.out.println(reclamo.getId());
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
