/* Herramientas locales R08–R13. Funciones puras: sin DOM, red, modelos ni acceso a archivos. */
const norm = value => String(value ?? '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]/g, '');
const clean = value => String(value ?? '').trim();
const md = value => clean(value).replace(/\\/g, '\\\\').replace(/([`*_[\]<>|])/g, '\\$1').replace(/\r?\n/g, ' ');

function csv(text) {
  text = String(text ?? '').replace(/^\uFEFF/, '').replace(/\r\n?/g, '\n');
  if (!text.trim()) throw new Error('Pega los datos o usa el ejemplo para comenzar.');
  const first = text.split('\n')[0];
  const sep = first.includes('\t') ? '\t' : first.includes(';') && !first.includes(',') ? ';' : ',';
  const rows = []; let row = [], cell = '', quoted = false;
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (ch === '"') {
      if (quoted && text[i + 1] === '"') { cell += '"'; i++; }
      else if (quoted || !cell.trim()) quoted = !quoted;
      else cell += ch;
    } else if (ch === sep && !quoted) { row.push(cell.trim()); cell = ''; }
    else if (ch === '\n' && !quoted) { row.push(cell.trim()); if (row.some(Boolean)) rows.push(row); row = []; cell = ''; }
    else cell += ch;
  }
  if (quoted) throw new Error('Hay una comilla CSV sin cerrar. Revisa los campos con comas o saltos de línea.');
  row.push(cell.trim()); if (row.some(Boolean)) rows.push(row);
  if (rows.length < 2) throw new Error('El CSV necesita encabezados y al menos una fila de datos.');
  if (rows.length > 501) throw new Error('Usa hasta 500 filas por revisión para mantener el navegador ágil.');
  const headers = rows.shift().map(norm);
  if (new Set(headers).size !== headers.length || headers.some(h => !h)) throw new Error('Los encabezados deben ser distintos y no estar vacíos.');
  return { headers, rows: rows.map((values, i) => {
    if (values.length !== headers.length) throw new Error(`Fila ${i + 2}: hay ${values.length} campos; se esperaban ${headers.length}. Usa comillas si un texto contiene comas.`);
    return Object.fromEntries(headers.map((h, n) => [h, values[n]]));
  }) };
}

function requireHeaders(data, names) {
  const missing = names.filter(name => !data.headers.includes(norm(name)));
  if (missing.length) throw new Error(`Faltan encabezados: ${missing.join(', ')}.`);
}

function tableMarkdown(columns, rows) {
  return `| ${columns.map(md).join(' | ')} |\n| ${columns.map(() => '---').join(' | ')} |\n` +
    rows.map(row => `| ${row.map(md).join(' | ')} |`).join('\n');
}

function isoDay(value, label) {
  const s = clean(value);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(s)) throw new Error(`${label}: usa una fecha real AAAA-MM-DD.`);
  const ms = Date.parse(`${s}T00:00:00Z`);
  if (!Number.isFinite(ms) || new Date(ms).toISOString().slice(0, 10) !== s) throw new Error(`${label}: fecha no válida.`);
  return ms / 86400000;
}

function cents(value) {
  const s = clean(value);
  if (!/^\d+(?:\.\d{1,2})?$/.test(s)) throw new Error('Monto: usa un número no negativo como 18500.00, sin moneda ni separador de miles.');
  const [whole, fraction = ''] = s.split('.');
  const n = Number(whole) * 100 + Number(fraction.padEnd(2, '0'));
  if (!Number.isSafeInteger(n)) throw new Error('El monto es demasiado grande para calcularlo con precisión.');
  return `${Math.floor(n / 100)}.${String(n % 100).padStart(2, '0')}`;
}

function proposalRecords(input) {
  const text = clean(input);
  if (!text) throw new Error('Pega los datos del cliente o utiliza el ejemplo.');
  const first = text.split(/\r?\n/)[0];
  if (/[,;\t]/.test(first) && !/^\s*cliente\s*:/i.test(first)) {
    const parsed = csv(text); requireHeaders(parsed, ['cliente', 'alcance']); return parsed.rows;
  }
  const result = {}; let current = '';
  const known = new Set(['cliente', 'alcance', 'precio', 'entrega', 'exclusiones', 'pago']);
  for (const line of text.split(/\r?\n/)) {
    const match = line.match(/^\s*([^:]{1,35}):\s*(.*)$/);
    if (match && known.has(norm(match[1]))) { current = norm(match[1]); result[current] = match[2].trim(); }
    else if (line.trim() && current) result[current] += `\n${line.trim()}`;
    else if (line.trim()) throw new Error('Usa secciones rotuladas cliente:, alcance:, precio:, entrega: y exclusiones:, o un CSV con encabezados.');
  }
  if (!result.cliente || !result.alcance) throw new Error('Completa las secciones cliente: y alcance:.');
  return [result];
}

const r08 = {
  id: 'R08', title: 'Propuesta comercial con datos controlados',
  summary: 'Construye un borrador con tus condiciones y un tono elegido. Plantilla local: no clona voz ni aprende de documentos.',
  inputLabel: 'Datos de la propuesta', inputHint: 'Usa cliente:, alcance:, precio:, entrega:, exclusiones: y pago:, o CSV con esos encabezados. El precio se conserva como texto, sin calcular impuestos.',
  sample: 'cliente: Taller Horizonte\nalcance: Una hoja de registro de solicitudes, una guía de dos páginas y una revisión de 30 minutos.\nprecio: 3200 MXN\nentrega: Por confirmar\nexclusiones: Integraciones, carga de historial y mantenimiento.\npago: Por confirmar',
  options: [{ key: 'tono', label: 'Tono', type: 'select', value: 'directo', choices: [
    { value: 'directo', label: 'Directo' }, { value: 'cercano', label: 'Cercano' }, { value: 'formal', label: 'Formal' }
  ] }], action: 'Crear borrador de propuesta',
  run(input, opts = {}) {
    const records = proposalRecords(input);
    const openings = { directo: 'Te propongo el siguiente alcance de trabajo.', cercano: 'Vamos por partes: este es el alcance que podemos revisar juntos.', formal: 'Presentamos para su revisión la siguiente propuesta de trabajo.' };
    const opening = openings[opts.tono] || openings.directo;
    const columns = ['Cliente', 'Sección', 'Contenido', 'Revisión']; const rows = []; const documents = [];
    records.forEach((r, i) => {
      if (!r.cliente || !r.alcance) throw new Error(`Propuesta ${i + 1}: cliente y alcance no pueden estar vacíos.`);
      const price = r.precio || 'Por confirmar', delivery = r.entrega || 'Por confirmar';
      const exclusions = r.exclusiones || 'Por confirmar', payment = r.pago || 'Por confirmar';
      const parts = [['Alcance', r.alcance, 'Verificar que describe todos los entregables.'],
        ['Inversión', price, 'No se han calculado impuestos, descuentos ni recargos.'],
        ['Entrega', delivery, 'Confirmar antes de asumir un compromiso.'],
        ['Exclusiones', exclusions, 'Validar límites con ambas partes.'],
        ['Condiciones de pago', payment, 'No se infieren condiciones faltantes.']];
      parts.forEach(part => rows.push([r.cliente, ...part]));
      documents.push(`# Propuesta · ${md(r.cliente)}\n\n${opening}\n\n` + parts.map(([title, text]) => `## ${title}\n\n${md(text)}`).join('\n\n') + '\n\n## Siguiente paso\n\nRevisar el alcance y confirmar los datos pendientes antes de enviar o aceptar esta propuesta.');
    });
    return { columns, rows, notes: ['Borrador generado por plantilla y reglas locales; no usa IA ni se envía a nadie.', 'Los valores escritos se conservan; revisa precios, fechas y compromisos. Lo no aportado queda Por confirmar.'], markdown: documents.join('\n\n---\n\n') };
  }
};

