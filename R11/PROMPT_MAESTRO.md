# Prompt maestro · De Audios Eternos a Tabla de Tareas Accionables

Recurso de Atajo IA para el reel R11. Copia cada bloque en el asistente de IA que tu organización permita usar, reemplaza los [MARCADORES] y revisa el resultado antes de usarlo.

## 1. Prompt principal

```text
Actúa como un asistente de operaciones y gestión de proyectos. Voy a proporcionarte el contenido de una nota de voz de [ORIGEN DEL AUDIO: EJ. CLIENTE / DIRECCIÓN / PROVEEDOR] relacionada con [NOMBRE DEL PROYECTO O ÁREA]. Tu objetivo es limpiar las muletillas, rodeos y repeticiones para extraer únicamente los acuerdos y tareas accionables. Organiza la información en una tabla con estas 4 columnas exactas: TAREA CLAVE, RESPONSABLE, IMPACTO, ENTREGA. Reglas: 1) En TAREA CLAVE, escribe la acción concreta iniciando con un verbo en infinitivo. 2) En RESPONSABLE, indica el área o rol mencionado; si no se especifica, escribe 'Por definir'. 3) En IMPACTO, anota el monto, presupuesto o relevancia operativa mencionada; si no existe, escribe 'No especificado'. 4) En ENTREGA, coloca el plazo o fecha límite; si es ambiguo, pon 'Por confirmar'. 5) Si hay fragmentos ininteligibles por ruido o falta de contexto, indícalo debajo de la tabla en una lista de 'Puntos por aclarar'. Aquí está el material a procesar: [ADJUNTAR ARCHIVO DE AUDIO O PEGAR TRANSCRIPCIÓN]
```

## 2. Detectar contradicciones y cambios de opinión

Cuándo usarlo: Úsalo cuando la persona que habla cambia de idea varias veces durante la misma nota de voz.

```text
Revisa de nuevo el audio o transcripción de [ORIGEN DEL AUDIO] sobre [TEMA]. Identifica todos los puntos donde la persona dio una instrucción inicial y luego se corrigió o cambió de opinión más adelante en el mensaje. Haz una lista breve con: 1) Qué dijo al principio, 2) Cuál fue la instrucción final que debemos tomar como válida, y 3) Qué duda queda pendiente de confirmar con [NOMBRE O ROL DE QUIEN ENVÍA EL AUDIO].
```

## 3. Redactar mensaje de confirmación rápida

Cuándo usarlo: Úsalo después de revisar tu tabla para validar por escrito los acuerdos con quien envió el audio.

```text
Con base en esta tabla de tareas ya revisada: [PEGAR TABLA REVISADA], redacta un mensaje breve, cordial y directo para enviar por chat a [NOMBRE O ROL DEL REMITENTE]. El objetivo es confirmar que entendimos bien sus instrucciones del audio. Estructura el mensaje con un saludo breve, la lista de puntos clave con su fecha de entrega e impacto, y una pregunta final para que confirme si todo es correcto antes de ejecutar.
```

## 4. Convertir tabla a formato CSV limpio

Cuándo usarlo: Úsalo cuando quieras pasar el resultado directo a tu plantilla de Excel sin perder tiempo con el formato.

```text
Toma la tabla de tareas anterior sobre [NOMBRE DEL PROYECTO] y conviértela a formato CSV puro separado por comas, usando exactamente los encabezados: TAREA CLAVE,RESPONSABLE,IMPACTO,ENTREGA. Si algún monto en IMPACTO tiene comas de miles, colócalo entre comillas dobles para no romper las columnas. Entrega únicamente el bloque de texto CSV listo para copiar.
```

## Antes de usar el resultado

- Anonimiza datos personales y confidenciales antes de usar cualquier herramienta de IA.
- Verifica cifras, nombres, fechas y compromisos contra la fuente original.
- Revisa el resultado antes de compartirlo: es un borrador, no una respuesta final.
