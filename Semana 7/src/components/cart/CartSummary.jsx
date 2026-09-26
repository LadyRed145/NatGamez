/**
 * NatGamez · Semana 7 · COMPONENTE REACT
 * Resumen del carrito.
 *
 * Muestra el total y las acciones de finalizar o vaciar compra sin administrar estado propio.
 */
import {
  formatearPrecioCLP,
} from '../../utils/formatters.js';

function CartSummary({
  total,
  deshabilitado,
  onCheckout,
  onClear,
}) {
  return (
    <div className="carrito-resumen carrito-checkout-fijo">
      <div className="carrito-total-linea">
        <span>
          Total
        </span>

        <strong id="totalCarrito">
          {formatearPrecioCLP(total)}
        </strong>
      </div>

      <div className="carrito-acciones-finales">
        <button
          id="botonComprarAhora"
          className="carrito-comprar-ahora"
          type="button"
          disabled={deshabilitado}
          onClick={onCheckout}
        >
          💳 Finalizar compra
        </button>

        <button
          id="botonVaciarCarrito"
          className="carrito-vaciar"
          type="button"
          disabled={deshabilitado}
          onClick={onClear}
        >
          Vaciar carrito
        </button>
      </div>

      <p className="carrito-ayuda-compra">
        Compra simulada · al finalizar se genera tu comprobante NatGamez.
      </p>
    </div>
  );
}

export default CartSummary;
