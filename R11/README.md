# Tareas candidatas desde una transcripción

Recurso gratuito de Atajo IA · R11 · AUDIOS

## Qué es

Marca frases con verbos de tarea y conserva su evidencia literal. Reglas locales, sin IA, audio ni transcripción automática. Funciona gratis en la web con reglas locales; los complementos de texto son opcionales.

## Herramienta y preparación

Mini aplicación web R11 de Atajo IA, en tu navegador

- Un navegador moderno con JavaScript habilitado. No se requiere cuenta, tarjeta, API ni suscripción para usar esta miniaplicación.
- Usa el ejemplo ficticio incluido o una copia autorizada de tus propios datos. Conserva el original antes de cambiar o descargar resultados.

Este ejercicio usa datos ficticios incluidos. La referencia es ilustrativa; no acredita una ejecución de la herramienta. La guía amplía el tema del video y sus datos de práctica pueden ser diferentes de los de la pieza original.

## Qué incluye

- `DATOS_PRACTICA.txt`: Datos ficticios completos para practicar sin preparar archivos adicionales.
- `PROMPT_MAESTRO.md`: Instrucción completa; se usa junto con los datos de práctica incluidos.
- `plantilla_audios.csv`: Plantilla vacía para usar con tus propios datos.
- `RESULTADO_ESPERADO.csv`: Referencia ilustrativa resuelta con los datos de práctica; comprueba cada dato.
- `OPCIONES_EJEMPLO.txt`: Configuración exacta utilizada para obtener la referencia descargable.
- `RESULTADO_EJEMPLO.md`: Documento calculado por la miniaplicación con su muestra y opciones actuales.
- `COMPROBACIONES.md`: Uso, opciones y límites reales de la salida actual.

## Cómo usarlo paso a paso

1. **Abre la miniaplicación:** Abre https://atajoia.github.io/R11/app/ y pulsa Usar ejemplo. No necesitas iniciar sesión ni abrir un servicio de IA.
2. **Pega tus datos y revisa opciones:** Para extraer campos con precisión usa: Tarea: ... | Responsable: ... | Fecha: ... . En texto libre solo se marca una candidata; los campos no rotulados quedan Por confirmar. Para reproducir la referencia, pega exactamente DATOS_PRACTICA.txt. Esta herramienta no requiere opciones adicionales.
3. **Ejecuta la herramienta:** Pulsa «Marcar tareas y datos pendientes». La función procesa la entrada en el navegador con reglas locales. No consulta un modelo ni opera servicios externos.
4. **Revisa la tabla editable:** Contrasta la tabla con tus datos originales y con las comprobaciones de esta guía. El ejemplo produce 5 filas y 5 columnas. Edita el resultado si hace falta; un borrador o una advertencia no equivale a una acción ejecutada.
5. **Descarga o conserva tu trabajo:** Usa Descargar CSV para la tabla revisada. También puedes guardar el documento Markdown o reporte HTML que ofrezca la app. Usa la descarga de la aplicación para conservar su versión local; verifica el archivo descargado antes de depender de él. No hace falta abrir un asistente externo ni pegar un prompt.

## Prompt completo

```text
REVISIÓN OPCIONAL. Esta instrucción no es necesaria para usar la miniaplicación y no activa una API. Revisa manualmente, o con un asistente que ya tengas autorizado, la entrada de R11 que aparece debajo y la configuración de OPCIONES_EJEMPLO.txt. Contrasta el resultado con RESULTADO_ESPERADO.csv: conserva los valores explícitos, identifica datos ausentes o ambiguos y no inventes responsables, fechas, importes, envíos, aprobaciones o funciones. Explica cualquier diferencia y pide confirmación antes de convertir un borrador en una acción. No afirmes haber ejecutado un SaaS, publicado, cobrado o enviado algo. Los datos completos de práctica están debajo.
```

Añade debajo DATOS_PRACTICA.txt. Para tu caso, reemplaza los datos del ejemplo por información anonimizada.

## Cómo comprobar tu resultado

- Con DATOS_PRACTICA.txt y OPCIONES_EJEMPLO.txt, el resultado tiene 5 filas y 5 columnas en este orden: Tarea candidata | Responsable | Fecha literal | Evidencia literal | Revisión.
- La primera fila de referencia es: Ajustar cotización | Ana | 2026-10-26 16:00 | [00:12] Tarea: Ajustar cotización | Responsable: Ana | Fecha: 2026-10-26 16:00 | Campos rotulados: cotejar con la fuente..
- Las filas descargadas corresponden a la tabla revisada; los valores ausentes no se completan con datos inventados.
- Detector por patrones locales; no usa IA ni escucha archivos de audio.
- Solo copia responsables y fechas con las etiquetas Responsable: y Fecha:. No interpreta fechas relativas, correcciones ni dependencias.
- 1 líneas sin patrón de tarea omitidas. Las candidatas pueden incluir falsos positivos; revisa también el texto original.
- Una negación, cambio de responsable o fecha ambigua requiere decisión humana antes de asignar trabajo.

Abre RESULTADO_ESPERADO.csv para comparar. Las respuestas pueden variar en redacción, no en los datos de origen.

## Si algo no funciona

- Si la app no muestra resultados, revisa el mensaje de error, los encabezados, separadores y opciones; vuelve a cargar el ejemplo para comprobar la estructura.
- Si cambiaste una fecha de corte, umbral o tabla auxiliar, el resultado puede diferir de la referencia. Restaura las opciones documentadas para reproducir la muestra.
- Si una entrada supera el límite de la herramienta, trabaja por bloques conservando el original. No envíes datos privados a un tercero para solucionar el formato.
- Los prompts y ejercicios antiguos son complementos opcionales: la miniaplicación funciona sin Gemini u otro servicio externo.

## Fuentes oficiales

- [Mini aplicación web R11 de Atajo IA](https://atajoia.github.io/R11/app/)
- [Código público y descargas de Atajo IA en GitHub](https://github.com/atajoia/atajoia.github.io)
- [Google: acceso a Gemini web](https://support.google.com/gemini/answer/13278668?hl=es)
- [Google: privacidad de Gemini](https://support.google.com/gemini/answer/13594961?hl=es)
- [Google: crear y editar hojas de cálculo](https://support.google.com/docs/answer/6000292?hl=es)

## Uso responsable

Trabaja con copias y datos ficticios. Revisa cada cifra, fecha y compromiso antes de usarlo. No pegues datos personales o confidenciales en herramientas que tu organización no haya aprobado. El recurso es gratuito y no exige comentar, registrarte ni comprar.

Licencia MIT. Material educativo de Atajo IA, sin garantías.

Edición revisada: 2026-10-25. Las opciones de una herramienta pueden variar según cuenta, idioma y disponibilidad.
