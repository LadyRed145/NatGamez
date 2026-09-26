/**
 * NatGamez · Semana 7 · COMPONENTE REACT
 * Fondo decorativo del catálogo.
 *
 * React solo renderiza las estrellas fugaces.
 * Las capas de puntos RGB, el parallax y el movimiento continuo
 * se mantienen exclusivamente en CSS.
 *
 * Se conservan las tres fugaces originales y se agregan tres
 * apariciones secundarias para dar un poco más de vida al cielo
 * sin saturar la interfaz.
 */
function CatalogSky() {
  return (
    <div
      className="cielo-catalogo"
      aria-hidden="true"
    >
      <span className="estrella-fugaz estrella-fugaz-morada"></span>
      <span className="estrella-fugaz estrella-fugaz-azul"></span>
      <span className="estrella-fugaz estrella-fugaz-verde"></span>

      <span className="estrella-fugaz estrella-fugaz-morada estrella-fugaz-extra-uno"></span>
      <span className="estrella-fugaz estrella-fugaz-azul estrella-fugaz-extra-dos"></span>
      <span className="estrella-fugaz estrella-fugaz-verde estrella-fugaz-extra-tres"></span>
    </div>
  );
}

export default CatalogSky;
