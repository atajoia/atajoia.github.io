# Organizador y Renombrador de Archivos por Lote

Recurso gratuito de **Atajo IA** que acompaña al reel **R15 · Renombra Decenas de Archivos en un Clic** (palabra clave: CARPETA).

> **Material educativo.** Úsalo como borrador: revisa cada resultado antes de usarlo o compartirlo. No sustituye la revisión de una persona ni la asesoría profesional.

## Qué es

Este recurso ayuda a profesionistas y dueños de negocio a renombrar decenas de comprobantes o documentos con nombres genéricos usando un formato estándar. Incluye el prompt para asistentes de IA con análisis de archivos y un script local en Python para aplicar cambios desde tu computadora. Todo resultado es un borrador que no garantiza exactitud total y requiere revisión humana antes de archivar.

## Qué incluye

- `README.md`: Guía: qué es, cómo usarlo paso a paso, requisitos y privacidad.
- `PROMPT_MAESTRO.md`: Prompts listos para copiar en tu asistente de IA.
- `plantilla_carpeta.csv`: Plantilla con las columnas de la demo (ARCHIVO ORIGINAL, NUEVO NOMBRE, MONTO, ESTADO); las filas EJEMPLO son ilustrativas: bórralas y pega tus datos.
- `renombrar_lote.py`: Lee el archivo CSV de control validado y crea copias de tus archivos con los nuevos nombres en una carpeta nueva, sin borrar ni modificar tus originales.

## Requisitos

- Carpeta con los documentos a ordenar (PDFs o imágenes).
- Excel o Google Sheets para abrir y validar la plantilla CSV de control.
- Para el script (opcional): Python 3.10 o superior.

## Cómo usarlo paso a paso

1. Reúne en una carpeta los archivos con nombres genéricos y verifica que no contengan datos sensibles prohibidos por las políticas de tu organización.
2. Comprime la carpeta en un archivo .zip si vas a utilizar el asistente de IA.
3. Abre el archivo PROMPT_MAESTRO.md, copia el texto y pégalo en tu asistente de IA junto con tu archivo .zip adjunto.
4. Solicita a la IA que genere primero la tabla de control con las columnas de la plantilla CSV para revisar las propuestas de nombres.
5. Descarga o copia la tabla en la plantilla CSV y revisa manualmente que las fechas, proveedores y montos coincidan con los documentos originales, prestando especial atención a los marcados con duda.
6. Descarga el archivo .zip con los documentos renombrados desde el asistente, o bien, usa el script local de Python incluido para generar copias con los nuevos nombres en tu computadora a partir del CSV validado.

## Script de Python (opcional)

`renombrar_lote.py`: Lee el archivo CSV de control validado y crea copias de tus archivos con los nuevos nombres en una carpeta nueva, sin borrar ni modificar tus originales.

```bash
python renombrar_lote.py --carpeta ./descargas_marzo --csv plantilla_control.csv --salida ./archivos_ordenados
```

El script se ejecuta en tu computadora, no se conecta a internet y no borra archivos. Pruébalo primero con una copia de tus archivos y revisa el resultado.

## Privacidad y advertencias

- Anonimiza datos personales y confidenciales antes de usar cualquier herramienta de IA.
- Verifica cifras, nombres, fechas y compromisos contra la fuente original.
- Revisa el resultado antes de compartirlo: es un borrador, no una respuesta final.
- No subas estados de cuenta completos, contratos confidenciales ni identificaciones oficiales a herramientas de IA públicas; usa solo plataformas aprobadas por tu empresa o procesa los archivos localmente.
- El reconocimiento de texto en fotos o escaneos chuecos puede confundir números o fechas; revisa siempre la tabla de control contra los comprobantes originales antes de usar los montos para contabilidad.
- Mantén siempre una copia de respaldo de tu carpeta original intacta antes de ejecutar cualquier cambio de nombres en lote.
- No subas documentos con datos personales, financieros o confidenciales a herramientas de IA que tu organización no haya aprobado.

## Licencia

Licencia sugerida: **MIT**. Puedes usar, copiar, modificar y compartir este material, incluso con fines comerciales, siempre que conserves este aviso. Se entrega "tal cual", sin garantías de ningún tipo: es material educativo de Atajo IA y no constituye asesoría profesional.

_Borrador preparado con ayuda de IA el 2026-10-19. Revísalo antes de usarlo._
