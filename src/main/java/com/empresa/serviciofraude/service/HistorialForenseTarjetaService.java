package com.empresa.serviciofraude.service;

import com.empresa.serviciofraude.model.HistorialForenseTarjeta;
import com.empresa.serviciofraude.repository.HistorialForenseTarjetaRepository;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.NotFoundException;
import java.util.List;
import java.util.Objects;

@ApplicationScoped
public class HistorialForenseTarjetaService {

    @Inject
    HistorialForenseTarjetaRepository repository;

    public List<HistorialForenseTarjeta> listAll(int page, int size) {
        return repository.findAll().page(page, size).list();
    }

    public HistorialForenseTarjeta getById(String id) {
        return repository.findByIdOptional(id)
            .orElseThrow(() -> new NotFoundException("HistorialForenseTarjeta no encontrado con ID: " + id));
    }

    @Transactional
    public HistorialForenseTarjeta create(HistorialForenseTarjeta entity) {
        repository.persist(entity);
        return entity;
    }

    @Transactional
    public void delete(String id) {
        boolean deleted = repository.deleteById(id);
        if (!deleted) {
            throw new NotFoundException("No se encontró HistorialForenseTarjeta para eliminar con ID: " + id);
        }
    }
}
