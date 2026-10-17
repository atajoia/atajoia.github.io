# Prompt maestro · Excel: entender y corregir una fórmula

Recurso de Atajo IA para el reel R05. Copia cada bloque en el asistente de IA que tu organización permita usar, reemplaza los [MARCADORES] y revisa el resultado antes de usarlo.

## 1. Prompt principal

Obtener una fórmula explicada y probarla con un caso controlado.

```text
Ayúdame con una fórmula de Excel. Uso Excel en [IDIOMA Y VERSIÓN]. Quiero [RESULTADO]. Las columnas relevantes son [DESCRIPCIÓN SIN DATOS REALES]. Devuelve: 1) fórmula compatible, 2) explicación breve de cada parte, 3) un ejemplo pequeño para probar y 4) posibles causas de error. Si faltan datos, pregúntame antes de elegir una fórmula. No supongas que el resultado es correcto sin validarlo.
```

## 2. Diagnosticar error #N/D o #¡VALOR!

Cuándo usarlo: Úsalo cuando ya escribiste una fórmula y Excel devuelve un código de error.

```text
Mi fórmula actual en Excel ([IDIOMA Y VERSIÓN]) es: [PEGA TU FÓRMULA AQUÍ]. Me devuelve el error [TIPO DE ERROR, POR EJEMPLO #N/D]. La hoja origen tiene las columnas [COLUMNAS HOJA 1] y la hoja de catálogo tiene [COLUMNAS HOJA 2]. Explícame paso a paso por qué falla, cómo limpiar posibles espacios o formatos distintos en la clave de búsqueda y dame la fórmula corregida usando separador [COMA O PUNTO Y COMA].
```

## 3. Regla para formato condicional en rojo

Cuándo usarlo: Úsalo cuando quieras resaltar en color las filas que cumplan una condición de margen o alerta.

```text
Uso Excel en [IDIOMA Y VERSIÓN]. Quiero aplicar formato condicional para pintar de rojo toda la fila cuando la columna [LETRA DE COLUMNA DE MARGEN O ALERTA] sea [CONDICIÓN, POR EJEMPLO: MENOR A 100 O IGUAL A ROJO]. Mis datos empiezan en la fila [NÚMERO DE FILA]. Dime exactamente en qué menú entrar, qué rango seleccionar y qué fórmula escribir en la regla de formato condicional.
```

## 4. Alternativa con Power Query o VBA comentado

Cuándo usarlo: Úsalo cuando el archivo tenga miles de filas y prefieras automatizar el cruce sin fórmulas pesadas.

```text
Necesito cruzar dos tablas en Excel ([IDIOMA Y VERSIÓN]) sin llenar la hoja de fórmulas lentas. La tabla de ventas se llama [NOMBRE TABLA 1] y el catálogo se llama [NOMBRE TABLA 2]; ambas se unen por la columna [COLUMNA CLAVE]. Dame dos opciones: 1) los pasos exactos para unirlas con Power Query y calcular el margen, y 2) una macro VBA sencilla y comentada línea por línea que haga el cruce en una hoja nueva sin borrar mis datos originales.
```

## Antes de usar el resultado

- Prueba primero con una copia y pocas filas.
- Confirma nombres de funciones, separadores y versión.
- No compartas libros con información de clientes, nómina o finanzas.
