# Prompt maestro · Guía: Limpiador Automático de Bases en Excel

Recurso de Atajo IA para el reel R14. Copia cada bloque en el asistente de IA que tu organización permita usar, reemplaza los [MARCADORES] y revisa el resultado antes de usarlo.

## 1. Prompt principal

```text
Actúa como un analista de datos especialista en limpieza de bases de clientes en México. Voy a compartirte una tabla con errores de captura.

Las columnas relevantes de mi archivo son:
- Nombre del cliente: [NOMBRE DE TU COLUMNA DE CLIENTE]
- Teléfono: [NOMBRE DE TU COLUMNA DE TELÉFONO]
- Monto o saldo: [NOMBRE DE TU COLUMNA DE SALDO]

Por favor, procesa los datos siguiendo estas reglas:
1. CLIENTE: Quita espacios dobles o invisibles al inicio y al final, y aplica formato de nombre propio (primera letra de cada palabra en mayúscula, respetando acentos).
2. TELÉFONO: Elimina letras, espacios, paréntesis, signos y prefijos de país (+52). Si quedan 10 dígitos válidos, dales el formato XX-XXXX-XXXX. Si no tiene 10 dígitos, conserva el valor original y agrega la nota "Teléfono incompleto".
3. DUPLICADOS Y SALDOS: Identifica registros que correspondan al mismo cliente (mismo teléfono de 10 dígitos o nombre muy similar con variación de una o dos letras). Unifícalos en una sola fila y suma sus valores de [NOMBRE DE TU COLUMNA DE SALDO] en formato de moneda ($#,##0.00). Si tienes duda de si dos filas son la misma persona, NO las juntes.
4. ESTADO: Crea una columna llamada ESTADO con uno de estos valores por fila:
   - "UNIFICADO" si combinaste dos o más filas duplicadas.
   - "CORREGIDO" si limpiaste el nombre o diste formato al teléfono.
   - "REVISION_MANUAL" si el teléfono no tiene 10 dígitos o hay duda de duplicidad.
   - "SIN_CAMBIOS" si el registro ya estaba limpio.

Al terminar, entrégame:
- La tabla limpia con las columnas exactas: CLIENTE, TELÉFONO, SALDO, ESTADO (en formato descargable o lista para copiar a Excel).
- Un resumen de control con: total de filas iniciales, total de filas finales, suma total de SALDO inicial y suma total de SALDO final (ambas sumas deben coincidir exactamente).
```

## 2. Detectar duplicados confusos sin unirlos todavía

Cuándo usarlo: Úsalo antes de unificar saldos cuando sospeches que hay clientes distintos con nombres parecidos o teléfonos compartidos.

```text
Analiza la siguiente lista de clientes de mi columna [COLUMNA DE CLIENTE] y teléfonos de [COLUMNA DE TELÉFONO]. No modifiques ni sumes nada todavía. Solo genera una tabla con los pares o grupos de filas que parezcan duplicados por errores de dedo, apellidos invertidos o nombres incompletos. Incluye el número de fila original, los nombres comparados, sus teléfonos y por qué crees que podrían ser la misma persona, para que yo autorice cuáles sí se deben unificar:

[PEGA AQUÍ TUS FILAS]
```

## 3. Generar fórmulas de Excel si no puedes subir el archivo

Cuándo usarlo: Úsalo cuando las políticas de tu empresa no permitan subir bases de clientes a ningún asistente de IA.

```text
No puedo subir mi base de datos por políticas de privacidad. En mi archivo de Excel (en español), el nombre del cliente está en la celda [CELDA DE NOMBRE, EJ: A2], el teléfono sucio está en [CELDA DE TELÉFONO, EJ: B2] y el saldo está en [CELDA DE SALDO, EJ: C2]. Escribe las fórmulas exactas de Excel en español para:
1. Limpiar espacios extra y poner mayúsculas iniciales al nombre.
2. Extraer solo los números del teléfono, quedarme con los últimos 10 dígitos y darle formato XX-XXXX-XXXX.
3. Identificar con una alerta si un teléfono o nombre limpio se repite más de una vez en la columna.
```

## 4. Auditar sumas y cuadrar saldos después de limpiar

Cuándo usarlo: Úsalo para verificar que ningún saldo se haya perdido o duplicado por error durante la limpieza.

```text
Quiero auditar el resultado de la limpieza. Mi tabla original tenía [NÚMERO DE FILAS ORIGINALES] filas y la suma de la columna [COLUMNA DE SALDO] era [SUMA ORIGINAL]. Revisa la tabla limpia que generaste y verifica:
1. ¿Cuánto suma la columna SALDO en la tabla limpia?
2. Si hay alguna diferencia contra [SUMA ORIGINAL], indícame en qué clientes o filas ocurrió la discrepancia.
3. Muéstrame el desglose de todas las filas marcadas como "UNIFICADO", indicando qué montos individuales se sumaron para llegar al saldo final de cada cliente.
```

## Antes de usar el resultado

- Anonimiza datos personales y confidenciales antes de usar cualquier herramienta de IA.
- Verifica cifras, nombres, fechas y compromisos contra la fuente original.
- Revisa el resultado antes de compartirlo: es un borrador, no una respuesta final.
