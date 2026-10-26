# ChatGPT: arma tus bloques de horario en minutos

Recurso gratuito de Atajo IA · R24 · BLOQUES

## Herramienta y preparación

ChatGPT versión web gratuita (requiere cuenta gratuita iniciada)

- Cuenta gratuita en ChatGPT versión web.
- Lista en texto con 8 tareas, tiempos estimados en minutos y horario de junta fija.

Usa DATOS_PRACTICA.txt como entrada. Son datos ficticios, no una transcripción real.

## Pasos del video

1. **Escribe las reglas del horario:** En el cuadro de mensaje de ChatGPT web, pega la instrucción indicando el horario de 09:00 a 14:00, la junta fija de 11:00 a 12:00 y la regla de agrupar tareas cortas e Imprevistos.
2. **Agrega la lista y envía:** En el mismo mensaje, pega las 8 tareas con sus tiempos en minutos y haz clic en el botón Enviar.
3. **Comprueba la suma y guarda:** Verifica en la tabla resultante que Propuesta Alfa esté de 09:00 a 10:30, la junta de 11:00 a 12:00 y que los bloques sumen 300 minutos sin traslapes. Copia el texto y guárdalo como Agenda_Lunes.txt.

## Prompt completo

```text
Organiza esta lista de pendientes en una tabla de bloques de horario de 09:00 a 14:00. Reglas: 1) Respeta la junta fija de 11:00 a 12:00. 2) Asigna primero las tareas de 60 minutos o más como Trabajo Profundo. 3) Agrupa las tareas de 15 minutos e Imprevistos (30m) en bloques continuos de Tareas Rápidas. 4) Verifica que la suma total no rebase las 5 horas (300 minutos). Lista: Propuesta Alfa (90m), Correos (15m), Junta de seguimiento (11:00-12:00, 60m), Presupuesto Q2 (60m), Facturas (15m), Imprevistos (30m), Llamada (15m), Tickets (15m).
```

## Comprobación

Una agenda estructurada de 09:00 a 14:00 donde Propuesta Alfa ocupa de 09:00 a 10:30, las tareas cortas e imprevistos quedan agrupados y el tiempo total suma exactamente 300 minutos.

RESULTADO_ESPERADO.csv es una referencia ilustrativa; compara cada dato con la entrada. La respuesta de una IA puede variar y requiere revisión.

## Fuente oficial

https://help.openai.com/en/articles/6654000-best-practices-for-prompt-engineering-with-the-openai-api

La fuente documenta el uso de la herramienta; esta guía no es una grabación de su ejecución.

## Uso responsable

Trabaja con copias y datos ficticios. No pegues información personal o confidencial de tu trabajo en servicios que tu organización no haya aprobado.

Licencia MIT. Material educativo de Atajo IA, sin garantías.
