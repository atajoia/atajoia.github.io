import { toolsA } from './tools_a.js?v=0a7b0f4db272';
import { toolsB } from './tools_b.js?v=0a7b0f4db272';
import { toolsC } from './tools_c.js?v=0a7b0f4db272';
import { csvText, markdownText, printableHTML, escapeHTML, validResult, makeZIP, safeFilename } from './core.js?v=0a7b0f4db272';

const tools = { ...toolsA, ...toolsB, ...toolsC };
const root = document.getElementById('app');
const id = document.body.dataset.tool || '';
const base = ['../', '../../', './'].includes(document.body.dataset.base) ? document.body.dataset.base : '../';
const github = 'https://github.com/atajoia/atajoia.github.io/tree/main/herramientas';
const archive = 'https://github.com/atajoia/atajoia.github.io/archive/refs/heads/main.zip';
const fold = value => String(value ?? '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
const text = value => String(value ?? '');

function element(tag, attrs = {}, children = []) {
  const node = document.createElement(tag);
  for (const [key, value] of Object.entries(attrs)) {
    if (key === 'class') node.className = value;
    else if (key === 'text') node.textContent = text(value);
    else if (key === 'hidden') node.hidden = Boolean(value);
    else if (value !== undefined && value !== null) node.setAttribute(key, text(value));
  }
  for (const child of [children].flat()) if (child !== undefined && child !== null) node.append(child instanceof Node ? child : document.createTextNode(text(child)));
  return node;
}

function anchor(label, href, className = '', external = false) {
  return element('a', { href, class: className, ...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {}), text: label });
}

function button(label, className = '') { return element('button', { type: 'button', class: className, text: label }); }

function download(blob, filename) {
  const url = URL.createObjectURL(blob);
  const link = element('a', { href: url, download: safeFilename(filename), hidden: true });
  document.body.append(link); link.click(); link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 30000);
}

function downloadText(content, filename, mime) { download(new Blob([content], { type: mime }), filename); }

// BEGIN_RENAME_PLAN: helper puro, también probado sin cargar el controlador DOM.
export function validateRenamePlan(current, files) {
  if (!files?.size) throw new Error('Selecciona los archivos o prueba el ejemplo antes de crear el ZIP.');
  const normalized = current.columns.map(value => String(value).normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]/g, ''));
  const originalIndex = normalized.findIndex(value => ['original', 'archivooriginal', 'nombreoriginal'].includes(value));
  const destinationIndex = normalized.findIndex(value => ['nuevo', 'nuevonombre', 'nombrenuevo'].includes(value));
  const stateIndex = normalized.findIndex(value => value === 'estado');
  if (originalIndex < 0 || destinationIndex < 0) throw new Error('La tabla necesita las columnas Original y Nuevo para crear el ZIP.');
  if (current.rows.length !== files.size) throw new Error('La vista previa debe incluir exactamente una fila por cada archivo seleccionado.');
  const origins = new Set(), targets = new Set(), entries = [];
  for (const row of current.rows) {
    const original = String(row[originalIndex] ?? ''), destination = String(row[destinationIndex] ?? '');
    const key = original.toLowerCase(), state = stateIndex < 0 ? '' : String(row[stateIndex] ?? '').trim();
    // El prefijo define el estado. «Listo: propuesta para revisar» es positivo;
    // la palabra revisar dentro de una recomendación no convierte la fila en error.
    if (/^(?:revisar|error|pendiente|por\s+confirmar|faltan?\s+datos?)(?:\b|:)/i.test(state)) throw new Error(`Resuelve la fila de ${original} antes de descargar el ZIP.`);
    if (origins.has(key)) throw new Error(`Origen repetido en la tabla: ${original}.`); origins.add(key);
    const file = files.get(original);
    if (!file) throw new Error(`No está seleccionado el archivo ${original}. No se crean archivos vacíos ni se omite esa fila.`);
    if (!destination || safeFilename(destination) !== destination) throw new Error(`Nombre de destino no válido: ${destination || '(vacío)'}. Corrígelo antes de descargar.`);
    const originalExtension = original.match(/\.[^.]+$/)?.[0] || '', destinationExtension = destination.match(/\.[^.]+$/)?.[0] || '';
    if (originalExtension !== destinationExtension) throw new Error(`La extensión de ${original} cambió. Renombrar no convierte el formato.`);
    const target = destination.toLowerCase(); if (targets.has(target)) throw new Error(`Destino repetido: ${destination}.`); targets.add(target);
    entries.push({ name: destination, file });
  }
  return entries;
}
// END_RENAME_PLAN

