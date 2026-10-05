package com.empresa.serviciofraude.repository;

import com.empresa.serviciofraude.model.AlertasFraude;
import io.quarkus.hibernate.orm.panache.PanacheRepositoryBase;
import jakarta.enterprise.context.ApplicationScoped;
import java.util.List;
import java.util.Optional;
import java.util.Objects;

@ApplicationScoped
public class AlertasFraudeRepository implements PanacheRepositoryBase<AlertasFraude, String> {

    public List<AlertasFraude> findByStatus(String status) {
        return list("estado", status);
    }

    public Optional<AlertasFraude> findActiveById(String id) {
        return find("id", id).firstResultOptional();
    }
}
