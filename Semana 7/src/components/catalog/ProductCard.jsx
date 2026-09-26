/**
 * NatGamez · Semana 7 · COMPONENTE REACT
 * Card reutilizable de videojuego.
 *
 * Presenta los datos del JSON, precio normal/oferta, estado y acciones; recibe toda su información mediante props.
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
        ].join(' ')}
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
