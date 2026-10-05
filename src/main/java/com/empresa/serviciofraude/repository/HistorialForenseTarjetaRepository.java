package com.empresa.serviciofraude.repository;

import com.empresa.serviciofraude.model.HistorialForenseTarjeta;
import io.quarkus.hibernate.orm.panache.PanacheRepositoryBase;
import jakarta.enterprise.context.ApplicationScoped;
import java.util.List;
import java.util.Optional;
import java.util.Objects;

@ApplicationScoped
public class HistorialForenseTarjetaRepository implements PanacheRepositoryBase<HistorialForenseTarjeta, String> {

    public List<HistorialForenseTarjeta> findByStatus(String status) {
        return list("estado", status);
    }

    public Optional<HistorialForenseTarjeta> findActiveById(String id) {
        return find("id", id).firstResultOptional();
    }
}