const r09 = {
  id: 'R09', title: 'Recordatorios de pago sin amenazas',
  summary: 'Calcula días de atraso a una fecha de corte y prepara un mensaje revisable por factura, sin envíos automáticos.',
  inputLabel: 'Facturas en CSV', inputHint: 'Encabezados: factura,cliente,monto,vencimiento. Monto sin separador de miles; vencimiento AAAA-MM-DD. No incluyas datos bancarios.',
  sample: 'factura,cliente,monto,vencimiento\nF-101,Cliente A,18500.00,2026-10-20\nF-102,Cliente B,42000.00,2026-10-10\nF-103,Cliente C,65800.00,2026-09-23\nF-104,Cliente D,8400.00,2026-09-10\nF-105,Cliente E,7600.00,2026-08-26',
  options: [{ key: 'fecha', label: 'Fecha de corte: cámbiala para tu revisión', type: 'date', value: '2026-10-25' }], action: 'Calcular atraso y preparar mensajes',
  run(input, opts = {}) {
    const data = csv(input); requireHeaders(data, ['factura', 'cliente', 'monto', 'vencimiento']);
    const day = isoDay(opts.fecha || '2026-10-25', 'Fecha de corte');
    const counts = new Map();
    for (const r of data.rows) { const key = `${r.factura.toLowerCase()}\u0000${r.cliente.toLowerCase()}`; counts.set(key, (counts.get(key) || 0) + 1); }
    const rows = data.rows.map((r, i) => {
      try {
        if (!r.factura || !r.cliente) throw new Error('Falta factura o cliente.');
        const amount = cents(r.monto), due = isoDay(r.vencimiento, 'Vencimiento');
        const key = `${r.factura.toLowerCase()}\u0000${r.cliente.toLowerCase()}`;
        if (counts.get(key) > 1) throw new Error('Factura repetida para el mismo cliente; verificar antes de contactar.');
        const days = day - due;
        if (days <= 0) return [r.factura, r.cliente, amount, String(days), '0 · No vencida', 'Sin mensaje de cobranza: la factura no está vencida en la fecha de corte.'];
        const level = days <= 7 ? 1 : days <= 20 ? 2 : days <= 35 ? 3 : days <= 50 ? 4 : 5;
        const request = [null, '¿Nos confirmas si ya realizaste el pago o cuándo podrías revisarlo?',
          '¿Qué fecha estimada de pago puedes proponernos?', '¿Puedes confirmar el saldo y proponer una fecha de pago?',
          '¿Con quién podemos revisar el saldo pendiente y acordar el siguiente paso?',
          '¿Puedes confirmar el estado del saldo y proponer una fecha? El seguimiento quedará en revisión interna.'][level];
        const message = `Hola, ${r.cliente}. Damos seguimiento a ${r.factura} por ${amount} MXN, con ${days} días de atraso a la fecha de corte. ${request}`;
        return [r.factura, r.cliente, amount, String(days), String(level), message];
      } catch (error) { return [r.factura || `Fila ${i + 2}`, r.cliente || 'Por confirmar', r.monto, 'Por confirmar', 'REVISAR', error.message]; }
    });
    const columns = ['Factura', 'Cliente', 'Saldo MXN', 'Días de atraso', 'Nivel', 'Borrador o revisión'];
    return { columns, rows, notes: ['Reglas locales: 1–7 días nivel 1; 8–20 nivel 2; 21–35 nivel 3; 36–50 nivel 4; más de 50 nivel 5.', 'Fecha calculada por días de calendario, sin efectos de horario de verano. Un valor negativo significa que aún faltan días para vencer.', 'Verifica pagos recientes y autoriza el mensaje antes de enviarlo. No se añaden recargos, amenazas, descuentos ni suspensión de servicios.'], markdown: '# Seguimiento de facturas\n\n' + tableMarkdown(columns, rows) };
  }
};

