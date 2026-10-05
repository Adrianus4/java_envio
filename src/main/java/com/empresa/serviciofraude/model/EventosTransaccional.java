package com.empresa.serviciofraude.model;

import io.quarkus.hibernate.orm.panache.PanacheEntityBase;
import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.Instant;
import java.time.LocalDate;
import java.util.UUID;

/**
 * Entidad de persistencia Panache Active Record / JPA.
 * Tabla: eventos_transaccionales
 * Microservicio: servicio-fraude
 */
@Entity
@Table(name = "eventos_transaccionales")
public class EventosTransaccional extends PanacheEntityBase {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "id", updatable = false, nullable = false)
    public String id;

    @Column
    public String alertaId;

    @Column(nullable = false)
    public String tarjetaId;

    @Column(nullable = false)
    public BigDecimal monto;

    @Column(nullable = false)
    public String moneda;

    @Column
    public String paisOrigen;

    @Column
    public String comercio;

    @Column
    public String codigoComercio;

    @Column
    public Integer intentosCvv;

    @Column
    public Integer intentosPin;

    @Column(nullable = false)
    public Instant fechaTransaccion;

    @Column(nullable = false)
    public Instant createdAt;

    public EventosTransaccional() {}
}
