/**
 * NatGamez · Semana 7 · COMPONENTE REACT
 * Pie de página de NatGamez.
 *
 * Aísla la información de contacto y cierre visual como componente de layout reutilizable.
 */
function Footer() {
  return (
    <footer id="contacto">
      <div className="footer-contenido">
        <div className="footer-bloque">
          <h2>
            Contacto
          </h2>

          <p>
            NatGamez - Tienda de Videojuegos
          </p>

          <p>
            Dirección: Los Salitres 123, Temuco, Chile
          </p>

          <p>
            Correo:{' '}
            <a href="mailto:NatGamez@gmail.cl">
              NatGamez@gmail.cl
            </a>
          </p>
        </div>

        <div className="footer-bloque">
          <h2>
            Comunidad
          </h2>

          <p>
            Síguenos en nuestras redes sociales:
          </p>

          <ul className="redes-sociales">
            <li>
              <a
                href="#"
                aria-label="Facebook de NatGamez"
              >
                Facebook
              </a>
            </li>

            <li>
              <a
                href="#"
                aria-label="Instagram de NatGamez"
              >
                Instagram
              </a>
            </li>

            <li>
              <a
                href="#"
                aria-label="TikTok de NatGamez"
              >
                TikTok
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer-inferior">
        <p>
          © 2026 NatGamez. Todos los derechos reservados.
        </p>

        <p>
          <a href="#top">
            Volver al inicio ↑
          </a>
        </p>
      </div>
    </footer>
  );
}

export default Footer;
