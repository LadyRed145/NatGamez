/**
 * NatGamez · Semana 7 · COMPONENTE REACT
 * Encabezado visual del catálogo.
 *
 * Conserva la identidad original de NatGamez dentro del árbol de componentes React.
 */
import logoNatGamez from '../../../assets/img/logo_natgamez.png';

function CatalogHeader() {
  return (
    <header className="catalogo-hero">
      <div className="catalogo-marca">
        <a
          href="#top"
          aria-label="Volver al inicio de NatGamez"
        >
          <img
            className="logo-natgamez"
            src={logoNatGamez}
            alt="Logo de NatGamez, tienda de videojuegos"
          />
        </a>

        <p className="etiqueta-seccion">
          CATÁLOGO 2026
        </p>
      </div>

      <div className="catalogo-hero-contenido">
        <p className="catalogo-kicker">
          MÁS JUEGOS · MÁS COLECCIÓN · MÁS NATGAMEZ
        </p>

        <h1>
          Encuentra tu próxima obsesión
        </h1>

        <p>
          Explora una selección ampliada de videojuegos, ediciones de
          colección y piezas premium. Esta página tiene una composición
          propia para diferenciarse claramente de la portada principal.
        </p>

        <div
          className="catalogo-estadisticas"
          aria-label="Resumen del catálogo"
        >
          <div>
            <strong>12</strong>
            <span>Videojuegos</span>
          </div>

          <div>
            <strong>3</strong>
            <span>Ediciones especiales</span>
          </div>

          <div>
            <strong>6</strong>
            <span>Piezas premium</span>
          </div>
        </div>
      </div>
    </header>
  );
}

export default CatalogHeader;
