package com.empresa.serviciofraude.resource;

import io.quarkus.test.junit.QuarkusTest;
import io.restassured.http.ContentType;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import static io.restassured.RestAssured.given;
import static org.hamcrest.Matchers.*;

@QuarkusTest
public class EventosTransaccionalResourceTest {

    @Test
    @DisplayName("GET /api/v1/eventos-transaccionales responde 200 OK con array JSON")
    public void testListAllEndpoint() {
        given()
            .when().get("/api/v1/eventos-transaccionales")
            .then()
            .statusCode(200)
            .contentType(ContentType.JSON);
    }

    @Test
    @DisplayName("GET /api/v1/eventos-transaccionales/salud responde estado de liveness")
    public void testHealthCheck() {
        given()
            .when().get("/q/health")
            .then()
            .statusCode(200)
            .body("status", equalTo("UP"));
    }
}
