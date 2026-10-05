package com.empresa.serviciofraude.model;

import io.quarkus.hibernate.orm.panache.PanacheEntityBase;
import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.Instant;
import java.time.LocalDate;
import java.util.UUID;

/**
 * Entidad de persistencia Panache Active Record / JPA.
 * Tabla: auditoria_bitacora
 * Microservicio: servicio-fraude
 */
@Entity
@Table(name = "auditoria_bitacora")
public class AuditoriaBitacora extends PanacheEntityBase {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "id", updatable = false, nullable = false)
    public String id;

    @Column(nullable = false)
    public String entidadAfectada;

    @Column(nullable = false)
    public String entidadId;

    @Column(nullable = false)
    public String accion;

    @Column(nullable = false)
    public String usuarioResponsable;

    @Column
    public String justificacionTecnica;

    @Column
    public String detalle;

    @Column(nullable = false)
    public Instant timestamp;

    public AuditoriaBitacora() {}
}