const r10 = {
  id: 'R10', title: 'Diagrama de proceso desde pasos explícitos',
  summary: 'Dibuja los nodos y conexiones de tu CSV y detecta destinos inexistentes. No interpreta notas libres ni inventa reglas.',
  inputLabel: 'Pasos del proceso en CSV', inputHint: 'Encabezados: id,acción,responsable,sí,no. Escribe el ID del siguiente paso; deja los destinos vacíos al terminar. Cada destino debe tener su propia fila.',
  sample: 'id,acción,responsable,sí,no\nS1,Registrar solicitud,Operaciones,S2,\nS2,¿Hay presupuesto?,Finanzas,S3,POST\nS3,¿Proveedor registrado?,Administración,S4,PEND\nS4,¿Monto mayor a 5000 MXN?,Finanzas,DIR,AUT\nDIR,¿Dirección aprueba?,Dirección,PAGO,RECH\nAUT,Autorizar monto menor o igual a 5000,Finanzas,PAGO,\nPAGO,Registrar pago,Tesorería,FIN,\nPOST,Postpuesto,Finanzas,,\nPEND,Pendiente de datos,Administración,,\nRECH,Rechazado,Dirección,,\nFIN,Pago registrado,Tesorería,,',
  options: [], action: 'Validar y dibujar el flujo',
  run(input) {
    const data = csv(input); requireHeaders(data, ['id', 'acción', 'responsable', 'sí', 'no']);
    if (data.rows.length > 100) throw new Error('El diagrama admite hasta 100 pasos por revisión.');
    const ids = new Set();
    for (const [i, r] of data.rows.entries()) {
      if (!/^[A-Za-z0-9_-]{1,40}$/.test(r.id)) throw new Error(`Fila ${i + 2}: usa un ID de letras, números, guion o guion bajo, sin espacios.`);
      if (ids.has(r.id)) throw new Error(`ID repetido: ${r.id}. Cada paso necesita un ID único.`);
      if (!r.accion) throw new Error(`El paso ${r.id} necesita una acción.`); ids.add(r.id);
    }
    const nodes = data.rows.map(r => ({ id: r.id, label: `${r.id} · ${r.accion}\n${r.responsable || 'Responsable: Por confirmar'}` }));
    const edges = [];
    for (const r of data.rows) for (const [key, label] of [['si', r.no ? 'Sí' : 'Siguiente'], ['no', 'No']]) {
      if (!r[key]) continue;
      if (!ids.has(r[key])) throw new Error(`El paso ${r.id} apunta a ${r[key]}, pero ese ID no tiene una fila. Añádelo o corrige el destino.`);
      edges.push({ from: r.id, to: r[key], label });
    }
    const incoming = new Set(edges.map(e => e.to)), starts = nodes.filter(n => !incoming.has(n.id));
    const outgoing = new Set(edges.map(e => e.from)), ends = nodes.filter(n => !outgoing.has(n.id));
    const notes = ['El dibujo representa literalmente tus filas y conexiones; no certifica una política ni ejecuta acciones.',
      `Inicios sin conexiones entrantes: ${starts.map(n => n.id).join(', ') || 'ninguno; revisa si todo forma un ciclo'}.`,
      `Finales sin destinos: ${ends.map(n => n.id).join(', ') || 'ninguno; revisa las condiciones de cierre'}.`,
      'Las etiquetas Sí/No proceden de tus columnas. Recorre ejemplos de ambas rutas antes de usarlo como procedimiento.'];
    const columns = ['ID', 'Acción', 'Responsable', 'Sí / siguiente', 'No'];
    const rows = data.rows.map(r => [r.id, r.accion, r.responsable || 'Por confirmar', r.si || '—', r.no || '—']);
    return { columns, rows, notes, diagram: { nodes, edges }, markdown: '# Proceso estructurado\n\n' + tableMarkdown(columns, rows) };
  }
};

