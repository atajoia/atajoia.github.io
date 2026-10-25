/* Herramientas locales R14–R20. No acceden a red, archivos, DOM ni proveedores de IA. */
const MAX_INPUT = 300000;
const MAX_ROWS = 1000;
const norm = value => String(value ?? "").trim().normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]/g, "");
const text = value => String(value ?? "");
const clean = value => text(value).trim().replace(/\s+/g, " ");
const md = value => text(value).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/[\\|*_\x60\[\]]/g, "\\$&").replace(/\r?\n/g, " ");
const equalName = value => text(value).toLocaleLowerCase("es-MX");
function inputText(value) {
  const result = text(value).replace(/^\uFEFF/, "");
  if (!result.trim()) throw new Error("Pega los datos de práctica o escribe tus datos antes de ejecutar.");
  if (result.length > MAX_INPUT) throw new Error("La entrada supera 300000 caracteres. Trabaja por lotes y conserva el original.");
  return result;
}
function splitRows(source, delimiter) {
  const rows = [];
  let row = [], value = "", quoted = false, closed = false;
  for (let i = 0; i < source.length; i++) {
    const ch = source[i];
    if (quoted) {
      if (ch === '"') {
        if (source[i + 1] === '"') { value += '"'; i++; }
        else { quoted = false; closed = true; }
      } else value += ch;
      continue;
    }
    if (ch === delimiter) { row.push(value); value = ""; closed = false; }
    else if (ch === "\n" || ch === "\r") {
      if (ch === "\r" && source[i + 1] === "\n") i++;
      row.push(value);
      if (row.some(cell => cell.trim())) rows.push(row);
      row = []; value = ""; closed = false;
    } else if (ch === '"' && !value.trim() && !closed) { value = ""; quoted = true; }
    else if (closed && ch.trim()) throw new Error("CSV inválido: hay texto después de cerrar unas comillas.");
    else if (!closed) value += ch;
  }
  if (quoted) throw new Error("CSV inválido: falta cerrar unas comillas.");
  row.push(value);
  if (row.some(cell => cell.trim())) rows.push(row);
  return rows;
}
function delimiterOf(source) {
  const line = source.split(/\r?\n/).find(value => value.trim()) || "";
  const counts = [",", ";", "\t", "|"].map(delimiter => {
    let count = 0, quoted = false;
    for (let i = 0; i < line.length; i++) {
      if (line[i] === '"') {
        if (quoted && line[i + 1] === '"') i++;
        else quoted = !quoted;
      } else if (!quoted && line[i] === delimiter) count++;
    }
    return [delimiter, count];
  });
  counts.sort((a, b) => b[1] - a[1]);
  return counts[0][0];
}
function csvTable(input) {
  const source = inputText(input);
  const raw = splitRows(source, delimiterOf(source));
  if (raw.length < 2) throw new Error("Incluye un encabezado y al menos una fila de datos.");
  const headers = raw.shift().map((value, i) => value.trim() || "Columna_" + (i + 1));
  if (new Set(headers.map(norm)).size !== headers.length) throw new Error("Hay encabezados repetidos; usa un nombre distinto para cada columna.");
  if (raw.length > MAX_ROWS) throw new Error("La práctica admite hasta 1000 filas por lote; no se han descartado filas.");
  const rows = raw.map((row, i) => {
    if (row.length > headers.length) throw new Error("La fila de datos " + (i + 1) + " tiene más campos que el encabezado. Pon entre comillas los textos con comas.");
    return headers.map((_, j) => row[j] ?? "");
  });
  return { headers, rows, source };
}
const indexOf = (headers, aliases) => headers.findIndex(value => aliases.includes(norm(value)));
function required(headers, aliases, label) {
  const index = indexOf(headers, aliases);
  if (index < 0) throw new Error("Falta la columna " + label + ".");
  return index;
}
function isoDate(value) {
  const s = clean(value);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(s)) return "";
  const [year, month, day] = s.split("-").map(Number);
  if (year < 1900 || year > 2199 || month < 1 || month > 12 || day < 1) return "";
  const leap = year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
  const days = [31, leap ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  return day <= days[month - 1] ? s : "";
}
function markdownTable(columns, rows) {
  return "| " + columns.map(md).join(" | ") + " |\n| " + columns.map(() => "---").join(" | ") + " |\n" +
    rows.map(row => "| " + row.map(md).join(" | ") + " |").join("\n");
}
function finiteNumber(value, label, { integer = false, positive = false } = {}) {
  const s = clean(value);
  if (!/^\d+(?:[.,]\d{1,2})?$/.test(s)) throw new Error(label + ": usa un número sin símbolo de moneda ni separadores de miles, como 1000.00.");
  const n = Number(s.replace(",", "."));
  if (!Number.isFinite(n) || n > 100000000000 || (integer && !Number.isInteger(n)) || (positive && n <= 0))
    throw new Error(label + ": el valor no es válido.");
  return n;
}
function uniqueSlug(value) {
  return clean(value).normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-zA-Z0-9_-]+/g, "-").replace(/^[-_]+|[-_]+$/g, "").slice(0, 110);
}
function fileExtension(value) {
  const lower = value.toLowerCase();
  for (const ext of [".tar.gz", ".tar.bz2", ".tar.xz"]) if (lower.endsWith(ext)) return value.slice(-ext.length);
  const dot = value.lastIndexOf(".");
  return dot > 0 && dot < value.length - 1 ? value.slice(dot) : "";
}
function simpleChoice(key, label, value, choices) {
  return { key, label, type: "select", value, choices: choices.map(([value, label]) => ({ value, label })) };
}

