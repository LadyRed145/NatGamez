/**
 * NatGamez · Semana 7 · COMPONENTE REACT
 * Presentación de la evolución actual de NatGamez.
 */
function HomeWelcome() {
  return (
    <section
      className="bienvenida-evolucion"
      aria-labelledby="bienvenida"
    >
      <p className="etiqueta-seccion">
        NUEVA VERSIÓN
      </p>

      <h2 id="bienvenida">
        NatGamez sigue subiendo de nivel
      </h2>

      <p>
        En <strong>NatGamez</strong> encontrarás videojuegos
        para diferentes plataformas y opciones pensadas para
        mejorar tu experiencia de juego.
      </p>

      <p>
        La Semana 7 conserva la identidad visual y las funciones
        desarrolladas previamente, mientras reorganiza la aplicación
        con componentes funcionales React, Hooks, renderizado
        condicional y una arquitectura modular mantenible.
      </p>
    </section>
  );
}

export default HomeWelcome;
