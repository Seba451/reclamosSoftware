package com.example.app.DAOs.model;

import com.example.app.DAOs.interfaces.IUsuarioDAO;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.Query;
import com.example.app.model.Usuario;
import org.hibernate.Session;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
@Repository
public class UsuarioDAO implements IUsuarioDAO {
    @PersistenceContext
    private EntityManager entityManager;

    @Transactional
    public void guardarUsuario(Usuario usuario) {
        Session currentSession = entityManager.unwrap(Session.class);
        usuario.setPassword(new BCryptPasswordEncoder().encode(usuario.getPassword()));
        currentSession.persist(usuario);
    }
    @Transactional
    public Usuario obtenerUsuarioPorID(Long id) {
        Session currentSession = entityManager.unwrap(Session.class);
        Usuario usuario = currentSession.get(Usuario.class, id);
        return usuario;
    }


    @Transactional(readOnly = true)
    public Usuario obtenerUsuarioPorUsername(String user) {
        Session currentSession = entityManager.unwrap(Session.class);

        org.hibernate.query.Query<Usuario> theQuery = currentSession.createQuery("FROM Usuario WHERE usuario=:user", Usuario.class);
        theQuery.setParameter("user", user);

        return theQuery.uniqueResult();
    }


    @Transactional
    public List<Usuario> obtenerTodosLosUsuarios() {

        Session currentSession = entityManager.unwrap(Session.class);

        Query getQuery = currentSession.createQuery("FROM Usuario", Usuario.class);

        List<Usuario> usuarios = getQuery.getResultList();
        for (Usuario usuario : usuarios) {
            System.out.println(usuario.toString());
        }
        return usuarios;

    }
    @Transactional
    public void eliminarUsuario(Long id) {
        Session currentSession = entityManager.unwrap(Session.class);
        Query query = currentSession.createQuery("delete from Usuario where id=:idUsuario");
        query.setParameter("idUsuario",id);
        query.executeUpdate();
    }

    @Override
    @Transactional(readOnly = true)
    public Usuario findUser(String usuario, String password) {
        Session currentSession = entityManager.unwrap(Session.class);

        org.hibernate.query.Query<Usuario> theQuery = currentSession.createQuery("FROM Usuario WHERE usuario=:usuario", Usuario.class);
        theQuery.setParameter("usuario", usuario);

        Usuario user = theQuery.uniqueResult();

        if(user != null && checkPassword(password, user.getPassword())) {
            return user;
        } else {
            return null;
        }
    }

    private boolean checkPassword(String password, String passwordDB) {
        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        String hashedPassword = passwordEncoder.encode(password);
        System.out.println("Password: " + password);
        System.out.println("hashedPassword: " + hashedPassword);
        System.out.println("passwordDB: " + passwordDB);
        boolean isPasswordMatch = passwordEncoder.matches(password, passwordDB);

        return isPasswordMatch;
    }
}