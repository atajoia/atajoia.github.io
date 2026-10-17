# Prompt maestro · Plantilla de 5 Niveles de Cobranza Diplomática con IA

Recurso de Atajo IA para el reel R09. Copia cada bloque en el asistente de IA que tu organización permita usar, reemplaza los [MARCADORES] y revisa el resultado antes de usarlo.

## 1. Prompt principal

```text
Actúa como un especialista en comunicación comercial y cuentas por cobrar en México. Te voy a compartir una tabla con facturas vencidas que incluye las columnas: CLIENTE, MONTO, ATRASO y TONO ASIGNADO. Tu tarea es redactar un borrador de mensaje de cobro individual para cada fila, aplicando estas 5 reglas de escalamiento según los días de atraso o el tono indicado: Nivel 1 (1 a 7 días - Aviso Amable): recordatorio breve y cordial asumiendo que fue un olvido administrativo. Nivel 2 (8 a 15 días - Seguimiento Firme): solicita confirmación de la fecha de programación de pago y adjunta datos de referencia. Nivel 3 (16 a 30 días - Solicitud de Fecha Compromiso): tono serio pidiendo una fecha exacta de liquidación para actualizar el estatus de la cuenta. Nivel 4 (31 a 60 días - Pausa de Servicio): informa con diplomacia que las nuevas entregas o servicios quedarán en pausa temporal hasta regularizar el saldo. Nivel 5 (Más de 60 días - Último Aviso Administrativo): mensaje formal previo a pasar el caso al área correspondiente, manteniendo un trato respetuoso. Reglas obligatorias: usa español de México formal y respetuoso; no inventes recargos, intereses ni amenazas legales; deja marcadores como [NÚMERO DE FACTURA] y [DATOS BANCARIOS] para que yo los llene después. Mi giro o servicio es: [GIRO O SERVICIO]. Aquí está la tabla de datos: [PEGA AQUÍ TU TABLA CSV]
```

## 2. Cliente con saldo vencido que pide trabajo urgente

Cuándo usarlo: Úsalo cuando un cliente con facturas pendientes te solicite un nuevo proyecto o pedido urgente.

```text
Actúa como un encargado de cuentas clave en México. El cliente [ALIAS DEL CLIENTE] tiene un saldo vencido de [MONTO VENCIDO] con [DÍAS DE ATRASO] días de atraso, y me acaba de pedir un trabajo urgente que consiste en [DESCRIPCIÓN DEL NUEVO PEDIDO]. Redacta un mensaje diplomático pero firme donde le confirme que tenemos disponibilidad técnica para apoyarlo con su urgencia, pero que por políticas administrativas el sistema requiere tener reflejado el pago del saldo anterior (o al menos [PORCENTAJE O MONTO MÍNIMO]) para liberar la nueva orden de trabajo. Ofrece dos opciones claras de horarios de entrega una vez que nos comparta el comprobante de pago hoy mismo.
```

## 3. Adaptar correos a mensajes breves de WhatsApp

Cuándo usarlo: Úsalo cuando el canal principal de comunicación con tu cliente sea mensajería instantánea en lugar de correo electrónico.

```text
Toma los borradores de cobranza que acabas de generar y conviértelos en mensajes cortos para WhatsApp Business en español de México. Cada mensaje debe tener máximo 4 líneas, sonar cordial pero claro, incluir el monto [MONTO], los días de atraso [ATRASO] y terminar con una pregunta cerrada que facilite que el cliente responda con una fecha concreta de pago. No uses mayúsculas sostenidas ni signos de exclamación excesivos.
```

## 4. Verificador de tono y datos antes de enviar

Cuándo usarlo: Úsalo para auditar tus borradores finales y asegurarte de que no suenen agresivos ni tengan errores de cifras.

```text
Revisa los siguientes borradores de cobranza comparándolos contra esta tabla original: [PEGA AQUÍ TU TABLA CSV]. Verifica tres cosas: 1) Que los montos y días mencionados en cada texto coincidan exactamente con la fila correspondiente. 2) Que ninguna frase suene agresiva, sarcástica o como amenaza legal improcedente. 3) Señala cualquier parte donde falte información clave para que el cliente pueda pagar fácilmente. Devuélveme una lista de correcciones puntuales si encuentras algún detalle: [PEGA AQUÍ TUS BORRADORES]
```

## Antes de usar el resultado

- Anonimiza datos personales y confidenciales antes de usar cualquier herramienta de IA.
- Verifica cifras, nombres, fechas y compromisos contra la fuente original.
- Revisa el resultado antes de compartirlo: es un borrador, no una respuesta final.
