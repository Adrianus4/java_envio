package com.empresa.serviciofraude.repository;

import com.empresa.serviciofraude.model.EventosTransaccional;
import io.quarkus.hibernate.orm.panache.PanacheRepositoryBase;
import jakarta.enterprise.context.ApplicationScoped;
import java.util.List;
import java.util.Optional;
import java.util.Objects;

@ApplicationScoped
public class EventosTransaccionalRepository implements PanacheRepositoryBase<EventosTransaccional, String> {

    public List<EventosTransaccional> findByStatus(String status) {
        return list("estado", status);
    }

    public Optional<EventosTransaccional> findActiveById(String id) {
        return find("id", id).firstResultOptional();
    }
}
