/**
 * NatGamez · Semana 7 · COMPONENTE REACT
 * Selección destacada de la portada.
 *
 * Mantiene los tres productos y la composición visual de Semana 6.
 * Los valores mostrados corresponden al precio efectivo actual del catálogo.
 */
function HomeFeatured() {
  return (
    <section
      id="productos"
      className="destacados-principal"
      aria-labelledby="titulo-productos"
    >
      <div className="seccion-encabezado">
        <div>
          <p className="etiqueta-seccion">
            SELECCIÓN NATGAMEZ
          </p>

          <h2 id="titulo-productos">
            Productos destacados
          </h2>
        </div>
      </div>

      <ul className="productos-destacados-grid">
        <li>
          <article>
            <span className="badge-producto">
              DESTACADO
            </span>

            <h3>
              God of War Ragnarök
            </h3>

            <figure>
              <img
                src="https://static.wikia.nocookie.net/godofwar/images/c/ca/Portada_God_of_War_Ragnarok.png/revision/latest?cb=20211008000423&path-prefix=es"
                alt="Portada del videojuego God of War Ragnarök"
              />

              <figcaption>
                God of War Ragnarök
              </figcaption>
            </figure>

            <p>
              Acompaña a Kratos y Atreus en una aventura épica por los
              nueve reinos de la mitología nórdica.
            </p>

            <p className="precio-destacado">
              <strong>Precio:</strong>{' '}
              $19.990
            </p>
          </article>
        </li>

        <li>
          <article>
            <span className="badge-producto badge-azul">
              TOP VENTAS
            </span>

            <h3>
              Cyberpunk 2077
            </h3>

            <figure>
              <img
                src="https://upload.wikimedia.org/wikipedia/en/9/9f/Cyberpunk_2077_box_art.jpg"
                alt="Portada del videojuego Cyberpunk 2077"
              />

              <figcaption>
                Cyberpunk 2077
              </figcaption>
            </figure>

            <p>
              Explora Night City, una enorme ciudad futurista llena de
              tecnología, peligros y oportunidades.
            </p>

            <p className="precio-destacado">
              <strong>Precio:</strong>{' '}
              $39.990
            </p>
          </article>
        </li>

        <li>
          <article>
            <span className="badge-producto badge-verde">
              RECOMENDADO
            </span>

            <h3>
              Elden Ring
            </h3>

            <figure>
              <img
                src="https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1245620/capsule_616x353.jpg?t=1784684281"
                alt="Imagen promocional del videojuego Elden Ring"
              />

              <figcaption>
                Elden Ring
              </figcaption>
            </figure>

            <p>
              Adéntrate en las Tierras Intermedias, descubre secretos
              y construye tu propio estilo de combate.
            </p>

            <p className="precio-destacado">
              <strong>Precio:</strong>{' '}
              $44.990
            </p>
          </article>
        </li>
      </ul>
    </section>
  );
}

export default HomeFeatured;
