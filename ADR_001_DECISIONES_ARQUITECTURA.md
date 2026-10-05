# ADR-001: Decisiones de Arquitectura para servicio-fraude

## Estado
**APROBADO** por fraude y el Agente Arquitecto.

## Contexto
El microservicio `servicio-fraude` requiere implementar las reglas de negocio descritas:
> "Microservicio de misión crítica para la detección de sospecha de fraude, evaluación de riesgo transaccional y bloqueo preventivo de tarjetas de crédito.
Debe soportar:
1. Registro y evaluación de alertas de fraude: recepción de eventos transaccionales sospechosos (monto anómalo, transacciones simultáneas en países distintos, intentos fallidos consecutivos de CVV/PIN o comercios de alto riesgo) asignando un score de riesgo de 0 a 100 y nivel de severidad (BAJO, MEDIO, ALTO, CRÍTICO).
2. Consulta de clientes con sospecha de fraude: listar clientes y tarjetas bajo investigación filtrando por nivel de riesgo, rango de fechas y estado de la alerta (PENDIENTE_REVISION, CONFIRMADO_FRAUDE, FALSO_POSITIVO).
3. Bloqueo inmediato de tarjeta: endpoint para ejecutar el bloqueo preventivo en tiempo real de la tarjeta de crédito, pasando su estado a BLOQUEADA_POR_FRAUDE, registrando el motivo, origen del bloqueo (Motor Automático de Reglas o Analista Antifraude) y cancelando tokens de autorización activos.
4. Flujo de desbloqueo seguro: permitir el desbloqueo de la tarjeta únicamente si el cliente aprueba la validación de identidad con token de doble factor (2FA/OTP), registrando bitácora de auditoría inmutable con timestamp, usuario responsable y justificación técnica.
5. Notificación y auditoría: emisión de eventos de bloqueo para alertar a los canales digitales (App Móvil y Notificaciones Push) y persistencia del historial forense de cada tarjeta."

## Decisiones Técnicas
1. **Patrón Arquitectónico:** Se seleccionó el patrón **LAYERED**.
2. **Framework Base:** Quarkus 3.15 LTS (Java 21 LTS) por su optimización para microservicios y soporte nativo GraalVM.
3. **Persistencia:** Quarkus Hibernate ORM con Panache y migraciones automáticas con Flyway.
4. **Motor de Datos:** PostgreSQL.
5. **Seguridad:** JWT (SmallRye JWT).

## Consecuencias
* Alta mantenibilidad y aislamiento de capas.
* Compatibilidad con despliegues en contenedores Kubernetes de bajo consumo de memoria.
