# Revisión R14

| Fila de origen | id\_cliente | nombre | telefono | saldo | Nombre propuesto | Teléfono propuesto | Revisión |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | C001 |  ana  lopez  | 55 1000 1001 | 1200.00 | ana lopez | 5510001001 | Repetición por ID en filas 1, 3: conservar, no sumar |
| 2 | C002 | bruno diaz | +52 55 1000 1002 | 800.00 | bruno diaz | 5510001002 | Conflicto del mismo ID en filas 2, 6: conservar y cotejar |
| 3 | C001 | Ana Lopez | 5510001001 | 1200.00 | Ana Lopez | 5510001001 | Repetición por ID en filas 1, 3: conservar, no sumar |
| 4 | C003 | ANA LOPEZ | 5510001003 | 500.00 | ANA LOPEZ | 5510001003 | Sin conflicto detectado por estas reglas; verificar |
| 5 | C004 | carla neri | 551000100 | 350.00 | carla neri | 551000100 | Teléfono por revisar; no se completa |
| 6 | C002 | Bruno Diaz | 5510001002 | 950.00 | Bruno Diaz | 5510001002 | Conflicto del mismo ID en filas 2, 6: conservar y cotejar |
| 7 |  | Bruno Diaz | 5510001002 | 800.00 | Bruno Diaz | 5510001002 | ID vacío: por confirmar; no unir por nombre |

## Cambios propuestos

| Fila | Campo | Original | Propuesto |
| --- | --- | --- | --- |
| Fila 1 | nombre |  ana  lopez  | ana lopez |
| Fila 1 | telefono | 55 1000 1001 | 5510001001 |
| Fila 2 | telefono | +52 55 1000 1002 | 5510001002 |

Las columnas originales conservan la evidencia. Resolver cada conflicto con la fuente autorizada, sin borrar filas ni sumar saldos.
