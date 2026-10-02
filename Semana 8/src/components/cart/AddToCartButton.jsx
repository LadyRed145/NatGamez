/**
 * NatGamez · Semana 8 · COMPONENTE REACT
 * Botón reutilizable de compra.
 *
 * Centraliza la interacción para agregar videojuegos, figuras y ediciones
 * Collector al carrito manteniendo el mismo feedback visual en escritorio,
 * tablet y celular.
 */
import {
  useEffect,
  useRef,
  useState,
} from 'react';

const DURACION_AGREGADO_ESCRITORIO = 2200;
const DURACION_AGREGADO_TACTIL = 3000;

function obtenerDuracionFeedback() {
  const entornoTactil = window.matchMedia(
    '(hover: none), (pointer: coarse), (max-width: 1199.98px)',
  ).matches;

  return entornoTactil
    ? DURACION_AGREGADO_TACTIL
    : DURACION_AGREGADO_ESCRITORIO;
}

function AddToCartButton({
  producto,
  onAdd,
  especial = false,
}) {
  const [hover, setHover] = useState(false);
  const [touching, setTouching] = useState(false);
  const [agregado, setAgregado] = useState(false);

  const temporizadorHover = useRef(null);
  const temporizadorAgregado = useRef(null);

  useEffect(() => () => {
    window.clearTimeout(temporizadorHover.current);
    window.clearTimeout(temporizadorAgregado.current);
  }, []);

  function agregar() {
    const ok = onAdd(producto.id);

    if (!ok) {
      return;
    }

    setAgregado(true);

    window.clearTimeout(temporizadorAgregado.current);

    temporizadorAgregado.current = window.setTimeout(
      () => setAgregado(false),
      obtenerDuracionFeedback(),
    );
  }

  function activarTouch(event) {
    if (event.pointerType === 'mouse') {
      return;
    }

    window.clearTimeout(temporizadorHover.current);

    setTouching(true);
    setHover(true);
  }

  function desactivarTouch(event) {
    if (event.pointerType === 'mouse') {
      return;
    }

    setTouching(false);

    window.clearTimeout(temporizadorHover.current);

    temporizadorHover.current = window.setTimeout(
      () => setHover(false),
      1900,
    );
  }

  return (
    <button
      className={[
        'btn',
        'btn-agregar-carrito',
        especial ? 'btn-agregar-especial' : '',
        hover ? 'is-hover' : '',
        touching ? 'is-touching' : '',
        agregado ? 'producto-agregado' : '',
      ].filter(Boolean).join(' ')}
      type="button"
      data-producto-id={producto.id}
      aria-label={
        agregado
          ? `${producto.titulo} agregado al carrito`
          : `Agregar ${producto.titulo} al carrito`
      }
      onClick={agregar}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onFocus={() => setHover(true)}
      onBlur={() => setHover(false)}
      onPointerDown={activarTouch}
      onPointerUp={desactivarTouch}
      onPointerCancel={desactivarTouch}
    >
      <span
        className="btn-carrito-icono"
        aria-hidden="true"
      >
        {agregado ? '✓' : '🛒'}
      </span>

      <span
        className="btn-carrito-texto"
        aria-live="polite"
      >
        {agregado ? 'Agregado' : 'Agregar al carrito'}
      </span>
    </button>
  );
}

export default AddToCartButton;
