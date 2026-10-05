package com.empresa.serviciofraude.resource;

import com.empresa.serviciofraude.dto.ErrorResponse;
import jakarta.ws.rs.WebApplicationException;
import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.core.UriInfo;
import org.jboss.resteasy.reactive.server.ServerExceptionMapper;
import java.time.Instant;

public class GlobalExceptionMapper {

    @ServerExceptionMapper
    public Response handleWebApplicationException(WebApplicationException ex, UriInfo uriInfo) {
        ErrorResponse err = new ErrorResponse(
            Instant.now(),
            ex.getResponse().getStatus(),
            "Error HTTP",
            ex.getMessage(),
            uriInfo != null ? uriInfo.getPath() : "/api/v1"
        );
        return Response.status(ex.getResponse().getStatus()).entity(err).build();
    }

    @ServerExceptionMapper
    public Response handleIllegalArgumentException(IllegalArgumentException ex, UriInfo uriInfo) {
        ErrorResponse err = new ErrorResponse(
            Instant.now(),
            Response.Status.CONFLICT.getStatusCode(),
            "Conflicto de Regla de Negocio",
            ex.getMessage(),
            uriInfo != null ? uriInfo.getPath() : "/api/v1"
        );
        return Response.status(Response.Status.CONFLICT).entity(err).build();
    }
}
