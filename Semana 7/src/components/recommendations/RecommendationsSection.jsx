/**
 * NatGamez · Semana 7 · COMPONENTE REACT
 * Sección de recomendaciones.
 *
 * Orquesta formulario, estados de carga/error y resultados mediante renderizado condicional.
 */
import RecommendationForm from './RecommendationForm.jsx';
import RecommendationsGrid from './RecommendationsGrid.jsx';

function RecommendationsSection({
  cargando,
  error,
  onRetry,
  recommendation,
}) {
  const habilitado =
    !cargando &&
    !error;

  return (
    <section
      id="recomendaciones"
      className="catalogo-seccion"
      aria-labelledby="titulo-recomendaciones"
    >
      <div className="seccion-encabezado">
        <div>
          <p className="etiqueta-seccion">
            SELECCIÓN DINÁMICA
          </p>

          <h2 id="titulo-recomendaciones">
            Recomendaciones NatGamez
          </h2>
        </div>

        <p>
          Esta selección se carga dinámicamente desde un archivo JSON
          mediante JavaScript y Fetch API.
        </p>
      </div>

      <p
        id="estadoRecomendaciones"
        className={habilitado ? 'mb-0 d-none' : 'mb-0'}
        role="status"
        aria-live="polite"
      >
        {cargando
          ? 'Cargando recomendaciones...'
          : error}
      </p>

      <button
        id="botonReintentarCarga"
        className={[
          'btn',
          'btn-outline-light',
          'btn-sm',
          'mt-2',
          error ? '' : 'd-none',
        ].filter(Boolean).join(' ')}
        type="button"
        onClick={onRetry}
      >
        Reintentar carga
      </button>

      <RecommendationsGrid />

      <RecommendationForm
        habilitado={habilitado}
        {...recommendation}
        onNombreChange={recommendation.cambiarNombre}
        onPlataformaChange={recommendation.cambiarPlataforma}
        onSubmit={recommendation.recomendar}
        onSurprise={recommendation.sorprender}
      />
    </section>
  );
}

export default RecommendationsSection;
