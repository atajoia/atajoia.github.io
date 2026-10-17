# Guía: Limpiador Automático de Bases en Excel

Recurso gratuito de **Atajo IA** que acompaña al reel **R14 · Limpiador Automático de Bases en Excel** (palabra clave: LIMPIEZA).

> **Material educativo.** Úsalo como borrador: revisa cada resultado antes de usarlo o compartirlo. No sustituye la revisión de una persona ni la asesoría profesional.

## Qué es

Este recurso ayuda a oficinistas, vendedores y administradores a estandarizar nombres, dar formato a teléfonos de 10 dígitos y agrupar registros duplicados sumando sus saldos en tablas de Excel o CSV. No reemplaza la validación contable ni garantiza exactitud absoluta: el archivo generado es un borrador que siempre debe revisarse contra la fuente original.

## Qué incluye

- `README.md`: Guía: qué es, cómo usarlo paso a paso, requisitos y privacidad.
- `PROMPT_MAESTRO.md`: Prompts listos para copiar en tu asistente de IA.
- `plantilla_limpieza.csv`: Plantilla con las columnas de la demo (CLIENTE, TELÉFONO, SALDO, ESTADO); las filas EJEMPLO son ilustrativas: bórralas y pega tus datos.

## Requisitos

- Excel, Google Sheets o cualquier programa de hojas de cálculo para abrir la plantilla CSV y tus archivos.
- Un asistente de IA aprobado por tu organización que permita subir archivos (o bien copiar y pegar fragmentos de tabla).

## Cómo usarlo paso a paso

1. Haz una copia de respaldo de tu archivo original antes de empezar y nunca trabajes sobre tu única versión.
2. Revisa la estructura de la plantilla CSV incluida para ubicar las columnas requeridas: CLIENTE, TELÉFONO, SALDO y ESTADO.
3. Si usarás un asistente de IA en la nube, elimina primero columnas sensibles (RFC, direcciones, cuentas bancarias) o usa datos anonimizados.
4. Abre el archivo PROMPT_MAESTRO.md, copia la instrucción principal, pégala en tu asistente de IA junto con tu tabla y llena los [MARCADORES] con los nombres reales de tus columnas.
5. Descarga o abre el archivo resultante y compara la suma total de la columna SALDO antes y después de la limpieza para confirmar que no se perdieron montos.
6. Revisa manualmente las filas marcadas como UNIFICADO o REVISION_MANUAL contra tu archivo original antes de usar la base en tu operación diaria.

## Privacidad y advertencias

- Anonimiza datos personales y confidenciales antes de usar cualquier herramienta de IA.
- Verifica cifras, nombres, fechas y compromisos contra la fuente original.
- Revisa el resultado antes de compartirlo: es un borrador, no una respuesta final.
- No subas bases con datos personales sensibles o fiscales (RFC, CURP, domicilios particulares, cuentas bancarias) a herramientas de IA públicas; usa solo herramientas autorizadas por tu organización.
- La agrupación automática por similitud de nombres puede juntar a dos personas distintas (homónimos o familiares con el mismo teléfono). Revisa siempre cada fila marcada como UNIFICADO antes de tomar decisiones de cobro o facturación.
- No subas documentos con datos personales, financieros o confidenciales a herramientas de IA que tu organización no haya aprobado.

## Licencia

Licencia sugerida: **MIT**. Puedes usar, copiar, modificar y compartir este material, incluso con fines comerciales, siempre que conserves este aviso. Se entrega "tal cual", sin garantías de ningún tipo: es material educativo de Atajo IA y no constituye asesoría profesional.

_Borrador preparado con ayuda de IA el 2026-10-17. Revísalo antes de usarlo._