const R14 = {
  id: "R14",
  title: "Limpia y revisa una base sin perder registros",
  summary: "Normaliza espacios y teléfonos como propuesta, conserva cada fila y señala IDs repetidos o conflictivos. No suma saldos ni decide identidades por nombre.",
  inputLabel: "Tabla CSV con ID y datos de clientes",
  inputHint: "Incluye id_cliente (o id); nombre, teléfono y saldo son opcionales. Hasta 1000 filas. Las columnas originales se conservan.",
  sample: "id_cliente,nombre,telefono,saldo\nC001, ana  lopez ,55 1000 1001,1200.00\nC002,bruno diaz,+52 55 1000 1002,800.00\nC001,Ana Lopez,5510001001,1200.00\nC003,ANA LOPEZ,5510001003,500.00\nC004,carla neri,551000100,350.00\nC002,Bruno Diaz,5510001002,950.00\n,Bruno Diaz,5510001002,800.00",
  options: [
    simpleChoice("nameCase", "Propuesta de nombres", "spaces", [["spaces", "Solo corregir espacios"], ["title", "Mayúscula inicial por palabra; revisar"]]),
    simpleChoice("phoneRule", "Regla de teléfono declarada para este lote", "mx", [["mx", "México: revisar diez dígitos; retirar +52 explícito"], ["separators", "Solo quitar separadores; conservar prefijo"]])
  ],
  action: "Revisar y preparar propuesta",
  run(input, opts = {}) {
    const data = csvTable(input);
    const idIndex = required(data.headers, ["id", "idcliente", "identificador"], "id_cliente o id");
    const nameIndex = indexOf(data.headers, ["nombre", "cliente", "nombrecliente"]);
    const phoneIndex = indexOf(data.headers, ["telefono", "tel", "celular"]);
    const groups = new Map(), changes = [];
    const prepared = data.rows.map((row, i) => {
      const id = clean(row[idIndex]);
      const nameOriginal = nameIndex < 0 ? "" : row[nameIndex];
      let name = clean(nameOriginal);
      if (opts.nameCase === "title") name = name.toLocaleLowerCase("es-MX").replace(/(^|\s)\p{L}/gu, value => value.toLocaleUpperCase("es-MX"));
      const phoneOriginal = phoneIndex < 0 ? "" : row[phoneIndex];
      let phone = clean(phoneOriginal).replace(/[\s().-]/g, "");
      const phoneRule = opts.phoneRule || "mx";
      if (phoneRule === "mx" && /^\+52\d{10}$/.test(phone)) phone = phone.slice(3);
      const issues = [];
      if (!id) issues.push("ID vacío: por confirmar; no unir por nombre");
      if (phoneIndex >= 0 && phone && (phoneRule === "mx" ? !/^\d{10}$/.test(phone) : !/^\+?\d+$/.test(phone)))
        issues.push("Teléfono por revisar; no se completa");
      if (nameIndex >= 0 && name !== nameOriginal) changes.push(["Fila " + (i + 1), data.headers[nameIndex], nameOriginal, name]);
      if (phoneIndex >= 0 && phone !== phoneOriginal) changes.push(["Fila " + (i + 1), data.headers[phoneIndex], phoneOriginal, phone]);
      const compare = row.map((value, j) => j === nameIndex ? clean(name).toLocaleLowerCase("es-MX") : j === phoneIndex ? phone : clean(value));
      const item = { row, i, id, name, phone, issues, signature: JSON.stringify(compare) };
      if (id) { if (!groups.has(id)) groups.set(id, []); groups.get(id).push(item); }
      return item;
    });
    for (const group of groups.values()) {
      if (group.length < 2) continue;
      const same = new Set(group.map(item => item.signature)).size === 1;
      const origins = group.map(item => item.i + 1).join(", ");
      group.forEach(item => item.issues.push(same ? "Repetición por ID en filas " + origins + ": conservar, no sumar" : "Conflicto del mismo ID en filas " + origins + ": conservar y cotejar"));
    }
    const columns = ["Fila de origen", ...data.headers];
    if (nameIndex >= 0) columns.push("Nombre propuesto");
    if (phoneIndex >= 0) columns.push("Teléfono propuesto");
    columns.push("Revisión");
    const rows = prepared.map(item => {
      const row = [String(item.i + 1), ...item.row];
      if (nameIndex >= 0) row.push(item.name);
      if (phoneIndex >= 0) row.push(item.phone);
      row.push(item.issues.join("; ") || "Sin conflicto detectado por estas reglas; verificar");
      return row;
    });
    return {
      columns, rows,
      notes: [
        "Se conservan " + rows.length + " filas y todas las columnas originales. Las propuestas no sobrescriben los datos.",
        "Los IDs se comparan después de quitar espacios externos, respetando mayúsculas. Nombres parecidos no prueban identidad.",
        "No se ha sumado, sustituido ni consolidado ningún saldo. La coincidencia de reglas no certifica que los datos sean correctos."
      ],
      markdown: "# Revisión R14\n\n" + markdownTable(columns, rows) + "\n\n## Cambios propuestos\n\n" + (changes.length ? markdownTable(["Fila", "Campo", "Original", "Propuesto"], changes) : "No se detectaron cambios de formato.") +
        "\n\nLas columnas originales conservan la evidencia. Resolver cada conflicto con la fuente autorizada, sin borrar filas ni sumar saldos."
    };
  }
};

