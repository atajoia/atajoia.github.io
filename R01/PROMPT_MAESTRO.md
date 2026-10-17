# Prompt maestro · PDF a Excel: extracción con revisión

Recurso de Atajo IA para el reel R01. Copia cada bloque en el asistente de IA que tu organización permita usar, reemplaza los [MARCADORES] y revisa el resultado antes de usarlo.

## 1. Prompt principal

Convertir tablas de un documento en filas revisables, sin asumir que la extracción quedó correcta.

```text
Actúa como asistente de extracción de datos. Analiza el archivo que adjunto y extrae únicamente las filas de la tabla indicada: [NOMBRE DE TABLA O PÁGINAS]. Devuelve CSV con estas columnas y en este orden: CÓDIGO, CONCEPTO, TOTAL, ESTADO. Conserva los valores originales, marca como VACÍO cualquier dato que no aparezca y no calcules ni completes información. Al final enumera las páginas revisadas y las celdas dudosas. No incluyas comentarios dentro del CSV.
```

## 2. Auditoría de sumas y celdas dudosas

Cuándo usarlo: Úsalo después de extraer la tabla para detectar diferencias entre los renglones extraídos y el total impreso en el documento.

```text
A partir de los datos extraídos anteriormente, lista únicamente las filas donde el monto sea ilegible, tenga formato ambiguo o parezca incompleto. Después, suma los valores numéricos de la columna [COLUMNA DE TOTALES] e indícame si el resultado coincide con el total impreso de [MONTO TOTAL DEL DOCUMENTO]. No inventes ni ajustes ningún número para que cuadre.
```

## 3. Extracción desde foto o escaneo borroso

Cuándo usarlo: Úsalo cuando tengas una foto tomada con celular o un PDF escaneado con sombras o texto inclinado.

```text
Analiza la imagen adjunta y transcribe las filas visibles hacia una tabla CSV con las columnas [COLUMNAS]. Si algún carácter, código o dígito está borroso, manchado o cortado por la sombra, escribe [ILEGIBLE] en esa celda exacta. No adivines ni completes palabras o montos por contexto.
```

## 4. Normalización de montos para Excel

Cuándo usarlo: Úsalo cuando los montos extraídos traigan símbolos de moneda, espacios o separadores que impidan sumarlos en tu hoja de cálculo.

```text
Toma el CSV anterior y estandariza únicamente la columna [NOMBRE DE COLUMNA DE MONTO]: elimina el símbolo de moneda y los espacios, usa punto para separar decimales y quita los separadores de miles. Si un valor no es numérico, déjalo igual y cambia la columna ESTADO de esa fila a 'REVISAR'. Devuelve el CSV completo sin comentarios adicionales.
```

## Antes de usar el resultado

- Compara una muestra de filas con el PDF original.
- Revisa fechas, separadores decimales, moneda y totales.
- No cargues facturas o archivos con datos personales o confidenciales en servicios no aprobados.
