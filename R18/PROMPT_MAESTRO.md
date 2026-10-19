# Prompt maestro · Comparador de Cotizaciones y Matriz de Decisión de Compras

Recurso de Atajo IA para el reel R18. Copia cada bloque en el asistente de IA que tu organización permita usar, reemplaza los [MARCADORES] y revisa el resultado antes de usarlo.

## 1. Prompt principal

```text
Actúa como analista de compras. Voy a compartirte la información de varias cotizaciones de distintos proveedores para adquirir [PRODUCTO O SERVICIO REQUERIDO]. Cada proveedor usa formatos, monedas y condiciones diferentes. Tu tarea es extraer la información, homologar los conceptos equivalentes y calcular el costo neto total puesto en nuestra ubicación en [MONEDA DESTINO, EJ. MXN]. Reglas de cálculo que debes aplicar: 1. Usa un tipo de cambio de [TIPO DE CAMBIO, EJ. 1 USD = X MXN] para convertir otras monedas. 2. Si el precio no incluye IVA, suma el [PORCENTAJE DE IVA, EJ. 16%]. 3. Suma cualquier costo adicional mencionado de flete, envío o seguro al costo neto. 4. Evalúa la mejor opción considerando este criterio principal: [CRITERIO PRINCIPAL, EJ. MENOR COSTO NETO CON ENTREGA MENOR A 10 DÍAS]. Primero, muéstrame el desglose paso a paso de cómo calculaste el costo neto de cada proveedor e indica si algún documento tiene datos faltantes o ambiguos. Después, entrega una tabla resumen con estas 4 columnas exactas: PROVEEDOR | ENTREGA | COSTO NETO | DECISIÓN. En la columna DECISIÓN asigna una etiqueta breve (por ejemplo: MEJOR OPCIÓN, CON FLETE ALTO, DESCARTADO o FALTA INFORMACIÓN) según el criterio indicado. No inventes datos que no estén en los archivos. Aquí están las cotizaciones: [PEGA AQUÍ EL TEXTO DE LAS COTIZACIONES O ADJUNTA LOS ARCHIVOS]
```

## 2. Detectar costos ocultos y condiciones faltantes

Cuándo usarlo: Úsalo antes de elegir un proveedor para identificar omisiones en garantías, fletes o vigencias.

```text
Revisa de nuevo las cotizaciones cargadas para [PRODUCTO O SERVICIO REQUERIDO] y haz una lista por proveedor de los datos críticos que NO están especificados explícitamente: vigencia de la cotización, condiciones de pago, costo de maniobras o flete, tiempo de garantía y penalizaciones por retraso. Redacta 3 preguntas cortas para enviar por correo a cada proveedor y aclarar los puntos faltantes.
```

## 3. Homologar conceptos técnicos con nombres distintos

Cuándo usarlo: Úsalo cuando los proveedores describen el mismo artículo o servicio con nombres comerciales diferentes.

```text
Los proveedores llamaron de forma distinta a las partidas cotizadas. Compara las descripciones técnicas, capacidades, unidades de medida y cantidades contra mi requerimiento base: [PEGA TU LISTA DE REQUERIMIENTOS]. Crea una tabla que muestre qué concepto de cada proveedor corresponde a mi requerimiento y señala con una alerta si alguno cotizó una cantidad menor o una especificación diferente.
```

## 4. Convertir tabla a formato CSV listo para Excel

Cuándo usarlo: Úsalo cuando ya revisaste los cálculos y quieres pasar el resumen limpio a la plantilla descargable.

```text
Toma la tabla resumen de las 4 columnas (PROVEEDOR, ENTREGA, COSTO NETO, DECISIÓN) que ya validamos y entrégala únicamente como un bloque de texto en formato CSV separado por comas, sin texto adicional, para pegarla directamente en mi plantilla de Excel. Usa comillas dobles en los montos para conservar el formato.
```

## Antes de usar el resultado

- Anonimiza datos personales y confidenciales antes de usar cualquier herramienta de IA.
- Verifica cifras, nombres, fechas y compromisos contra la fuente original.
- Revisa el resultado antes de compartirlo: es un borrador, no una respuesta final.