const R15 = {
  id: "R15",
  title: "Prepara nombres de archivos sin colisiones",
  summary: "Genera una vista previa con fechas y conceptos explícitos. Mantiene extensiones y evita reemplazar nombres existentes. Esta función no toca tus archivos.",
  inputLabel: "Archivo original | fecha del documento | concepto verificado",
  inputHint: "Una línea por archivo con encabezado original|fecha|concepto. Fecha AAAA-MM-DD; concepto puede incluir proveedor e importe. No uses la fecha de modificación como fecha del documento.",
  sample: "original|fecha|concepto\nscan_001.txt|2026-03-04|Luz-Taller_3420-00\ndoc_002.csv|2026-03-05|Red-Oficina_899-00\nnota_003.md|2026-03-05|Red-Oficina_899-00\nnota_004.md|2026-03-05|Red-Oficina_899-00\n2026-03-05_Red-Oficina_899-00.csv|2026-03-05|Red-Oficina_899-00",
  options: [],
  action: "Crear vista previa de nombres",
  run(input) {
    const data = csvTable(input);
    const originalIndex = required(data.headers, ["original", "archivo", "archivooriginal", "nombreoriginal"], "original");
    const dateIndex = required(data.headers, ["fecha", "fechadocumento"], "fecha");
    const conceptIndex = required(data.headers, ["concepto", "descripcion", "proveedor"], "concepto");
    const originals = new Map(), used = new Set();
    data.rows.forEach(row => {
      const key = equalName(row[originalIndex].trim());
      originals.set(key, (originals.get(key) || 0) + 1);
    });
    const plan = data.rows.map((row, i) => {
      const original = row[originalIndex].trim(), date = isoDate(row[dateIndex]), concept = uniqueSlug(row[conceptIndex]);
      const extension = fileExtension(original);
      let issue = "";
      if (!original || /[\\/:*?"<>|\x00-\x1f]/.test(original) || original === "." || original === ".." || /[. ]$/.test(original))
        issue = "Revisar: solo nombres de archivo válidos, sin rutas";
      else if (originals.get(equalName(original)) > 1) issue = "Revisar: nombre original repetido; no se puede mapear de forma única";
      else if (!date) issue = "Revisar: fecha de documento ausente o inválida";
      else if (!concept) issue = "Revisar: concepto ausente o sin caracteres válidos";
      return { original, extension, i, issue, base: issue ? original : date + "_" + concept };
    });
    const destinationCounts = new Map();
    plan.filter(item => !item.issue).forEach(item => {
      const key = equalName(item.base + item.extension);
      destinationCounts.set(key, (destinationCounts.get(key) || 0) + 1);
    });
    const rows = plan.map(item => {
      if (item.issue) { used.add(equalName(item.original)); return [item.original, item.original, item.issue]; }
      let name = item.base + item.extension;
      const own = equalName(item.original);
      const stays = equalName(name) === own && !used.has(own);
      if (stays) name = item.original;
      const collision = !stays && (destinationCounts.get(equalName(name)) > 1 ||
        (originals.has(equalName(name)) && equalName(name) !== own) || used.has(equalName(name)));
      if (collision) {
        const stem = item.base + "_A" + String(item.i + 1).padStart(2, "0");
        name = stem + item.extension;
        let n = 2;
        while (originals.has(equalName(name)) || used.has(equalName(name))) name = stem + "_" + n++ + item.extension;
      }
      used.add(equalName(name));
      return [item.original, name, name === item.original ? "Sin cambio" : collision ? "Listo: colisión evitada con sufijo único" : "Listo: propuesta para revisar"];
    });
    return {
      columns: ["Original", "Nuevo", "Estado"], rows,
      notes: [
        "Los nombres nuevos son una propuesta. Los originales no se renombran ni se sobrescriben.",
        "Se preservan extensiones y se comparan colisiones sin distinguir mayúsculas, como precaución para Windows.",
        "Las filas con Revisar conservan el nombre original. No inventamos fechas a partir de la modificación del archivo.",
        "Antes de aplicar o descargar una copia renombrada, compara nombre, contenido y número de archivos."
      ],
      markdown: "# Plan de nombres R15\n\n" + markdownTable(["Original", "Nuevo", "Estado"], rows) + "\n\nConservar una copia original y este mapeo para revertir. Renombrar una extensión no convierte el contenido."
    };
  }
};

function dueDateFrom(body) {
  const candidates = [...body.matchAll(/\b(\d{4}-\d{2}-\d{2})\b/g)].map(match => match[1]);
  const unique = [...new Set(candidates)];
  if (!unique.length) return { date: "Por confirmar", note: "No hay fecha absoluta explícita" };
  if (unique.length > 1) return { date: "Por confirmar", note: "Hay varias fechas; revisar versión vigente" };
  return isoDate(unique[0]) ? { date: unique[0], note: "" } : { date: "Por confirmar", note: "Fecha inválida; revisar" };
}
const R16 = {
  id: "R16",
  title: "Extrae acuerdos con responsable, fecha y evidencia",
  summary: "Organiza un CSV explícito o detecta posibles compromisos en un chat. No inventa responsables, calcula expresiones ambiguas ni confirma que un pago ocurrió.",
  inputLabel: "Acuerdos en CSV o texto de chat",
  inputHint: "CSV recomendado: frase,responsable,fecha. También admite líneas [fecha, hora] Persona: mensaje; en chat un responsable debe aparecer como responsable: Nombre. Revisa siempre la evidencia.",
  sample: "frase,responsable,fecha\nEnviar catálogo final,Ana,2026-05-19\nRevisar servidor,Carlos,2026-05-20\nConfirmar soporte adicional,,\n",
  options: [],
  action: "Organizar acuerdos para revisar",
  run(input) {
    const source = inputText(input), first = source.split(/\r?\n/).find(line => line.trim()) || "";
    const firstFields = splitRows(first, delimiterOf(first))[0] || [];
    const structured = firstFields.some(value => ["frase", "acuerdo", "compromiso", "tarea"].includes(norm(value)));
    const columns = ["Fila", "Acuerdo o posible compromiso", "Responsable", "Fecha", "Revisión", "Evidencia"];
    const rows = [];
    if (structured) {
      const data = csvTable(source);
      const phraseIndex = required(data.headers, ["frase", "acuerdo", "compromiso", "tarea"], "frase o acuerdo");
      const responsibleIndex = indexOf(data.headers, ["responsable", "persona", "asignado"]);
      const dateIndex = indexOf(data.headers, ["fecha", "fechalimite", "vencimiento"]);
      data.rows.forEach((row, i) => {
        if (!clean(row[phraseIndex])) return;
        const responsible = responsibleIndex >= 0 ? clean(row[responsibleIndex]) : "";
        const rawDate = dateIndex >= 0 ? clean(row[dateIndex]) : "";
        const date = isoDate(rawDate);
        const issues = ["Datos declarados; verificar contra fuente"];
        if (!responsible) issues.push("Responsable por confirmar");
        if (!date) issues.push(rawDate ? "Fecha inválida o relativa; por confirmar" : "Fecha por confirmar");
        rows.push([String(i + 1), clean(row[phraseIndex]), responsible || "Por confirmar", date || "Por confirmar", issues.join("; "), "Fila de datos " + (i + 1) + ": " + row.join(" | ")]);
      });
    } else {
      const lines = source.split(/\r?\n/).filter(line => line.trim());
      if (lines.length > MAX_ROWS) throw new Error("Usa hasta 1000 líneas por lote; no se han descartado mensajes.");
      lines.forEach((line, i) => {
        let body = line.trim();
        body = body.replace(/^\[[^\]]+\]\s*[^:]{1,80}:\s*/, "");
        body = body.replace(/^(?:\d{1,2}\/\d{1,2}\/\d{2,4}|\d{4}-\d{2}-\d{2}),?\s+.*?\s+-\s+[^:]{1,80}:\s*/, "");
        const folded = body.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        if (!/\b(acuerdo|confirmo|confirmar|entregar|enviar|pagar|revisar|preparar|cotizar|coordinar|cambio|compromiso|entrega)\b/i.test(body)) return;
        const assigned = body.match(/\bresponsable\s*:\s*([^;|\n]+?)(?=\s+(?:fecha|vence)\s*:|[;|]|$)/i);
        const dates = dueDateFrom(body);
        const issues = ["Posible compromiso; requiere revisión"];
        if (/\b(quiza|tal vez|propuesta|podria|si se|pendiente de aprobar)\b/i.test(folded)) issues.push("Propuesta o condición; no confirmado");
        if (!assigned) issues.push("Responsable por confirmar; no se asigna al emisor");
        if (dates.note) issues.push(dates.note);
        rows.push([String(i + 1), body, assigned ? clean(assigned[1]) : "Por confirmar", dates.date, issues.join("; "), "Línea " + (i + 1) + ": " + line]);
      });
    }
    if (!rows.length) throw new Error("No se detectaron acuerdos con estas reglas. Usa CSV con encabezado frase,responsable,fecha para registrar solo lo que puedas comprobar.");
    return {
      columns, rows,
      notes: [
        "La extracción es por reglas: no confirma compromisos ni comprende todo un historial.",
        "La fecha de un mensaje no se toma como fecha límite. Fechas relativas, múltiples o inválidas quedan Por confirmar.",
        "Conserva la evidencia y revisa cambios/contradicciones antes de dar seguimiento. No se envía ningún mensaje."
      ],
      markdown: "# Control de acuerdos R16\n\n" + markdownTable(columns, rows) + "\n\nRevisión humana pendiente. Una fecha límite no acredita que una entrega o un pago ya ocurrió."
    };
  }
};

const CONTENT_ANGLES = [
  ["Reel breve", "Empieza por esta duda: ", "Muestra la pregunta, el dato necesario para contestarla y el paso que la persona puede comprobar."],
  ["Carrusel", "Antes de decidir, aclara esto: ", "Usa una lámina para la duda, otra para la condición verificada y otra para lo que sigue Por confirmar."],
  ["Historia", "¿Dónde se confirma esto? ", "Explica el canal o documento aprobado para consultar la respuesta; no inventes direcciones ni políticas."],
  ["Lista visual", "Tres revisiones para esta pregunta: ", "Prepara una lista de entrada, condición y comprobación. Completa cada punto solo con información vigente del negocio."],
  ["Reel de error y corrección", "No adivines la respuesta a: ", "Muestra un error común de interpretación y corrígelo con una condición que el negocio pueda demostrar."],
  ["Carrusel paso a paso", "Una respuesta clara para: ", "Divide un procedimiento confirmado en pocos pasos. Si no está documentado, indica qué falta confirmar antes de publicar."]
];
const R17 = {
  id: "R17",
  title: "Crea un calendario completo de treinta ideas",
  summary: "Convierte preguntas frecuentes en treinta borradores con formatos y ángulos rotativos. No inventa respuestas, políticas ni horarios de publicación.",
  inputLabel: "Preguntas frecuentes, una por línea",
  inputHint: "Pega preguntas anonimizadas. El calendario propone cómo explicarlas; la respuesta debe completarse con información real y revisada.",
  sample: "¿Cuánto cuesta el envío?\n¿Qué incluye el kit?\n¿Cómo se coloca el producto?\n¿Cómo reporto una pieza distinta?\n¿Cómo solicito información por canal privado?\n¿Cómo limpio el organizador?",
  options: [{ key: "audience", label: "Público al que explicarás estas dudas", type: "text", value: "personas que usan el producto por primera vez" }],
  action: "Generar treinta días de ideas",
  run(input, opts = {}) {
    const questions = [...new Set(inputText(input).split(/\r?\n/).map(line => clean(line.replace(/^\s*(?:[-*•]|\d+[.)])\s*/, ""))).filter(Boolean))];
    if (!questions.length) throw new Error("Escribe al menos una pregunta.");
    if (questions.length > MAX_ROWS) throw new Error("La práctica admite hasta 1000 preguntas; divide el listado en lotes.");
    const audience = clean(opts.audience) || "tu audiencia";
    const columns = ["Día", "Pregunta de origen", "Formato", "Gancho para revisar", "Qué explicar", "Acción final"];
    const rows = Array.from({ length: 30 }, (_, i) => {
      const question = questions[i % questions.length];
      const cycle = Math.floor(i / questions.length);
      const angle = CONTENT_ANGLES[((i % questions.length) + cycle) % CONTENT_ANGLES.length];
      const cta = i % 2 ? "¿Qué parte de este proceso necesitas que expliquemos mejor?" : "Guarda los pasos que hayas comprobado para consultarlos después.";
      return [String(i + 1).padStart(2, "0"), question, angle[0], angle[1] + question, angle[2] + " Adáptalo a " + audience + ".", cta];
    });
    return {
      columns, rows,
      notes: [
        "Se generan exactamente treinta filas numeradas 01–30. Son borradores; no publicaciones programadas.",
        "No se han generado precios, garantías, plazos ni respuestas a partir de suposiciones. Completa la explicación con fuentes propias verificadas.",
        questions.length < 6 ? "Hay pocas preguntas de origen: se reutilizan desde otros ángulos. Revisa que cada pieza aporte algo distinto antes de publicarla." : "Se rotan las preguntas y los formatos; revisa que los temas correspondan a tu audiencia.",
        "No hay promesa de vistas, seguidores o ventas ni entrega condicionada a comentar una palabra."
      ],
      markdown: "# Calendario de treinta ideas R17\n\nPúblico declarado: " + md(audience) + ".\n\n" + markdownTable(columns, rows) + "\n\nRevisar cada respuesta y política antes de grabar. Decide la frecuencia; los días numerados no agendan una cuenta."
    };
  }
};

