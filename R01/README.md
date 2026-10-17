# PDF a Excel: extracción con revisión

Recurso gratuito de **Atajo IA** que acompaña al reel **R01 · Extractor Mágico de PDFs/Facturas a Excel** (palabra clave: PLANILLA).

> **Material educativo.** Úsalo como borrador: revisa cada resultado antes de usarlo o compartirlo. No sustituye la revisión de una persona ni la asesoría profesional.

## Qué es

Este recurso ayuda a oficinistas y administradores a pasar tablas de facturas o reportes en PDF hacia una hoja de cálculo estructurada para su revisión. Es ideal para evitar la captura manual de renglones desde cero, pero no sustituye la validación contable ni garantiza exactitud automática: todo resultado es un borrador que una persona debe cotejar contra el documento original.

**Para qué sirve:** Convertir tablas de un documento en filas revisables, sin asumir que la extracción quedó correcta.

## Qué incluye

- `README.md`: Guía: qué es, cómo usarlo paso a paso, requisitos y privacidad.
- `PROMPT_MAESTRO.md`: Prompts listos para copiar en tu asistente de IA.
- `plantilla_planilla.csv`: Plantilla con las columnas de la demo (CÓDIGO, CONCEPTO, TOTAL, ESTADO); las filas EJEMPLO son ilustrativas: bórralas y pega tus datos.
- `extraer_tablas_pdf.py`: Extrae tablas de un PDF con texto seleccionable de forma local y las guarda en un archivo Excel para su revisión.

## Requisitos

- Un asistente de IA aprobado por tu organización que permita adjuntar documentos o imágenes.
- Excel, Google Sheets o LibreOffice Calc para abrir y revisar la plantilla CSV.
- Para el script (opcional): Python 3.10 o superior y los paquetes `openpyxl pandas pdfplumber`.

## Cómo usarlo paso a paso

1. Revisa el documento original y oculta o recorta datos sensibles (como RFC, cuentas bancarias o domicilios) si no estás usando una herramienta corporativa autorizada.
2. Abre el archivo PROMPT_MAESTRO.md, copia el prompt principal y reemplaza los corchetes con las páginas a procesar y las columnas: CÓDIGO, CONCEPTO, TOTAL, ESTADO.
3. Adjunta tu PDF (o ejecuta el script local incluido si prefieres no subir archivos a la nube) y genera el bloque de texto en formato CSV.
4. Copia el resultado obtenido y pégalo en la plantilla CSV usando la opción de 'Texto en columnas' separando por comas.
5. Usa los prompts complementarios para limpiar el formato numérico o pedir una lista de renglones dudosos.
6. Compara una muestra de filas y la suma de la columna TOTAL directamente contra el PDF original antes de dar por bueno el archivo.

## Script de Python (opcional)

`extraer_tablas_pdf.py`: Extrae tablas de un PDF con texto seleccionable de forma local y las guarda en un archivo Excel para su revisión.

```bash
pip install openpyxl pandas pdfplumber
python extraer_tablas_pdf.py --entrada Factura_Corporativa_Marzo.pdf --salida Facturas_Marzo_Limpio.xlsx
```

El script se ejecuta en tu computadora, no se conecta a internet y no borra archivos. Pruébalo primero con una copia de tus archivos y revisa el resultado.

## Privacidad y advertencias

- Compara una muestra de filas con el PDF original.
- Revisa fechas, separadores decimales, moneda y totales.
- No cargues facturas o archivos con datos personales o confidenciales en servicios no aprobados.
- No cargues facturas, estados de cuenta o archivos con RFC, nombres o datos confidenciales en servicios de IA públicos o no aprobados por tu organización.
- Compara siempre una muestra de filas y el total general contra el PDF original antes de usar la tabla en reportes o contabilidad.
- Revisa fechas, separadores decimales, tipo de moneda y totales; los modelos pueden confundir comas con puntos o saltar líneas en tablas largas.
- No subas documentos con datos personales, financieros o confidenciales a herramientas de IA que tu organización no haya aprobado.

## Licencia

Licencia sugerida: **MIT**. Puedes usar, copiar, modificar y compartir este material, incluso con fines comerciales, siempre que conserves este aviso. Se entrega "tal cual", sin garantías de ningún tipo: es material educativo de Atajo IA y no constituye asesoría profesional.

_Borrador preparado con ayuda de IA el 2026-10-16. Revísalo antes de usarlo._
