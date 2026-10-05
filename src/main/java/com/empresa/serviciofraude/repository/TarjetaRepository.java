package com.empresa.serviciofraude.repository;

import com.empresa.serviciofraude.model.Tarjeta;
import io.quarkus.hibernate.orm.panache.PanacheRepositoryBase;
import jakarta.enterprise.context.ApplicationScoped;
import java.util.List;
import java.util.Optional;
import java.util.Objects;

@ApplicationScoped
public class TarjetaRepository implements PanacheRepositoryBase<Tarjeta, String> {

    public List<Tarjeta> findByStatus(String status) {
        return list("estado", status);
    }

    public Optional<Tarjeta> findActiveById(String id) {
        return find("id", id).firstResultOptional();
    }
}
