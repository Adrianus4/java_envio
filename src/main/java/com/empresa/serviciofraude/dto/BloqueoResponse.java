package com.empresa.serviciofraude.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.*;
import java.math.BigDecimal;
import java.time.Instant;
import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

/**
 * Contrato inmutable Java 21 Record derivado dinámicamente de OpenAPI 3.1
 * Esquema: BloqueoResponse
 */
public record BloqueoResponse(
    String numeroTarjeta,

    String estado,

    Instant fechaBloqueo,

    String motivo,

    String origen,

    Integer tokensCancelados
) {}