const R18 = {
  id: "R18",
  title: "Calcula y revisa cinco o más cotizaciones",
  summary: "Calcula cantidad por precio más flete y distingue monedas, cantidades y especificaciones. No convierte divisas ni recomienda una compra.",
  inputLabel: "CSV de cotizaciones con importes finales",
  inputHint: "Encabezados: proveedor,cantidad,precio_unitario,flete,moneda,entrega. Precios y flete ya con cargos incluidos; usa números sin $ ni miles. Opcional: especificacion. No se calculan impuestos ni tipos de cambio.",
  sample: "proveedor,cantidad,precio_unitario,flete,moneda,entrega,especificacion\nTaller Alfa,10,1160.00,580.00,MXN,5,L-10\nMesa Beta,10,1160.00,0.00,MXN,7,L-10\nLumen Gamma,10,58.00,25.00,USD,6,L-10\nOficina Delta,10,1218.00,290.00,MXN,4,L-10\nEquipo Epsilon,10,1136.80,232.00,MXN,15,L-10",
  options: [
    { key: "currency", label: "Moneda que deseas comparar (sin conversión)", type: "text", value: "MXN" },
    { key: "quantity", label: "Cantidad requerida, en unidades enteras", type: "number", value: 10 },
    { key: "specification", label: "Especificación requerida", type: "text", value: "L-10" },
    { key: "maxDelivery", label: "Máximo de días de entrega (vacío: no evaluar)", type: "number", value: 7 }
  ],
  action: "Calcular cuadro comparable",
  run(input, opts = {}) {
    const data = csvTable(input);
    const p = required(data.headers, ["proveedor"], "proveedor");
    const q = required(data.headers, ["cantidad"], "cantidad");
    const u = required(data.headers, ["preciounitario", "precio"], "precio_unitario");
    const f = required(data.headers, ["flete", "envio"], "flete");
    const c = required(data.headers, ["moneda"], "moneda");
    const d = required(data.headers, ["entrega", "diasentrega", "entregadias"], "entrega");
    const spec = indexOf(data.headers, ["especificacion", "modelo", "producto"]);
    const currency = clean(opts.currency ?? "MXN").toUpperCase();
    if (!/^[A-Z]{3}$/.test(currency)) throw new Error("Escribe una moneda de tres letras, como MXN o USD.");
    const quantity = finiteNumber(opts.quantity ?? 10, "Cantidad requerida", { integer: true, positive: true });
    const specification = clean(opts.specification ?? "L-10");
    const deliveryRaw = opts.maxDelivery === undefined ? "7" : clean(opts.maxDelivery);
    const maxDelivery = deliveryRaw ? finiteNumber(deliveryRaw, "Máximo de días", { integer: true, positive: true }) : null;
    const details = [];
    const rows = data.rows.map((row, i) => {
      const label = "Fila " + (i + 1);
      const provider = clean(row[p]);
      if (!provider) throw new Error(label + ": falta proveedor; no se ha descartado la fila.");
      const qty = finiteNumber(row[q], label + " cantidad", { integer: true, positive: true });
      const unit = finiteNumber(row[u], label + " precio unitario");
      const shipping = finiteNumber(row[f], label + " flete");
      const money = clean(row[c]).toUpperCase();
      if (!/^[A-Z]{3}$/.test(money)) throw new Error(label + ": moneda ausente o inválida.");
      const subCents = qty * Math.round(unit * 100), totalCents = subCents + Math.round(shipping * 100);
      if (!Number.isSafeInteger(subCents) || !Number.isSafeInteger(totalCents)) throw new Error(label + ": importe demasiado grande para calcularlo con precisión.");
      const delivery = clean(row[d]);
      const days = /^\d+(?:\s*d[ií]as?)?$/i.test(delivery) ? Number(delivery.match(/^\d+/)[0]) : null;
      const issues = [];
      if (money !== currency) issues.push("Moneda distinta; no comparar con " + currency);
      if (qty !== quantity) issues.push("Cantidad distinta de " + quantity);
      if (specification && (spec < 0 || !clean(row[spec]))) issues.push("Especificación por confirmar");
      else if (specification && clean(row[spec]).toLocaleLowerCase() !== specification.toLocaleLowerCase()) issues.push("Especificación distinta");
      if (maxDelivery !== null && days === null) issues.push("Entrega no inequívoca; por confirmar");
      else if (maxDelivery !== null && days > maxDelivery) issues.push("Entrega supera " + maxDelivery + " días");
      if (!issues.length) issues.push("Coincide en campos evaluados; revisar garantía, vigencia y demás condiciones");
      const total = (totalCents / 100).toFixed(2);
      details.push("- " + md(provider) + ": " + qty + " × " + unit.toFixed(2) + " + " + shipping.toFixed(2) + " = **" + total + " " + money + "**. " + md(issues.join("; ")) + ".");
      return [provider, String(qty), money, total, delivery || "Por confirmar", issues.join("; ")];
    });
    return {
      columns: ["Proveedor", "Cantidad", "Moneda", "Total con flete", "Entrega declarada", "Revisión"], rows,
      notes: [
        "Total = cantidad × precio unitario final + flete final. No se agrega impuesto, descuento ni cargo que no esté en la entrada.",
        "No se convierten monedas ni se suman totales de monedas diferentes. Las ofertas en otra moneda quedan separadas.",
        "La comparación solo revisa los campos disponibles. Confirma calidad, garantía, vigencia, pago, alcance y aceptación antes de decidir; no hay recomendación automática."
      ],
      markdown: "# Cuadro de cotizaciones R18\n\nLos importes unitarios y de flete deben incluir todos los cargos aplicables según su fuente. No se calculan impuestos ni FX.\n\n" +
        markdownTable(["Proveedor", "Cantidad", "Moneda", "Total con flete", "Entrega", "Revisión"], rows) + "\n\n## Cálculos\n\n" + details.join("\n")
    };
  }
};

