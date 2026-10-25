# Limpia y revisa una base sin perder registros

Recurso gratuito de Atajo IA · R14 · LIMPIEZA

## Qué es

Normaliza espacios y teléfonos como propuesta, conserva cada fila y señala IDs repetidos o conflictivos. No suma saldos ni decide identidades por nombre. Funciona gratis en la web con reglas locales; los complementos de texto son opcionales.

## Herramienta y preparación

Mini aplicación web R14 de Atajo IA, en tu navegador

- Un navegador moderno con JavaScript habilitado. No se requiere cuenta, tarjeta, API ni suscripción para usar esta miniaplicación.
- Usa el ejemplo ficticio incluido o una copia autorizada de tus propios datos. Conserva el original antes de cambiar o descargar resultados.

Este ejercicio usa datos ficticios incluidos. La referencia es ilustrativa; no acredita una ejecución de la herramienta. La guía amplía el tema del video y sus datos de práctica pueden ser diferentes de los de la pieza original.

## Qué incluye

- `DATOS_PRACTICA.txt`: Datos ficticios completos para practicar sin preparar archivos adicionales.
- `PROMPT_MAESTRO.md`: Instrucción completa; se usa junto con los datos de práctica incluidos.
- `plantilla_limpieza.csv`: Plantilla vacía para usar con tus propios datos.
- `RESULTADO_ESPERADO.csv`: Referencia ilustrativa resuelta con los datos de práctica; comprueba cada dato.
- `OPCIONES_EJEMPLO.txt`: Configuración exacta utilizada para obtener la referencia descargable.
- `RESULTADO_EJEMPLO.md`: Documento calculado por la miniaplicación con su muestra y opciones actuales.
- `COMPROBACIONES.md`: Uso, opciones y límites reales de la salida actual.

## Cómo usarlo paso a paso

1. **Abre la miniaplicación:** Abre https://atajoia.github.io/R14/app/ y pulsa Usar ejemplo. No necesitas iniciar sesión ni abrir un servicio de IA.
2. **Pega tus datos y revisa opciones:** Incluye id_cliente (o id); nombre, teléfono y saldo son opcionales. Hasta 1000 filas. Las columnas originales se conservan. Para reproducir la referencia, pega exactamente DATOS_PRACTICA.txt. Configura los campos con OPCIONES_EJEMPLO.txt; allí se incluyen las opciones y entradas auxiliares completas.
3. **Ejecuta la herramienta:** Pulsa «Revisar y preparar propuesta». La función procesa la entrada en el navegador con reglas locales. No consulta un modelo ni opera servicios externos.
4. **Revisa la tabla editable:** Contrasta la tabla con tus datos originales y con las comprobaciones de esta guía. El ejemplo produce 7 filas y 8 columnas. Edita el resultado si hace falta; un borrador o una advertencia no equivale a una acción ejecutada.
5. **Descarga o conserva tu trabajo:** Usa Descargar CSV para la tabla revisada. También puedes guardar el documento Markdown o reporte HTML que ofrezca la app. Usa la descarga de la aplicación para conservar su versión local; verifica el archivo descargado antes de depender de él. No hace falta abrir un asistente externo ni pegar un prompt.

## Prompt completo

```text
REVISIÓN OPCIONAL. Esta instrucción no es necesaria para usar la miniaplicación y no activa una API. Revisa manualmente, o con un asistente que ya tengas autorizado, la entrada de R14 que aparece debajo y la configuración de OPCIONES_EJEMPLO.txt. Contrasta el resultado con RESULTADO_ESPERADO.csv: conserva los valores explícitos, identifica datos ausentes o ambiguos y no inventes responsables, fechas, importes, envíos, aprobaciones o funciones. Explica cualquier diferencia y pide confirmación antes de convertir un borrador en una acción. No afirmes haber ejecutado un SaaS, publicado, cobrado o enviado algo. Los datos completos de práctica están debajo.
```

Añade debajo DATOS_PRACTICA.txt. Para tu caso, reemplaza los datos del ejemplo por información anonimizada.

## Cómo comprobar tu resultado

- Con DATOS_PRACTICA.txt y OPCIONES_EJEMPLO.txt, el resultado tiene 7 filas y 8 columnas en este orden: Fila de origen | id_cliente | nombre | telefono | saldo | Nombre propuesto | Teléfono propuesto | Revisión.
- La primera fila de referencia es: 1 | C001 |  ana  lopez  | 55 1000 1001 | 1200.00 | ana lopez | 5510001001 | Repetición por ID en filas 1, 3: conservar, no sumar.
- Las filas descargadas corresponden a la tabla revisada; los valores ausentes no se completan con datos inventados.
- Se conservan 7 filas y todas las columnas originales. Las propuestas no sobrescriben los datos.
- Los IDs se comparan después de quitar espacios externos, respetando mayúsculas. Nombres parecidos no prueban identidad.
- No se ha sumado, sustituido ni consolidado ningún saldo. La coincidencia de reglas no certifica que los datos sean correctos.

Abre RESULTADO_ESPERADO.csv para comparar. Las respuestas pueden variar en redacción, no en los datos de origen.

## Si algo no funciona

- Si la app no muestra resultados, revisa el mensaje de error, los encabezados, separadores y opciones; vuelve a cargar el ejemplo para comprobar la estructura.
- Si cambiaste una fecha de corte, umbral o tabla auxiliar, el resultado puede diferir de la referencia. Restaura las opciones documentadas para reproducir la muestra.
- Si una entrada supera el límite de la herramienta, trabaja por bloques conservando el original. No envíes datos privados a un tercero para solucionar el formato.
- Los prompts y ejercicios antiguos son complementos opcionales: la miniaplicación funciona sin Gemini u otro servicio externo.

## Fuentes oficiales

- [Mini aplicación web R14 de Atajo IA](https://atajoia.github.io/R14/app/)
- [Código público y descargas de Atajo IA en GitHub](https://github.com/atajoia/atajoia.github.io)
- [Google: usar Gemini Apps mediante preguntas de texto](https://support.google.com/gemini/answer/13275745?hl=es)
- [Google: crear y editar hojas de cálculo](https://support.google.com/docs/answer/6000292?hl=es)
- [Google: separar texto, quitar duplicados y recortar espacios; límites de la función](https://support.google.com/docs/answer/6325535?hl=es)

## Uso responsable

Trabaja con copias y datos ficticios. Revisa cada cifra, fecha y compromiso antes de usarlo. No pegues datos personales o confidenciales en herramientas que tu organización no haya aprobado. El recurso es gratuito y no exige comentar, registrarte ni comprar.

Licencia MIT. Material educativo de Atajo IA, sin garantías.

Edición revisada: 2026-10-25. Las opciones de una herramienta pueden variar según cuenta, idioma y disponibilidad.
