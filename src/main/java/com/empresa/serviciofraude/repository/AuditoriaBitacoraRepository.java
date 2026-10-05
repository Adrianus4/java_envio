package com.empresa.serviciofraude.repository;

import com.empresa.serviciofraude.model.AuditoriaBitacora;
import io.quarkus.hibernate.orm.panache.PanacheRepositoryBase;
import jakarta.enterprise.context.ApplicationScoped;
import java.util.List;
import java.util.Optional;
import java.util.Objects;

@ApplicationScoped
public class AuditoriaBitacoraRepository implements PanacheRepositoryBase<AuditoriaBitacora, String> {

    public List<AuditoriaBitacora> findByStatus(String status) {
        return list("estado", status);
    }

    public Optional<AuditoriaBitacora> findActiveById(String id) {
        return find("id", id).firstResultOptional();
    }
}
