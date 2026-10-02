/**
 * NatGamez · Semana 8 · COMPONENTE REACT
 * Navegación principal del catálogo.
 *
 * En escritorio cada opción sustituye texto por icono al hover/focus.
 * Favoritos abre un offcanvas izquierdo y Comprar conserva el derecho.
 */
import { useState } from 'react';

import CartButton from '../cart/CartButton.jsx';

function CatalogNavbar({
  cantidadCarrito,
  cantidadFavoritos,
  buscadorAbierto,
  onToggleSearch,
}) {
  const [menuAbierto, setMenuAbierto] = useState(false);
  const inicio = import.meta.env.BASE_URL;

  const alternarMenu = () => {
    setMenuAbierto((estadoActual) => !estadoActual);
  };

  const enlaces = [
    {
      href: inicio,
      texto: 'Inicio',
      icono: '🏠',
      ariaLabel: 'Ir al inicio',
      claseIcono: 'nav-icono--inicio',
    },
    {
      href: '#videojuegos',
      texto: 'Videojuegos',
      icono: '🎮',
      ariaLabel: 'Ir a videojuegos',
      claseIcono: 'nav-icono--videojuegos',
    },
    {
      href: '#recomendaciones',
      texto: 'Recomendaciones',
      icono: '🎲',
      ariaLabel: 'Ir a recomendaciones',
      claseIcono: 'nav-icono--recomendaciones',
    },
    {
      href: '#coleccionistas',
      texto: "Collector's Vault",
      icono: '💎',
      ariaLabel: "Ir a Collector's Vault",
      claseIcono: 'nav-icono--collector',
    },
    {
      href: '#figuras',
      texto: 'Figuras premium',
      icono: '🏆',
      ariaLabel: 'Ir a figuras premium',
      claseIcono: 'nav-icono--figuras',
    },
    {
      href: '#contacto',
      texto: 'Contacto',
      icono: '📞',
      ariaLabel: 'Ir a contacto',
      claseIcono: 'nav-icono--contacto',
    },
  ];

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
          aria-controls="navbarCatalogoS8"
          aria-expanded={menuAbierto}
          onClick={alternarMenu}
          aria-label="Mostrar u ocultar el menú del catálogo"
        >
          <span className="navbar-toggler-icon" />
        </button>
      </div>

      <div
        id="navbarCatalogoS8"
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
                'nav-menu-interactivo',
                buscadorAbierto ? 'is-active' : '',
              ].filter(Boolean).join(' ')}
              type="button"
              aria-expanded={buscadorAbierto}
              aria-controls="panelBusquedaCatalogo"
              onClick={onToggleSearch}
            >
              <span className="nav-menu-texto">
                Buscar
              </span>

              <span
                className="nav-menu-icono nav-icono--buscar"
                aria-hidden="true"
              >
                🔎
              </span>
            </button>
          </li>

          {enlaces.map((enlace) => (
            <li key={enlace.href}>
              <a
                className="nav-menu-interactivo"
                href={enlace.href}
                aria-label={enlace.ariaLabel}
              >
                <span className="nav-menu-texto">
                  {enlace.texto}
                </span>

                <span
                  className={[
                    'nav-menu-icono',
                    enlace.claseIcono,
                  ].join(' ')}
                  aria-hidden="true"
                >
                  {enlace.icono}
                </span>
              </a>
            </li>
          ))}

          <li className="nav-favoritos-item">
            <button
              className={[
                'nav-accion-boton',
                'nav-favoritos-link',
                'nav-menu-interactivo',
                cantidadFavoritos > 0 ? 'tiene-favoritos' : '',
              ].filter(Boolean).join(' ')}
              type="button"
              data-bs-toggle="offcanvas"
              data-bs-target="#favoritosOffcanvas"
              aria-controls="favoritosOffcanvas"
              aria-label={`Abrir favoritos. ${cantidadFavoritos} producto${cantidadFavoritos === 1 ? '' : 's'} guardado${cantidadFavoritos === 1 ? '' : 's'}.`}
            >
              <span className="nav-menu-texto nav-favoritos-texto">
                Favoritos
              </span>

              <span
                className="nav-menu-icono nav-favoritos-icono"
                aria-hidden="true"
              >
                ♥
              </span>

              <span
                className={[
                  'nav-favoritos-contador',
                  cantidadFavoritos > 0 ? 'tiene-favoritos' : '',
                ].filter(Boolean).join(' ')}
                aria-hidden="true"
              >
                {cantidadFavoritos}
              </span>
            </button>
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
