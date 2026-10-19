"""
Renombrador seguro de archivos por lote a partir de un CSV de control.

Qué hace:
  Lee un archivo CSV con las columnas 'ARCHIVO ORIGINAL' y 'NUEVO NOMBRE',
  busca los archivos en la carpeta de origen y crea copias con el nuevo
  nombre dentro de una carpeta de salida nueva. Nunca borra ni modifica
  los archivos originales.

Requisitos:
  Python 3.10 o superior (usa únicamente la biblioteca estándar).

Instalación:
  No requiere instalar paquetes externos con pip.

Ejemplo de uso:
  python renombrar_lote.py --carpeta ./mis_pdfs --csv control.csv --salida ./ordenados
"""

import argparse
import csv
import shutil
import sys
from pathlib import Path


def sanitizar_nombre(nombre: str) -> str:
    """Elimina rutas y caracteres inválidos para nombres de archivo."""
    nombre_limpio = Path(nombre.strip()).name
    caracteres_invalidos = '<>:"/\\|?*'
    for char in caracteres_invalidos:
        nombre_limpio = nombre_limpio.replace(char, "_")
    return nombre_limpio


def procesar_lote(carpeta_origen: Path, archivo_csv: Path, carpeta_salida: Path) -> None:
    if not carpeta_origen.exists() or not carpeta_origen.is_dir():
        print(f"Error: La carpeta de origen no existe: {carpeta_origen}")
        sys.exit(1)

    if not archivo_csv.exists() or not archivo_csv.is_file():
        print(f"Error: El archivo CSV no existe: {archivo_csv}")
        sys.exit(1)

    if carpeta_salida.exists():
        print(
            f"Aviso de seguridad: La carpeta de salida '{carpeta_salida}' ya existe. "
            "Elige un nombre de carpeta nuevo para no sobrescribir archivos."
        )
        sys.exit(1)

    with archivo_csv.open(mode="r", encoding="utf-8-sig", newline="") as f:
        lector = csv.DictReader(f)
        if not lector.fieldnames:
            print("Error: El archivo CSV está vacío o no tiene encabezados.")
            sys.exit(1)

        columnas = {col.strip().upper(): col for col in lector.fieldnames}
        if "ARCHIVO ORIGINAL" not in columnas or "NUEVO NOMBRE" not in columnas:
            print(
                "Error: El CSV debe contener las columnas "
                "'ARCHIVO ORIGINAL' y 'NUEVO NOMBRE'."
            )
            sys.exit(1)

        col_orig = columnas["ARCHIVO ORIGINAL"]
        col_nuevo = columnas["NUEVO NOMBRE"]
        filas = list(lector)

    carpeta_salida.mkdir(parents=True, exist_ok=False)
    copiados = 0
    omitidos = 0

    for idx, fila in enumerate(filas, start=2):
        raw_orig = (fila.get(col_orig) or "").strip()
        raw_nuevo = (fila.get(col_nuevo) or "").strip()

        if not raw_orig or not raw_nuevo:
            print(f"Fila {idx}: Omitida por tener nombres vacíos.")
            omitidos += 1
            continue

        nombre_orig = Path(raw_orig).name
        nombre_nuevo = sanitizar_nombre(raw_nuevo)

        ruta_orig = carpeta_origen / nombre_orig
        if not ruta_orig.exists() or not ruta_orig.is_file():
            print(f"Fila {idx}: No se encontró el archivo original '{nombre_orig}'.")
            omitidos += 1
            continue

        ext_orig = ruta_orig.suffix.lower()
        ext_nueva = Path(nombre_nuevo).suffix.lower()
        if ext_orig and ext_orig != ext_nueva:
            nombre_nuevo = f"{Path(nombre_nuevo).stem}{ruta_orig.suffix}"

        ruta_destino = carpeta_salida / nombre_nuevo
        if ruta_destino.exists():
            print(
                f"Fila {idx}: El archivo destino '{nombre_nuevo}' está duplicado "
                "en la lista. Se omite para no sobrescribir."
            )
            omitidos += 1
            continue

        shutil.copy2(ruta_orig, ruta_destino)
        copiados += 1

    print(
        f"Proceso finalizado. Archivos copiados con nuevo nombre: {copiados}. "
        f"Omitidos: {omitidos}."
    )
    print(f"Revisa tus archivos en: {carpeta_salida}")


def main() -> None:
    parser = argparse.ArgumentParser(
        description="Crea copias renombradas de tus archivos según un CSV de control."
    )
    parser.add_argument(
        "--carpeta",
        required=True,
        type=Path,
        help="Ruta de la carpeta donde están los archivos originales.",
    )
    parser.add_argument(
        "--csv",
        required=True,
        type=Path,
        help="Ruta del archivo CSV con las columnas ARCHIVO ORIGINAL y NUEVO NOMBRE.",
    )
    parser.add_argument(
        "--salida",
        required=True,
        type=Path,
        help="Ruta de la carpeta nueva donde se guardarán las copias renombradas.",
    )
    args = parser.parse_args()
    procesar_lote(args.carpeta, args.csv, args.salida)


if __name__ == "__main__":
    main()
