/**
 * NatGamez · Semana 7 · UTILIDAD JAVASCRIPT
 * Utilidades de formato.
 *
 * Contiene funciones puras para normalización, moneda CLP, fechas y folios; no mantiene estado React.
 */
export const PLATAFORMAS_PERMITIDAS = new Set([
  'PC',
  'PS5',
  'PS4',
  'Xbox',
  'Switch',
]);

export function normalizarTexto(texto) {
  return String(texto ?? '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim()
    .toLocaleLowerCase('es-CL');
}

export function formatearPrecioCLP(precio) {
  return new Intl.NumberFormat(
    'es-CL',
    {
      style: 'currency',
      currency: 'CLP',
      maximumFractionDigits: 0,
    },
  ).format(Number(precio) || 0);
}

export function generarFolioVoucher() {
  const ahora = new Date();

  const fecha = [
    ahora.getFullYear(),
    String(ahora.getMonth() + 1).padStart(2, '0'),
    String(ahora.getDate()).padStart(2, '0'),
  ].join('');

  const hora = [
    String(ahora.getHours()).padStart(2, '0'),
    String(ahora.getMinutes()).padStart(2, '0'),
    String(ahora.getSeconds()).padStart(2, '0'),
  ].join('');

  const aleatorio = Math.floor(
    1000 + Math.random() * 9000,
  );

  return `NG-${fecha}-${hora}-${aleatorio}`;
}

export function obtenerFechaVoucher() {
  return new Intl.DateTimeFormat(
    'es-CL',
    {
      dateStyle: 'long',
      timeStyle: 'short',
    },
  ).format(new Date());
}
