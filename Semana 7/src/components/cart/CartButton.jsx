/**
 * NatGamez · Semana 7 · COMPONENTE REACT
 * Acceso al carrito.
 *
 * Renderiza el botón de carrito para escritorio o móvil y refleja mediante props la cantidad total de productos.
 */
import { useState } from 'react';

function CartButton({
  cantidad = 0,
  variante = 'nav',
}) {
  const [hover, setHover] = useState(false);

  const comun = {
    type: 'button',
    'data-bs-toggle': 'offcanvas',
    'data-bs-target': '#carritoOffcanvas',
    'aria-controls': 'carritoOffcanvas',
    'aria-label': 'Abrir carrito de compras',
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    onFocus: () => setHover(true),
    onBlur: () => setHover(false),
    onPointerDown: (event) => {
      if (event.pointerType !== 'mouse') {
        setHover(true);
      }
    },
    onPointerUp: (event) => {
      if (event.pointerType !== 'mouse') {
        window.setTimeout(
          () => setHover(false),
          1900,
        );
      }
    },
  };

  if (variante === 'movil') {
    return (
      <button
        {...comun}
        id="botonComprarMovil"
        className={[
          'carrito-flotante-movil',
          cantidad > 0 ? 'tiene-productos' : '',
          hover ? 'is-hover' : '',
        ].filter(Boolean).join(' ')}
      >
        <span
          className="carrito-flotante-icono"
          aria-hidden="true"
        >
          🛒
        </span>

        <span className="carrito-flotante-texto">
          Comprar
        </span>

        <span
          id="contadorCarritoMovil"
          className={[
            'carrito-flotante-contador',
            cantidad > 0 ? 'tiene-productos' : '',
          ].filter(Boolean).join(' ')}
          aria-label={`${cantidad} producto${cantidad === 1 ? '' : 's'} en el carrito`}
        >
          {cantidad}
        </span>
      </button>
    );
  }

  return (
    <button
      {...comun}
      id="botonComprarNav"
      className={[
        'nav-comprar-boton',
        cantidad > 0 ? 'tiene-productos' : '',
        hover ? 'is-hover' : '',
      ].filter(Boolean).join(' ')}
    >
      <span className="nav-comprar-texto">
        Comprar
      </span>

      <span
        className="nav-comprar-icono"
        aria-hidden="true"
      >
        🛒
      </span>

      <span
        id="contadorCarritoNav"
        className={[
          'nav-comprar-contador',
          cantidad > 0 ? 'tiene-productos' : '',
        ].filter(Boolean).join(' ')}
        aria-label={`${cantidad} producto${cantidad === 1 ? '' : 's'} en el carrito`}
      >
        {cantidad}
      </span>
    </button>
  );
}

export default CartButton;
