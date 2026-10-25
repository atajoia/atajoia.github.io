# Proceso estructurado

| ID | Acción | Responsable | Sí / siguiente | No |
| --- | --- | --- | --- | --- |
| S1 | Registrar solicitud | Operaciones | S2 | — |
| S2 | ¿Hay presupuesto? | Finanzas | S3 | POST |
| S3 | ¿Proveedor registrado? | Administración | S4 | PEND |
| S4 | ¿Monto mayor a 5000 MXN? | Finanzas | DIR | AUT |
| DIR | ¿Dirección aprueba? | Dirección | PAGO | RECH |
| AUT | Autorizar monto menor o igual a 5000 | Finanzas | PAGO | — |
| PAGO | Registrar pago | Tesorería | FIN | — |
| POST | Postpuesto | Finanzas | — | — |
| PEND | Pendiente de datos | Administración | — | — |
| RECH | Rechazado | Dirección | — | — |
| FIN | Pago registrado | Tesorería | — | — |
