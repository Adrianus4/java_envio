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
 * Esquema: AlertaRequest
 */
public record AlertaRequest(
    @NotNull(message = "El UUID clienteId es obligatorio")
    UUID clienteId,

    @NotBlank(message = "El campo numeroTarjeta no puede estar vacío")
    String numeroTarjeta,

    @NotNull(message = "El campo monto es obligatorio")
    BigDecimal monto,

    @NotBlank(message = "El campo moneda no puede estar vacío")
    String moneda,

    @NotNull(message = "El campo fechaTransaccion es obligatorio")
    Instant fechaTransaccion,

    @NotBlank(message = "El campo tipoEvento no puede estar vacío")
    String tipoEvento,

    String pais,

    String comercio
) {}
