/**
 * NatGamez · Semana 8 · COMPONENTE REACT
 * Resumen del carrito y acceso al último comprobante persistido.
 */
import {
  formatearPrecioCLP,
} from '../../utils/formatters.js';

function CartSummary({
  total,
  deshabilitado,
  onCheckout,
  onClear,
  ultimaCompra,
  onShowLastPurchase,
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

      <button
        className="carrito-ultima-compra"
        type="button"
        disabled={!ultimaCompra}
        onClick={onShowLastPurchase}
      >
        {ultimaCompra
          ? '🧾 Ver última compra'
          : '🧾 Sin compras guardadas'}
      </button>

      <p className="carrito-ayuda-compra">
        Compra simulada · al finalizar se genera tu comprobante NatGamez.
      </p>
    </div>
  );
}

export default CartSummary;