const R19 = {
  id: "R19",
  title: "Crea un cuestionario desde hechos que puedes comprobar",
  summary: "Usa definiciones del texto como respuestas y otras definiciones como distractores. Incluye clave y fuente de cada reactivo; requiere revisar ambigüedades.",
  inputLabel: "Documento de práctica: un término y un hecho por línea",
  inputHint: "Formato Término: descripción verificable. Incluye al menos tres términos distintos con descripciones distintas. No se inventan leyes, artículos ni reglamentos.",
  sample: "Registro: Anotar el ID y la fecha de la solicitud.\nPrioridad Normal: Una persona afectada que tiene una alternativa de trabajo.\nPrimera respuesta: Reconocer el ID y pedir datos faltantes sin prometer una fecha no confirmada.\nEstado En seguimiento: Se solicitó un dato y se espera respuesta.\nResponsable no identificado: Escribir Por confirmar en lugar de asignar por intuición.",
  options: [{ key: "count", label: "Número máximo de preguntas (hasta 50)", type: "number", value: 5 }],
  action: "Crear y revisar cuestionario",
  run(input, opts = {}) {
    const lines = inputText(input).split(/\r?\n/), facts = [], ignored = [];
    for (let i = 0; i < lines.length; i++) {
      if (!lines[i].trim()) continue;
      const match = lines[i].match(/^\s*([^:]{1,120}):\s*(.+?)\s*$/);
      if (!match) { ignored.push(String(i + 1)); continue; }
      facts.push({ term: clean(match[1]), fact: clean(match[2]), line: i + 1 });
    }
    if (facts.length < 3) throw new Error("Incluye al menos tres líneas válidas en formato Término: hecho, con descripciones distintas.");
    if (facts.length > MAX_ROWS) throw new Error("Usa hasta 1000 hechos por lote.");
    if (new Set(facts.map(item => item.term.toLocaleLowerCase())).size !== facts.length) throw new Error("Hay términos repetidos. Revisa y conserva una definición inequívoca para cada término.");
    if (new Set(facts.map(item => item.fact.toLocaleLowerCase())).size !== facts.length) throw new Error("Hay descripciones idénticas: no permiten construir distractores inequívocos. Diferéncialas antes de generar.");
    const requested = finiteNumber(opts.count ?? 5, "Número de preguntas", { integer: true, positive: true });
    if (requested > 50) throw new Error("El máximo de preguntas por práctica es 50.");
    const count = Math.min(requested, facts.length);
    const quiz = facts.slice(0, count).map((item, i) => {
      const pool = [item.fact, facts[(i + 1) % facts.length].fact, facts[(i + 2) % facts.length].fact];
      const shift = i % 3;
      const choices = [...pool.slice(shift), ...pool.slice(0, shift)];
      return {
        question: "Según el texto, ¿qué descripción corresponde a «" + item.term + "»?",
        choices, answerIndex: choices.indexOf(item.fact),
        source: "Línea " + item.line + " · " + item.term + ": " + item.fact
      };
    });
    const columns = ["ID", "Pregunta", "A", "B", "C", "Clave y fuente"];
    const rows = quiz.map((item, i) => ["Q" + String(i + 1).padStart(2, "0"), item.question, ...item.choices, "ABC"[item.answerIndex] + " · " + item.source]);
    const exam = quiz.map((item, i) => "## Q" + (i + 1) + "\n\n" + md(item.question) + "\n\n" + item.choices.map((choice, j) => "ABC"[j] + ") " + md(choice)).join("\n\n") + "\n\nRespuesta: ____").join("\n\n");
    const key = quiz.map((item, i) => "- Q" + (i + 1) + ": " + "ABC"[item.answerIndex] + ". " + md(item.source)).join("\n");
    return {
      columns, rows, quiz,
      notes: [
        "Los distractores son otros hechos de la misma entrada: revisa que no sean también válidos para el término preguntado.",
        "Cada respuesta vale un punto en esta práctica; no se define aprobado ni se acredita competencia profesional.",
        requested > facts.length ? "Se entregan " + count + " preguntas porque hay " + facts.length + " hechos únicos; no se fabrican más." : "Se entregan " + count + " preguntas basadas en el texto.",
        ignored.length ? "Líneas sin el formato Término: hecho, no usadas: " + ignored.join(", ") + ". Revísalas si eran parte del documento." : "Todas las líneas no vacías se pudieron leer."
      ],
      markdown: "# Cuestionario de práctica R19\n\n" + exam + "\n\n# Clave y fuentes\n\n" + key + "\n\nRevisar ambigüedades contra el documento original. No constituye normativa ni certificación profesional."
    };
  }
};

