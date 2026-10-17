# Prompt maestro · Reseñas: responder con empatía

Recurso de Atajo IA para el reel R06. Copia cada bloque en el asistente de IA que tu organización permita usar, reemplaza los [MARCADORES] y revisa el resultado antes de usarlo.

## 1. Prompt principal

Preparar respuestas breves sin prometer descuentos, reembolsos ni soluciones no aprobadas.

```text
Redacta 3 respuestas posibles a esta reseña de [TIPO DE NEGOCIO]. Mantén un tono [TONO], reconoce el punto concreto y ofrece un siguiente paso que sí puedo cumplir: [PASO APROBADO]. No discutas, no reveles datos del cliente y no prometas compensaciones, reembolsos o resultados. Si la reseña plantea una disputa o un tema legal, recomienda que una persona responsable la revise. Reseña anonimizada: [TEXTO].
```

## 2. Procesar lote de reseñas en tabla

Cuándo usarlo: Úsalo cuando tengas varias reseñas breves y quieras generar una tabla con un borrador para cada una de una sola vez.

```text
Actúa como encargado de atención al cliente de [TIPO DE NEGOCIO]. Te daré una lista de reseñas anonimizadas. Para cada una, redacta un borrador de respuesta breve en tono [TONO] que reconozca el comentario y ofrezca únicamente este paso de seguimiento cuando sea necesario: [PASO APROBADO]. No prometas descuentos, regalos ni reembolsos. Devuelve el resultado en formato de tabla con las columnas: CLIENTE, RESEÑA, RESPUESTA, ESTADO (pon 'BORRADOR' en todas). Lista de reseñas: [PEGAR FILAS DE LA PLANTILLA CSV]
```

## 3. Traducir y responder reseña en otro idioma

Cuándo usarlo: Úsalo cuando recibas un comentario en otro idioma y quieras entenderlo en español pero responder en el idioma del cliente.

```text
1. Traduce al español esta reseña de mi [TIPO DE NEGOCIO] para que mi equipo la entienda. 2. Redacta 2 opciones de respuesta en el mismo idioma original de la reseña, usando un tono [TONO]. Reconoce lo que menciona el cliente y ofrece únicamente este siguiente paso: [PASO APROBADO]. No inventes promociones ni prometas compensaciones. Reseña anonimizada: [TEXTO DE LA RESEÑA]
```

## 4. Auditoría de seguridad antes de publicar

Cuándo usarlo: Úsalo para revisar que tus borradores no comprometan al negocio ni expongan datos privados antes de publicarlos.

```text
Revisa estos borradores de respuesta a reseñas de mi [TIPO DE NEGOCIO]. Señala si alguno comete estos errores: 1) Promete descuentos, reembolsos o compensaciones no autorizadas, 2) Suena defensivo o discute con el cliente, 3) Incluye datos privados o confidenciales, 4) Ignora una queja grave que debería escalarse a un responsable humano. Si encuentras algún problema, sugiere una corrección neutra y segura. Borradores a revisar: [PEGAR BORRADORES]
```

## Antes de usar el resultado

- Personaliza la respuesta y elimina datos privados.
- Confirma que el negocio puede cumplir el siguiente paso.
- Escala disputas, amenazas, lesiones o asuntos legales.
