package com.empresa.serviciofraude.repository;

import com.empresa.serviciofraude.model.BloqueosTarjeta;
import io.quarkus.hibernate.orm.panache.PanacheRepositoryBase;
import jakarta.enterprise.context.ApplicationScoped;
import java.util.List;
import java.util.Optional;
import java.util.Objects;

@ApplicationScoped
public class BloqueosTarjetaRepository implements PanacheRepositoryBase<BloqueosTarjeta, String> {

    public List<BloqueosTarjeta> findByStatus(String status) {
        return list("estado", status);
    }

    public Optional<BloqueosTarjeta> findActiveById(String id) {
        return find("id", id).firstResultOptional();
    }
}
