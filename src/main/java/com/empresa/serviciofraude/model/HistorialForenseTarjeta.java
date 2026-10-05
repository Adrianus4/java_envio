package com.empresa.serviciofraude.model;

import io.quarkus.hibernate.orm.panache.PanacheEntityBase;
import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.Instant;
import java.time.LocalDate;
import java.util.UUID;

/**
 * Entidad de persistencia Panache Active Record / JPA.
 * Tabla: historial_forense_tarjeta
 * Microservicio: servicio-fraude
 */
@Entity
@Table(name = "historial_forense_tarjeta")
public class HistorialForenseTarjeta extends PanacheEntityBase {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "id", updatable = false, nullable = false)
    public String id;

    @Column(nullable = false)
    public String tarjetaId;

    @Column
    public String estadoAnterior;

    @Column(nullable = false)
    public String estadoNuevo;

    @Column(nullable = false)
    public String motivoCambio;

    @Column(nullable = false)
    public String usuarioResponsable;

    @Column(nullable = false)
    public Instant timestamp;

    public HistorialForenseTarjeta() {}
}
