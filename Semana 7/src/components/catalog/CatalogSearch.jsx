/**
 * NatGamez · Semana 7 · COMPONENTE REACT
 * Buscador del catálogo.
 *
 * Controla visualmente el formulario de búsqueda con props, onChange, onSubmit y renderizado condicional.
 */
function CatalogSearch({
  abierto,
  entrada,
  onChange,
  onSubmit,
}) {
  return (
    <div
      id="panelBusquedaCatalogo"
      className={[
        'nav-buscador-panel',
        abierto ? 'is-open' : '',
      ].filter(Boolean).join(' ')}
      hidden={!abierto}
    >
      <form
        id="formBusquedaCatalogo"
        className="nav-buscador-form"
        role="search"
        aria-label="Buscar videojuegos en el catálogo"
        noValidate
        onSubmit={onSubmit}
      >
        <div className="nav-buscador-campo">
          <label
            className="visually-hidden"
            htmlFor="busquedaCatalogo"
          >
            Buscar videojuegos
          </label>

          <span
            className="nav-buscador-icono"
            aria-hidden="true"
          >
            🔎
          </span>

          <input
            id="busquedaCatalogo"
            className="nav-buscador-input"
            name="busquedaCatalogo"
            type="search"
            placeholder="Buscar por título, género, categoría o plataforma..."
            autoComplete="off"
            maxLength={60}
            aria-describedby="estadoBusquedaCatalogo"
            value={entrada}
            onChange={(event) => onChange(event.target.value)}
          />
        </div>

        <button
          className="nav-buscador-boton"
          type="submit"
        >
          Buscar
        </button>
      </form>
    </div>
  );
}

export default CatalogSearch;