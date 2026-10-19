"""
Extrae texto y tablas de archivos PDF de cotizaciones en una carpeta local
y los guarda en un archivo Excel sin modificar los originales.

Requisitos:
  Python 3.10 o superior
  Instalación: pip install pdfplumber pandas openpyxl

Ejemplo de uso:
  python extraer_cotizaciones_pdf.py --carpeta ./cotizaciones --salida resultado.xlsx
"""

import argparse
from pathlib import Path
import sys
import pandas as pd
import pdfplumber


def procesar_pdfs(carpeta_entrada: Path) -> tuple[list[dict], list[dict]]:
    archivos_pdf = sorted(carpeta_entrada.glob("*.pdf"))
    if not archivos_pdf:
        print(f"Error: No se encontraron archivos PDF en '{carpeta_entrada}'.")
        sys.exit(1)

    textos = []
    tablas_extraidas = []

    for archivo in archivos_pdf:
        try:
            with pdfplumber.open(archivo) as pdf:
                for num_pag, pagina in enumerate(pdf.pages, start=1):
                    texto = pagina.extract_text() or ""
                    textos.append({
                        "ARCHIVO": archivo.name,
                        "PAGINA": num_pag,
                        "TEXTO_EXTRAIDO": texto.strip()
                    })
                    tablas = pagina.extract_tables()
                    for num_tabla, tabla in enumerate(tablas, start=1):
                        for fila in tabla:
                            fila_limpia = [
                                (celda.replace("\n", " ").strip() if celda else "")
                                for celda in fila
                            ]
                            tablas_extraidas.append({
                                "ARCHIVO": archivo.name,
                                "PAGINA": num_pag,
                                "TABLA": num_tabla,
                                "CONTENIDO_FILA": " | ".join(fila_limpia)
                            })
        except Exception as exc:
            print(f"Aviso: No se pudo leer '{archivo.name}': {exc}")

    return textos, tablas_extraidas


def main() -> None:
    parser = argparse.ArgumentParser(
        description="Extrae texto y tablas de PDFs de cotizaciones a un archivo Excel."
    )
    parser.add_argument(
        "--carpeta",
        required=True,
        help="Ruta de la carpeta que contiene los archivos PDF de las cotizaciones."
    )
    parser.add_argument(
        "--salida",
        required=True,
        help="Ruta del archivo Excel (.xlsx) nuevo donde se guardará la extracción."
    )
    args = parser.parse_args()

    carpeta = Path(args.carpeta)
    salida = Path(args.salida)

    if not carpeta.exists() or not carpeta.is_dir():
        print(f"Error: La carpeta '{carpeta}' no existe o no es válida.")
        sys.exit(1)

    if salida.exists():
        print(f"Error: El archivo de salida '{salida}' ya existe. Usa otro nombre para no sobrescribirlo.")
        sys.exit(1)

    if salida.suffix.lower() != ".xlsx":
        print("Error: El archivo de salida debe terminar en .xlsx")
        sys.exit(1)

    textos, tablas = procesar_pdfs(carpeta)

    df_textos = pd.DataFrame(textos)
    df_tablas = pd.DataFrame(tablas)
    df_plantilla = pd.DataFrame(columns=["PROVEEDOR", "ENTREGA", "COSTO NETO", "DECISIÓN"])

    with pd.ExcelWriter(salida, engine="openpyxl") as writer:
        df_plantilla.to_excel(writer, sheet_name="Matriz_Decision", index=False)
        df_textos.to_excel(writer, sheet_name="Textos_PDF", index=False)
        if not df_tablas.empty:
            df_tablas.to_excel(writer, sheet_name="Tablas_PDF", index=False)

    print(f"Proceso completado. Se creó el archivo '{salida}' con la información extraída.")


if __name__ == "__main__":
    main()
