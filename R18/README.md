# Comparador de Cotizaciones y Matriz de Decisión de Compras

Recurso gratuito de **Atajo IA** que acompaña al reel **R18 · Comparador de 5 Cotizaciones en 1 Tabla** (palabra clave: COTIZA).

> **Material educativo.** Úsalo como borrador: revisa cada resultado antes de usarlo o compartirlo. No sustituye la revisión de una persona ni la asesoría profesional.

## Qué es

Este recurso ayuda a encargados de compras, administradores y dueños de negocio a organizar y homologar múltiples cotizaciones con distintos formatos y monedas en una sola tabla comparativa. Genera un borrador estructurado para facilitar la evaluación de proveedores. No sustituye el análisis financiero definitivo ni garantiza exactitud en cálculos o lecturas de documentos complejos, por lo que requiere validación humana antes de autorizar cualquier pago o pedido.

## Qué incluye

- `README.md`: Guía: qué es, cómo usarlo paso a paso, requisitos y privacidad.
- `PROMPT_MAESTRO.md`: Prompts listos para copiar en tu asistente de IA.
- `plantilla_cotiza.csv`: Plantilla con las columnas de la demo (PROVEEDOR, ENTREGA, COSTO NETO, DECISIÓN); las filas EJEMPLO son ilustrativas: bórralas y pega tus datos.
- `extraer_cotizaciones_pdf.py`: Extrae el texto y las tablas de todos los archivos PDF de cotizaciones en una carpeta local y los une en un archivo de texto o Excel para facilitar su revisión y comparación.

## Requisitos

- Acceso a un asistente de IA aprobado por tu organización que permita adjuntar documentos o imágenes
- Excel, Google Sheets o LibreOffice Calc para abrir la plantilla CSV
- Tus cotizaciones en PDF, hoja de cálculo, texto o imagen con datos confidenciales censurados
- Tipo de cambio oficial del día y porcentaje de impuestos aplicable en tu operación
- Para el script (opcional): Python 3.10 o superior y los paquetes `openpyxl pandas pdfplumber`.

## Cómo usarlo paso a paso

1. Reúne las cotizaciones que vas a comparar y oculta datos sensibles como cuentas bancarias, nombres de contactos o descuentos confidenciales.
2. Si tienes tus cotizaciones en archivos PDF digitales, puedes usar el script opcional en Python incluido para extraer sus textos y tablas de forma local antes de usar la IA.
3. Abre el archivo PROMPT_MAESTRO.md, copia el texto y pégalo en tu asistente de IA.
4. Rellena los datos entre corchetes indicando la moneda destino, el tipo de cambio a utilizar, la tasa de IVA y tus criterios de decisión.
5. Adjunta los archivos o pega el texto de las cotizaciones en el chat y envía el mensaje para generar la tabla homologada.
6. Copia las filas generadas por la IA y pégalas dentro de tu plantilla CSV abierta en Excel o Google Sheets.
7. Verifica manualmente cada cifra, tiempo de entrega, flete e impuesto contra los documentos originales de los proveedores antes de tomar una decisión o recabar firmas.

## Script de Python (opcional)

`extraer_cotizaciones_pdf.py`: Extrae el texto y las tablas de todos los archivos PDF de cotizaciones en una carpeta local y los une en un archivo de texto o Excel para facilitar su revisión y comparación.

```bash
pip install openpyxl pandas pdfplumber
python extraer_cotizaciones_pdf.py --carpeta ./mis_cotizaciones --salida resumen_extraido.xlsx
```

El script se ejecuta en tu computadora, no se conecta a internet y no borra archivos. Pruébalo primero con una copia de tus archivos y revisa el resultado.

## Privacidad y advertencias

- Anonimiza datos personales y confidenciales antes de usar cualquier herramienta de IA.
- Verifica cifras, nombres, fechas y compromisos contra la fuente original.
- Revisa el resultado antes de compartirlo: es un borrador, no una respuesta final.
- Antes de subir documentos a cualquier asistente de IA, borra o tacha datos bancarios (CLABE, número de cuenta), RFC, firmas autógrafas, teléfonos personales y domicilios particulares.
- Revisa si tus acuerdos de confidencialidad con proveedores prohíben compartir sus listas de precios en herramientas externas; utiliza únicamente plataformas de IA autorizadas por tu empresa.
- Los modelos de IA pueden cometer errores aritméticos o leer mal números en imágenes borrosas: recalcula siempre en tu hoja de cálculo el IVA, el tipo de cambio y las sumas totales antes de autorizar una compra.
- No subas documentos con datos personales, financieros o confidenciales a herramientas de IA que tu organización no haya aprobado.

## Licencia

Licencia sugerida: **MIT**. Puedes usar, copiar, modificar y compartir este material, incluso con fines comerciales, siempre que conserves este aviso. Se entrega "tal cual", sin garantías de ningún tipo: es material educativo de Atajo IA y no constituye asesoría profesional.

_Borrador preparado con ayuda de IA el 2026-10-19. Revísalo antes de usarlo._
