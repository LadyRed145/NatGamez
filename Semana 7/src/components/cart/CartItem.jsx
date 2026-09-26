/**
 * NatGamez · Semana 7 · COMPONENTE REACT
 * Fila de producto del carrito.
 *
 * Representa cada producto comprado y expone eventos React para aumentar, disminuir o eliminar unidades.
 */
import logoNatGamez from '../../../assets/img/logo_natgamez.png';

import {
  formatearPrecioCLP,
} from '../../utils/formatters.js';

function CartItem({
  item,
  onIncrease,
  onDecrease,
  onRemove,
}) {
  return (
    <article
      className="carrito-item"
      data-producto-id={item.id}
    >
      <img
        className="carrito-item-imagen"
        src={item.imagen}
        alt={item.alt}
        loading="lazy"
        onError={(event) => {
          event.currentTarget.onerror = null;
          event.currentTarget.src = logoNatGamez;
        }}
      />

      <div className="carrito-item-contenido">
        <h3>
          {item.titulo}
        </h3>

        <p className="carrito-item-precio">
          {formatearPrecioCLP(item.precio)} c/u
        </p>

        <div className="carrito-item-controles">
          <button
            className="carrito-cantidad-boton btn-carrito-restar"
            type="button"
            aria-label={`Quitar una unidad de ${item.titulo}`}
            onClick={() => onDecrease(item.id)}
          >
            −
          </button>

          <span className="carrito-cantidad">
            {item.cantidad}
          </span>

          <button
            className="carrito-cantidad-boton btn-carrito-sumar"
            type="button"
            aria-label={`Agregar otra unidad de ${item.titulo}`}
            onClick={() => onIncrease(item.id)}
          >
            +
          </button>

          <button
            className="btn-carrito-eliminar"
            type="button"
            aria-label={`Eliminar ${item.titulo} del carrito`}
            onClick={() => onRemove(item.id)}
          >
            Eliminar
          </button>
        </div>
      </div>

      <strong className="carrito-item-subtotal">
        {formatearPrecioCLP(item.subtotal)}
      </strong>
    </article>
  );
}

export default CartItem;
