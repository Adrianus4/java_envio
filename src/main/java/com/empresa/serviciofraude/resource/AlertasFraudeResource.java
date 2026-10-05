package com.empresa.serviciofraude.resource;

import com.empresa.serviciofraude.model.AlertasFraude;
import com.empresa.serviciofraude.service.AlertasFraudeService;
import jakarta.inject.Inject;
import jakarta.validation.Valid;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import org.eclipse.microprofile.openapi.annotations.Operation;
import org.eclipse.microprofile.openapi.annotations.tags.Tag;
import java.net.URI;
import java.util.List;
import java.util.Objects;

@Path("/api/v1/alertas-fraude")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
@Tag(name = "AlertasFraude", description = "Operaciones CRUD sobre AlertasFraude")
public class AlertasFraudeResource {

    @Inject
    AlertasFraudeService service;

    @GET
    @Operation(summary = "Listar registros paginados")
    public List<AlertasFraude> listAll(
        @QueryParam("page") @DefaultValue("0") int page,
        @QueryParam("size") @DefaultValue("20") int size
    ) {
        return service.listAll(page, size);
    }

    @GET
    @Path("/{id}")
    @Operation(summary = "Obtener por identificador único")
    public AlertasFraude getById(@PathParam("id") String id) {
        return service.getById(id);
    }

    @POST
    @Operation(summary = "Crear nuevo registro")
    public Response create(@Valid AlertasFraude entity) {
        AlertasFraude created = service.create(entity);
        return Response.created(URI.create("/api/v1/alertas-fraude/" + created.id)).entity(created).build();
    }

    @DELETE
    @Path("/{id}")
    @Operation(summary = "Eliminar registro por ID")
    public Response delete(@PathParam("id") String id) {
        service.delete(id);
        return Response.noContent().build();
    }
}
