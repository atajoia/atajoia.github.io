# Generador de reactivos por nivel y plantilla de evaluación

Recurso gratuito de **Atajo IA** que acompaña al reel **R19 · Exámenes Automáticos desde Cualquier PDF** (palabra clave: EXAMEN).

> **Material educativo.** Úsalo como borrador: revisa cada resultado antes de usarlo o compartirlo. No sustituye la revisión de una persona ni la asesoría profesional.

## Qué es

Este recurso ayuda a encargados de capacitación, recursos humanos y supervisores a crear borradores de exámenes a partir de manuales o reglamentos extensos en PDF. Ahorra tiempo estructurando preguntas de opción múltiple con su referencia exacta lista para pasarse a una hoja de cálculo. No sustituye la validación técnica ni garantiza exactitud normativa: cada pregunta debe ser revisada por un responsable antes de evaluar al personal.

## Qué incluye

- `README.md`: Guía: qué es, cómo usarlo paso a paso, requisitos y privacidad.
- `PROMPT_MAESTRO.md`: Prompts listos para copiar en tu asistente de IA.
- `plantilla_examen.csv`: Plantilla con las columnas de la demo (REACTIVO, TEMA, RESPUESTA, ORIGEN); las filas EJEMPLO son ilustrativas: bórralas y pega tus datos.

## Requisitos

- Un asistente de IA con lectura de documentos PDF aprobado por tu organización.
- El reglamento, manual o normativa interna en formato PDF con texto seleccionable (no escaneado como imagen).
- Excel o Google Sheets para abrir la plantilla CSV y armar tu evaluación final.

## Cómo usarlo paso a paso

1. Revisa tu documento PDF y elimina datos confidenciales, nombres propios o secretos industriales antes de subirlo.
2. Abre tu asistente de IA aprobado y adjunta el archivo PDF (si es muy extenso, sube un capítulo o sección a la vez para evitar omisiones).
3. Abre el archivo PROMPT_MAESTRO.md, copia el texto del prompt principal y pégalo en el chat completando los datos entre corchetes.
4. Pide a la IA que genere la tabla de preguntas y verifica que cada fila incluya el artículo y número de página de origen.
5. Si tu reglamento incluye tablas técnicas o anexos complejos, aplica el prompt complementario de casos prácticos.
6. Copia las filas generadas y pégalas en la plantilla CSV incluida para organizar tu banco de reactivos en Excel o Google Sheets.
7. Compara una por una las preguntas y respuestas contra el PDF original para confirmar que la interpretación sea correcta antes de aplicar el examen.

## Privacidad y advertencias

- Anonimiza datos personales y confidenciales antes de usar cualquier herramienta de IA.
- Verifica cifras, nombres, fechas y compromisos contra la fuente original.
- Revisa el resultado antes de compartirlo: es un borrador, no una respuesta final.
- Nunca subas reglamentos que contengan protocolos de seguridad física crítica, contraseñas, planos confidenciales o datos personales de empleados en herramientas públicas.
- Usa únicamente cuentas corporativas o asistentes de IA autorizados por tu empresa que garanticen que tus documentos no se usarán para entrenar modelos externos.
- En temas de seguridad industrial, salud ocupacional o cumplimiento legal, una pregunta mal redactada puede causar accidentes: el responsable del área debe validar el 100% del cuestionario contra el documento oficial.
- No subas documentos con datos personales, financieros o confidenciales a herramientas de IA que tu organización no haya aprobado.

## Licencia

Licencia sugerida: **MIT**. Puedes usar, copiar, modificar y compartir este material, incluso con fines comerciales, siempre que conserves este aviso. Se entrega "tal cual", sin garantías de ningún tipo: es material educativo de Atajo IA y no constituye asesoría profesional.

_Borrador preparado con ayuda de IA el 2026-10-19. Revísalo antes de usarlo._
