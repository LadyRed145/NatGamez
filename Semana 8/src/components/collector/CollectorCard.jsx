/**
 * NatGamez · Semana 8 · COMPONENTE REACT
 * Card de edición Collector con carrito y favoritos compartidos.
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
  favorito = false,
  onToggleFavorite,
}) {
  return (
    <div className={`carousel-item${activo ? ' active' : ''}`}>
      <article
        className={[
          'vault-card',
          favorito ? 'vault-card--favorita' : '',
        ].filter(Boolean).join(' ')}
        data-producto-id={producto.id}
      >
        {onToggleFavorite && (
          <button
            className={[
              'boton-favorito',
              'boton-favorito--especial',
              favorito ? 'is-favorite' : '',
            ].filter(Boolean).join(' ')}
            type="button"
            aria-pressed={favorito}
            aria-label={
              favorito
                ? `Quitar ${producto.titulo} de favoritos`
                : `Agregar ${producto.titulo} a favoritos`
            }
            title={
              favorito
                ? 'Quitar de favoritos'
                : 'Agregar a favoritos'
            }
            onClick={() => onToggleFavorite(producto.id)}
          >
            <span aria-hidden="true">
              {favorito ? '♥' : '♡'}
            </span>
          </button>
        )}

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
