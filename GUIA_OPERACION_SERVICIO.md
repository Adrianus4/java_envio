# 🛠️ Guía de Operación y Puesta en Producción (servicio-fraude)

## Variables de Entorno Clave
* `QUARKUS_HTTP_PORT`: Puerto HTTP (por defecto `8080`).
* `QUARKUS_DATASOURCE_JDBC_URL`: Cadena de conexión a base de datos.
* `QUARKUS_DATASOURCE_USERNAME`: Usuario de BD.
* `QUARKUS_DATASOURCE_PASSWORD`: Contraseña de BD.

## Despliegue en Kubernetes / Docker
```bash
# Construir imagen Docker JVM
docker build -f src/main/docker/Dockerfile.jvm -t servicio-fraude:latest .

# Ejecutar localmente
docker run -i --rm -p 8080:8080 servicio-fraude:latest
```
