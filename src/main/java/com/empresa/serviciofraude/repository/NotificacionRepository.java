package com.empresa.serviciofraude.repository;

import com.empresa.serviciofraude.model.Notificacion;
import io.quarkus.hibernate.orm.panache.PanacheRepositoryBase;
import jakarta.enterprise.context.ApplicationScoped;
import java.util.List;
import java.util.Optional;
import java.util.Objects;

@ApplicationScoped
public class NotificacionRepository implements PanacheRepositoryBase<Notificacion, String> {

    public List<Notificacion> findByStatus(String status) {
        return list("estado", status);
    }

    public Optional<Notificacion> findActiveById(String id) {
        return find("id", id).firstResultOptional();
    }
}