const r11 = {
  id: 'R11', title: 'Tareas candidatas desde una transcripción',
  summary: 'Marca frases con verbos de tarea y conserva su evidencia literal. Reglas locales, sin IA, audio ni transcripción automática.',
  inputLabel: 'Transcripción escrita, una idea por línea', inputHint: 'Para extraer campos con precisión usa: Tarea: ... | Responsable: ... | Fecha: ... . En texto libre solo se marca una candidata; los campos no rotulados quedan Por confirmar.',
  sample: '[00:12] Tarea: Ajustar cotización | Responsable: Ana | Fecha: 2026-10-26 16:00\n[00:30] Tarea: Enviar borrador del contrato | Responsable: Luis | Fecha: 2026-10-27\n[00:45] Hay que corregir las descripciones del catálogo.\n[01:00] Tarea: Agendar llamada | Responsable: Marcos | Fecha: 2026-10-30\n[01:15] Verificar si el depósito se refleja.\n[01:30] Gracias, eso es todo.',
  options: [], action: 'Marcar tareas y datos pendientes',
  run(input) {
    const lines = String(input ?? '').split(/\r?\n/).map(clean).filter(Boolean);
    if (!lines.length) throw new Error('Pega una transcripción de texto o utiliza el ejemplo.');
    if (lines.length > 1000) throw new Error('Usa hasta 1000 líneas por revisión.');
    const rows = []; let omitted = 0;
    for (const source of lines) {
      const text = source.replace(/^\[\d{1,2}:\d{2}(?::\d{2})?\]\s*/, '');
      const explicit = text.match(/(?:^|\|)\s*tarea\s*:\s*([^|]+)/i);
      const candidate = /\b(?:hay que|debe[n]?|favor de|por favor|pendiente(?:s)?)\b/i.test(text) ||
        /^(?:(?:[^,|]{1,40}),\s*)?(?:ajust(?:a|ar)|env(?:ía|iar)|corr(?:ige|egir)|agend(?:a|ar)|revis(?:a|ar)|verific(?:a|ar)|prepar(?:a|ar)|actualiz(?:a|ar)|entreg(?:a|ar)|confirm(?:a|ar))\b/i.test(text);
      if (!explicit && !candidate) { omitted++; continue; }
      const person = text.match(/(?:^|\|)\s*responsable\s*:\s*([^|]+)/i);
      const date = text.match(/(?:^|\|)\s*fecha\s*:\s*([^|]+)/i);
      const negative = /\b(?:no|cancelad[ao]|descartar|olvida)\b/i.test(text);
      const review = negative ? 'Revisar negación o cancelación; no asignar automáticamente.' :
        person && date ? 'Campos rotulados: cotejar con la fuente.' : 'Confirmar campos no rotulados; no se infieren responsables ni fechas.';
      rows.push([explicit ? explicit[1].trim() : text, person ? person[1].trim() : 'Por confirmar',
        date ? date[1].trim() : 'Por confirmar', source, review]);
    }
    const columns = ['Tarea candidata', 'Responsable', 'Fecha literal', 'Evidencia literal', 'Revisión'];
    return { columns, rows, notes: ['Detector por patrones locales; no usa IA ni escucha archivos de audio.',
      'Solo copia responsables y fechas con las etiquetas Responsable: y Fecha:. No interpreta fechas relativas, correcciones ni dependencias.',
      `${omitted} líneas sin patrón de tarea omitidas. Las candidatas pueden incluir falsos positivos; revisa también el texto original.`,
      'Una negación, cambio de responsable o fecha ambigua requiere decisión humana antes de asignar trabajo.'], markdown: '# Tareas candidatas para revisar\n\n' + tableMarkdown(columns, rows) };
  }
};

