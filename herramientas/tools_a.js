/* Herramientas locales R01–R07. Funciones puras: sin DOM, red, cuentas ni IA. */
const UNKNOWN = 'Por confirmar';
const norm = value => String(value ?? '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]/g, '');
const text = value => String(value ?? '').trim();
const money = value => {
  let s = text(value).replace(/MXN/gi, '').replace(/[$\s]/g, '');
  if (!s || /[^0-9.,+\-]/.test(s)) return null;
  if (s.includes(',') && s.includes('.')) {
    const decimal = s.lastIndexOf(',') > s.lastIndexOf('.') ? ',' : '.';
    s = decimal === ',' ? s.replace(/\./g, '').replace(',', '.') : s.replace(/,/g, '');
  } else if (s.includes(',')) {
    s = /^[+-]?\d{1,3}(,\d{3})+$/.test(s) ? s.replace(/,/g, '') : s.replace(',', '.');
  }
  if (!/^[+-]?(?:\d+(?:\.\d*)?|\.\d+)$/.test(s)) return null;
  const n = Number(s);
  return Number.isFinite(n) ? n : null;
};
const fmt = n => n === null ? UNKNOWN : n.toFixed(2);
function inputText(value) {
  const s = text(value).replace(/^\uFEFF/, '');
  if (!s) throw new Error('Pega primero tus datos o carga el ejemplo.');
  if (s.length > 100000) throw new Error('Divide la entrada en bloques menores de 100,000 caracteres.');
  return s;
}
function table(input) {
  const source = inputText(input);
  let quoted = false;
  const counts = {',': 0, ';': 0, '\t': 0};
  for (const ch of source.split(/\r?\n/)[0]) {
    if (ch === '"') quoted = !quoted;
    else if (!quoted && ch in counts) counts[ch]++;
  }
  const sep = Object.keys(counts).sort((a, b) => counts[b] - counts[a])[0];
  let rows = [], row = [], cell = '';
  quoted = false;
  for (let i = 0; i < source.length; i++) {
    const ch = source[i];
    if (ch === '"') {
      if (quoted && source[i + 1] === '"') { cell += '"'; i++; }
      else quoted = !quoted;
    } else if (!quoted && ch === sep) { row.push(cell.trim()); cell = ''; }
    else if (!quoted && (ch === '\n' || ch === '\r')) {
      if (ch === '\r' && source[i + 1] === '\n') i++;
      row.push(cell.trim()); if (row.some(Boolean)) rows.push(row); row = []; cell = '';
    } else cell += ch;
  }
  if (quoted) throw new Error('Hay comillas CSV sin cerrar. Revisa la última fila.');
  row.push(cell.trim()); if (row.some(Boolean)) rows.push(row);
  if (rows.length < 2) throw new Error('Incluye encabezados CSV y al menos una fila de datos.');
  if (rows.length > 1001) throw new Error('Usa como máximo 1,000 filas por bloque.');
  const headers = rows.shift().map(norm);
  if (new Set(headers).size !== headers.length) throw new Error('Hay encabezados duplicados en el CSV.');
  return rows.map((r, index) => {
    if (r.length > headers.length) throw new Error(`La fila ${index + 2} tiene más campos que el encabezado; encierra las comas del texto entre comillas.`);
    return Object.fromEntries(headers.map((h, i) => [h, r[i] ?? '']));
  });
}
function field(row, ...names) {
  for (const name of names) if (norm(name) in row) return row[norm(name)];
  return '';
}
function requireFields(rows, fields) {
  const missing = fields.filter(names => !names.some(name => norm(name) in rows[0]));
  if (missing.length) throw new Error('Faltan columnas: ' + missing.map(names => names[0]).join(', ') + '. Usa el ejemplo como estructura.');
}
function isoDate(value) {
  const s = text(value);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(s)) return null;
  const d = new Date(s + 'T00:00:00Z');
  return !Number.isNaN(d.getTime()) && d.toISOString().slice(0, 10) === s ? s : null;
}
function today() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}
const mdText = s => text(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
function receipt(input) {
  let current = {}, records = [];
  const push = () => { if (Object.keys(current).length) records.push(current); current = {}; };
  for (const line of inputText(input).split(/\r?\n/)) {
    if (/^\s*-{3,}\s*$/.test(line)) { push(); continue; }
    const m = line.match(/^\s*(folio|factura|concepto|subtotal|impuesto|iva(?:\s+\d+(?:[.,]\d+)?\s*%)?|total)\s*[:=]\s*(.*?)\s*$/i);
    if (!m) continue;
    let key = norm(m[1]);
    if (key === 'factura') key = 'folio';
    if (key.startsWith('iva')) key = 'impuesto';
    if (key === 'folio' && 'folio' in current) push();
    if (key in current) { current[key] = ''; current.duplicated = true; }
    else current[key] = m[2];
  }
  push();
  if (!records.length) throw new Error('Usa una línea por etiqueta: Folio:, Concepto:, Subtotal:, Impuesto: y Total:.');
  const rows = records.map(r => {
    const values = ['subtotal', 'impuesto', 'total'].map(k => money(r[k]));
    let review = 'Faltan importes legibles; no se puede comprobar';
    if (values.every(v => v !== null)) {
      const [sub, tax, total] = values;
      const delta = Math.round((total - sub - tax) * 100) / 100;
      review = Math.abs(delta) <= 0.01 ? 'Cuadra aritméticamente' : `Diferencia ${fmt(delta)}; esperado ${fmt(sub + tax)}`;
    }
    if (r.duplicated) review = 'Hay etiquetas duplicadas: revisar la fuente';
    return [r.folio || UNKNOWN, r.concepto || UNKNOWN, ...values.map(fmt), review];
  });
  return {columns: ['Folio', 'Concepto', 'Subtotal', 'Impuesto', 'Total reportado', 'Revisión'], rows,
    notes: [`${rows.length} comprobante(s) con etiquetas reconocidas. Se conserva el total reportado.`, 'Solo compara subtotal más impuesto. No hace OCR, no lee PDF, no consulta el SAT ni valida RFC, CFDI o tratamiento fiscal.', 'Importes ambiguos o ausentes requieren revisión de la fuente; no se sustituyen por cero.']};
}
function inbox(input, opts) {
  const data = table(input);
  requireFields(data, [['remitente'], ['asunto'], ['mensaje']]);
  const reference = isoDate(opts.date || '');
  const rows = data.map(r => {
    const sender = field(r, 'remitente'), subject = field(r, 'asunto'), message = field(r, 'mensaje');
    const rawDue = field(r, 'fecha_limite', 'fecha'), due = isoDate(rawDue);
    let priority = 'Aclarar';
    if (rawDue && !due) priority = 'Revisar fecha';
    else if (due && reference) priority = due < reference ? 'Vencido' : due === reference ? 'Hoy' : 'Después';
    else if (/solo informativ|no requiere respuesta|bolet[ií]n/i.test(subject + ' ' + message)) priority = 'Informativo';
    else if (due) priority = 'Fecha registrada';
    let draft = 'Gracias por el mensaje. Revisaré la solicitud; por favor confirma los datos necesarios y el plazo esperado. Cualquier compromiso queda pendiente de revisión.';
    if (/pago|factura|saldo|cobro|cargo|estado de cuenta/i.test(subject + ' ' + message)) draft = 'Gracias por el mensaje. Para revisar la solicitud, confirma importe, referencia y vencimiento por el canal privado habitual. Este acuse no valida el saldo ni confirma un pago.';
    if (priority === 'Informativo') draft = 'No se propone respuesta automática: revisar si hace falta contestar.';
    if (!message) draft = 'Falta el texto del mensaje; no se puede preparar una respuesta contextual.';
    return [sender || UNKNOWN, subject || UNKNOWN, priority, due || (rawDue ? `Revisar: ${rawDue}` : UNKNOWN), draft, 'Borrador; no enviado'];
  });
  return {columns: ['Remitente', 'Asunto', 'Prioridad', 'Fecha límite', 'Borrador revisable', 'Estado'], rows,
    notes: [reference ? `Clasificación por fecha explícita respecto a ${reference}.` : 'Sin fecha de referencia válida: no se infiere urgencia temporal.', 'Clasificación por reglas, no lectura de buzón ni comprensión por IA. Revisa intención, destinatario, adjuntos y compromisos antes de enviar.', 'No acepta plazos, reconoce deudas ni envía correos. Las fechas deben escribirse AAAA-MM-DD.']};
}
const MONTHS = {enero: 1, febrero: 2, marzo: 3, abril: 4, mayo: 5, junio: 6, julio: 7, agosto: 8, septiembre: 9, setiembre: 9, octubre: 10, noviembre: 11, diciembre: 12};
function taskDate(value, year) {
  const s = text(value);
  if (!s) return UNKNOWN;
  const direct = isoDate(s);
  if (direct) return direct;
  const m = s.match(/^(\d{1,2})\s+(?:de\s+)?([a-záéíóú]+)(?:\s+(?:de\s+)?(\d{4}))?$/i);
  if (m && MONTHS[m[2].toLowerCase()]) {
    const y = m[3] || (Number.isInteger(Number(year)) && Number(year) >= 1900 && Number(year) <= 2200 ? String(year) : '');
    if (!y) return s + ' (año por confirmar)';
    return isoDate(`${y}-${String(MONTHS[m[2].toLowerCase()]).padStart(2, '0')}-${m[1].padStart(2, '0')}`) || `Revisar fecha: ${s}`;
  }
  return `Revisar fecha: ${s}`;
}
function minutes(input, opts) {
  const rows = [];
  for (const line of inputText(input).split(/\r?\n/).map(text).filter(Boolean)) {
    let task = line, person = '', date = '';
    if (line.includes('|')) {
      const parts = line.split('|').map(text);
      if (parts.length !== 3) throw new Error('Cada línea con | debe contener Tarea|Responsable|Fecha.');
      if (norm(parts[0]) === 'tarea' && norm(parts[1]) === 'responsable') continue;
      [task, person, date] = parts;
    } else {
      const named = line.match(/^([^:]{1,100}):\s*(.+)$/);
      if (named) {
        person = text(named[1]); task = text(named[2]);
        const comma = task.lastIndexOf(',');
        if (comma >= 0 && /^(?:\d{4}-\d{2}-\d{2}|\d{1,2}\s+(?:de\s+)?[a-záéíóú]+)/i.test(task.slice(comma + 1).trim())) {
          date = task.slice(comma + 1).trim(); task = task.slice(0, comma).trim();
        }
      }
    }
    if (!task) throw new Error('Hay una fila sin tarea: completa el texto antes de continuar.');
    const due = taskDate(date, opts.year);
    const incomplete = !person || !isoDate(due);
    rows.push([task, person || UNKNOWN, due, incomplete ? 'Confirmar datos' : 'Asignación registrada; no completada']);
  }
  if (!rows.length) throw new Error('Incluye al menos una tarea debajo del encabezado.');
  return {columns: ['Tarea', 'Responsable', 'Fecha', 'Estado'], rows,
    notes: ['Convierte líneas estructuradas en acuerdos. No deduce responsables, años, horas ni fechas de expresiones como mañana.', 'El año opcional solo se aplica si lo indicas expresamente. Las asignaciones no se marcan terminadas.', `${rows.filter(r => r[3] === 'Confirmar datos').length} fila(s) necesitan confirmación.`]};
}
function benchmark(input, opts) {
  const data = table(input);
  requireFields(data, [['competidor', 'marca'], ['precio'], ['evidencia', 'fuente']]);
  const requestedUnit = text(opts.unit), groups = new Map();
  const rows = data.map(r => {
    const name = field(r, 'competidor', 'marca'), rawPrice = field(r, 'precio'), price = money(rawPrice);
    const unit = field(r, 'unidad', 'producto') || requestedUnit, evidence = field(r, 'evidencia', 'fuente');
    const valid = price !== null && price >= 0;
    const comparable = valid && unit && (!requestedUnit || norm(unit) === norm(requestedUnit));
    if (comparable) {
      const key = norm(unit); const group = groups.get(key) || {unit, values: []};
      group.values.push(price); groups.set(key, group);
    }
    const status = !valid ? 'Precio por revisar; excluido' : !unit ? 'Falta unidad; excluido de comparación' : !comparable ? 'Otra unidad; excluido' : 'Comparable según unidad declarada';
    return [name || UNKNOWN, unit || UNKNOWN, valid ? fmt(price) : UNKNOWN, evidence || UNKNOWN, status, evidence ? 'Fuente no verificada por esta app' : 'Falta evidencia'];
  });
  const notes = ['No navega ni verifica fuentes o precios actuales. Las estadísticas describen solo las filas comparables que proporcionaste; no representan al mercado.', 'Mantén misma moneda, tamaño, modalidad y fecha. La unidad indicada como opción se aplica únicamente a filas que no la incluyan.'];
  for (const {unit, values} of groups.values()) {
    values.sort((a, b) => a - b); const n = values.length;
    const median = n % 2 ? values[(n - 1) / 2] : (values[n / 2 - 1] + values[n / 2]) / 2;
    notes.push(`${unit}: n=${n}; media=${fmt(values.reduce((a, b) => a + b, 0) / n)}; mediana=${fmt(median)}; mínimo=${fmt(values[0])}; máximo=${fmt(values[n - 1])}. Moneda/unidad declaradas por ti.`);
  }
  if (!groups.size) notes.push('Sin filas comparables: completa precio y unidad para calcular estadísticas.');
  return {columns: ['Competidor', 'Unidad', 'Precio', 'Evidencia', 'Comparabilidad', 'Revisión'], rows, notes};
}
function sales(input, opts) {
  const data = table(input), catalog = table(opts.catalog || '');
  requireFields(data, [['sku'], ['cantidad'], ['precio_unitario', 'precio']]);
  requireFields(catalog, [['sku'], ['costo_unitario', 'costo']]);
  const costs = new Map(), duplicate = new Set();
  for (const r of catalog) {
    const sku = field(r, 'sku');
    if (!sku) throw new Error('El catálogo contiene un SKU vacío.');
    if (costs.has(sku)) duplicate.add(sku);
    costs.set(sku, money(field(r, 'costo_unitario', 'costo')));
  }
  const threshold = money(opts.threshold ?? 100);
  if (threshold === null || threshold < 0) throw new Error('El umbral de margen debe ser un número no negativo.');
  let totalSales = 0, knownSales = 0, knownCosts = 0, complete = 0;
  const rows = data.map(r => {
    const sku = field(r, 'sku'), qty = money(field(r, 'cantidad')), price = money(field(r, 'precio_unitario', 'precio'));
    const cost = costs.get(sku);
    const validSale = qty !== null && qty >= 0 && price !== null && price >= 0;
    const sold = validSale ? qty * price : null;
    if (sold !== null) totalSales += sold;
    let state = 'REVISAR SKU', costTotal = null, margin = null;
    if (!validSale) state = 'REVISAR CANTIDAD/PRECIO';
    else if (duplicate.has(sku)) state = 'CATÁLOGO DUPLICADO';
    else if (typeof cost === 'number' && cost >= 0) {
      costTotal = qty * cost; margin = sold - costTotal;
      state = margin < threshold ? 'REVISAR MARGEN' : 'OK';
      complete++; knownSales += sold; knownCosts += costTotal;
    }
    return [sku || UNKNOWN, qty === null ? UNKNOWN : String(qty), fmt(sold), fmt(costTotal), fmt(margin), state];
  });
  return {columns: ['SKU', 'Cantidad', 'Venta total', 'Costo total', 'Margen', 'Alerta'], rows,
    notes: [`Ventas de líneas con cantidad/precio válidos: ${fmt(totalSales)}.`, `Solo ${complete} línea(s) con costo válido y SKU único: ventas ${fmt(knownSales)}, costos ${fmt(knownCosts)}, margen ${fmt(knownSales - knownCosts)}.`, `Umbral: ${fmt(threshold)} por línea. Los costos ausentes o duplicados no se convierten en cero.`, 'No calcula utilidad neta, impuestos, descuentos ni cargos adicionales. Cantidades o precios negativos requieren revisar el movimiento y se excluyen del cálculo.']};
}
function reviews(input, opts) {
  const data = table(input);
  requireFields(data, [['nombre'], ['calificacion', 'estrellas'], ['resena', 'texto']]);
  const contact = text(opts.contact), english = opts.language === 'en';
  const rows = data.map(r => {
    const name = field(r, 'nombre'), review = field(r, 'resena', 'texto'), rating = money(field(r, 'calificacion', 'estrellas'));
    const validRating = rating !== null && Number.isInteger(rating) && rating >= 1 && rating <= 5;
    const sensitive = /(?:cobr|cargo|tarjeta|reembolso|discrimin|apariencia|racis|enferm|sent[ií] mal|intoxic|alerg|salud|amenaz)/i.test(review);
    const discount = /descuento|gratis|regalo|compensaci[oó]n/i.test(review);
    const route = contact ? (english ? ` Please use this verified contact route: ${contact}.` : ` Para revisarlo, utiliza este canal de contacto confirmado: ${contact}.`) : '';
    let draft;
    if (!review) draft = english ? 'No review text provided. Decide whether a response is needed.' : 'No hay texto de reseña. Revisa si hace falta responder.';
    else if (sensitive) draft = (english ? 'We are sorry to hear about the experience you describe. Your report needs a private review by the responsible person. Please do not post personal or payment details here.' : 'Lamentamos la experiencia que describes. Tu reporte requiere revisión privada de la persona responsable. Evita publicar aquí datos personales o de pago.') + route;
    else if (discount) draft = (english ? 'Thank you for sharing your concern. We cannot confirm discounts or compensation through this draft. The responsible person must review your request.' : 'Gracias por compartir tu inquietud. Este borrador no confirma descuentos ni compensaciones. La persona responsable debe revisar tu solicitud.') + route;
    else if (validRating && rating >= 4) draft = english ? 'Thank you for sharing your feedback. We appreciate hearing about your experience.' : 'Gracias por compartir tu opinión. Apreciamos conocer tu experiencia.';
    else draft = (english ? 'Thank you for describing your experience. We are sorry it did not meet your expectations. We will pass your comments to the responsible person for review.' : 'Gracias por describir tu experiencia. Lamentamos que no haya cubierto tus expectativas. Tus comentarios requieren revisión de la persona responsable.') + route;
    const state = sensitive ? 'ESCALAR ANTES DE PUBLICAR' : !validRating || !review ? 'REVISAR DATOS' : 'BORRADOR PARA REVISAR';
    return [name || UNKNOWN, validRating ? String(rating) : UNKNOWN, review, draft, state];
  });
  return {columns: ['Nombre', 'Calificación', 'Reseña', 'Borrador', 'Estado'], rows,
    notes: ['Redacción con plantillas por reglas; no conecta con Google ni envía respuestas. Personaliza cada borrador antes de usarlo.', 'Nunca concede descuentos, reembolsos, cambios ya realizados o investigaciones concluidas. No pide modificar la reseña ni ofrece incentivos.', contact ? 'Confirma que el canal que escribiste existe y que puede compartirse públicamente.' : 'No se añadió un contacto: no se inventa teléfono, correo o enlace.', 'Casos de cobro, salud, trato o amenazas se escalan; la calificación no sustituye una investigación. No hay traducción automática: elige el idioma del borrador.']};
}
function deck(input, opts) {
  const lines = inputText(input).split(/\r?\n/).map(text).filter(Boolean);
  let project = text(opts.title), section = 'Notas proporcionadas';
  const content = [];
  for (const line of lines) {
    const titled = line.match(/^(?:titulo|título)\s*:\s*(.+)$/i);
    if (titled) { if (!project) project = titled[1].trim(); continue; }
    const heading = line.match(/^#{1,6}\s+(.+)$/) || line.match(/^([^:]{1,80}):\s*$/);
    if (heading) { section = heading[1].trim(); continue; }
    content.push({section, text: line.replace(/^[-*]\s+/, '')});
  }
  if (!content.length) throw new Error('Añade contenido debajo de tus encabezados; un título solo no basta.');
  const groups = Array.from({length: 14}, () => []);
  content.forEach((item, i) => groups[Math.min(13, Math.floor(i * 14 / Math.max(14, content.length)))].push(item));
  const rows = [['01', project || 'Presentación de notas', 'Guion basado en los datos que proporcionaste.', 'Portada', 'Revisar título y audiencia']];
  for (let i = 0; i < 14; i++) {
    const items = groups[i], count = String(i + 2).padStart(2, '0');
    rows.push([count, items[0]?.section || `Contenido por completar ${i + 2}`,
      items.length ? items.map(item => item.text).join('\n') : 'No se proporcionaron notas para esta lámina.',
      items.length ? 'Título y contenido; revisar distribución visual' : 'Lámina vacía para completar',
      items.length ? 'Contrastar con las notas originales' : 'No publicar como contenido terminado']);
  }
  const markdown = `# ${mdText(project || 'Presentación de notas')}\n\nGuion local de quince láminas. No es un archivo PPTX.\n\n` + rows.map(row => `## ${row[0]}. ${mdText(row[1])}\n\n${mdText(row[2])}\n\nControl: ${mdText(row[4])}.`).join('\n\n');
  return {columns: ['Lámina', 'Título', 'Contenido', 'Disposición sugerida', 'Control'], rows, markdown,
    notes: [`${content.length} bloque(s) de notas distribuidos en catorce láminas de contenido más portada.`, 'Conserva el texto y las cifras que proporcionaste; no inventa conclusiones, porcentajes, causas, fechas o responsables.', 'Si faltan notas, deja láminas marcadas para completar. Revisa legibilidad y datos antes de presentar. Puedes descargar el guion Markdown; no se crea un PPTX ni se opera un editor externo.']};
}

export const toolsA = {
  R01: {id: 'R01', title: 'Revisa importes de comprobantes en texto', summary: 'Extrae etiquetas y compara subtotal, impuesto y total. Sin OCR ni validación fiscal.', inputLabel: 'Comprobantes en texto', inputHint: 'Una etiqueta por línea; separa documentos con --- o inicia otro Folio:.', sample: 'Folio: EJ-101\nConcepto: Soporte\nSubtotal: 850.00\nImpuesto: 136.00\nTotal: 986.00\n---\nFolio: EJ-102\nConcepto: Consumibles\nSubtotal: 100.00\nImpuesto: 16.00\nTotal: 115.00', options: [], action: 'Extraer y revisar', run: receipt},
  R02: {id: 'R02', title: 'Ordena correos y prepara borradores', summary: 'Clasifica fechas explícitas y propone respuestas revisables. No entra al buzón ni envía mensajes.', inputLabel: 'Mensajes CSV', inputHint: 'Encabezados: remitente,asunto,mensaje,fecha_limite. Fechas AAAA-MM-DD; usa comillas si el texto contiene comas.', sample: 'remitente,asunto,mensaje,fecha_limite\nDirección,Reporte,Confirma cifras conciliadas,2026-10-26\nCliente,Entrega,Falta confirmar direccion,\nProveedor,Estado de cuenta,Confirma recepcion sin reconocer adeudo,2026-10-27\nBoletin,Resumen,Solo informativo; no requiere respuesta,', options: [{key: 'date', label: 'Fecha de referencia para priorizar', type: 'date', value: today()}], sampleOptions: {date: '2026-10-25'}, action: 'Clasificar y preparar', run: (input, opts = {}) => inbox(input, opts)},
  R03: {id: 'R03', title: 'Organiza acuerdos sin inventar asignaciones', summary: 'Convierte tareas estructuradas en una minuta y marca los datos faltantes.', inputLabel: 'Tareas y acuerdos', inputHint: 'Tarea|Responsable|Fecha o Laura: cotización, 27 de octubre. Una tarea por línea.', sample: 'Tarea|Responsable|Fecha\nPreparar cotización|Laura|2026-10-27\nRevisar demo|Carlos|2026-10-28\nRevisar inventario||', options: [{key: 'year', label: 'Año para fechas sin año (opcional)', type: 'text', value: ''}], action: 'Organizar minuta', run: (input, opts = {}) => minutes(input, opts)},
  R04: {id: 'R04', title: 'Compara precios con evidencia declarada', summary: 'Agrupa unidades comparables y calcula media, mediana y rango de tus datos. No investiga la web.', inputLabel: 'Competidores CSV', inputHint: 'competidor,precio,unidad,evidencia. Los precios y fuentes provienen de ti; usa una sola moneda.', sample: 'competidor,precio,unidad,evidencia\nEjemplo Norte,50,Latte 300 ml,Ficha ficticia F1\nEjemplo Centro,65,Latte 300 ml,Ficha ficticia F2\nEjemplo Sur,,Latte 300 ml,Ficha ficticia F3\nEjemplo Este,58,Latte 300 ml,Ficha ficticia F4\nEjemplo Oeste,70,Latte 300 ml,Ficha ficticia F5', options: [{key: 'unit', label: 'Comparar esta unidad (opcional; aplica a filas sin unidad)', type: 'text', value: ''}], action: 'Calcular comparación', run: (input, opts = {}) => benchmark(input, opts)},
  R05: {id: 'R05', title: 'Cruza ventas y catálogo por SKU', summary: 'Calcula ventas, costos y margen por línea con tus dos tablas. Los costos faltantes quedan pendientes.', inputLabel: 'Ventas CSV', inputHint: 'sku,cantidad,precio_unitario. También debes pegar tu catálogo en el campo inferior.', sample: 'sku,cantidad,precio_unitario\nA100,2,150\nA200,1,200\nB100,3,70\nX999,1,90', options: [{key: 'catalog', label: 'Catálogo CSV: sku,costo_unitario', type: 'textarea', value: 'sku,costo_unitario\nA100,80\nA200,120\nB100,45'}, {key: 'threshold', label: 'Revisar margen de línea menor que', type: 'number', value: 100}], action: 'Cruzar y calcular', run: (input, opts = {}) => sales(input, opts)},
  R06: {id: 'R06', title: 'Prepara respuestas a reseñas', summary: 'Genera borradores por reglas y escala situaciones sensibles. No publica ni ofrece compensaciones.', inputLabel: 'Reseñas CSV', inputHint: 'nombre,calificacion,resena. Son plantillas editables; no un chatbot conectado.', sample: 'nombre,calificacion,resena\nPersona A,5,Me gustó el café\nPersona B,2,Esperé demasiado\nPersona C,3,Quiero un descuento\nPersona D,1,Aparecen dos cargos en mi tarjeta', options: [{key: 'contact', label: 'Canal de contacto confirmado (opcional)', type: 'text', value: ''}, {key: 'language', label: 'Idioma de los borradores', type: 'select', value: 'es', choices: [{value: 'es', label: 'Español'}, {value: 'en', label: 'English'}]}], action: 'Preparar borradores', run: (input, opts = {}) => reviews(input, opts)},
  R07: {id: 'R07', title: 'Organiza notas en quince láminas', summary: 'Distribuye tus notas en un guion descargable de texto sin inventar datos ni prometer un PPTX.', inputLabel: 'Notas con encabezados', inputHint: 'Usa Título: y encabezados #. Cada línea de contenido será un bloque; lo que falte queda por completar.', sample: 'Título: Revisión comercial · caso ficticio\n# Resultados\nVentas enero: 120000 MXN\nVentas febrero: 135000 MXN\nVentas marzo: 150000 MXN\nMeta trimestral: 420000 MXN\n# Comparación\nTrimestre anterior: 360000 MXN\nCostos reportados: 260000 MXN; faltan otros gastos\n# Embudo\nProspectos: 500\nDemostraciones: 120\nCierres: 40\n# Seguimiento\nPendientes abiertos: 6; urgentes: 2\nResponsables de urgentes: por confirmar\n# Propuesta\nCapacitación: 5000 MXN; aprobación pendiente\nSeguimiento: 8000 MXN; aprobación pendiente\nDocumentación: 7000 MXN; aprobación pendiente', options: [{key: 'title', label: 'Título de presentación (opcional)', type: 'text', value: ''}], action: 'Crear guion de quince láminas', run: (input, opts = {}) => deck(input, opts)}
};
