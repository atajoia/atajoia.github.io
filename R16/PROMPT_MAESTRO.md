# Prompt maestro · De Chat de WhatsApp a Tabla de Acuerdos y Seguimiento

Recurso de Atajo IA para el reel R16. Copia cada bloque en el asistente de IA que tu organización permita usar, reemplaza los [MARCADORES] y revisa el resultado antes de usarlo.

## 1. Prompt principal

```text
Actúa como un asistente de gestión de proyectos. Voy a entregarte el historial exportado de un chat de WhatsApp de entre [FECHA INICIAL] y [FECHA FINAL].

Tu tarea es filtrar saludos, bromas y mensajes irrelevantes para extraer únicamente los acuerdos, entregas o pagos comprometidos.

Reglas estrictas:
1. Si un acuerdo cambia más adelante en la conversación, conserva solo la versión más reciente y vigente.
2. Si mencionan fechas relativas como 'mañana', 'este viernes' o 'la próxima semana', calcula la fecha exacta del calendario tomando como referencia la fecha y hora del mensaje donde se dijo.
3. Si algún dato no se menciona explícitamente en el chat, escribe 'Por definir' en lugar de inventarlo.
4. Entrega el resultado únicamente en una tabla con estas 4 columnas exactas: ACUERDO | RESPONSABLE | FECHA LÍMITE | MONTO.

Aquí está el historial del chat:
[PEGA AQUÍ EL TEXTO DEL CHAT ANONIMIZADO]
```

## 2. Redactar mensaje de confirmación

Cuándo usarlo: Úsalo cuando ya hayas revisado y corregido tu tabla y quieras enviarla al grupo para cerrar filas.

```text
Con base en esta tabla de acuerdos ya validada:
[PEGA AQUÍ TU TABLA REVISADA]

Redacta un mensaje breve, cordial y directo en español de México para enviarlo por WhatsApp a [NOMBRE DEL CLIENTE O EQUIPO]. El objetivo es resumir los compromisos pendientes, responsables y fechas para que todos confirmen de enterado hoy mismo.
```

## 3. Convertir tabla a formato CSV

Cuándo usarlo: Úsalo si quieres copiar y pegar los datos directamente en la plantilla CSV sin que se desacomoden las columnas.

```text
Toma la tabla de acuerdos anterior y conviértela a formato CSV puro separado por comas. Usa exactamente los encabezados: ACUERDO,RESPONSABLE,FECHA LÍMITE,MONTO. Pon entre comillas dobles los textos que contengan comas para que no se rompan las columnas al abrirlo en Excel.
```

## Antes de usar el resultado

- Anonimiza datos personales y confidenciales antes de usar cualquier herramienta de IA.
- Verifica cifras, nombres, fechas y compromisos contra la fuente original.
- Revisa el resultado antes de compartirlo: es un borrador, no una respuesta final.
