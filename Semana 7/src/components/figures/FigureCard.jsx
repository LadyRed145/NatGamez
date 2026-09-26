/**
 * NatGamez · Semana 7 · COMPONENTE REACT
 * Card reutilizable de figura premium.
 *
 * Renderiza cada figura con precio normal/oferta y el botón de compra compartido con el resto de NatGamez.
 */
import logoNatGamez from '../../../assets/img/logo_natgamez.png';

import AddToCartButton from '../cart/AddToCartButton.jsx';

import {
  formatearPrecioCLP,
} from '../../utils/formatters.js';

function FigureCard({
  producto,
  onAdd,
}) {
  const cardClass = producto.extra
    ? 'figura-card figura-card-extra'
    : `figura-card ${producto.cardClase}`;

  const imageClass = producto.extra
    ? 'figura-imagen figura-imagen-extra'
    : `figura-imagen ${producto.imagenClase}`;

  return (
    <article
      className={cardClass}
      data-producto-id={producto.id}
    >
      <figure className={imageClass}>
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

      <p className="producto-genero">
        {producto.universo}
      </p>

      <h3>
        {producto.titulo}
      </h3>

      <p>
        {producto.descripcion}
      </p>

      <div className="figura-compra-linea">
        <div className="precio-especial-bloque">
          <del className="precio-especial-normal">
            Normal {formatearPrecioCLP(producto.precioNormal)}
          </del>

          <strong className="precio-figura">
            Oferta {formatearPrecioCLP(producto.precioOferta ?? producto.precio)}
          </strong>
        </div>

        <AddToCartButton
          producto={producto}
          onAdd={onAdd}
          especial
        />
      </div>
    </article>
  );
}

export default FigureCard;
