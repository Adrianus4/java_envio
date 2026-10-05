package com.empresa.serviciofraude.resource;

import com.empresa.serviciofraude.dto.*;
import jakarta.validation.Valid;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import org.eclipse.microprofile.openapi.annotations.Operation;
import org.eclipse.microprofile.openapi.annotations.tags.Tag;
import java.util.UUID;

/**
 * Interfaz generada dinámicamente a partir del Contrato OpenAPI 3.1 revisado.
 * Implementa el enfoque Contract-First de Quarkus 3.x.
 */
@Path("/api/v1")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
@Tag(name = "servicio-fraude", description = "Operaciones de servicio-fraude")
public interface ServicioFraudeApi {

        @Path("/alertas")
    @GET
    @Operation(summary = "Listar alertas de fraude")
    Response listarAlertas();
        @Path("/alertas")
    @POST
    @Operation(summary = "Registrar y evaluar alerta de fraude")
    Response registrarAlerta();
        @Path("/alertas/{id}")
    @GET
    @Operation(summary = "Obtener detalle de alerta")
    Response obtenerAlerta();
        @Path("/tarjetas/{numeroTarjeta}/bloqueo")
    @PUT
    @Operation(summary = "Bloquear tarjeta por fraude")
    Response bloquearTarjeta();
        @Path("/tarjetas/{numeroTarjeta}/desbloqueo")
    @PUT
    @Operation(summary = "Desbloquear tarjeta con validación 2FA")
    Response desbloquearTarjeta();
}
