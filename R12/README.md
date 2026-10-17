# Generador de Manuales Paso a Paso y Control de Capturas

Recurso gratuito de **Atajo IA** que acompaña al reel **R12 · Generador Automático de Manuales con IA** (palabra clave: MANUAL).

> **Material educativo.** Úsalo como borrador: revisa cada resultado antes de usarlo o compartirlo. No sustituye la revisión de una persona ni la asesoría profesional.

## Qué es

Este recurso ayuda a encargados de operaciones, recursos humanos y líderes de equipo a estructurar guías operativas claras a partir de sus bitácoras de clics o grabadores de procesos (como la Grabadora de acciones de Windows, Scribe o Tango). Incluye la plantilla de control de capturas y un script local para armar el documento editable en Word. No reemplaza la revisión humana ni garantiza que el ocultamiento automático de datos sensibles sea infalible, por lo que cada imagen debe verificarse antes de compartir el manual.

## Qué incluye

- `README.md`: Guía: qué es, cómo usarlo paso a paso, requisitos y privacidad.
- `PROMPT_MAESTRO.md`: Prompts listos para copiar en tu asistente de IA.
- `plantilla_manual.csv`: Plantilla con las columnas de la demo (PASO, ACCIÓN DETECTADA, CAPTURA, PRIVACIDAD); las filas EJEMPLO son ilustrativas: bórralas y pega tus datos.
- `armar_manual_word.py`: Convierte la plantilla CSV de pasos y una carpeta local de capturas en un borrador de manual en formato Word (.docx) listo para revisar y exportar a PDF.

## Requisitos

- Acceso a un asistente de IA aprobado por tu organización para limpiar y redactar las instrucciones.
- Excel, Google Sheets o cualquier editor de hojas de cálculo para llenar la plantilla CSV.
- Una herramienta de captura de pasos (por ejemplo, la Grabadora de acciones de usuario integrada en Windows o una extensión autorizada por tu área de TI).
- Para el script (opcional): Python 3.10 o superior y los paquetes `pandas python-docx`.

## Cómo usarlo paso a paso

1. Prepara tu pantalla cerrando pestañas ajenas a la tarea y ejecuta el proceso una vez usando el grabador de acciones autorizado en tu trabajo (o tomando las capturas numeradas en una carpeta local).
2. Abre la plantilla CSV incluida y registra la secuencia básica de tus acciones y el nombre de cada archivo de imagen.
3. Copia el contenido de PROMPT_MAESTRO.md en tu asistente de IA y pega tu lista de acciones en bruto para estandarizar la redacción en una tabla limpia.
4. Pasa el texto mejorado a tu plantilla CSV y verifica el estado de la columna PRIVACIDAD en cada fila.
5. Compara la tabla final contra el sistema real para confirmar que no falte ningún clic intermedio, ventana emergente o validación obligatoria.
6. Convierte tu tabla validada en el documento final usando el script local incluido o exportándola a PDF desde tu editor de textos.

## Script de Python (opcional)

`armar_manual_word.py`: Convierte la plantilla CSV de pasos y una carpeta local de capturas en un borrador de manual en formato Word (.docx) listo para revisar y exportar a PDF.

```bash
pip install pandas python-docx
python armar_manual_word.py --csv plantilla_pasos.csv --imagenes ./capturas --titulo "Manual de Facturacion" --salida Manual_Facturacion_Borrador.docx
```

El script se ejecuta en tu computadora, no se conecta a internet y no borra archivos. Pruébalo primero con una copia de tus archivos y revisa el resultado.

## Privacidad y advertencias

- Anonimiza datos personales y confidenciales antes de usar cualquier herramienta de IA.
- Verifica cifras, nombres, fechas y compromisos contra la fuente original.
- Revisa el resultado antes de compartirlo: es un borrador, no una respuesta final.
- Ninguna función de difuminado automático es infalible: revisa visualmente el 100 % de las capturas antes de exportar o compartir el documento.
- Cuando debas ocultar información privada (RFC, sueldos, cuentas, nombres o contraseñas), usa recuadros sólidos opacos y guarda la imagen como copia plana; algunos filtros de desenfoque ligero pueden revertirse o dejar texto legible.
- Si el proceso incluye datos fiscales, bancarios o de nómina, no uses extensiones que suban las capturas a servidores externos sin autorización expresa de tu área de TI.
- Elimina los archivos de grabación en bruto (.rec, .zip o carpetas temporales) una vez que hayas publicado la versión revisada y censurada del manual.
- No subas documentos con datos personales, financieros o confidenciales a herramientas de IA que tu organización no haya aprobado.

## Licencia

Licencia sugerida: **MIT**. Puedes usar, copiar, modificar y compartir este material, incluso con fines comerciales, siempre que conserves este aviso. Se entrega "tal cual", sin garantías de ningún tipo: es material educativo de Atajo IA y no constituye asesoría profesional.

_Borrador preparado con ayuda de IA el 2026-10-17. Revísalo antes de usarlo._
