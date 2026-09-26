/**
 * NatGamez · Semana 7 · COMPONENTE REACT
 * Card de edición Collector.
 *
 * Representa una edición especial dentro del carrusel y comparte el mismo carrito y sistema de precios de la tienda.
 */
import logoNatGamez from '../../../assets/img/logo_natgamez.png';

import AddToCartButton from '../cart/AddToCartButton.jsx';

import {
  formatearPrecioCLP,
} from '../../utils/formatters.js';

function CollectorCard({
  producto,
  activo,
  onAdd,
}) {
  return (
    <div className={`carousel-item${activo ? ' active' : ''}`}>
      <article
        className="vault-card"
        data-producto-id={producto.id}
      >
        <figure className={`vault-card-imagen ${producto.figuraClase}`}>
          <img
            src={producto.imagen}
            alt={producto.alt}
            loading="lazy"
            onError={(event) => {
              event.currentTarget.onerror = null;
              event.currentTarget.src = logoNatGamez;
            }}
          />
        </figure>

        <div className="vault-card-contenido">
          <span
            className={[
              'badge-producto',
              producto.badgeClase,
            ].filter(Boolean).join(' ')}
          >
            {producto.badge}
          </span>

          <h3>
            {producto.titulo}
          </h3>

          <ul>
            {producto.contenido.map((item) => (
              <li key={item}>
                {item}
              </li>
            ))}
          </ul>

          <div className="vault-compra-linea">
            <div className="precio-especial-bloque">
              <del className="precio-especial-normal">
                Normal {formatearPrecioCLP(producto.precioNormal)}
              </del>

              <p className="precio-premium">
                Oferta {formatearPrecioCLP(producto.precioOferta ?? producto.precio)}
              </p>
            </div>

            <AddToCartButton
              producto={producto}
              onAdd={onAdd}
              especial
            />
          </div>
        </div>
      </article>
    </div>
  );
}

export default CollectorCard;
