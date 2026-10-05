package com.empresa.serviciofraude.service;

import com.empresa.serviciofraude.model.AuditoriaBitacora;
import com.empresa.serviciofraude.repository.AuditoriaBitacoraRepository;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.NotFoundException;
import java.util.List;
import java.util.Objects;

@ApplicationScoped
public class AuditoriaBitacoraService {

    @Inject
    AuditoriaBitacoraRepository repository;

    public List<AuditoriaBitacora> listAll(int page, int size) {
        return repository.findAll().page(page, size).list();
    }

    public AuditoriaBitacora getById(String id) {
        return repository.findByIdOptional(id)
            .orElseThrow(() -> new NotFoundException("AuditoriaBitacora no encontrado con ID: " + id));
    }

    @Transactional
    public AuditoriaBitacora create(AuditoriaBitacora entity) {
        repository.persist(entity);
        return entity;
    }

    @Transactional
    public void delete(String id) {
        boolean deleted = repository.deleteById(id);
        if (!deleted) {
            throw new NotFoundException("No se encontró AuditoriaBitacora para eliminar con ID: " + id);
        }
    }
}
