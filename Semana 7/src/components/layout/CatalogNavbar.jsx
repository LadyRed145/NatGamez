/**
 * NatGamez · Semana 7 · COMPONENTE REACT
 * Navegación principal del catálogo.
 *
 * Mantiene la Navbar Bootstrap y conecta búsqueda y carrito mediante props y eventos React.
 */
import { useState } from 'react';

import CartButton from '../cart/CartButton.jsx';

function CatalogNavbar({
  cantidadCarrito,
  buscadorAbierto,
  onToggleSearch,
}) {
  // React controla el colapso de la navbar para evitar
  // desincronización con el plugin imperativo de Bootstrap.
  const [menuAbierto, setMenuAbierto] = useState(false);

  const alternarMenu = () => {
    setMenuAbierto((estadoActual) => !estadoActual);
  };

  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark navbar-natgamez-bootstrap nav-catalogo"
      data-bs-theme="dark"
      aria-label="Navegación del catálogo"
    >
      <div className="nav-cabecera-bootstrap nav-cabecera-bootstrap--catalogo">
        <h2 className="sr-only">
          Menú del catálogo
        </h2>

        <button
          className="navbar-toggler"
          type="button"
          aria-controls="navbarCatalogoS7"
          aria-expanded={menuAbierto}
          onClick={alternarMenu}
          aria-label="Mostrar u ocultar el menú del catálogo"
        >
          <span className="navbar-toggler-icon" />
        </button>
      </div>

      <div
        id="navbarCatalogoS7"
        className={[
          'collapse',
          'navbar-collapse',
          'nav-collapse-bootstrap',
          menuAbierto ? 'show' : '',
        ].filter(Boolean).join(' ')}
      >
        <ul>
          <li className="nav-buscar-item">
            <button
              id="botonBuscarNav"
              className={[
                'nav-accion-boton',
                'nav-buscar-toggle',
                buscadorAbierto ? 'is-active' : '',
              ].filter(Boolean).join(' ')}
              type="button"
              aria-expanded={buscadorAbierto}
              aria-controls="panelBusquedaCatalogo"
              onClick={onToggleSearch}
            >
              <span
                className="nav-accion-icono"
                aria-hidden="true"
              >
                🔎
              </span>

              <span className="nav-accion-texto">
                Buscar
              </span>
            </button>
          </li>

          <li>
            <a href="#top">
              Inicio
            </a>
          </li>

          <li>
            <a href="#videojuegos">
              Videojuegos
            </a>
          </li>

          <li>
            <a href="#recomendaciones">
              Recomendaciones
            </a>
          </li>

          <li>
            <a href="#coleccionistas">
              Collector's Vault
            </a>
          </li>

          <li>
            <a href="#figuras">
              Figuras premium
            </a>
          </li>

          <li>
            <a href="#contacto">
              Contacto
            </a>
          </li>

          <li className="nav-comprar-item">
            <CartButton
              cantidad={cantidadCarrito}
            />
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default CatalogNavbar;
