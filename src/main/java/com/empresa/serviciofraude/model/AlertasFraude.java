package com.empresa.serviciofraude.model;

import io.quarkus.hibernate.orm.panache.PanacheEntityBase;
import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.Instant;
import java.time.LocalDate;
import java.util.UUID;

/**
 * Entidad de persistencia Panache Active Record / JPA.
 * Tabla: alertas_fraude
 * Microservicio: servicio-fraude
 */
@Entity
@Table(name = "alertas_fraude")
public class AlertasFraude extends PanacheEntityBase {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "id", updatable = false, nullable = false)
    public String id;

    @Column(nullable = false)
    public String clienteId;

    @Column
    public String tarjetaId;

    @Column(nullable = false)
    public String tipoAlerta;

    @Column
    public String descripcion;

    @Column(nullable = false)
    public Integer scoreRiesgo;

    @Column(nullable = false)
    public String nivelSeveridad;

    @Column(nullable = false)
    public String estadoAlerta;

    @Column(nullable = false)
    public Instant fechaEvento;

    @Column(nullable = false)
    public Instant fechaDeteccion;

    @Column
    public String analistaAsignado;

    @Column(nullable = false)
    public Instant createdAt;

    @Column
    public Instant updatedAt;

    public AlertasFraude() {}
}
