/**
 * NatGamez · Semana 7 · COMPONENTE REACT
 * Accesos directos desde la portada a las áreas principales del catálogo.
 */
function HomeCategories() {
  const base = import.meta.env.BASE_URL;
  const destino = (seccion) =>
    `${base}?vista=catalogo#${seccion}`;

  return (
    <section
      className="seccion-categorias"
      aria-labelledby="categorias"
    >
      <h2 id="categorias">
        Explora NatGamez
      </h2>

      <p>
        El catálogo completo vive en su propia vista React:
      </p>

      <ul className="categorias-grid">
        <li>
          <a href={destino('videojuegos')}>
            <span
              className="categoria-icono"
              aria-hidden="true"
            >
              🎮
            </span>

            <strong>
              Videojuegos
            </strong>

            <span>
              Historias para descubrir,<br />
              mundos para conquistar.
            </span>
          </a>
        </li>

        <li>
          <a href={destino('coleccionistas')}>
            <span
              className="categoria-icono"
              aria-hidden="true"
            >
              💎
            </span>

            <strong>
              Collector&apos;s Vault
            </strong>

            <span>
              Ediciones especiales y productos de colección.
            </span>
          </a>
        </li>

        <li>
          <a href={destino('figuras')}>
            <span
              className="categoria-icono"
              aria-hidden="true"
            >
              🏆
            </span>

            <strong>
              Figuras premium
            </strong>

            <span>
              Piezas pensadas para destacar en cualquier repisa.
            </span>
          </a>
        </li>
      </ul>
    </section>
  );
}

export default HomeCategories;