const r12 = {
  id: 'R12', title: 'Manual desde pasos que tú defines',
  summary: 'Convierte acciones y comprobaciones en un manual descargable e imprimible. Sin capturas inventadas ni grabación de pantalla.',
  inputLabel: 'Pasos del manual en CSV', inputHint: 'Encabezados: título,acción,comprobación. Si una acción contiene comas, enciérrala entre comillas. Registra acciones reales o una práctica claramente identificada.',
  sample: 'título,acción,comprobación\nCrear hoja,Abre sheets.google.com/create y nombra la hoja Práctica R12,Se ve una hoja nueva con ese título\nEncabezados,Escribe Folio en A1 y Total en B1,Hay dos encabezados en columnas distintas\nDato de práctica,Escribe DEMO-001 en A2 y 1160 en B2,La fila contiene el folio y el número indicados\nRevisión,Compara la fila con los datos de práctica y corrige diferencias,El folio aparece una vez y el total es 1160\nRepetición,Repite los pasos en otra hoja vacía usando solo el manual,Anota qué paso faltó o fue ambiguo',
  options: [
    { key: 'titulo', label: 'Título del manual', type: 'text', value: 'Registro de práctica R12' },
    { key: 'version', label: 'Versión', type: 'text', value: '1.0' }
  ], action: 'Crear manual paso a paso',
  run(input, opts = {}) {
    const data = csv(input); requireHeaders(data, ['título', 'acción', 'comprobación']);
    const columns = ['Paso', 'Título', 'Acción', 'Comprobación'];
    const rows = data.rows.map((r, i) => {
      if (!r.titulo || !r.accion) throw new Error(`Paso ${i + 1}: completa título y acción.`);
      return [String(i + 1), r.titulo, r.accion, r.comprobacion || 'Por confirmar'];
    });
    const title = opts.titulo || 'Manual de trabajo', version = opts.version || 'Por confirmar';
    const markdown = `# ${md(title)}\n\nVersión: ${md(version)}\n\nEstado: borrador pendiente de prueba humana.\n\n## Procedimiento\n\n` +
      rows.map(([n, t, a, c]) => `### ${n}. ${md(t)}\n\n${md(a)}\n\n**Comprueba:** ${md(c)}`).join('\n\n') +
      '\n\n## Prueba de repetición\n\nUna persona debe repetir el proceso usando solo este manual y registrar pasos faltantes, resultados y correcciones antes de marcarlo como probado.\n\n## Capturas\n\nNo se han generado capturas ni se ha grabado la pantalla. Si se añaden imágenes propias, revisar privacidad y correspondencia con cada paso antes de compartirlas.';
    return { columns, rows, markdown, notes: ['Manual armado en tu navegador con las acciones que escribiste; no controla otros programas.',
      'Puedes descargar el texto o una versión HTML imprimible desde la interfaz. Esto no publica ni comparte el documento.',
      'Una comprobación vacía queda Por confirmar. Ningún manual se marca probado automáticamente.'] };
  }
};

