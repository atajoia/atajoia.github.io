# Prompt maestro · Organizador y Renombrador de Archivos por Lote

Recurso de Atajo IA para el reel R15. Copia cada bloque en el asistente de IA que tu organización permita usar, reemplaza los [MARCADORES] y revisa el resultado antes de usarlo.

## 1. Prompt principal

```text
Actúa como un asistente administrativo encargado de organizar archivos. Te adjunto un archivo ZIP que contiene comprobantes, recibos y documentos con nombres genéricos.

Tu tarea es inspeccionar el contenido de cada archivo para identificar:
1. Fecha del documento (en formato [FORMATO DE FECHA, EJ: AAAA-MM]).
2. Nombre corto del emisor o proveedor (sin espacios, usando guiones bajos).
3. Concepto breve (1 o 2 palabras, ej. Luz, Renta, Internet).
4. Monto total del documento.

Reglas de renombrado:
- Asigna a cada archivo el formato: [ESTRUCTURA DE NOMBRE, EJ: FECHA_PROVEEDOR_CONCEPTO] conservando siempre su extensión original (.pdf, .jpg, .png). No conviertas imágenes a PDF ni cambies el tipo de archivo.
- Si un archivo es una foto borrosa, un escaneo difícil de leer o te falta algún dato clave, no inventes la información: agrega el prefijo REVISION_ al nuevo nombre y márcalo en el estado.

Entregables:
1. Muestra primero una tabla de control con las columnas exactas: ARCHIVO ORIGINAL, NUEVO NOMBRE, MONTO, ESTADO (usa los valores RENOMBRADO o CON DUDA).
2. Genera un nuevo archivo ZIP descargable con copias de los archivos ya renombrados.
```

## 2. Extraer solo el texto de archivos con duda

Cuándo usarlo: Úsalo cuando la IA marque varios archivos como CON DUDA y quieras revisarlos rápido sin abrir uno por uno.

```text
De los archivos que marcaste con el estado CON DUDA en la tabla anterior, muéstrame todo el texto que sí lograste leer de cada uno y dime exactamente qué dato (fecha, proveedor o monto) no pudiste identificar con claridad para que yo te indique el nombre correcto: [LISTA DE ARCHIVOS CON DUDA].
```

## 3. Estandarizar nombres de proveedores

Cuándo usarlo: Úsalo antes o después del proceso si un mismo proveedor aparece escrito de distintas formas en los recibos.

```text
Aplica este catálogo de nombres estándar al renombrar los archivos. Si detectas alguna de las razones sociales de la izquierda dentro del documento, usa siempre el nombre corto de la derecha para el archivo:
[RAZÓN SOCIAL COMPLETA 1] = [NOMBRE CORTO 1]
[RAZÓN SOCIAL COMPLETA 2] = [NOMBRE CORTO 2]
Actualiza la tabla de control y el archivo ZIP con esta regla.
```

## 4. Generar CSV para el script local

Cuándo usarlo: Úsalo si prefieres que la IA solo arme la lista de nombres y tú ejecutes el cambio en tu computadora con el script de Python.

```text
Con base en la tabla de control que revisamos y corregimos, genera un archivo descargable en formato CSV codificado en UTF-8 que contenga exactamente los encabezados: ARCHIVO ORIGINAL, NUEVO NOMBRE, MONTO, ESTADO. Asegúrate de no cambiar las extensiones originales de los archivos.
```

## Antes de usar el resultado

- Anonimiza datos personales y confidenciales antes de usar cualquier herramienta de IA.
- Verifica cifras, nombres, fechas y compromisos contra la fuente original.
- Revisa el resultado antes de compartirlo: es un borrador, no una respuesta final.