const R20 = {
  id: "R20",
  title: "Redacta una autoevaluación con evidencia y límites",
  summary: "Organiza acciones e impactos que tú declaras y conserva los faltantes. No estima dinero, horas, causalidad ni un aumento salarial.",
  inputLabel: "CSV de proyectos y evidencias",
  inputHint: "Encabezados proyecto,accion,evidencia,impacto. Deja vacío lo que no esté medido; un identificador de evidencia debe cotejarse con la fuente.",
  sample: "proyecto,accion,evidencia,impacto\nReportes,Preparé una plantilla de reporte,Registro E01 y mediciones M01 a M05,Promedio observado 22 a 14 minutos en cinco pruebas comparables\nSoporte,Coordiné diagnóstico y seguimiento; Carlos aplicó la corrección,Ticket T-42 y confirmación E04,Un ticket confirmado como resuelto; sin impacto monetario medido\nGuía de ingreso,Redacté una guía de ocho pasos,Documento G01 revisado por tres personas,\n",
  options: [{ key: "period", label: "Periodo de la autoevaluación", type: "text", value: "Periodo por confirmar" }],
  action: "Preparar reporte con trazabilidad",
  run(input, opts = {}) {
    const data = csvTable(input);
    const p = required(data.headers, ["proyecto"], "proyecto");
    const a = required(data.headers, ["accion", "actividad"], "accion");
    const e = required(data.headers, ["evidencia", "fuente"], "evidencia");
    const impact = required(data.headers, ["impacto", "resultado"], "impacto");
    const period = clean(opts.period) || "Periodo por confirmar";
    const columns = ["Proyecto", "Acción declarada", "Evidencia a cotejar", "Impacto declarado", "Revisión"];
    const rows = data.rows.map((row, i) => {
      if (!clean(row[p]) && !clean(row[a])) throw new Error("Fila " + (i + 1) + ": indica al menos proyecto y acción; no se han descartado datos.");
      const issues = ["Declaración pendiente de cotejo; no verificada por el sistema"];
      if (!clean(row[p])) issues.push("Proyecto por confirmar");
      if (!clean(row[a])) issues.push("Acción por confirmar");
      if (!clean(row[e])) issues.push("Falta evidencia");
      if (!clean(row[impact])) issues.push("Sin impacto medido; no estimar");
      return [clean(row[p]) || "Por confirmar", clean(row[a]) || "Por confirmar", clean(row[e]) || "Por confirmar", clean(row[impact]) || "No medido / por confirmar", issues.join("; ")];
    });
    const report = rows.map((row, i) => "## " + (i + 1) + ". " + md(row[0]) + "\n\n- Acción registrada: " + md(row[1]) + ".\n- Resultado o impacto declarado: " + md(row[3]) + ".\n- Evidencia que falta cotejar: " + md(row[2]) + ".\n- Revisión: " + md(row[4]) + ".").join("\n\n");
    return {
      columns, rows,
      notes: [
        "Los datos provienen únicamente de tu entrada y siguen pendientes de verificación; una referencia escrita no acredita por sí sola el resultado.",
        "No se calculan importes, horas ahorradas, rendimiento anual ni un aumento salarial. Un impacto vacío permanece No medido / por confirmar.",
        "Distingue tu acción del trabajo del equipo y conserva fuente, fecha, alcance y tamaño de muestra antes de usar el reporte."
      ],
      markdown: "# Borrador de autoevaluación R20\n\nPeriodo declarado: " + md(period) + ".\n\n" + report +
        "\n\n## Antes de entregar\n\nCotejar cada evidencia; retirar afirmaciones sin respaldo; confirmar atribución de equipo, periodo y muestra. No extrapolar cifras ni presentar una estimación como un resultado medido."
    };
  }
};

export const toolsC = { R14, R15, R16, R17, R18, R19, R20 };

