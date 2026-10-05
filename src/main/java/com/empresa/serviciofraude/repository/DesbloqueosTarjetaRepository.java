package com.empresa.serviciofraude.repository;

import com.empresa.serviciofraude.model.DesbloqueosTarjeta;
import io.quarkus.hibernate.orm.panache.PanacheRepositoryBase;
import jakarta.enterprise.context.ApplicationScoped;
import java.util.List;
import java.util.Optional;
import java.util.Objects;

@ApplicationScoped
public class DesbloqueosTarjetaRepository implements PanacheRepositoryBase<DesbloqueosTarjeta, String> {

    public List<DesbloqueosTarjeta> findByStatus(String status) {
        return list("estado", status);
    }

    public Optional<DesbloqueosTarjeta> findActiveById(String id) {
        return find("id", id).firstResultOptional();
    }
}
