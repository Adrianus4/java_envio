package com.empresa.serviciofraude.model;

import io.quarkus.hibernate.orm.panache.PanacheEntityBase;
import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.Instant;
import java.time.LocalDate;
import java.util.UUID;

/**
 * Entidad de persistencia Panache Active Record / JPA.
 * Tabla: bloqueos_tarjeta
 * Microservicio: servicio-fraude
 */
@Entity
@Table(name = "bloqueos_tarjeta")
public class BloqueosTarjeta extends PanacheEntityBase {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "id", updatable = false, nullable = false)
    public String id;

    @Column(nullable = false)
    public String tarjetaId;

    @Column
    public String alertaId;

    @Column(nullable = false)
    public String motivo;

    @Column(nullable = false)
    public String origenBloqueo;

    @Column
    public String usuarioResponsable;

    @Column(nullable = false)
    public Instant fechaBloqueo;

    @Column(nullable = false)
    public Boolean tokensCancelado;

    @Column(nullable = false)
    public Instant createdAt;

    public BloqueosTarjeta() {}
}
