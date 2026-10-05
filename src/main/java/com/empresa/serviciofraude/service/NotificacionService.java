package com.empresa.serviciofraude.service;

import com.empresa.serviciofraude.model.Notificacion;
import com.empresa.serviciofraude.repository.NotificacionRepository;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.NotFoundException;
import java.util.List;
import java.util.Objects;

@ApplicationScoped
public class NotificacionService {

    @Inject
    NotificacionRepository repository;

    public List<Notificacion> listAll(int page, int size) {
        return repository.findAll().page(page, size).list();
    }

    public Notificacion getById(String id) {
        return repository.findByIdOptional(id)
            .orElseThrow(() -> new NotFoundException("Notificacion no encontrado con ID: " + id));
    }

    @Transactional
    public Notificacion create(Notificacion entity) {
        repository.persist(entity);
        return entity;
    }

    @Transactional
    public void delete(String id) {
        boolean deleted = repository.deleteById(id);
        if (!deleted) {
            throw new NotFoundException("No se encontró Notificacion para eliminar con ID: " + id);
        }
    }
}
