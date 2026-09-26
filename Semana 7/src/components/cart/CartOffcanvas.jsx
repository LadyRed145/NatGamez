/**
 * NatGamez · Semana 7 · COMPONENTE REACT
 * Panel lateral del carrito.
 *
 * Compone la lista, el resumen y las acciones del Offcanvas de Bootstrap utilizando información y callbacks recibidos desde React.
 */
import {
  useEffect,
  useRef,
} from 'react';

import CartItem from './CartItem.jsx';
import CartSummary from './CartSummary.jsx';

function CartOffcanvas({
  items,
  total,
  estado,
  onIncrease,
  onDecrease,
  onRemove,
  onClear,
  onCheckout,
}) {
  const ref = useRef(null);

  useEffect(() => {
    const elemento = ref.current;

    if (!elemento) {
      return undefined;
    }

    const abrir = () => {
      document.body.classList.add(
        'carrito-abierto',
      );
    };

    const cerrar = () => {
      document.body.classList.remove(
        'carrito-abierto',
      );

      window.requestAnimationFrame(() => {
        const hayOverlayAbierto =
          document.querySelector(
            '.offcanvas.show, .modal.show',
          );

        if (!hayOverlayAbierto) {
          [
            document.documentElement,
            document.body,
          ].forEach((nodo) => {
            nodo.style.removeProperty('overflow');
            nodo.style.removeProperty('overflow-y');
            nodo.style.removeProperty('height');
            nodo.style.removeProperty('max-height');
            nodo.style.removeProperty('padding-right');
          });
        }
      });
    };

    elemento.addEventListener(
      'show.bs.offcanvas',
      abrir,
    );

    elemento.addEventListener(
      'hidden.bs.offcanvas',
      cerrar,
    );

    return () => {
      elemento.removeEventListener(
        'show.bs.offcanvas',
        abrir,
      );

      elemento.removeEventListener(
        'hidden.bs.offcanvas',
        cerrar,
      );
    };
  }, []);

  const estadoClase =
    estado.tipo === 'exito'
      ? 'carrito-estado-exito'
      : estado.tipo === 'error'
        ? 'carrito-estado-error'
        : 'carrito-estado-normal';

  return (
    <aside
      ref={ref}
      id="carritoOffcanvas"
      className="offcanvas offcanvas-end offcanvas-natgamez"
      tabIndex="-1"
      aria-labelledby="tituloCarritoOffcanvas"
    >
      <div className="offcanvas-header">
        <div className="carrito-offcanvas-titulo">
          <p className="etiqueta-seccion">
            TU SELECCIÓN
          </p>

          <h2 id="tituloCarritoOffcanvas">
            🛒 Tu carrito
          </h2>
        </div>

        <button
          className="carrito-cerrar"
          type="button"
          data-bs-dismiss="offcanvas"
          aria-label="Cerrar carrito"
        >
          ×
        </button>
      </div>

      <div className="offcanvas-body">
        <p
          id="estadoCarrito"
          className={`carrito-estado ${estadoClase}`}
          role="status"
          aria-live="polite"
        >
          {estado.mensaje}
        </p>

        <div
          id="listaCarrito"
          className="carrito-lista"
        >
          {items.length === 0 ? (
            <div className="carrito-vacio">
              <span
                className="carrito-vacio-icono"
                aria-hidden="true"
              >
                🎮
              </span>

              <strong>
                Tu inventario está vacío
              </strong>

              <p>
                Agrega un videojuego desde el catálogo y aparecerá aquí.
              </p>
            </div>
          ) : (
            items.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                onIncrease={onIncrease}
                onDecrease={onDecrease}
                onRemove={onRemove}
              />
            ))
          )}
        </div>
      </div>

      <CartSummary
        total={total}
        deshabilitado={items.length === 0}
        onCheckout={onCheckout}
        onClear={onClear}
      />
    </aside>
  );
}

export default CartOffcanvas;