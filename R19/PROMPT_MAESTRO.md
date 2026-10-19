# Prompt maestro · Generador de reactivos por nivel y plantilla de evaluación

Recurso de Atajo IA para el reel R19. Copia cada bloque en el asistente de IA que tu organización permita usar, reemplaza los [MARCADORES] y revisa el resultado antes de usarlo.

## 1. Prompt principal

```text
Actúa como especialista en capacitación laboral y diseño instruccional. Analiza el documento adjunto sobre [TEMA O NOMBRE DEL REGLAMENTO] dirigido a [PUESTO O ÁREA DEL PERSONAL].

Extrae las reglas críticas y genera [NÚMERO DE PREGUNTAS] reactivos de opción múltiple de nivel [BÁSICO / INTERMEDIO / AVANZADO]. Cada reactivo debe tener 3 opciones de respuesta (Opción A, Opción B, Opción C) donde solo una sea verdadera y las otras dos sean distractores realistas basados en errores comunes.

Entrégame el resultado únicamente como una tabla con estas 4 columnas exactas:
1. REACTIVO: Identificador consecutivo más el texto de la pregunta y sus 3 opciones.
2. TEMA: Categoría o capítulo corto que evalúa.
3. RESPUESTA: La letra y texto de la opción correcta.
4. ORIGEN: Artículo, sección o apartado exacto y número de página del PDF de donde salió la regla.

Reglas estrictas:
- No inventes normas ni supongas información que no esté escrita en el documento.
- Si un fragmento del PDF es ambiguo o ilegible, indícalo en lugar de adivinar.
```

## 2. Casos prácticos para tablas y anexos técnicos

Cuándo usarlo: Úsalo cuando el documento tenga tablas de medidas, límites o anexos legales y quieras evaluar la aplicación práctica en lugar de la memoria.

```text
Revisa específicamente la sección o tabla de [NOMBRE DE LA TABLA O ANEXO EN EL PDF] en la página [NÚMERO DE PÁGINA]. Diseña [NÚMERO] reactivos basados en situaciones reales de trabajo para el puesto de [PUESTO DEL PERSONAL]. Plantea un escenario breve donde un trabajador deba tomar una decisión usando los datos de esa tabla, incluye 3 opciones de respuesta con distractores creíbles y mantén el mismo formato de 4 columnas (REACTIVO, TEMA, RESPUESTA, ORIGEN).
```

## 3. Auditoría de reactivos contra el documento original

Cuándo usarlo: Úsalo después de generar tu tabla para detectar preguntas confusas, respuestas mal asignadas o citas inexactas.

```text
Revisa la tabla de reactivos que acabas de generar y compárala contra el PDF adjunto. Verifica tres cosas para cada fila:
1. Que la cita en la columna ORIGEN realmente exista en esa página y diga lo que afirma la respuesta.
2. Que ninguna de las opciones incorrectas pueda considerarse válida según otro apartado del mismo documento.
3. Que la redacción sea clara para [PERFIL DEL PERSONAL].
Enlista únicamente los reactivos que tengan algún problema y propón su corrección.
```

## 4. Conversión a texto plano para exportar a CSV

Cuándo usarlo: Úsalo cuando ya hayas validado las preguntas y quieras pasarlas limpiamente a la plantilla CSV o a un formulario digital.

```text
Toma la tabla de reactivos ya corregida y devuélvela en un bloque de código en formato CSV separado por comas, usando comillas dobles en cada campo para no romper las columnas. Respeta exactamente los encabezados: REACTIVO,TEMA,RESPUESTA,ORIGEN. No agregues texto explicativo antes ni después del bloque.
```

## Antes de usar el resultado

- Anonimiza datos personales y confidenciales antes de usar cualquier herramienta de IA.
- Verifica cifras, nombres, fechas y compromisos contra la fuente original.
- Revisa el resultado antes de compartirlo: es un borrador, no una respuesta final.
