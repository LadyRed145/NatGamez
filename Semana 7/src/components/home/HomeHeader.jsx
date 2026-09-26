/**
 * NatGamez · Semana 7 · COMPONENTE REACT
 * Hero principal de la portada.
 *
 * Recupera la composición original de Semana 6 y actualiza únicamente el
 * contenido académico para representar la versión React de Semana 7.
 */
import logoNatGamez from '../../../assets/img/logo_natgamez.png';

function HomeHeader() {
  return (
    <header className="hero-principal">
      <h1 className="sr-only">
        NatGamez
      </h1>

      <img
        className="logo-natgamez"
        src={logoNatGamez}
        alt="Logo de NatGamez, tienda de videojuegos"
      />

      <div className="hero-texto">
        <p className="etiqueta-seccion">
          NATGAMEZ · SEMANA 7
        </p>

        <p>
          Tu tienda gamer de Semana 7: explora videojuegos,
          ediciones Collector, figuras premium y una experiencia
          de compra dinámica ahora organizada con React y Vite.
        </p>
      </div>
    </header>
  );
}

export default HomeHeader;