function scaffold() {
  const shell = element('main', { class: 'shell' });
  const brand = anchor('', base, 'brand');
  const icon = document.body.dataset.brandIcon || (document.body.dataset.offline === 'true' ? '' : `${base}marca/atajo-ia-icono-1024.png`);
  if (icon) brand.append(element('img', { src: icon, alt: '', width: '44', height: '44', class: 'brand-icon' }));
  brand.append(document.createTextNode('Atajo '), element('span', { text: 'IA' }));
  const nav = element('nav', { 'aria-label': 'Navegación principal' }, [
    anchor('Todas las herramientas', `${base}herramientas/`),
    anchor(id ? 'Guía y archivos' : 'Recursos', id ? '../' : base),
    anchor('Código abierto', github, 'source-link', true)
  ]);
  const header = element('header', {}, [brand, nav, element('span', { class: 'pill', text: 'Gratis · En tu navegador' })]);
  header.style.flexWrap = 'wrap'; nav.style.flexWrap = 'wrap';
  shell.append(header);
  root.replaceChildren(shell);
  return shell;
}

function footer(shell) {
  shell.append(element('footer', {}, [
    element('span', { text: 'Atajo IA · Herramientas gratuitas para el trabajo diario.' }),
    element('div', {}, [anchor('Privacidad', `${base}privacidad/`), anchor('Términos', `${base}terminos/`), anchor('Descargar código', archive, '', true)])
  ]));
}

function gallery(shell) {
  shell.append(element('section', { class: 'hero' }, [element('p', { class: 'eyebrow', text: 'Una tarea menos, un día más claro' }),
    element('h1', { text: 'Herramientas que trabajan contigo.' }),
    element('p', { class: 'summary', text: 'Pega tus datos, revisa el resultado y llévatelo. Sin instalar, sin registros nuevos y sin pagar una API.' }),
    element('p', { class: 'subtle', text: 'Se procesa en esta pestaña. Puedes probar los ejemplos antes de utilizar tus propios datos.' })]));
  const searchLabel = element('label', { for: 'tool-search', class: 'data-label', text: '¿Qué necesitas resolver?' });
  const input = element('input', { id: 'tool-search', type: 'search', placeholder: 'Ej. cobranza, manual, acuerdos, archivos', autocomplete: 'off' });
  const status = element('p', { id: 'status', role: 'status', 'aria-live': 'polite' });
  const search = element('section', { class: 'search', 'aria-label': 'Buscar herramientas' }, [searchLabel, input, status]);
  const grid = element('section', { class: 'gallery', 'aria-label': 'Herramientas disponibles' });
  const cards = Object.values(tools).sort((a, b) => a.id.localeCompare(b.id)).map(tool => {
    const card = anchor('', `${base}${tool.id}/app/`, 'tool-card');
    card.append(element('p', { class: 'eyebrow', text: tool.id }), element('h2', { text: tool.title }),
      element('p', { text: tool.summary }), element('span', { class: 'go', text: 'Abrir herramienta →' }));
    grid.append(card); return { card, query: fold(`${tool.id} ${tool.title} ${tool.summary}`) };
  });
  function filter() {
    const q = fold(input.value.trim()); let count = 0;
    cards.forEach(({ card, query }) => { card.hidden = !query.includes(q); if (!card.hidden) count++; });
    status.textContent = count ? `${count} herramientas disponibles${q ? ' para tu búsqueda' : ''}.` : 'No encontramos coincidencias. Prueba otra tarea o palabra.';
  }
  input.addEventListener('input', filter); filter(); shell.append(search, grid); footer(shell);
}

