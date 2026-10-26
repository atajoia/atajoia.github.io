# Excel Web: corrige #N/A por espacios en BUSCARV

Recurso gratuito de Atajo IA · R25 · ESPACIOS

## Herramienta y preparación

Microsoft Excel para la web (gratuito con cuenta de Microsoft)

- Cuenta gratuita de Microsoft y navegador web.
- Libro con Hoja1 (A2:A4 con claves 'SKU-104 ', 'SKU-105 ', 'SKU-106') y Hoja2 (A2:B4 con claves limpias y precios $420.00, $185.00, $950.00).

Usa DATOS_PRACTICA.txt como entrada. Son datos ficticios, no una transcripción real.

## Pasos del video

1. **Comprueba el espacio oculto:** En la celda C2 de Hoja1 escribe =LARGO(A2) y pulsa Enter. Comprueba que devuelve 8 en lugar de 7.
2. **Envuelve la clave con ESPACIOS:** En la celda B2 escribe =BUSCARV(ESPACIOS(A2), Hoja2!A:B, 2, FALSO) y pulsa Enter.
3. **Rellena y guarda:** Arrastra la esquina inferior derecha de B2 hasta B4. Verifica los tres importes y ve a Archivo > Guardar como > Descargar una copia.

## Prompt completo

```text
=BUSCARV(ESPACIOS(A2), Hoja2!A:B, 2, FALSO)
```

## Comprobación

Se espera que la celda B2 reemplace el error #N/A por $420.00 y el rango B2:B4 muestre todos los precios de Hoja2 sin errores.

RESULTADO_ESPERADO.csv es una referencia ilustrativa; compara cada dato con la entrada. La respuesta de una IA puede variar y requiere revisión.

## Fuente oficial

https://support.microsoft.com/es-es/office/funci%C3%B3n-espacios-410388fa-c5df-49c6-b16c-9e5630b479f9

La fuente documenta el uso de la herramienta; esta guía no es una grabación de su ejecución.

## Uso responsable

Trabaja con copias y datos ficticios. No pegues información personal o confidencial de tu trabajo en servicios que tu organización no haya aprobado.

Licencia MIT. Material educativo de Atajo IA, sin garantías.
