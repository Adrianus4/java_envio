package com.empresa.serviciofraude.model;

import io.quarkus.hibernate.orm.panache.PanacheEntityBase;
import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.Instant;
import java.time.LocalDate;
import java.util.UUID;

/**
 * Entidad de persistencia Panache Active Record / JPA.
 * Tabla: desbloqueos_tarjeta
 * Microservicio: servicio-fraude
 */
@Entity
@Table(name = "desbloqueos_tarjeta")
public class DesbloqueosTarjeta extends PanacheEntityBase {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "id", updatable = false, nullable = false)
    public String id;

    @Column(nullable = false)
    public String tarjetaId;

    @Column(nullable = false)
    public String bloqueoId;

    @Column(nullable = false)
    public Boolean validacion2faExitosa;

    @Column
    public String tokenOtp;

    @Column(nullable = false)
    public String justificacionTecnica;

    @Column(nullable = false)
    public String usuarioResponsable;

    @Column(nullable = false)
    public Instant fechaDesbloqueo;

    @Column(nullable = false)
    public Instant createdAt;

    public DesbloqueosTarjeta() {}
}