function svgDiagram(diagram) {
  const ns = 'http://www.w3.org/2000/svg';
  const make = (tag, attrs, content) => {
    const node = document.createElementNS(ns, tag);
    for (const [key, value] of Object.entries(attrs || {})) node.setAttribute(key, text(value));
    if (content !== undefined) node.textContent = text(content); return node;
  };
  const nodes = diagram?.nodes, edges = diagram?.edges;
  if (!Array.isArray(nodes) || !Array.isArray(edges) || !nodes.length) return null;
  if (nodes.length > 50) throw new Error('La tabla se generó. Para ver el diagrama, usa un máximo de 50 nodos.');
  const byID = new Map(nodes.map(node => [text(node.id), node]));
  if (byID.size !== nodes.length || edges.some(edge => !byID.has(text(edge.from)) || !byID.has(text(edge.to)))) throw new Error('El diagrama contiene IDs repetidos o destinos inexistentes; revisa la tabla.');
  const incoming = new Map(nodes.map(node => [text(node.id), 0])), levels = new Map(nodes.map(node => [text(node.id), 0]));
  edges.forEach(edge => incoming.set(text(edge.to), incoming.get(text(edge.to)) + 1));
  const queue = nodes.filter(node => incoming.get(text(node.id)) === 0).map(node => text(node.id)); let count = 0;
  while (queue.length) {
    const from = queue.shift(); count++;
    for (const edge of edges.filter(item => text(item.from) === from)) {
      const to = text(edge.to); levels.set(to, Math.max(levels.get(to), levels.get(from) + 1));
      incoming.set(to, incoming.get(to) - 1); if (!incoming.get(to)) queue.push(to);
    }
  }
  const groups = new Map();
  if (count === nodes.length) nodes.forEach(node => { const level = levels.get(text(node.id)); if (!groups.has(level)) groups.set(level, []); groups.get(level).push(node); });
  const maxGroup = Math.max(0, ...[...groups.values()].map(group => group.length));
  const grid = count !== nodes.length || maxGroup > 4;
  const columns = grid ? Math.min(3, nodes.length) : Math.max(1, maxGroup);
  const width = columns * 270 + 40, positions = new Map();
  let height = 0;
  if (grid) nodes.forEach((node, i) => { const pos = { x: 30 + (i % columns) * 270, y: 35 + Math.floor(i / columns) * 150 }; positions.set(text(node.id), pos); height = Math.max(height, pos.y + 135); });
  else for (const [level, group] of groups) group.forEach((node, i) => { const start = (width - group.length * 270) / 2;
    const pos = { x: start + i * 270, y: 35 + level * 150 }; positions.set(text(node.id), pos); height = Math.max(height, pos.y + 135); });
  const svg = make('svg', { xmlns: ns, viewBox: `0 0 ${width} ${height}`, width, height, role: 'img', 'aria-label': `Diagrama con ${nodes.length} pasos y ${edges.length} conexiones` });
  svg.append(make('title', {}, `Flujo de ${nodes.length} pasos. Los textos completos también están en la tabla.`));
  svg.append(make('rect', { width: '100%', height: '100%', fill: '#f8faf6' }));
  const defs = make('defs'); const marker = make('marker', { id: 'atajo-arrow', viewBox: '0 0 10 10', refX: 9, refY: 5, markerWidth: 7, markerHeight: 7, orient: 'auto-start-reverse' });
  marker.append(make('path', { d: 'M 0 0 L 10 5 L 0 10 z', fill: '#63766c' })); defs.append(marker); svg.append(defs);
  edges.forEach(edge => {
    const a = positions.get(text(edge.from)), b = positions.get(text(edge.to));
    const x1 = a.x + 115, y1 = a.y + 90, x2 = b.x + 115, y2 = b.y;
    const d = edge.from === edge.to ? `M ${a.x + 230} ${a.y + 35} C ${a.x + 270} ${a.y - 20} ${a.x + 270} ${a.y + 115} ${a.x + 230} ${a.y + 65}` :
      `M ${x1} ${y1} C ${x1} ${y1 + 30} ${x2} ${y2 - 30} ${x2} ${y2}`;
    svg.append(make('path', { d, fill: 'none', stroke: '#63766c', 'stroke-width': 2, 'marker-end': 'url(#atajo-arrow)' }));
    if (edge.label) {
      const lx = (x1 + x2) / 2, ly = (y1 + y2) / 2;
      const group = make('g'); group.append(make('rect', { x: lx - 40, y: ly - 11, width: 80, height: 21, rx: 4, fill: '#f8faf6' }),
        make('text', { x: lx, y: ly + 4, 'text-anchor': 'middle', 'font-family': 'system-ui,sans-serif', 'font-size': 12, fill: '#3c4d43' }, text(edge.label).slice(0, 15))); svg.append(group);
    }
  });
  nodes.forEach(node => {
    const p = positions.get(text(node.id)), group = make('g');
    group.append(make('title', {}, node.label), make('rect', { x: p.x, y: p.y, width: 230, height: 90, rx: 12, fill: '#fff', stroke: '#b6c8bd', 'stroke-width': 1.5 }));
    const words = text(node.label).split(/\s+/), lines = []; let line = '';
    words.forEach(word => { if (line.length + word.length > 29 && line) { lines.push(line); line = word; } else line += (line ? ' ' : '') + word; }); if (line) lines.push(line);
    lines.slice(0, 3).forEach((content, i) => group.append(make('text', { x: p.x + 115, y: p.y + 26 + i * 22, 'text-anchor': 'middle', 'font-family': 'system-ui,sans-serif', 'font-size': 13, fill: '#24382c' }, content + (i === 2 && lines.length > 3 ? '…' : ''))));
    svg.append(group);
  });
  return svg;
}

