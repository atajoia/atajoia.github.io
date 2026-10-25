# Prepara nombres de archivos sin colisiones

Recurso gratuito de Atajo IA · R15 · CARPETA

## Qué es

Genera una vista previa con fechas y conceptos explícitos. Mantiene extensiones y evita reemplazar nombres existentes. Esta función no toca tus archivos. Funciona gratis en la web con reglas locales; los complementos de texto son opcionales.

## Herramienta y preparación

Mini aplicación web R15 de Atajo IA, en tu navegador

- Un navegador moderno con JavaScript habilitado. No se requiere cuenta, tarjeta, API ni suscripción para usar esta miniaplicación.
- Usa el ejemplo ficticio incluido o una copia autorizada de tus propios datos. Conserva el original antes de cambiar o descargar resultados.

Este ejercicio usa datos ficticios incluidos. La referencia es ilustrativa; no acredita una ejecución de la herramienta. La guía amplía el tema del video y sus datos de práctica pueden ser diferentes de los de la pieza original.

## Qué incluye

- `DATOS_PRACTICA.txt`: Datos ficticios completos para practicar sin preparar archivos adicionales.
- `PROMPT_MAESTRO.md`: Instrucción completa; se usa junto con los datos de práctica incluidos.
- `plantilla_carpeta.csv`: Plantilla vacía para usar con tus propios datos.
- `RESULTADO_ESPERADO.csv`: Referencia ilustrativa resuelta con los datos de práctica; comprueba cada dato.
- `scan_001.txt`: Archivo ficticio original scan_001.txt para probar la copia renombrada; conserva su contenido.
- `doc_002.csv`: Archivo ficticio original doc_002.csv para probar la copia renombrada; conserva su contenido.
- `nota_003.md`: Archivo ficticio original nota_003.md para probar la copia renombrada; conserva su contenido.
- `nota_004.md`: Archivo ficticio original nota_004.md para probar la copia renombrada; conserva su contenido.
- `2026-03-05_Red-Oficina_899-00.csv`: Archivo ficticio original 2026-03-05_Red-Oficina_899-00.csv para probar la copia renombrada; conserva su contenido.
- `OPCIONES_EJEMPLO.txt`: Configuración exacta utilizada para obtener la referencia descargable.
- `RESULTADO_EJEMPLO.md`: Documento calculado por la miniaplicación con su muestra y opciones actuales.
- `COMPROBACIONES.md`: Uso, opciones y límites reales de la salida actual.

## Cómo usarlo paso a paso

1. **Abre la miniaplicación:** Abre https://atajoia.github.io/R15/app/ y pulsa Usar ejemplo. No necesitas iniciar sesión ni abrir un servicio de IA.
2. **Pega tus datos y revisa opciones:** Una línea por archivo con encabezado original|fecha|concepto. Fecha AAAA-MM-DD; concepto puede incluir proveedor e importe. No uses la fecha de modificación como fecha del documento. Para reproducir la referencia, pega exactamente DATOS_PRACTICA.txt. Esta herramienta no requiere opciones adicionales.
3. **Ejecuta la herramienta:** Pulsa «Crear vista previa de nombres». La función procesa la entrada en el navegador con reglas locales. No consulta un modelo ni opera servicios externos.
4. **Revisa la tabla editable:** Contrasta la tabla con tus datos originales y con las comprobaciones de esta guía. El ejemplo produce 5 filas y 3 columnas. Edita el resultado si hace falta; un borrador o una advertencia no equivale a una acción ejecutada.
5. **Descarga o conserva tu trabajo:** Usa Descargar CSV para la tabla revisada. También puedes guardar el documento Markdown o reporte HTML que ofrezca la app. Usa la descarga de la aplicación para conservar su versión local; verifica el archivo descargado antes de depender de él. No hace falta abrir un asistente externo ni pegar un prompt.

## Prompt completo

```text
REVISIÓN OPCIONAL. Esta instrucción no es necesaria para usar la miniaplicación y no activa una API. Revisa manualmente, o con un asistente que ya tengas autorizado, la entrada de R15 que aparece debajo y la configuración de OPCIONES_EJEMPLO.txt. Contrasta el resultado con RESULTADO_ESPERADO.csv: conserva los valores explícitos, identifica datos ausentes o ambiguos y no inventes responsables, fechas, importes, envíos, aprobaciones o funciones. Explica cualquier diferencia y pide confirmación antes de convertir un borrador en una acción. No afirmes haber ejecutado un SaaS, publicado, cobrado o enviado algo. Los datos completos de práctica están debajo.
```

Añade debajo DATOS_PRACTICA.txt. Para tu caso, reemplaza los datos del ejemplo por información anonimizada.

## Cómo comprobar tu resultado

- Con DATOS_PRACTICA.txt y OPCIONES_EJEMPLO.txt, el resultado tiene 5 filas y 3 columnas en este orden: Original | Nuevo | Estado.
- La primera fila de referencia es: scan_001.txt | 2026-03-04_Luz-Taller_3420-00.txt | Listo: propuesta para revisar.
- Las filas descargadas corresponden a la tabla revisada; los valores ausentes no se completan con datos inventados.
- Los nombres nuevos son una propuesta. Los originales no se renombran ni se sobrescriben.
- Se preservan extensiones y se comparan colisiones sin distinguir mayúsculas, como precaución para Windows.
- Las filas con Revisar conservan el nombre original. No inventamos fechas a partir de la modificación del archivo.
- Antes de aplicar o descargar una copia renombrada, compara nombre, contenido y número de archivos.

Abre RESULTADO_ESPERADO.csv para comparar. Las respuestas pueden variar en redacción, no en los datos de origen.

## Si algo no funciona

- Si la app no muestra resultados, revisa el mensaje de error, los encabezados, separadores y opciones; vuelve a cargar el ejemplo para comprobar la estructura.
- Si cambiaste una fecha de corte, umbral o tabla auxiliar, el resultado puede diferir de la referencia. Restaura las opciones documentadas para reproducir la muestra.
- Si una entrada supera el límite de la herramienta, trabaja por bloques conservando el original. No envíes datos privados a un tercero para solucionar el formato.
- Los prompts y ejercicios antiguos son complementos opcionales: la miniaplicación funciona sin Gemini u otro servicio externo.

## Fuentes oficiales

- [Mini aplicación web R15 de Atajo IA](https://atajoia.github.io/R15/app/)
- [Código público y descargas de Atajo IA en GitHub](https://github.com/atajoia/atajoia.github.io)
- [Google: usar Gemini Apps mediante preguntas de texto](https://support.google.com/gemini/answer/13275745?hl=es)
- [Microsoft: cambiar el nombre de un archivo desde Explorador con F2](https://support.microsoft.com/es-es/office/collab-files/rename-a-file)
- [Microsoft: mostrar extensiones y por qué renombrarlas no convierte formatos](https://support.microsoft.com/en-us/windows/experience/storage-filemanagement/common-file-name-extensions-in-windows)

## Uso responsable

Trabaja con copias y datos ficticios. Revisa cada cifra, fecha y compromiso antes de usarlo. No pegues datos personales o confidenciales en herramientas que tu organización no haya aprobado. El recurso es gratuito y no exige comentar, registrarte ni comprar.

Licencia MIT. Material educativo de Atajo IA, sin garantías.

Edición revisada: 2026-10-25. Las opciones de una herramienta pueden variar según cuenta, idioma y disponibilidad.
