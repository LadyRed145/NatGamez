/**
 * NatGamez · Semana 7 · COMPONENTE REACT
 * Botón reutilizable de compra.
 *
 * Centraliza la interacción para agregar videojuegos, figuras y ediciones Collector al carrito manteniendo el mismo feedback visual.
 */
import {
  useEffect,
  useRef,
  useState,
} from 'react';

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
      600,
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
      aria-label={`Agregar ${producto.titulo} al carrito`}
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
        🛒
      </span>

      <span className="btn-carrito-texto">
        Agregar al carrito
      </span>
    </button>
  );
}

export default AddToCartButton;
