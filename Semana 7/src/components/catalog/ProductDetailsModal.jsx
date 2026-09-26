/**
 * NatGamez · Semana 7 · COMPONENTE REACT
 * Modal de detalle de videojuego.
 *
 * Muestra en Bootstrap la información ampliada del producto seleccionado, incluyendo precio normal y precio oferta.
 */
import logoNatGamez from '../../../assets/img/logo_natgamez.png';

import {
  formatearPrecioCLP,
} from '../../utils/formatters.js';

function ProductDetailsModal({
  producto,
}) {
  const seleccionado = producto ?? {
    titulo: 'Detalle del videojuego',
    genero: '',
    descripcion: '',
    plataformas: [],
    modalidad: '',
    rating: 0,
    estado: '',
    precioNormal: 0,
    precioOferta: 0,
    precio: 0,
    imagen: logoNatGamez,
    alt: 'Detalle del videojuego seleccionado',
  };

  return (
    <div
      id="detalleJuegoModal"
      className="modal fade modal-natgamez"
      tabIndex="-1"
      aria-labelledby="detalleJuegoTitulo"
      aria-describedby="detalleJuegoDescripcion"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
        <div className="modal-content">
          <div className="modal-header">
            <div>
              <p
                id="detalleJuegoGenero"
                className="producto-genero mb-1"
              >
                {seleccionado.genero}
              </p>

              <h2
                id="detalleJuegoTitulo"
                className="modal-title"
              >
                {seleccionado.titulo}
              </h2>
            </div>

            <button
              className="btn-close btn-close-white"
              type="button"
              data-bs-dismiss="modal"
              aria-label="Cerrar detalle"
            />
          </div>

          <div className="modal-body">
            <div className="row g-4 align-items-start">
              <div className="col-12 col-md-5">
                <img
                  id="detalleJuegoImagen"
                  className="img-fluid modal-juego-imagen"
                  src={seleccionado.imagen}
                  alt={seleccionado.alt}
                  onError={(event) => {
                    event.currentTarget.onerror = null;
                    event.currentTarget.src = logoNatGamez;
                  }}
                />
              </div>

              <div className="col-12 col-md-7">
                <p
                  id="detalleJuegoDescripcion"
                  className="modal-juego-descripcion"
                >
                  {seleccionado.descripcion}
                </p>

                <dl className="modal-ficha-juego">
                  <div>
                    <dt>Plataformas</dt>
                    <dd id="detalleJuegoPlataformas">
                      {seleccionado.plataformas.join(' · ')}
                    </dd>
                  </div>

                  <div>
                    <dt>Modalidad</dt>
                    <dd id="detalleJuegoModalidad">
                      {seleccionado.modalidad}
                    </dd>
                  </div>

                  <div>
                    <dt>Valoración NatGamez</dt>
                    <dd id="detalleJuegoRating">
                      {seleccionado.rating
                        ? `★ ${seleccionado.rating.toFixed(1)}`
                        : ''}
                    </dd>
                  </div>

                  <div>
                    <dt>Estado</dt>
                    <dd id="detalleJuegoEstado">
                      {seleccionado.estado}
                    </dd>
                  </div>
                </dl>

                <div
                  id="detalleJuegoPrecio"
                  className="modal-juego-precios"
                >
                  {seleccionado.precioNormal ? (
                    <del className="modal-juego-precio-normal">
                      Precio normal {formatearPrecioCLP(seleccionado.precioNormal)}
                    </del>
                  ) : null}

                  <p className="modal-juego-precio">
                    {seleccionado.precio
                      ? `Precio oferta ${formatearPrecioCLP(
                          seleccionado.precioOferta ?? seleccionado.precio,
                        )}`
                      : ''}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="modal-footer">
            <button
              className="btn boton-modal-cerrar"
              type="button"
              data-bs-dismiss="modal"
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailsModal;