function toolPage(shell, spec) {
  document.title = `${spec.title} · Atajo IA`;
  shell.append(element('section', { class: 'hero' }, [element('p', { class: 'eyebrow', text: `${spec.id} · Tu resultado, sin complicaciones` }),
    element('h1', { text: spec.title }), element('p', { class: 'summary', text: spec.summary }),
    element('div', { class: 'steps' }, [element('span', {}, [element('b', { text: '1' }), 'Pega tus datos']), element('span', {}, [element('b', { text: '2' }), 'Revisa y corrige']), element('span', {}, [element('b', { text: '3' }), 'Descarga el resultado'])]),
    element('div', { class: 'actions' }, [anchor('Descargar herramienta', `./atajo-${spec.id.toLowerCase()}.html`, 'button'), anchor('Ver guía y archivos', '../', 'button')]) ]));
  shell.querySelector(`a[href="./atajo-${spec.id.toLowerCase()}.html"]`).setAttribute('download', `atajo-${spec.id.toLowerCase()}.html`);
  const inputPanel = element('section', { class: 'panel', 'aria-label': 'Datos de entrada' });
  inputPanel.append(element('div', { class: 'panel-head' }, [element('h2', { text: 'Empieza aquí' }), element('span', { class: 'pill', text: 'Sin registros nuevos' })]));
  const sample = button('Probar ejemplo');
  const hint = element('p', { class: 'subtle', id: 'input-hint', text: spec.inputHint });
  const input = element('textarea', { id: 'tool-input', spellcheck: 'false', autocomplete: 'off', 'aria-describedby': 'input-hint', placeholder: 'Pega aquí tus datos o prueba el ejemplo.' });
  inputPanel.append(element('label', { class: 'data-label', for: 'tool-input', text: spec.inputLabel }), hint, input);
  const upload = element('input', { id: 'input-file', type: 'file', accept: '.txt,.csv,.md,text/plain,text/csv,text/markdown' });
  inputPanel.append(element('label', { class: 'data-label', for: 'input-file', text: 'O abre un archivo TXT, CSV o MD (hasta 2 MB)' }), upload);
  const optionInputs = new Map();
  for (const option of spec.options || []) {
    const optionID = `option-${option.key}`;
    const label = element('label', { class: 'data-label', for: optionID, text: option.label || option.key });
    let control;
    if (option.type === 'select') {
      control = element('select', { id: optionID });
      for (const choice of option.choices || []) { const value = typeof choice === 'object' ? choice.value : choice;
        control.append(element('option', { value: text(value), text: typeof choice === 'object' ? choice.label ?? choice.value : choice })); }
    } else if (option.type === 'textarea') control = element('textarea', { id: optionID, class: 'option' });
    else control = element('input', { id: optionID, type: ['number', 'date', 'text'].includes(option.type) ? option.type : 'text', ...(option.type === 'number' ? { step: 'any' } : {}) });
    control.value = text(option.value); optionInputs.set(option.key, control); inputPanel.append(label, control);
  }
  const fileStatus = element('p', { class: 'subtle', role: 'status', 'aria-live': 'polite' });
  let files = new Map();
  if (spec.id === 'R15') {
    const uploadBatch = element('input', { id: 'batch-files', type: 'file', multiple: true });
    inputPanel.append(element('label', { class: 'data-label', for: 'batch-files', text: 'Archivos para crear una copia ZIP renombrada (hasta 100 / 25 MB)' }), uploadBatch,
      element('p', { class: 'subtle', text: 'Se conservan en memoria. Sus fechas y conceptos quedan vacíos para que los confirmes; no usamos la fecha de modificación.' }), fileStatus);
    uploadBatch.addEventListener('change', () => {
      try { selectFiles([...uploadBatch.files]); input.value = fileInventory([...files.keys()]); dirty(); say(`${files.size} archivos listos. Completa fecha y concepto y crea la vista previa.`); }
      catch (error) { uploadBatch.value = ''; files = new Map(); fileStatus.textContent = 'No se cargó el lote.'; fail(error); }
    });
  }
  const run = button(spec.action || 'Generar resultado', 'primary');
  const reset = button('Limpiar datos');
  const status = element('p', { id: 'status', role: 'status', 'aria-live': 'polite', 'aria-atomic': 'true' });
  inputPanel.append(element('div', { class: 'actions' }, [sample, run, reset]), status,
    element('p', { class: 'privacy', text: 'Tus datos se procesan en esta pestaña. No se envían a un servidor, no se guardan automáticamente y no se usan APIs de pago. Al recargar se borran los datos que pegaste.' }));
  const resultPanel = element('section', { class: 'panel', 'aria-labelledby': 'result-title' });
  const counter = element('span', { class: 'subtle', 'aria-live': 'polite' });
  resultPanel.append(element('div', { class: 'panel-head' }, [element('h2', { id: 'result-title', text: 'Tu resultado' }), counter]));
  const resultHost = element('div');
  const copy = button('Copiar resultado'); const saveCSV = button('Descargar CSV');
  const saveMD = button('Descargar texto'); const saveHTML = button('HTML para imprimir');
  const saveSVG = button('Descargar diagrama'); const zip = button('Descargar ZIP renombrado', 'primary');
  saveSVG.hidden = spec.id !== 'R10'; zip.hidden = spec.id !== 'R15';
  const downloads = [copy, saveCSV, saveMD, saveHTML, saveSVG, zip];
  const actions = element('div', { class: 'result-actions' }, downloads);
  const offline = anchor('Descargar herramienta', `./atajo-${spec.id.toLowerCase()}.html`, 'button'); offline.setAttribute('download', `atajo-${spec.id.toLowerCase()}.html`);
  resultPanel.append(resultHost, actions, offline);
  const workspace = element('div', { class: 'workspace' }, [inputPanel, resultPanel]); shell.append(workspace);
  shell.append(element('p', { class: 'source' }, [
    'La herramienta funciona con reglas locales y resultados revisables. ', anchor('Consulta o descarga su código', github, '', true), '. No hace publicaciones ni cambia otros sistemas.'
  ])); footer(shell);
  let result = null, svg = null, stale = false, busy = false, documentView = null, quizHost = null, diagramHost = null;
  function say(message, error = false) { status.textContent = message; status.className = error ? 'notice error' : ''; }
  function fail(error) { say(error instanceof Error ? error.message : 'No se pudo completar la acción. Revisa los datos y vuelve a intentar.', true); }
  function enable() {
    downloads.forEach(item => { item.disabled = !result || stale || busy; });
    [sample, run, reset, upload].forEach(item => { item.disabled = busy; });
    input.readOnly = busy; optionInputs.forEach(control => { control.disabled = busy; });
    const batch = document.getElementById('batch-files'); if (batch) batch.disabled = busy;
    if (!svg) saveSVG.disabled = true;
    if (spec.id === 'R15' && !files.size) zip.disabled = true;
  }
  function empty() { result = null; svg = null; stale = false; documentView = null; quizHost = null; diagramHost = null; counter.textContent = '';
    resultHost.replaceChildren(element('div', { class: 'empty' }, [element('strong', { text: 'Aquí verás el resultado.' }), element('p', { text: 'Prueba el ejemplo para entenderlo o utiliza tus propios datos. Después podrás revisar y descargar.' })])); enable(); }
  function dirty() { if (result) { stale = true; enable(); say('La entrada cambió. Vuelve a generar para actualizar el resultado y las descargas.'); } }
  function fileInventory(names) {
    const first = text(spec.sample).split(/\r?\n/)[0];
    const header = first.split(/[|,;\t]/).map(value => value.trim()).slice(0, 3);
    if (header.length !== 3) return csvText(['original', 'fecha', 'concepto'], names.map(name => [name, '', '']));
    return csvText(header, names.map(name => [name, '', '']));
  }
  function selectFiles(selected) {
    if (!selected.length || selected.length > 100) throw new Error('Selecciona de 1 a 100 archivos para el lote.');
    if (selected.reduce((total, file) => total + file.size, 0) > 25 * 1024 * 1024) throw new Error('El lote supera 25 MB. Selecciona menos archivos.');
    const selectedNames = new Set(); const next = new Map();
    for (const file of selected) { const key = file.name.toLowerCase();
      if (selectedNames.has(key)) throw new Error(`Hay nombres de origen repetidos: ${file.name}. Usa un lote con nombres únicos.`);
      selectedNames.add(key); next.set(file.name, file);
    }
    files = next; fileStatus.textContent = `${files.size} archivos solo en memoria. Los originales no se modifican.`;
  }
  function showQuiz(questions) {
    const host = element('section', { 'aria-label': 'Evaluación de práctica' });
    host.append(element('h3', { text: 'Responde y comprueba' }), element('p', { class: 'subtle', text: 'Las preguntas se construyen con reglas y con el texto que aportaste. Revisa el banco antes de usarlo para evaluar a otras personas.' }));
    const groups = [];
    questions.forEach((question, index) => {
      const section = element('fieldset', { class: 'quiz-question' });
      section.style.minWidth = '0'; section.style.border = '0';
      section.append(element('legend', { text: `${index + 1}. ${question.question}` }));
      const inputs = [];
      for (const [i, choice] of (question.choices || []).entries()) {
        const radio = element('input', { type: 'radio', name: `question-${index}`, value: i }); inputs.push(radio);
        const label = typeof choice === 'object' ? choice.label ?? choice.text ?? choice.value : choice;
        section.append(element('label', {}, [radio, text(label)]));
      }
      const feedback = element('p', { class: 'subtle', role: 'status' }); section.append(feedback); host.append(section); groups.push({ question, inputs, feedback });
    });
    const grade = button('Comprobar mis respuestas', 'primary'); const gradeStatus = element('p', { role: 'status', 'aria-live': 'polite' });
    grade.addEventListener('click', () => {
      let score = 0, answered = 0;
      for (const { question, inputs, feedback } of groups) {
        const selected = inputs.findIndex(input => input.checked), key = Number(question.answerIndex);
        if (!Number.isInteger(key) || key < 0 || key >= inputs.length) { feedback.textContent = 'Esta pregunta no tiene una clave válida; revísala antes de evaluar.'; continue; }
        const source = question.source ? ` Fuente: ${question.source}` : '';
        const answer = question.choices[key], label = typeof answer === 'object' ? answer.label ?? answer.text ?? answer.value : answer;
        if (selected < 0) feedback.textContent = `Sin responder. Respuesta de referencia: ${label}.${source}`;
        else { answered++; if (selected === key) score++; feedback.textContent = `${selected === key ? 'Correcta' : 'Revisa tu respuesta'}. Referencia: ${label}.${source}`; }
      }
      gradeStatus.textContent = `${score} aciertos de ${questions.length} preguntas. Respondiste ${answered}. Es una práctica, no una certificación.`;
    });
    host.append(element('div', { class: 'actions' }, [grade]), gradeStatus); return host;
  }
  function render() {
    resultHost.replaceChildren(); svg = null; documentView = null; quizHost = null; diagramHost = null;
    counter.textContent = `${result.rows.length} filas · ${result.columns.length} columnas`;
    if (Array.isArray(result.quiz) && result.quiz.length) { quizHost = showQuiz(result.quiz); resultHost.append(quizHost); }
    if (result.diagram) {
      try { svg = svgDiagram(result.diagram); if (svg) { diagramHost = element('div', { class: 'diagram' }, svg); diagramHost.style.maxHeight = '620px'; resultHost.append(diagramHost); } }
      catch (error) { resultHost.append(element('p', { class: 'notice', text: error.message })); }
    }
    const editHint = element('p', { class: 'subtle', text: 'Puedes corregir las celdas antes de descargar. Las ediciones afectan la tabla y sus archivos de salida.' });
    const table = element('table', { 'aria-label': 'Resultado editable' });
    const tr = element('tr'); result.columns.forEach(column => tr.append(element('th', { scope: 'col', text: column })));
    table.append(element('thead', {}, tr)); const tbody = element('tbody');
    result.rows.forEach((row, r) => {
      const line = element('tr');
      row.forEach((value, c) => {
        const cell = element('td', { contenteditable: 'plaintext-only', role: 'textbox', 'aria-label': `${result.columns[c]}, fila ${r + 1}`, spellcheck: 'false', text: value });
        cell.addEventListener('drop', event => event.preventDefault());
        cell.addEventListener('paste', event => {
          event.preventDefault(); const pasted = event.clipboardData?.getData('text/plain') || '';
          const selection = window.getSelection();
          if (selection?.rangeCount && cell.contains(selection.anchorNode)) { const range = selection.getRangeAt(0); range.deleteContents(); const node = document.createTextNode(pasted); range.insertNode(node); range.setStartAfter(node); range.collapse(true); selection.removeAllRanges(); selection.addRange(range); }
          else cell.append(document.createTextNode(pasted));
          cell.dispatchEvent(new Event('input', { bubbles: true }));
        });
        cell.addEventListener('input', () => {
          if (!result) return;
          result.rows[r][c] = cell.innerText || cell.textContent || ''; delete result.markdown;
          if (documentView) { documentView.hidden = true; documentView = null; }
          if (diagramHost) { diagramHost.remove(); diagramHost = null; svg = null; delete result.diagram; }
          if (quizHost) { quizHost.remove(); quizHost = null; delete result.quiz; }
          enable(); say('Tabla actualizada. Las descargas usarán tus cambios; vuelve a generar si necesitas reconstruir el documento, diagrama o cuestionario.');
        });
        line.append(cell);
      }); tbody.append(line);
    }); table.append(tbody);
    const scroll = element('div', { class: 'scroll', tabindex: '0', 'aria-label': 'Desliza para revisar todas las columnas' }, table);
    if (result.quiz?.length) {
      const details = element('details'); details.append(element('summary', { text: 'Ver banco y fuentes (puede incluir las respuestas)' }), editHint, scroll); resultHost.append(details);
    } else resultHost.append(editHint, scroll);
    if (result.markdown) {
      documentView = element('details'); documentView.append(element('summary', { text: 'Ver documento de salida' }), element('pre', { class: 'document', text: result.markdown })); resultHost.append(documentView);
    }
    for (const note of result.notes || []) resultHost.append(element('p', { class: 'notice', text: note }));
    enable();
  }
  function execute() {
    if (busy) return;
    try {
      result = null; stale = false; enable();
      const opts = Object.fromEntries([...optionInputs].map(([key, control]) => [key, control.value]));
      const next = validResult(spec.run(input.value, opts));
      result = { ...next, columns: next.columns.map(text), rows: next.rows.map(row => row.map(text)) };
      render(); say(`Listo: ${result.rows.length} filas generadas en esta pestaña. Revisa los datos antes de usarlos.`);
    } catch (error) { empty(); fail(error); }
  }
  function requireCurrent() { if (!result || stale) throw new Error('Genera de nuevo el resultado antes de descargar.'); return result; }
  sample.addEventListener('click', () => {
    try {
      for (const option of spec.options || []) optionInputs.get(option.key).value = text(spec.sampleOptions?.[option.key] ?? option.value);
      if (spec.id === 'R15') {
        const examples = JSON.parse(document.getElementById('file-examples')?.textContent || '[]');
        if (!Array.isArray(examples) || !examples.length) throw new Error('No hay archivos de ejemplo incluidos en esta página. Selecciona tus copias para probar el ZIP.');
        selectFiles(examples.map(file => { if (!file.name || typeof file.text !== 'string') throw new Error('Un archivo de ejemplo no tiene nombre o contenido válido.');
          return new File([file.text], safeFilename(file.name), { type: 'text/plain;charset=utf-8' }); }));
      }
      input.value = spec.sample || ''; execute();
    } catch (error) { empty(); fail(error); }
  });
  run.addEventListener('click', execute); input.addEventListener('input', dirty);
  optionInputs.forEach(control => { control.addEventListener('input', dirty); control.addEventListener('change', dirty); });
  upload.addEventListener('change', async () => {
    try {
      const file = upload.files?.[0]; if (!file) return;
      if (!/\.(txt|csv|md)$/i.test(file.name)) throw new Error('Abre un archivo TXT, CSV o MD.');
      if (file.size > 2 * 1024 * 1024) throw new Error('El archivo supera 2 MB. Usa un bloque más pequeño.');
      const content = await file.text(); input.value = content; dirty(); say(`Se abrió ${file.name} solo en esta pestaña. Revisa los datos y genera el resultado.`);
    } catch (error) { fail(error); }
  });
  reset.addEventListener('click', () => { if (busy) return; input.value = ''; upload.value = ''; files = new Map(); const batch = document.getElementById('batch-files'); if (batch) batch.value = ''; fileStatus.textContent = ''; empty(); say('Datos y resultados borrados de esta pestaña.'); input.focus(); });
  copy.addEventListener('click', async () => {
    try { const current = requireCurrent(), content = csvText(current.columns, current.rows);
      let copied = false;
      if (navigator.clipboard?.writeText) { try { await navigator.clipboard.writeText(content); copied = true; } catch { /* El archivo sin conexión puede no tener acceso al portapapeles moderno. */ } }
      if (!copied) {
        const temporary = element('textarea', { 'aria-label': 'Resultado para copiar' }); temporary.value = content;
        temporary.style.position = 'fixed'; temporary.style.left = '-10000px'; document.body.append(temporary); temporary.select();
        try { copied = document.execCommand('copy'); } finally { temporary.remove(); }
      }
      if (!copied) throw new Error('No se pudo copiar automáticamente. Descarga el CSV o selecciona la tabla y copia con Ctrl+C.');
      say('Resultado copiado como CSV. Puedes pegarlo en tu hoja de cálculo.');
    } catch (error) { fail(error); }
  });
  saveCSV.addEventListener('click', () => { try { const r = requireCurrent(); downloadText(csvText(r.columns, r.rows), `${spec.id}-resultado.csv`, 'text/csv;charset=utf-8'); say('CSV preparado con el resultado actual.'); } catch (error) { fail(error); } });
  saveMD.addEventListener('click', () => { try { const r = requireCurrent(); downloadText(markdownText(r, spec.title), `${spec.id}-resultado.md`, 'text/markdown;charset=utf-8'); say('Documento de texto preparado con el resultado actual.'); } catch (error) { fail(error); } });
  saveHTML.addEventListener('click', () => { try { const r = requireCurrent(); downloadText(printableHTML(r, spec.title), `${spec.id}-resultado.html`, 'text/html;charset=utf-8'); say('HTML preparado. Ábrelo y usa Imprimir para guardarlo como PDF si tu navegador lo permite.'); } catch (error) { fail(error); } });
  saveSVG.addEventListener('click', () => { try { requireCurrent(); if (!svg) throw new Error('Vuelve a generar un diagrama válido antes de descargarlo.'); downloadText(new XMLSerializer().serializeToString(svg), `${spec.id}-diagrama.svg`, 'image/svg+xml;charset=utf-8'); say('Diagrama SVG preparado.'); } catch (error) { fail(error); } });
  zip.addEventListener('click', async () => {
    try {
      const current = requireCurrent();
      const entries = validateRenamePlan(current, files);
      busy = true; enable(); say('Preparando el ZIP con copias de los archivos, sin cambiar los originales…');
      const blob = await makeZIP(entries); download(blob, 'Atajo-IA-archivos-renombrados.zip');
      say(`ZIP preparado con ${entries.length} copias renombradas. Extráelo en una carpeta nueva; los originales permanecen intactos.`);
    } catch (error) { fail(error); }
    finally { busy = false; enable(); }
  });
  empty();
}

if (root) {
  const shell = scaffold();
  if (!id) gallery(shell);
  else if (tools[id]) toolPage(shell, tools[id]);
  else { shell.append(element('section', { class: 'hero' }, [element('h1', { text: 'No encontramos esta herramienta.' }), anchor('Ver todas las herramientas', `${base}herramientas/`, 'button primary')])); footer(shell); }
}
