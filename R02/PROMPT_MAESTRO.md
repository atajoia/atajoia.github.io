# Prompt maestro · Correo: priorizar hilos y redactar respuestas

Recurso de Atajo IA para el reel R02. Copia cada bloque en el asistente de IA que tu organización permita usar, reemplaza los [MARCADORES] y revisa el resultado antes de usarlo.

## 1. Prompt principal

Ordenar un hilo y preparar una respuesta para revisión humana.

```text
Ayúdame a analizar este hilo de correo. Objetivo: [QUÉ NECESITO RESOLVER]. Resume en 3 puntos: solicitud, fecha o urgencia y dato faltante. Después redacta una respuesta breve con tono [TONO], que pida [DATO FALTANTE] y proponga el siguiente paso. Usa solo información del hilo; señala lo que no se sabe. No envíes el correo ni inventes acuerdos. Hilo: [PEGA UNA VERSIÓN SIN DATOS PERSONALES NI CONFIDENCIALES].
```

## 2. Tabla de prioridades por remitente

Cuándo usarlo: Úsalo cuando el hilo tiene varias personas pidiendo cosas distintas y quieres llenar tu plantilla CSV rápido.

```text
A partir del siguiente hilo de correo, extrae todas las solicitudes abiertas y ordénalas en una tabla con exactamente tres columnas: REMITENTE, QUÉ PIDE y PRIORIDAD. Clasifica la prioridad solo como URGENTE, HOY o PUEDE ESPERAR según las fechas mencionadas en el texto. Si no hay fecha clara, indícalo como POR CONFIRMAR. No inventes datos fuera del texto. Hilo: [PEGA EL HILO ANONIMIZADO].
```

## 3. Destrabar acuerdos contradictorios

Cuándo usarlo: Úsalo cuando dos o más personas en el hilo proponen fechas o condiciones que chocan entre sí.

```text
Analiza este hilo donde hay posturas distintas sobre [TEMA DEL CONFLICTO]. Identifica qué propone cada parte y dónde está el desacuerdo. Redacta un borrador de respuesta con tono [TONO, POR EJEMPLO: NEUTRAL Y EJECUTIVO] que resuma las opciones sobre la mesa y pida a [ROL DE QUIEN DECIDE] confirmar cuál camino tomar antes de [FECHA O PLAZO]. No tomes partido ni asumas acuerdos que no estén escritos. Hilo: [PEGA EL HILO ANONIMIZADO].
```

## 4. Auditoría del borrador antes de enviar

Cuándo usarlo: Úsalo para revisar que tu respuesta no prometa cosas de más ni deje preguntas sin contestar.

```text
Compara el hilo original con mi borrador de respuesta. Señala en una lista breve: 1) si quedó alguna pregunta del hilo sin responder, 2) si mi borrador asume algún compromiso o fecha que no estaba en el hilo original, y 3) si el tono suena claro y respetuoso. Hilo original: [PEGA EL HILO ANONIMIZADO]. Mi borrador: [PEGA TU BORRADOR].
```

## Antes de usar el resultado

- Confirma destinatarios, compromisos y fechas antes de enviar.
- Elimina nombres, correos, teléfonos y datos internos antes de pegar el hilo.
- La herramienta redacta; tú decides si la respuesta es correcta.
