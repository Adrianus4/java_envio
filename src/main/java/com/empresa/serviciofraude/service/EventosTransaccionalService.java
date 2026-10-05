package com.empresa.serviciofraude.service;

import com.empresa.serviciofraude.model.EventosTransaccional;
import com.empresa.serviciofraude.repository.EventosTransaccionalRepository;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.NotFoundException;
import java.util.List;
import java.util.Objects;

@ApplicationScoped
public class EventosTransaccionalService {

    @Inject
    EventosTransaccionalRepository repository;

    public List<EventosTransaccional> listAll(int page, int size) {
        return repository.findAll().page(page, size).list();
    }

    public EventosTransaccional getById(String id) {
        return repository.findByIdOptional(id)
            .orElseThrow(() -> new NotFoundException("EventosTransaccional no encontrado con ID: " + id));
    }

    @Transactional
    public EventosTransaccional create(EventosTransaccional entity) {
        repository.persist(entity);
        return entity;
    }

    @Transactional
    public void delete(String id) {
        boolean deleted = repository.deleteById(id);
        if (!deleted) {
            throw new NotFoundException("No se encontró EventosTransaccional para eliminar con ID: " + id);
        }
    }
}
