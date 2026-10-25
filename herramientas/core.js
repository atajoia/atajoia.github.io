// Utilidades locales de Atajo IA. Sin dependencias, almacenamiento ni red.
export function csvText(columns, rows) {
  const cell = value => {
    let text = String(value ?? '');
    if (/^\s*[=+@-]/u.test(text) && !/^-?\d+(?:[.,]\d+)?$/u.test(text.trim())) text = "'" + text;
    return /[",\n\r]/u.test(text) ? '"' + text.replaceAll('"', '""') + '"' : text;
  };
  return '\ufeff' + [columns, ...rows].map(row => row.map(cell).join(',')).join('\r\n') + '\r\n';
}
export function markdownText(result, title) {
  if (result.markdown) return result.markdown;
  const cell = value => String(value ?? '').replaceAll('|', '\\|').replaceAll('\n', ' ');
  return '# ' + title + '\n\n| ' + result.columns.map(cell).join(' | ') + ' |\n| ' + result.columns.map(() => '---').join(' | ') + ' |\n' + result.rows.map(row => '| ' + row.map(cell).join(' | ') + ' |').join('\n');
}
export function escapeHTML(value) {
  return String(value ?? '').replace(/[&<>"']/gu, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
}
export function printableHTML(result, title) {
  const e = escapeHTML;
  const text = result.markdown ? '<pre>' + e(result.markdown) + '</pre>' : '<table><thead><tr>' + result.columns.map(c => '<th>' + e(c) + '</th>').join('') + '</tr></thead><tbody>' + result.rows.map(row => '<tr>' + row.map(c => '<td>' + e(c) + '</td>').join('') + '</tr>').join('') + '</tbody></table>';
  return '<!doctype html><html lang="es"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>' + e(title) + '</title><style>body{font:16px/1.6 system-ui;margin:40px;color:#182029}table{border-collapse:collapse;width:100%}td,th{border:1px solid #ccd;padding:10px;text-align:left}pre{white-space:pre-wrap;font:inherit}@media print{body{margin:0}}</style><h1>' + e(title) + '</h1><p>Atajo IA · Resultado revisable</p>' + text + '</html>';
}
export function validResult(result) {
  if (!result || !Array.isArray(result.columns) || !result.columns.length || !Array.isArray(result.rows)) throw new Error('La herramienta no produjo una tabla válida.');
  if (result.rows.length > 2000 || result.columns.length > 20) throw new Error('Usa un lote de hasta 2000 filas y 20 columnas.');
  if (result.rows.some(row => !Array.isArray(row) || row.length !== result.columns.length)) throw new Error('Revisa las columnas de la entrada: algunas filas no coinciden.');
  return result;
}
export function safeFilename(name) {
  const clean = String(name).replace(/[<>:"/\\|?*\x00-\x1f]/gu, '-').replace(/[. ]+$/gu, '').slice(0,150);
  if (!clean || /^(con|prn|aux|nul|com[1-9]|lpt[1-9])(?:\.|$)/iu.test(clean)) throw new Error('El nombre de un archivo no es válido.');
  return clean;
}
// ZIP sin compresión: los bytes originales se conservan; las rutas no salen del ZIP.
export async function makeZIP(entries) {
  if (!entries.length || entries.length > 100) throw new Error('Selecciona de 1 a 100 archivos.');
  let offset = 0, total = 0;
  const local = [], central = [], names = new Set(), encoder = new TextEncoder();
  const crcTable = Array.from({length:256}, (_, n) => { for(let k=0;k<8;k++) n=(n&1)?0xedb88320^(n>>>1):n>>>1; return n>>>0; });
  for (const entry of entries) {
    const name = safeFilename(entry.name), key = name.toLowerCase();
    if (names.has(key)) throw new Error('Hay nombres de destino repetidos: ' + name);
    names.add(key);
    const bytes = entry.bytes instanceof Uint8Array ? entry.bytes : new Uint8Array(await entry.file.arrayBuffer());
    total += bytes.length;
    if (total > 25*1024*1024) throw new Error('El lote supera 25 MB. Usa un lote más pequeño.');
    const encoded = encoder.encode(name);
    let crc=0xffffffff; for(const b of bytes) crc=crcTable[(crc^b)&255]^(crc>>>8); crc=(crc^0xffffffff)>>>0;
    const header = new Uint8Array(30+encoded.length), h = new DataView(header.buffer);
    h.setUint32(0,0x04034b50,true);h.setUint16(4,20,true);h.setUint16(6,0x0800,true);h.setUint32(14,crc,true);h.setUint32(18,bytes.length,true);h.setUint32(22,bytes.length,true);h.setUint16(26,encoded.length,true);header.set(encoded,30);
    const directory = new Uint8Array(46+encoded.length), d = new DataView(directory.buffer);
    d.setUint32(0,0x02014b50,true);d.setUint16(4,20,true);d.setUint16(6,20,true);d.setUint16(8,0x0800,true);d.setUint32(16,crc,true);d.setUint32(20,bytes.length,true);d.setUint32(24,bytes.length,true);d.setUint16(28,encoded.length,true);d.setUint32(42,offset,true);directory.set(encoded,46);
    local.push(header,bytes);central.push(directory);offset+=header.length+bytes.length;
  }
  const length=central.reduce((n,b)=>n+b.length,0), end=new Uint8Array(22), e=new DataView(end.buffer);
  e.setUint32(0,0x06054b50,true);e.setUint16(8,entries.length,true);e.setUint16(10,entries.length,true);e.setUint32(12,length,true);e.setUint32(16,offset,true);
  return new Blob([...local,...central,end],{type:'application/zip'});
}
