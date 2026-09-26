/**
 * NatGamez · Semana 7 · COMPONENTE REACT
 * Navegación principal de la portada.
 *
 * Conserva la Navbar Bootstrap de Semana 6, pero React controla el menú
 * colapsable para mantener el mismo comportamiento estable del catálogo.
 */
import { useState } from 'react';

function HomeNavbar() {
  const [menuAbierto, setMenuAbierto] = useState(false);

  const base = import.meta.env.BASE_URL;
  const catalogo = `${base}?vista=catalogo`;

  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark navbar-natgamez-bootstrap"
      data-bs-theme="dark"
      aria-label="Navegación principal"
    >
      <div className="nav-cabecera-bootstrap">
        <h2>
          Menú principal
        </h2>

        <button
          className="navbar-toggler"
          type="button"
          aria-controls="navbarPrincipalS7"
          aria-expanded={menuAbierto}
          aria-label="Mostrar u ocultar el menú principal"
          onClick={() =>
            setMenuAbierto((actual) => !actual)
          }
        >
          <span className="navbar-toggler-icon" />
        </button>
      </div>

      <div
        id="navbarPrincipalS7"
        className={[
          'collapse',
          'navbar-collapse',
          'nav-collapse-bootstrap',
          menuAbierto ? 'show' : '',
        ].filter(Boolean).join(' ')}
      >
        <ul>
          <li>
            <a href="#inicio">
              Inicio
            </a>
          </li>

          <li>
            <a href="#productos">
              Destacados
            </a>
          </li>

          <li>
            <a href={catalogo}>
              Catálogo
            </a>
          </li>

          <li>
            <a href="#contacto">
              Contacto
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default HomeNavbar;
