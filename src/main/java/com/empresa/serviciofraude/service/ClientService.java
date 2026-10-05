package com.empresa.serviciofraude.service;

import com.empresa.serviciofraude.model.Client;
import com.empresa.serviciofraude.repository.ClientRepository;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.NotFoundException;
import java.util.List;
import java.util.Objects;

@ApplicationScoped
public class ClientService {

    @Inject
    ClientRepository repository;

    public List<Client> listAll(int page, int size) {
        return repository.findAll().page(page, size).list();
    }

    public Client getById(String id) {
        return repository.findByIdOptional(id)
            .orElseThrow(() -> new NotFoundException("Client no encontrado con ID: " + id));
    }

    @Transactional
    public Client create(Client entity) {
        repository.persist(entity);
        return entity;
    }

    @Transactional
    public void delete(String id) {
        boolean deleted = repository.deleteById(id);
        if (!deleted) {
            throw new NotFoundException("No se encontró Client para eliminar con ID: " + id);
        }
    }
}
