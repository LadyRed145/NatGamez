/**
 * NatGamez · Semana 7 · UTILIDAD JAVASCRIPT
 * Validadores del catálogo y formularios.
 *
 * Agrupa funciones puras de validación para mantener los componentes React enfocados en presentación e interacción.
 */
import { PLATAFORMAS_PERMITIDAS } from './formatters.js';

export function esProductoValido(producto) {
  if (!producto || typeof producto !== 'object') {
    return false;
  }

  const plataformasValidas =
    Array.isArray(producto.plataformas) &&
    producto.plataformas.length > 0 &&
    producto.plataformas.every(
      (plataforma) =>
        typeof plataforma === 'string' &&
        PLATAFORMAS_PERMITIDAS.has(plataforma),
    );

  return (
    typeof producto.id === 'string' &&
    producto.id.trim() !== '' &&
    typeof producto.titulo === 'string' &&
    producto.titulo.trim() !== '' &&
    typeof producto.genero === 'string' &&
    producto.genero.trim() !== '' &&
    typeof producto.categoria === 'string' &&
    producto.categoria.trim() !== '' &&
    plataformasValidas &&
    typeof producto.modalidad === 'string' &&
    producto.modalidad.trim() !== '' &&
    typeof producto.rating === 'number' &&
    Number.isFinite(producto.rating) &&
    producto.rating >= 0 &&
    producto.rating <= 5 &&
    typeof producto.estado === 'string' &&
    producto.estado.trim() !== '' &&
    typeof producto.precio === 'number' &&
    Number.isFinite(producto.precio) &&
    producto.precio >= 0 &&
    typeof producto.imagen === 'string' &&
    producto.imagen.trim() !== '' &&
    typeof producto.alt === 'string' &&
    producto.alt.trim() !== '' &&
    typeof producto.descripcion === 'string' &&
    producto.descripcion.trim() !== '' &&
    typeof producto.badge === 'string' &&
    typeof producto.badgeClase === 'string' &&
    typeof producto.recomendado === 'boolean'
  );
}

export function tienenIdsUnicos(productos) {
  const ids = productos.map((producto) => producto.id);
  return new Set(ids).size === ids.length;
}

export function nombreEsValido(nombre) {
  return (
    nombre.length >= 2 &&
    nombre.length <= 30 &&
    /\p{L}/u.test(nombre)
  );
}
