package com.empresa.serviciofraude.model;

import io.quarkus.hibernate.orm.panache.PanacheEntityBase;
import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.Instant;
import java.time.LocalDate;
import java.util.UUID;

/**
 * Entidad de persistencia Panache Active Record / JPA.
 * Tabla: notificaciones
 * Microservicio: servicio-fraude
 */
@Entity
@Table(name = "notificaciones")
public class Notificacion extends PanacheEntityBase {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "id", updatable = false, nullable = false)
    public String id;

    @Column(nullable = false)
    public String clienteId;

    @Column
    public String tarjetaId;

    @Column
    public String bloqueoId;

    @Column(nullable = false)
    public String canal;

    @Column(nullable = false)
    public String tipoEvento;

    @Column(nullable = false)
    public String mensaje;

    @Column(nullable = false)
    public String estadoEnvio;

    @Column
    public Instant fechaEnvio;

    @Column(nullable = false)
    public Instant createdAt;

    public Notificacion() {}
}
