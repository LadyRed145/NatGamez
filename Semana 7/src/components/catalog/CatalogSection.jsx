/**
 * NatGamez · Semana 7 · COMPONENTE REACT
 * Sección principal del catálogo.
 *
 * Decide qué mostrar según carga, error, búsqueda y productos; delega la cuadrícula en componentes reutilizables.
 */
import ProductGrid from './ProductGrid.jsx';

function CatalogSection({
  productos,
  cargando,
  error,
  estadoBusqueda,
  onRetry,
  onDetails,
  onAdd,
}) {
  return (
    <section
      id="videojuegos"
      className="catalogo-seccion"
      aria-labelledby="titulo-videojuegos"
    >
      <div className="seccion-encabezado">
        <div>
          <p className="etiqueta-seccion">
            BIBLIOTECA NATGAMEZ
          </p>

          <h2 id="titulo-videojuegos">
            Videojuegos
          </h2>
        </div>

        <p>
          Aventuras seleccionadas para distintos tipos de jugador.
        </p>
      </div>

      <p
        id="estadoBusquedaCatalogo"
        className={[
          'estado-busqueda-catalogo',
          'estado-busqueda-normal',
          error
            ? 'text-danger'
            : estadoBusqueda.clase,
        ].filter(Boolean).join(' ')}
        role="status"
        aria-live="polite"
      >
        {cargando
          ? 'Cargando catálogo NatGamez...'
          : error || estadoBusqueda.texto}
      </p>

      {error && (
        <button
          className="btn btn-outline-light btn-sm mb-3"
          type="button"
          onClick={onRetry}
        >
          Reintentar carga
        </button>
      )}

      {!cargando && !error && (
        <ProductGrid
          productos={productos}
          onDetails={onDetails}
          onAdd={onAdd}
        />
      )}
    </section>
  );
}

export default CatalogSection;
