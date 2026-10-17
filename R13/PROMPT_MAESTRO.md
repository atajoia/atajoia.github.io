# Prompt maestro · Guía de Prompts para Auditar Contratos Comerciales y Laborales

Recurso de Atajo IA para el reel R13. Copia cada bloque en el asistente de IA que tu organización permita usar, reemplaza los [MARCADORES] y revisa el resultado antes de usarlo.

## 1. Prompt principal

```text
Actúa como un analista de riesgos contractuales preventivos en México. Voy a compartirte el texto de un [TIPO DE CONTRATO: ARRENDAMIENTO / PRESTACIÓN DE SERVICIOS / PROVEEDURÍA / LABORAL] donde mi organización participa como [TU ROL: CLIENTE / PROVEEDOR / ARRENDATARIO / ARRENDADOR].

Tu objetivo es hacer una lectura preliminar para detectar condiciones desproporcionadas o confusas, prestando especial atención a:
1. Renovaciones automáticas o plazos forzosos.
2. Penalizaciones por terminación anticipada o intereses moratorios.
3. Incrementos de tarifas sin tope claro o unilaterales.
4. Renuncias a derechos, jurisdicción desfavorable o responsabilidades ilimitadas.
5. Obligaciones ambiguas o contradicciones entre cláusulas.

Instrucciones de salida:
- Entrega primero una tabla con exactamente estas cuatro columnas: CLAUSULA | TRAMPA DETECTADA | RIESGO | NIVEL.
- En CLAUSULA indica el número y nombre de la sección tal como aparece en el texto.
- En TRAMPA DETECTADA resume en pocas palabras la condición desfavorable en español simple.
- En RIESGO explica el impacto económico u operativo citando la fórmula o monto mencionado en el documento (si no hay monto explícito, describe la consecuencia práctica sin inventar cifras).
- En NIVEL clasifica como BAJO, MEDIO, ALTO o CRITICO según el impacto potencial.
- Debajo de la tabla, cita textualmente el fragmento de cada cláusula observada para que yo pueda verificarlo en el documento original.
- Recuerda que este análisis es informativo y será validado por una persona.

Aquí está el texto del contrato:
[PEGA AQUÍ EL TEXTO DEL CONTRATO ANONIMIZADO]
```

## 2. Traductor de cláusulas en otro idioma o escaneadas

Cuándo usarlo: Úsalo cuando el contrato venga en otro idioma o tenga errores de lectura por un mal escaneo.

```text
Analiza el siguiente fragmento de contrato que originalmente está en [IDIOMA ORIGINAL O TEXTO ESCANEADO CON ERRORES]. Primero, transcribe o traduce el texto a español claro de México, señalando entre corchetes cualquier palabra que sea ilegible o ambigua sin adivinar su contenido. Segundo, explica en tres puntos sencillos a qué me obliga exactamente este párrafo y qué pasa si no lo cumplo:

[PEGA AQUÍ EL FRAGMENTO DE TEXTO]
```

## 3. Generador de contrapropuestas para negociar

Cuándo usarlo: Úsalo después de identificar una cláusula riesgosa para proponer una redacción más equilibrada a tu contraparte.

```text
En el contrato que estamos revisando, la cláusula [NÚMERO DE CLÁUSULA] dice textualmente lo siguiente:
[PEGA LA CLÁUSULA ORIGINAL]

Esta condición representa un riesgo para mí como [TU ROL] debido a [EXPLICA EL PROBLEMA: EJ. PENALIZACIÓN EXCESIVA / RENOVACIÓN AUTOMÁTICA]. Redacta 2 opciones de contrapropuesta en tono profesional y colaborativo para equilibrar la cláusula para ambas partes, e incluye un párrafo breve de justificación comercial que pueda enviar por correo a mi contraparte para pedir el cambio.
```

## 4. Verificador de referencias cruzadas y anexos

Cuándo usarlo: Úsalo para detectar si el contrato menciona anexos, fechas o cláusulas que no existen o se contradicen.

```text
Revisa el siguiente texto del contrato y haz una lista de control de congruencia interna. Identifica:
1. Todos los Anexos mencionados en el texto y verifica si sus obligaciones quedan claras.
2. Fechas, plazos de aviso previo (en días naturales o hábiles) y vigencias para detectar si se contradicen entre sí.
3. Referencias a otros números de cláusula dentro del mismo documento que parezcan incorrectas o incompletas.
No inventes información; si falta parte del texto para confirmar un dato, indícalo como pendiente de revisión manual.

[PEGA AQUÍ EL TEXTO DEL CONTRATO]
```

## Antes de usar el resultado

- Anonimiza datos personales y confidenciales antes de usar cualquier herramienta de IA.
- Verifica cifras, nombres, fechas y compromisos contra la fuente original.
- Revisa el resultado antes de compartirlo: es un borrador, no una respuesta final.
