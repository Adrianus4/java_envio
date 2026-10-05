# 📖 Catálogo de Endpoints de la API (servicio-fraude)
Generado a partir del contrato **OpenAPI 3.1** aprobado por **fraude**.

## Matriz de Operaciones REST

| Método HTTP | Ruta / Endpoint | Descripción / Resumen |
|:-----------:|:----------------|:----------------------|
| `GET` | `/alertas` | Listar alertas de fraude |
| `POST` | `/alertas` | Registrar y evaluar alerta de fraude |
| `GET` | `/alertas/{id}` | Obtener detalle de alerta |
| `PUT` | `/tarjetas/{numeroTarjeta}/bloqueo` | Bloquear tarjeta por fraude |
| `PUT` | `/tarjetas/{numeroTarjeta}/desbloqueo` | Desbloquear tarjeta con validación 2FA |

---

## Observabilidad y Diagnóstico de Fábrica
* **Liveness Probe:** `GET /q/health/live` (Indica si el contenedor está vivo).
* **Readiness Probe:** `GET /q/health/ready` (Valida conexión a base de datos y dependencias).
* **Prometheus Metrics:** `GET /q/metrics` (Métricas de runtime JVM, latencia y throughput).
* **OpenAPI 3.1 Spec:** `GET /q/openapi` (Especificación en JSON/YAML).
