# Prompt maestro · Minuta: acuerdos, responsables y fechas

Recurso de Atajo IA para el reel R03. Copia cada bloque en el asistente de IA que tu organización permita usar, reemplaza los [MARCADORES] y revisa el resultado antes de usarlo.

## 1. Prompt principal

Transformar notas en una lista clara de acciones, conservando las dudas.

```text
Organiza estas notas de reunión en una minuta breve con: tema, acuerdo, responsable, fecha límite y duda abierta. Incluye únicamente acuerdos expresos. Si falta responsable o fecha, escribe POR CONFIRMAR. No atribuyas frases a personas si las notas no lo indican. Termina con una lista de preguntas para validar antes de compartir. Notas: [PEGA NOTAS ANONIMIZADAS].
```

## 2. Convertir acuerdos a tabla de 4 columnas

Cuándo usarlo: Úsalo después del prompt principal para pasar los acuerdos validados al formato exacto de la plantilla CSV.

```text
Toma la minuta anterior y organiza únicamente los acuerdos en una tabla con estas cuatro columnas exactas: ACUERDO, RESPONSABLE, FECHA, ESTADO. Reglas: 1) En ESTADO usa solo ASIGNADO, POR CONFIRMAR o URGENTE (solo si las notas indican explícitamente la urgencia). 2) Si falta el responsable o la fecha, escribe POR CONFIRMAR. 3) No inventes datos que no estén en el texto. Minuta validada: [PEGA EL RESULTADO DEL PROMPT PRINCIPAL].
```

## 3. Detectar riesgos y bloqueos mencionados

Cuándo usarlo: Úsalo cuando la reunión fue larga y quieres rescatar advertencias o problemas que se comentaron sin llegar a un acuerdo.

```text
Analiza estas notas de reunión e identifica únicamente los riesgos, cuellos de botella o bloqueos mencionados por los participantes que quedaron sin resolver. Para cada punto indica: el problema mencionado, el área o persona que lo señaló (si aparece en el texto) y qué decisión hace falta tomar. No supongas riesgos que no se hayan dicho expresamente. Notas: [PEGA NOTAS ANONIMIZADAS].
```

## 4. Redactar mensaje para confirmar pendientes

Cuándo usarlo: Úsalo antes de exportar el PDF final para que el equipo valide las tareas marcadas como POR CONFIRMAR.

```text
Redacta un mensaje breve y directo para enviar por correo o chat interno al equipo que asistió a la junta. El objetivo es compartir el resumen de acuerdos y pedir que confirmen los datos marcados como POR CONFIRMAR antes de cerrar la minuta oficial. Usa un tono profesional y colaborativo. Lista de acuerdos y dudas: [PEGA TU TABLA Y PREGUNTAS ABIERTAS].
```

## Antes de usar el resultado

- Verifica nombres, responsables, fechas y decisiones.
- No compartas una transcripción confidencial en una herramienta no aprobada.
- Pide confirmación de los acuerdos antes de distribuir la minuta.
