package com.empresa.serviciofraude.model;

import io.quarkus.hibernate.orm.panache.PanacheEntityBase;
import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.Instant;
import java.time.LocalDate;
import java.util.UUID;

/**
 * Entidad de persistencia Panache Active Record / JPA.
 * Tabla: clientes
 * Microservicio: servicio-fraude
 */
@Entity
@Table(name = "clientes")
public class Client extends PanacheEntityBase {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "id", updatable = false, nullable = false)
    public String id;

    @Column(nullable = false)
    public String tipoDocumento;

    @Column(nullable = false)
    public String numeroDocumento;

    @Column(nullable = false)
    public String nombr;

    @Column(nullable = false)
    public String apellido;

    @Column
    public String email;

    @Column
    public String telefono;

    @Column(nullable = false)
    public Instant fechaAlta;

    @Column(nullable = false)
    public String estado;

    @Column(nullable = false)
    public Instant createdAt;

    @Column
    public Instant updatedAt;

    public Client() {}
}
