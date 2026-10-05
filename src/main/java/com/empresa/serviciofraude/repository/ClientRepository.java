package com.empresa.serviciofraude.repository;

import com.empresa.serviciofraude.model.Client;
import io.quarkus.hibernate.orm.panache.PanacheRepositoryBase;
import jakarta.enterprise.context.ApplicationScoped;
import java.util.List;
import java.util.Optional;
import java.util.Objects;

@ApplicationScoped
public class ClientRepository implements PanacheRepositoryBase<Client, String> {

    public List<Client> findByStatus(String status) {
        return list("estado", status);
    }

    public Optional<Client> findActiveById(String id) {
        return find("id", id).firstResultOptional();
    }
}
