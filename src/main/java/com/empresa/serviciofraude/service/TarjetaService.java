package com.empresa.serviciofraude.service;

import com.empresa.serviciofraude.model.Tarjeta;
import com.empresa.serviciofraude.repository.TarjetaRepository;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.NotFoundException;
import java.util.List;
import java.util.Objects;

@ApplicationScoped
public class TarjetaService {

    @Inject
    TarjetaRepository repository;

    public List<Tarjeta> listAll(int page, int size) {
        return repository.findAll().page(page, size).list();
    }

    public Tarjeta getById(String id) {
        return repository.findByIdOptional(id)
            .orElseThrow(() -> new NotFoundException("Tarjeta no encontrado con ID: " + id));
    }

    @Transactional
    public Tarjeta create(Tarjeta entity) {
        repository.persist(entity);
        return entity;
    }

    @Transactional
    public void delete(String id) {
        boolean deleted = repository.deleteById(id);
        if (!deleted) {
            throw new NotFoundException("No se encontró Tarjeta para eliminar con ID: " + id);
        }
    }
}
