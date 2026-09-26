/**
 * NatGamez · Semana 7 · COMPONENTE REACT
 * Resultado visual de recomendaciones.
 *
 * Muestra productos recomendados mediante componentes existentes para evitar duplicar cards.
 */
function RecommendationsGrid() {
  return (
    <>
      <div
        id="recomendacionesGrid"
        className="row g-4 catalogo-grid d-none"
        aria-live="polite"
      />

      <p
        id="estadoExploracion"
        className="mt-3 mb-0 text-secondary d-none"
        role="status"
        aria-live="polite"
      >
        Pasa el cursor sobre una recomendación para explorarla.
      </p>
    </>
  );
}

export default RecommendationsGrid;
