/**
 * NatGamez · Semana 7 · COMPONENTE REACT
 * Bloque de retorno al inicio.
 *
 * Mantiene la llamada final de navegación separada del catálogo y de las secciones comerciales.
 */
function ReturnHome() {
  return (
    <section
      className="regreso-principal"
      aria-labelledby="volver-principal"
    >
      <div>
        <p className="etiqueta-seccion">
          NATGAMEZ
        </p>

        <h2 id="volver-principal">
          ¿Terminaste de explorar?
        </h2>

        <p>
          Puedes volver cuando quieras a la portada principal.
        </p>
      </div>

      <a
        className="boton"
        href="#top"
      >
        Volver a NatGamez
      </a>
    </section>
  );
}

export default ReturnHome;
