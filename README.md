# SERVICIO-FRAUDE ⚡
> Microservicio autónomo desarrollado con **Quarkus 3.15 LTS** y **Java 21**.
> Equipo responsable: **fraude** | Grupo: `com.empresa.serviciofraude`

---

## 📋 Resumen del Microservicio
Microservicio de misión crítica para la detección de sospecha de fraude, evaluación de riesgo transaccional y bloqueo preventivo de tarjetas de crédito.
Debe soportar:
1. Registro y evaluación de alertas de fraude: recepción de eventos transaccionales sospechosos (monto anómalo, transacciones simultáneas en países distintos, intentos fallidos consecutivos de CVV/PIN o comercios de alto riesgo) asignando un score de riesgo de 0 a 100 y nivel de severidad (BAJO, MEDIO, ALTO, CRÍTICO).
2. Consulta de clientes con sospecha de fraude: listar clientes y tarjetas bajo investigación filtrando por nivel de riesgo, rango de fechas y estado de la alerta (PENDIENTE_REVISION, CONFIRMADO_FRAUDE, FALSO_POSITIVO).
3. Bloqueo inmediato de tarjeta: endpoint para ejecutar el bloqueo preventivo en tiempo real de la tarjeta de crédito, pasando su estado a BLOQUEADA_POR_FRAUDE, registrando el motivo, origen del bloqueo (Motor Automático de Reglas o Analista Antifraude) y cancelando tokens de autorización activos.
4. Flujo de desbloqueo seguro: permitir el desbloqueo de la tarjeta únicamente si el cliente aprueba la validación de identidad con token de doble factor (2FA/OTP), registrando bitácora de auditoría inmutable con timestamp, usuario responsable y justificación técnica.
5. Notificación y auditoría: emisión de eventos de bloqueo para alertar a los canales digitales (App Móvil y Notificaciones Push) y persistencia del historial forense de cada tarjeta.

* **Enfoque de diseño:** Contract-First (OpenAPI 3.1 congelado).
* **Patrón Arquitectónico:** LAYERED.
* **Base de datos:** PostgreSQL.
* **Seguridad:** JWT (SmallRye JWT).
* **Modo de Generación:** Medio.

---

## 🚀 Arranque Rápido en Modo Desarrollo
Para iniciar el microservicio con recarga en caliente (*Live Coding* de Quarkus):

```bash
./mvnw quarkus:dev
```

* **Swagger UI / OpenAPI:** `http://localhost:8080/q/swagger-ui`
* **Quarkus Dev UI:** `http://localhost:8080/q/dev`
* **Health Probes:** `http://localhost:8080/q/health`
* **Métricas Prometheus:** `http://localhost:8080/q/metrics`

---

## 🧪 Ejecución de Pruebas Unitarias e Integración
```bash
./mvnw test
```
