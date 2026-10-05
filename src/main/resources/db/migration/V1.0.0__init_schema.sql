CREATE TABLE clientes (
  id VARCHAR(36) PRIMARY KEY,
  tipo_documento VARCHAR(20) NOT NULL,
  numero_documento VARCHAR(50) NOT NULL UNIQUE,
  nombres VARCHAR(150) NOT NULL,
  apellidos VARCHAR(150) NOT NULL,
  email VARCHAR(255),
  telefono VARCHAR(30),
  fecha_alta TIMESTAMP NOT NULL,
  estado VARCHAR(20) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP
);

CREATE TABLE tarjetas (
  id VARCHAR(36) PRIMARY KEY,
  cliente_id VARCHAR(36) NOT NULL,
  numero_tarjeta_enmascarado VARCHAR(20) NOT NULL,
  tipo_tarjeta VARCHAR(20) NOT NULL,
  fecha_vencimiento DATE NOT NULL,
  estado VARCHAR(30) NOT NULL,
  limite_credito DECIMAL(15,2),
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP,
  CONSTRAINT fk_tarjetas_cliente FOREIGN KEY (cliente_id) REFERENCES clientes(id)
);

CREATE TABLE alertas_fraude (
  id VARCHAR(36) PRIMARY KEY,
  cliente_id VARCHAR(36) NOT NULL,
  tarjeta_id VARCHAR(36),
  tipo_alerta VARCHAR(50) NOT NULL,
  descripcion TEXT,
  score_riesgo INT NOT NULL,
  nivel_severidad VARCHAR(20) NOT NULL,
  estado_alerta VARCHAR(30) NOT NULL,
  fecha_evento TIMESTAMP NOT NULL,
  fecha_deteccion TIMESTAMP NOT NULL,
  analista_asignado VARCHAR(100),
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP,
  CONSTRAINT fk_alertas_cliente FOREIGN KEY (cliente_id) REFERENCES clientes(id),
  CONSTRAINT fk_alertas_tarjeta FOREIGN KEY (tarjeta_id) REFERENCES tarjetas(id)
);

CREATE TABLE eventos_transaccionales (
  id VARCHAR(36) PRIMARY KEY,
  alerta_id VARCHAR(36),
  tarjeta_id VARCHAR(36) NOT NULL,
  monto DECIMAL(15,2) NOT NULL,
  moneda VARCHAR(3) NOT NULL,
  pais_origen VARCHAR(3),
  comercio VARCHAR(150),
  codigo_comercio VARCHAR(50),
  intentos_cvv INT,
  intentos_pin INT,
  fecha_transaccion TIMESTAMP NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_eventos_alerta FOREIGN KEY (alerta_id) REFERENCES alertas_fraude(id),
  CONSTRAINT fk_eventos_tarjeta FOREIGN KEY (tarjeta_id) REFERENCES tarjetas(id)
);

CREATE TABLE bloqueos_tarjeta (
  id VARCHAR(36) PRIMARY KEY,
  tarjeta_id VARCHAR(36) NOT NULL,
  alerta_id VARCHAR(36),
  motivo TEXT NOT NULL,
  origen_bloqueo VARCHAR(30) NOT NULL,
  usuario_responsable VARCHAR(100),
  fecha_bloqueo TIMESTAMP NOT NULL,
  tokens_cancelados BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_bloqueos_tarjeta FOREIGN KEY (tarjeta_id) REFERENCES tarjetas(id),
  CONSTRAINT fk_bloqueos_alerta FOREIGN KEY (alerta_id) REFERENCES alertas_fraude(id)
);

CREATE TABLE desbloqueos_tarjeta (
  id VARCHAR(36) PRIMARY KEY,
  tarjeta_id VARCHAR(36) NOT NULL,
  bloqueo_id VARCHAR(36) NOT NULL UNIQUE,
  validacion_2fa_exitosa BOOLEAN NOT NULL,
  token_otp VARCHAR(100),
  justificacion_tecnica TEXT NOT NULL,
  usuario_responsable VARCHAR(100) NOT NULL,
  fecha_desbloqueo TIMESTAMP NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_desbloqueos_tarjeta FOREIGN KEY (tarjeta_id) REFERENCES tarjetas(id),
  CONSTRAINT fk_desbloqueos_bloqueo FOREIGN KEY (bloqueo_id) REFERENCES bloqueos_tarjeta(id)
);

CREATE TABLE auditoria_bitacora (
  id VARCHAR(36) PRIMARY KEY,
  entidad_afectada VARCHAR(50) NOT NULL,
  entidad_id VARCHAR(36) NOT NULL,
  accion VARCHAR(50) NOT NULL,
  usuario_responsable VARCHAR(100) NOT NULL,
  justificacion_tecnica TEXT,
  detalle TEXT,
  timestamp TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE notificaciones (
  id VARCHAR(36) PRIMARY KEY,
  cliente_id VARCHAR(36) NOT NULL,
  tarjeta_id VARCHAR(36),
  bloqueo_id VARCHAR(36),
  canal VARCHAR(30) NOT NULL,
  tipo_evento VARCHAR(50) NOT NULL,
  mensaje TEXT NOT NULL,
  estado_envio VARCHAR(20) NOT NULL,
  fecha_envio TIMESTAMP,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_notificaciones_cliente FOREIGN KEY (cliente_id) REFERENCES clientes(id),
  CONSTRAINT fk_notificaciones_tarjeta FOREIGN KEY (tarjeta_id) REFERENCES tarjetas(id),
  CONSTRAINT fk_notificaciones_bloqueo FOREIGN KEY (bloqueo_id) REFERENCES bloqueos_tarjeta(id)
);

CREATE TABLE historial_forense_tarjeta (
  id VARCHAR(36) PRIMARY KEY,
  tarjeta_id VARCHAR(36) NOT NULL,
  estado_anterior VARCHAR(30),
  estado_nuevo VARCHAR(30) NOT NULL,
  motivo_cambio TEXT NOT NULL,
  usuario_responsable VARCHAR(100) NOT NULL,
  timestamp TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_historial_tarjeta FOREIGN KEY (tarjeta_id) REFERENCES tarjetas(id)
);