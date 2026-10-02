/**
 * NatGamez · Semana 8 · COMPONENTE REACT
 * Card reutilizable de videojuego.
 *
 * Presenta los datos del JSON, precio normal/oferta, estado, favoritos y acciones;
 * recibe toda su información mediante props.
 */
import logoNatGamez from '../../../assets/img/logo_natgamez.png';

import {
  formatearPrecioCLP,
} from '../../utils/formatters.js';

import {
  obtenerClaseEstado,
  obtenerConfiguracionAcentoPorColumna,
} from '../../utils/productUtils.js';

import PlatformChips from './PlatformChips.jsx';
import ProductActions from './ProductActions.jsx';

function ProductCard({
  producto,
  indice,
  onDetails,
  onAdd,
  favorito = false,
  onToggleFavorite,
}) {
  const acento =
    obtenerConfiguracionAcentoPorColumna(indice);

  const rating =
    `★ ${producto.rating.toFixed(1)}`;

  const estadoClase =
    obtenerClaseEstado(producto.estado);

  return (
    <div className="col-12 col-md-6 col-lg-4">
      <article
        className={[
          'card',
          'h-100',
          'catalog-card',
          acento.borde,
          favorito ? 'catalog-card--favorita' : '',
        ].filter(Boolean).join(' ')}
        data-id={producto.id}
        data-titulo={producto.titulo}
        data-genero={producto.genero}
        data-plataformas={producto.plataformas.join(' · ')}
      >
        <span
          className={[
            'badge',
            'badge-producto',
            acento.badge,
          ].filter(Boolean).join(' ')}
        >
          {producto.badge}
        </span>

        {onToggleFavorite && (
          <button
            className={[
              'boton-favorito',
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

        <figure>
          <img
            src={producto.imagen}
            alt={producto.alt}
            loading="lazy"
            onError={(event) => {
              event.currentTarget.onerror = null;
              event.currentTarget.src = logoNatGamez;
              event.currentTarget.alt =
                `Imagen de respaldo de NatGamez para ${producto.titulo}`;
            }}
          />
        </figure>

        <div className="card-body catalog-card-contenido">
          <p className="producto-genero">
            {producto.genero}
          </p>

          <h3 className="card-title">
            {producto.titulo}
          </h3>

          <PlatformChips
            plataformas={producto.plataformas}
          />

          <p className="card-text">
            {producto.descripcion}
          </p>

          <div className="producto-datos-rapidos">
            <span
              className="producto-rating"
              aria-label={`Valoración NatGamez ${producto.rating.toFixed(1)} de 5`}
            >
              {rating}
            </span>

            <span className="producto-modalidad">
              {producto.modalidad}
            </span>
          </div>

          <div className="producto-meta">
            <div className="producto-precios">
              <del className="producto-precio-normal">
                Normal {formatearPrecioCLP(producto.precioNormal)}
              </del>

              <strong className="producto-precio-oferta">
                Oferta {formatearPrecioCLP(producto.precioOferta ?? producto.precio)}
              </strong>
            </div>

            <span className={estadoClase}>
              {producto.estado}
            </span>
          </div>

          <ProductActions
            producto={producto}
            onDetails={onDetails}
            onAdd={onAdd}
          />
        </div>
      </article>
    </div>
  );
}

export default ProductCard;
