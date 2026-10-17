"""
cruzar_ventas_catalogo.py
Cruza una hoja de ventas con una hoja de catálogo en un archivo Excel (.xlsx),
calcula el margen (venta menos costo) y genera una columna de alerta sin
modificar ni sobrescribir el archivo original.

Requisitos:
  Python 3.10 o superior

Instalación:
  pip install pandas openpyxl

Ejemplo de uso:
  python cruzar_ventas_catalogo.py --entrada Ventas_vs_Catalogo.xlsx --salida Ventas_Corregidas.xlsx --minimo 100
"""

import argparse
from pathlib import Path
import sys
import pandas as pd


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Cruza hojas de ventas y catálogo por SKU y calcula márgenes."
    )
    parser.add_argument(
        "--entrada",
        required=True,
        help="Ruta del archivo Excel (.xlsx) de entrada.",
    )
    parser.add_argument(
        "--salida",
        required=True,
        help="Ruta del archivo Excel (.xlsx) nuevo que se creará.",
    )
    parser.add_argument(
        "--hoja-ventas",
        default="Ventas",
        help="Nombre de la hoja de ventas (por defecto: Ventas).",
    )
    parser.add_argument(
        "--hoja-catalogo",
        default="Catalogo",
        help="Nombre de la hoja de catálogo (por defecto: Catalogo).",
    )
    parser.add_argument(
        "--col-sku",
        default="SKU",
        help="Nombre de la columna clave en ambas hojas (por defecto: SKU).",
    )
    parser.add_argument(
        "--col-venta",
        default="VENTA",
        help="Columna con el monto de venta (por defecto: VENTA).",
    )
    parser.add_argument(
        "--col-costo",
        default="COSTO",
        help="Columna con el costo en el catálogo (por defecto: COSTO).",
    )
    parser.add_argument(
        "--minimo",
        type=float,
        default=100.0,
        help="Margen mínimo antes de marcar ROJO (por defecto: 100.0).",
    )
    return parser.parse_args()


def limpiar_moneda(serie: pd.Series) -> pd.Series:
    texto = serie.astype(str).str.replace("$", "", regex=False).str.replace(",", "", regex=False).str.strip()
    return pd.to_numeric(texto, errors="coerce")


def main() -> None:
    args = parse_args()
    ruta_entrada = Path(args.entrada)
    ruta_salida = Path(args.salida)

    if not ruta_entrada.exists():
        print(f"Error: No se encontró el archivo de entrada '{ruta_entrada}'.")
        sys.exit(1)

    if ruta_salida.exists():
        print(
            f"Error: El archivo de salida '{ruta_salida}' ya existe. "
            "Elige otro nombre para no sobrescribir tus archivos."
        )
        sys.exit(1)

    try:
        ventas = pd.read_excel(ruta_entrada, sheet_name=args.hoja_ventas)
        catalogo = pd.read_excel(ruta_entrada, sheet_name=args.hoja_catalogo)
    except Exception as exc:
        print(f"Error al leer las hojas del archivo Excel: {exc}")
        sys.exit(1)

    for nombre, df, cols in [
        (args.hoja_ventas, ventas, [args.col_sku, args.col_venta]),
        (args.hoja_catalogo, catalogo, [args.col_sku, args.col_costo]),
    ]:
        faltantes = [c for c in cols if c not in df.columns]
        if faltantes:
            print(f"Error: En la hoja '{nombre}' faltan las columnas: {faltantes}")
            sys.exit(1)

    ventas[args.col_sku] = ventas[args.col_sku].astype(str).str.strip().str.upper()
    catalogo[args.col_sku] = catalogo[args.col_sku].astype(str).str.strip().str.upper()
    catalogo_unico = catalogo[[args.col_sku, args.col_costo]].drop_duplicates(subset=[args.col_sku])

    cruce = pd.merge(ventas, catalogo_unico, on=args.col_sku, how="left")
    venta_num = limpiar_moneda(cruce[args.col_venta])
    costo_num = limpiar_moneda(cruce[args.col_costo])

    cruce["MARGEN"] = venta_num - costo_num

    def clasificar(fila: pd.Series) -> str:
        if pd.isna(fila["MARGEN"]):
            return "SIN_CATALOGO"
        if fila["MARGEN"] < args.minimo:
            return "ROJO"
        return "OK"

    cruce["ALERTA"] = cruce.apply(clasificar, axis=1)
    resultado = cruce[[args.col_sku, args.col_venta, "MARGEN", "ALERTA"]]

    resultado.to_excel(ruta_salida, index=False, sheet_name="Ventas_Corregidas")
    sin_cruce = int((resultado["ALERTA"] == "SIN_CATALOGO").sum())
    en_rojo = int((resultado["ALERTA"] == "ROJO").sum())
    print(
        f"Listo. Se guardó '{ruta_salida}' con {len(resultado)} filas "
        f"({en_rojo} en ROJO, {sin_cruce} sin coincidencia en catálogo). "
        "Revisa una muestra contra tu archivo original."
    )


if __name__ == "__main__":
    main()
