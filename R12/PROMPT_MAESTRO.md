# Prompt maestro · Generador de Manuales Paso a Paso y Control de Capturas

Recurso de Atajo IA para el reel R12. Copia cada bloque en el asistente de IA que tu organización permita usar, reemplaza los [MARCADORES] y revisa el resultado antes de usarlo.

## 1. Prompt principal

```text
Actúa como especialista en documentación de procesos y capacitación operativa. A continuación te comparto el registro en bruto de los clics y acciones que realicé para completar una tarea en nuestro sistema.

Nombre del proceso: [NOMBRE DEL PROCESO]
Puesto o perfil que usará la guía: [PERFIL DEL USUARIO NUEVO]
Objetivo del procedimiento: [QUÉ SE LOGRA AL TERMINAR]

Registro de acciones y capturas en bruto:
[PEGA AQUÍ LA LISTA DE CLICS, NOTAS O SALIDA DE TU GRABADOR DE PASOS]

Por favor:
1. Transforma cada clic o nota en una instrucción clara, directa y en verbo imperativo (ejemplo: 'Haz clic en...', 'Selecciona...', 'Verifica que...').
2. Si detectas pasos donde normalmente aparecen datos confidenciales (montos, RFC, nombres de clientes, contraseñas), marca la columna PRIVACIDAD como 'CENSURADO (REVISAR)' para que yo verifique el recorte antes de publicar; de lo contrario, coloca 'OK'.
3. Devuelve el resultado únicamente en una tabla con estas cuatro columnas exactas: PASO | ACCIÓN DETECTADA | CAPTURA | PRIVACIDAD.
4. Al final de la tabla, agrega una lista breve de posibles errores comunes que el usuario nuevo debería evitar en este flujo.
```

## 2. Comparador de herramientas de captura para TI

Cuándo usarlo: Úsalo cuando necesites evaluar qué grabador de procesos conviene usar o pedir autorización al área de sistemas.

```text
Actúa como consultor de productividad y seguridad de la información. Necesito elegir un método para capturar procedimientos paso a paso en mi oficina sin comprometer datos sensibles.

Nuestro entorno de trabajo es: [WINDOWS / MAC / NAVEGADOR WEB]
Restricciones de seguridad de mi empresa: [EJEMPLO: NO PODEMOS SUBIR DATOS A LA NUBE / SOLO SOFTWARE INSTALADO EN LOCAL]

Compara en una tabla las opciones típicas por categoría: 1) Grabadora de acciones nativa del sistema operativo, 2) Extensiones de navegador para documentación automática y 3) Captura manual con plantilla CSV. Evalúa para cada categoría: dónde se guardan las imágenes (local o nube), si ofrece difuminado de datos sensibles, nivel de edición posterior y qué preguntas debo hacerle a mi equipo de TI antes de usarla. No inventes precios ni garantices seguridad absoluta.
```

## 3. Auditoría de datos sensibles antes de publicar

Cuándo usarlo: Úsalo antes de exportar el manual a PDF para detectar pantallas donde podrían filtrarse datos confidenciales.

```text
Voy a compartir un manual interno con personal de nuevo ingreso. Revisa esta lista de pasos y dime en cuáles existe riesgo de que la captura de pantalla muestre información confidencial de la empresa, clientes o empleados (como RFC, folios fiscales, sueldos, correos personales, tokens o saldos bancarios).

Lista de pasos del manual:
[PEGA AQUÍ TU TABLA DE PASOS]

Para cada paso con riesgo, indícame exactamente qué elemento visual debo tapar o difuminar en la imagen antes de generar el documento final.
```

## 4. Cuestionario rápido de validación de lectura

Cuándo usarlo: Úsalo cuando quieras comprobar que la persona capacitada comprendió el manual después de leerlo.

```text
Con base en el siguiente manual paso a paso, redacta 5 preguntas prácticas de opción múltiple y una actividad corta de verificación para confirmar que el nuevo integrante del equipo entendió cómo realizar la tarea y qué errores debe evitar.

Manual aprobado:
[PEGA AQUÍ EL TEXTO FINAL DE TU MANUAL]

Incluye al final la clave de respuestas correctas para el supervisor.
```

## Antes de usar el resultado

- Anonimiza datos personales y confidenciales antes de usar cualquier herramienta de IA.
- Verifica cifras, nombres, fechas y compromisos contra la fuente original.
- Revisa el resultado antes de compartirlo: es un borrador, no una respuesta final.
