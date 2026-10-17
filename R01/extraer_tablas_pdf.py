"""
Extractor local de tablas de PDF a Excel para revisión manual.

Qué hace:
  Lee todas las páginas de un archivo PDF con texto seleccionable, detecta
  las tablas presentes y las guarda en un archivo Excel (.xlsx) agregando
  la página de origen y una columna de estado para revisión.

Requisitos:
  Python 3.10 o superior
  Paquetes: pdfplumber, pandas, openpyxl

Instalación:
  pip install pdfplumber pandas openpyxl

Ejemplo de uso:
  python extraer_tablas_pdf.py --entrada Factura_Corporativa_Marzo.pdf --salida Facturas_Marzo_Limpio.xlsx
"""

import argparse
from pathlib import Path
import sys
import pandas as pd
import pdfplumber


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Extrae tablas de un PDF local y genera un borrador en Excel para revisión."
    )
    parser.add_argument(
        "--entrada",
        required=True,
        help="Ruta del archivo PDF de entrada."
    )
    parser.add_argument(
        "--salida",
        required=True,
        help="Ruta del archivo Excel (.xlsx) de salida (no debe existir previamente)."
    )
    return parser.parse_args()


def limpiar_celda(valor: object) -> str:
    if valor is None:
        return "VACÍO"
    texto = str(valor).replace("\n", " ").strip()
    return texto if texto else "VACÍO"


def extraer_tablas(ruta_pdf: Path) -> pd.DataFrame:
    filas_acumuladas: list[dict[str, object]] = []
    with pdfplumber.open(ruta_pdf) as pdf:
        for num_pagina, pagina in enumerate(pdf.pages, start=1):
            tablas = pagina.extract_tables() or []
            for num_tabla, tabla in enumerate(tablas, start=1):
                for fila in tabla:
                    if not fila or all(celda is None or str(celda).strip() == "" for celda in fila):
                        continue
                    celdas = [limpiar_celda(c) for c in fila]
                    while len(celdas) < 3:
                        celdas.append("VACÍO")
                    registro: dict[str, object] = {
                        "CÓDIGO": celdas[0],
                        "CONCEPTO": celdas[1],
                        "TOTAL": celdas[2],
                        "ESTADO": "REVISAR",
                        "PÁGINA_ORIGEN": num_pagina,
                        "TABLA_ORIGEN": num_tabla,
                    }
                    if len(celdas) > 3:
                        registro["COLUMNAS_EXTRA"] = " | ".join(celdas[3:])
                    filas_acumuladas.append(registro)
    return pd.DataFrame(filas_acumuladas)


def main() -> None:
    args = parse_args()
    ruta_entrada = Path(args.entrada)
    ruta_salida = Path(args.salida)

    if not ruta_entrada.exists() or not ruta_entrada.is_file():
        print(f"Error: No se encontró el archivo de entrada '{ruta_entrada}'.", file=sys.stderr)
        sys.exit(1)

    if ruta_salida.exists():
        print(
            f"Error: El archivo de salida '{ruta_salida}' ya existe. "
            "Elige otro nombre para no sobrescribir tus archivos.",
            file=sys.stderr,
        )
        sys.exit(1)

    if ruta_salida.suffix.lower() != ".xlsx":
        print("Error: El archivo de salida debe terminar en .xlsx", file=sys.stderr)
        sys.exit(1)

    print(f"Leyendo tablas de '{ruta_entrada}'...")
    df = extraer_tablas(ruta_entrada)

    if df.empty:
        print(
            "Aviso: No se detectaron tablas con texto seleccionable. "
            "Si el PDF es un escaneo o foto, usa los prompts con tu asistente de IA."
        )
        sys.exit(0)

    df.to_excel(ruta_salida, index=False)
    print(
        f"Listo: Se exportaron {len(df)} filas a '{ruta_salida}'. "
        "Recuerda cotejar los montos y totales contra el PDF original."
    )


if __name__ == "__main__":
    main()
