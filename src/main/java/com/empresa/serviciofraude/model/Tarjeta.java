package com.empresa.serviciofraude.model;

import io.quarkus.hibernate.orm.panache.PanacheEntityBase;
import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.Instant;
import java.time.LocalDate;
import java.util.UUID;

/**
 * Entidad de persistencia Panache Active Record / JPA.
 * Tabla: tarjetas
 * Microservicio: servicio-fraude
 */
@Entity
@Table(name = "tarjetas")
public class Tarjeta extends PanacheEntityBase {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "id", updatable = false, nullable = false)
    public String id;

    @Column(nullable = false)
    public String clienteId;

    @Column(nullable = false)
    public String numeroTarjetaEnmascarado;

    @Column(nullable = false)
    public String tipoTarjeta;

    @Column(nullable = false)
    public LocalDate fechaVencimiento;

    @Column(nullable = false)
    public String estado;

    @Column
    public BigDecimal limiteCredito;

    @Column(nullable = false)
    public Instant createdAt;

    @Column
    public Instant updatedAt;

    public Tarjeta() {}
}
