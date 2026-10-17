# Prompt maestro · Guía de Estructura de Texto para Diagramas de Flujo Automáticos

Recurso de Atajo IA para el reel R10. Copia cada bloque en el asistente de IA que tu organización permita usar, reemplaza los [MARCADORES] y revisa el resultado antes de usarlo.

## 1. Prompt principal

```text
Actúa como analista de procesos operativos. Lee las siguientes notas y conviértelas en una secuencia lógica para un diagrama de flujo.

Instrucciones:
1. Identifica cada acción, filtro de decisión, inicio y cierre del procedimiento.
2. Asigna el departamento o rol responsable según el contexto.
3. Clasifica cada paso usando únicamente uno de estos tipos de nodo: INICIO, PROCESO, DECISIÓN, FIN.
4. Entrega el resultado exclusivamente en una tabla con las columnas exactas: PASO | ACCIÓN DETECTADA | ÁREA | NODO.
5. Si algún paso es ambiguo o falta información sobre qué pasa cuando se rechaza una condición, indícalo al final bajo el título 'Puntos por aclarar'.

Notas del proceso:
[TEXTO_DEL_PROCESO]
```

## 2. Generar código Mermaid por carriles (Swimlanes)

Cuándo usarlo: Úsalo cuando ya revisaste la tabla y quieres convertirla en un diagrama visual dividido por áreas para exportarlo a PDF.

```text
Toma la siguiente tabla de proceso ya revisada y genera el código en sintaxis Mermaid (flowchart TD) agrupando los nodos en subgráficos (subgraph) por cada [ÁREA]. Usa rombos para los nodos tipo DECISIÓN, rectángulos para PROCESO y bordes redondeados para INICIO y FIN. Incluye las etiquetas de Sí/No en las flechas que salen de cada decisión.

Tabla validada:
[PEGA_AQUÍ_TU_TABLA]
```

## 3. Detectar cuellos de botella y rutas huérfanas

Cuándo usarlo: Úsalo para auditar tu borrador y encontrar pasos sin salida o validaciones repetitivas antes de publicar el proceso.

```text
Revisa la siguiente secuencia de pasos y señala únicamente: 1) Decisiones que no especifican qué ocurre en caso de rechazo, 2) Pasos donde una misma área interviene varias veces seguidas sin necesidad aparente, y 3) Cualquier paso que quede sin conexión hacia el final del flujo. No inventes reglas nuevas; solo señala los huecos para que yo los corrija.

Secuencia actual:
[PEGA_AQUÍ_TU_TABLA]
```

## 4. Estandarizar apuntes desordenados antes de diagramar

Cuándo usarlo: Úsalo si tus notas originales son mensajes sueltos o minutas difíciles de leer antes de usar el prompt principal.

```text
Reescribe los siguientes apuntes sueltos como una lista numerada y cronológica de pasos operativos. Mantén todas las reglas, montos y condiciones originales sin agregar suposiciones. Usa el formato: 'Quien hace la acción + Verbo en presente + Condición (si aplica)'.

Apuntes originales:
[APUNTES_SUELTOS]
```

## Antes de usar el resultado

- Anonimiza datos personales y confidenciales antes de usar cualquier herramienta de IA.
- Verifica cifras, nombres, fechas y compromisos contra la fuente original.
- Revisa el resultado antes de compartirlo: es un borrador, no una respuesta final.
