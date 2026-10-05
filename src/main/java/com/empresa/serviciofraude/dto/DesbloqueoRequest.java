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
 * Esquema: DesbloqueoRequest
 */
public record DesbloqueoRequest(
    @NotBlank(message = "El campo token2FA no puede estar vacío")
    String token2FA,

    @NotBlank(message = "El campo justificacion no puede estar vacío")
    String justificacion,

    String usuarioResponsable
) {}