const clausePatterns = [
  { name: 'Renovación o prórroga', re: /renov\w*|pr[oó]rroga/i, question: '¿Qué plazo y medio de aviso describe el documento completo y qué falta aclarar?' },
  { name: 'Terminación o pago asociado', re: /terminaci[oó]n|cancelaci[oó]n|penal\w*|multa\w*|mensualidad\w*/i, question: '¿Qué supuestos y base de cálculo aparecen en el documento completo? Revisar con un abogado antes de decidir.' },
  { name: 'Ajuste de precio', re: /ajust\w*.*(?:precio|tarifa)|(?:precio|tarifa).*ajust\w*|aumento|incremento|porcentaje/i, question: '¿Se especifican porcentaje, límites, aviso y mecanismo de revisión en la fuente completa?' },
  { name: 'Mantenimiento', re: /mantenimiento/i, question: '¿Dónde se definen el alcance, la frecuencia y el costo de ese mantenimiento?' },
  { name: 'Lugar de controversias', re: /tribunal\w*|jurisdicci[oó]n|arbitraje|controversia\w*/i, question: '¿Qué implicaría este apartado para las partes en su caso concreto? Consultar revisión profesional.' }
];

const r13 = {
  id: 'R13', title: 'Localiza cláusulas y prepara preguntas',
  summary: 'Busca palabras clave y conserva citas literales para una revisión humana. No es IA, asesoría jurídica ni un dictamen sobre validez.',
  inputLabel: 'Texto de cláusulas', inputHint: 'Separa cláusulas con una línea vacía. Se buscan renovación, terminación, ajustes, mantenimiento y controversias; una coincidencia no determina legalidad.',
  sample: '4.2 Vigencia\nEste acuerdo durará doce meses. Se renovará por periodos iguales si ninguna parte avisa por escrito con treinta días de anticipación.\n\n7.1 Terminación\nSi el cliente termina antes de concluir el periodo, pagará dos mensualidades.\n\n9.4 Ajuste de precio\nEl proveedor podrá ajustar el precio una vez al año. El porcentaje se notificará con quince días de anticipación.\n\n12.3 Mantenimiento\nEl mantenimiento preventivo se cobrará por separado.\n\n15.1 Controversias\nLas diferencias se someterán a los tribunales de la Ciudad de México.',
  options: [], action: 'Buscar coincidencias y citas',
  run(input) {
    const text = clean(input);
    if (!text) throw new Error('Pega el texto de las cláusulas o utiliza el ejemplo ficticio.');
    if (text.length > 150000) throw new Error('Revisa fragmentos de hasta 150000 caracteres por vez.');
    const blocks = text.split(/\n\s*\n/).map(clean).filter(Boolean); const rows = [];
    for (const [i, block] of blocks.entries()) {
      const id = block.match(/^\s*(\d+(?:\.\d+)*)(?:[.)])?(?:\s|$)/)?.[1] || `Fragmento ${i + 1}`;
      for (const pattern of clausePatterns) {
        if (!pattern.re.test(block)) continue;
        const sentences = block.split(/(?<=[.!?])\s+/);
        const literal = sentences.find(sentence => pattern.re.test(sentence)) || block;
        rows.push([id, pattern.name, literal, pattern.question, 'Lectura pendiente; sin conclusión jurídica.']);
      }
    }
    const columns = ['Cláusula o fragmento', 'Coincidencia', 'Cita literal', 'Pregunta para revisar', 'Estado'];
    return { columns, rows, notes: ['Búsqueda local de palabras: no usa IA ni evalúa legalidad, abusividad, validez o conveniencia de firmar.',
      'Las citas son fragmentos exactos de tu entrada. Revisa el contexto y los anexos; las coincidencias pueden repetirse o ser irrelevantes.',
      rows.length ? `${rows.length} coincidencias para revisar. No constituye una auditoría completa del contrato.` : 'Sin coincidencias en estas cinco categorías. Esto no demuestra ausencia de problemas.',
      'No se calculan multas ni se citan leyes. Para un contrato real consulta a un abogado con el documento completo.'], markdown: '# Preguntas de lectura contractual\n\n' + tableMarkdown(columns, rows) };
  }
};

export const toolsB = { R08: r08, R09: r09, R10: r10, R11: r11, R12: r12, R13: r13 };
