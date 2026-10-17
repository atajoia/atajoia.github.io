# Excel: entender y corregir una fórmula

Recurso gratuito de **Atajo IA** que acompaña al reel **R05 · Fórmulas Imposibles y Macros en Excel sin Saber Código** (palabra clave: EXCEL).

> **Material educativo.** Úsalo como borrador: revisa cada resultado antes de usarlo o compartirlo. No sustituye la revisión de una persona ni la asesoría profesional.

## Qué es

Esta guía te ayuda a crear, entender y corregir fórmulas de cruce de datos y alertas en Excel sin saber programar. Está pensada para oficinistas, analistas y dueños de negocio que trabajan con inventarios, catálogos o reportes de ventas. No reemplaza la validación contable ni garantiza exactitud automática: toda fórmula o script produce un borrador que debes verificar con tus datos reales.

**Para qué sirve:** Obtener una fórmula explicada y probarla con un caso controlado.

## Qué incluye

- `README.md`: Guía: qué es, cómo usarlo paso a paso, requisitos y privacidad.
- `PROMPT_MAESTRO.md`: Prompts listos para copiar en tu asistente de IA.
- `plantilla_excel.csv`: Plantilla con las columnas de la demo (SKU, VENTA, MARGEN, ALERTA); las filas EJEMPLO son ilustrativas: bórralas y pega tus datos.
- `cruzar_ventas_catalogo.py`: Cruza un archivo Excel de ventas con una hoja de catálogo por SKU, calcula el margen y marca alertas en un archivo nuevo sin modificar el original.

## Requisitos

- Microsoft Excel (2016, 2021, 365) o Google Sheets
- Acceso a un asistente de IA aprobado por tu organización
- Una copia de prueba de tu archivo con datos ficticios o anonimizados
- Para el script (opcional): Python 3.10 o superior y los paquetes `openpyxl pandas`.

## Cómo usarlo paso a paso

1. Crea una copia de tu archivo de trabajo y deja solo unas 10 filas con datos ficticios para hacer pruebas seguras.
2. Identifica qué idioma, versión de Excel y separador de argumentos (coma o punto y coma) usa tu computadora.
3. Abre el archivo PROMPT_MAESTRO.md, copia el prompt principal y completa los corchetes describiendo tus columnas como en la plantilla CSV.
4. Si ya tienes una fórmula que devuelve #N/D u otro error, usa el primer prompt complementario para que la IA diagnostique la falla.
5. Pega la fórmula sugerida en tu tabla de prueba y confirma que calcule bien tanto los cruces encontrados como los casos con margen bajo.
6. Compara manualmente una muestra de filas contra tu catálogo original para verificar que los montos, márgenes y alertas coincidan antes de aplicarla a todo el libro.

## Script de Python (opcional)

`cruzar_ventas_catalogo.py`: Cruza un archivo Excel de ventas con una hoja de catálogo por SKU, calcula el margen y marca alertas en un archivo nuevo sin modificar el original.

```bash
pip install openpyxl pandas
python cruzar_ventas_catalogo.py --entrada Ventas_vs_Catalogo.xlsx --salida Ventas_Corregidas.xlsx --minimo 100
```

El script se ejecuta en tu computadora, no se conecta a internet y no borra archivos. Pruébalo primero con una copia de tus archivos y revisa el resultado.

## Privacidad y advertencias

- Prueba primero con una copia y pocas filas.
- Confirma nombres de funciones, separadores y versión.
- No compartas libros con información de clientes, nómina o finanzas.
- No subas libros completos ni capturas con nombres de clientes, precios confidenciales, costos reales o nómina a asistentes de IA externos.
- Reemplaza códigos, montos y descripciones por valores ficticios antes de pedir ayuda con una fórmula.
- Prueba siempre las fórmulas o macros primero en una copia del archivo, nunca sobre el documento maestro de la empresa.
- Verifica manualmente una muestra de resultados contra tu catálogo original: un espacio oculto o un código duplicado puede alterar el cálculo sin mostrar error.
- No subas documentos con datos personales, financieros o confidenciales a herramientas de IA que tu organización no haya aprobado.

## Licencia

Licencia sugerida: **MIT**. Puedes usar, copiar, modificar y compartir este material, incluso con fines comerciales, siempre que conserves este aviso. Se entrega "tal cual", sin garantías de ningún tipo: es material educativo de Atajo IA y no constituye asesoría profesional.

_Borrador preparado con ayuda de IA el 2026-10-16. Revísalo antes de usarlo._
