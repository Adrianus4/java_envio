package com.empresa.serviciofraude.service;

import com.empresa.serviciofraude.model.DesbloqueosTarjeta;
import com.empresa.serviciofraude.repository.DesbloqueosTarjetaRepository;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.NotFoundException;
import java.util.List;
import java.util.Objects;

@ApplicationScoped
public class DesbloqueosTarjetaService {

    @Inject
    DesbloqueosTarjetaRepository repository;

    public List<DesbloqueosTarjeta> listAll(int page, int size) {
        return repository.findAll().page(page, size).list();
    }

    public DesbloqueosTarjeta getById(String id) {
        return repository.findByIdOptional(id)
            .orElseThrow(() -> new NotFoundException("DesbloqueosTarjeta no encontrado con ID: " + id));
    }

    @Transactional
    public DesbloqueosTarjeta create(DesbloqueosTarjeta entity) {
        repository.persist(entity);
        return entity;
    }

    @Transactional
    public void delete(String id) {
        boolean deleted = repository.deleteById(id);
        if (!deleted) {
            throw new NotFoundException("No se encontró DesbloqueosTarjeta para eliminar con ID: " + id);
        }
    }
}
