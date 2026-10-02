/**
 * NatGamez · Semana 8 · COMPONENTE REACT
 * Panel lateral de favoritos.
 *
 * Se abre desde la izquierda y reúne productos del catálogo,
 * Collector's Vault y Figuras premium guardados en localStorage.
 */
import {
  useEffect,
  useRef,
} from 'react';

import logoNatGamez from '../../../assets/img/logo_natgamez.png';

import {
  formatearPrecioCLP,
} from '../../utils/formatters.js';

function FavoritesOffcanvas({
  items,
  onRemove,
  onAdd,
  onClear,
}) {
  const ref = useRef(null);

  useEffect(() => {
    const elemento = ref.current;

    if (!elemento) {
      return undefined;
    }

    const abrir = () => {
      document.body.classList.add('favoritos-abierto');
    };

    const cerrar = () => {
      document.body.classList.remove('favoritos-abierto');
    };

    elemento.addEventListener('show.bs.offcanvas', abrir);
    elemento.addEventListener('hidden.bs.offcanvas', cerrar);

    return () => {
      elemento.removeEventListener('show.bs.offcanvas', abrir);
      elemento.removeEventListener('hidden.bs.offcanvas', cerrar);
      document.body.classList.remove('favoritos-abierto');
    };
  }, []);

  return (
    <aside
      ref={ref}
      id="favoritosOffcanvas"
      className="offcanvas offcanvas-start offcanvas-natgamez offcanvas-favoritos"
      tabIndex="-1"
      aria-labelledby="tituloFavoritosOffcanvas"
    >
      <div className="offcanvas-header">
        <div className="favoritos-offcanvas-titulo">
          <p className="etiqueta-seccion">
            GUARDADO EN ESTE NAVEGADOR
          </p>

          <h2 id="tituloFavoritosOffcanvas">
            ♥ Mis favoritos
          </h2>
        </div>

        <button
          className="carrito-cerrar"
          type="button"
          data-bs-dismiss="offcanvas"
          aria-label="Cerrar favoritos"
        >
          ×
        </button>
      </div>

      <div className="offcanvas-body favoritos-offcanvas-body">
        <p
          className="favoritos-offcanvas-estado"
          role="status"
          aria-live="polite"
        >
          {items.length === 0
            ? 'Aún no tienes favoritos. Tu backlog gamer está sospechosamente sano.'
            : `${items.length} producto${items.length === 1 ? '' : 's'} guardado${items.length === 1 ? '' : 's'}.`}
        </p>

        <div className="favoritos-offcanvas-lista">
          {items.length === 0 ? (
            <div className="favoritos-offcanvas-vacio">
              <span aria-hidden="true">
                ♡
              </span>

              <strong>
                Tu wishlist está esperando cariño
              </strong>

              <p>
                Marca videojuegos, ediciones Collector o figuras premium con el corazón.
              </p>
            </div>
          ) : (
            items.map((producto) => (
              <article
                key={producto.id}
                className="favoritos-offcanvas-item"
              >
                <figure>
                  <img
                    src={producto.imagen}
                    alt={producto.alt || producto.titulo}
                    loading="lazy"
                    onError={(event) => {
                      event.currentTarget.onerror = null;
                      event.currentTarget.src = logoNatGamez;
                    }}
                  />
                </figure>

                <div className="favoritos-offcanvas-item-info">
                  <p className="favoritos-offcanvas-categoria">
                    {producto.categoria || producto.genero || 'NatGamez'}
                  </p>

                  <h3>
                    {producto.titulo}
                  </h3>

                  <strong className="favoritos-offcanvas-precio">
                    {formatearPrecioCLP(
                      producto.precioOferta ?? producto.precio,
                    )}
                  </strong>

                  <div className="favoritos-offcanvas-item-acciones">
                    <button
                      className="favoritos-offcanvas-agregar"
                      type="button"
                      onClick={() => onAdd(producto.id)}
                    >
                      🛒 Agregar
                    </button>

                    <button
                      className="favoritos-offcanvas-quitar"
                      type="button"
                      onClick={() => onRemove(producto.id)}
                      aria-label={`Quitar ${producto.titulo} de favoritos`}
                    >
                      ♥ Quitar
                    </button>
                  </div>
                </div>
              </article>
            ))
          )}
        </div>
      </div>

      <div className="favoritos-offcanvas-footer">
        <button
          className="favoritos-boton-vaciar"
          type="button"
          disabled={items.length === 0}
          onClick={onClear}
        >
          Vaciar favoritos
        </button>

        <button
          className="favoritos-boton-agregar-todos"
          type="button"
          disabled={items.length === 0}
          onClick={() => {
            items.forEach((producto) => onAdd(producto.id));
          }}
        >
          🛒 Agregar todos
        </button>

        <p>
          Tus favoritos permanecen guardados incluso después de recargar o cerrar NatGamez.
        </p>
      </div>
    </aside>
  );
}

export default FavoritesOffcanvas;
