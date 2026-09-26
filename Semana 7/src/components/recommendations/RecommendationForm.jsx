/**
 * NatGamez · Semana 7 · COMPONENTE REACT
 * Formulario de recomendaciones.
 *
 * Gestiona los campos controlados, validaciones visibles y eventos submit/click recibidos desde el hook React.
 */
function RecommendationForm({
  habilitado,
  nombre,
  plataforma,
  errores,
  resultado,
  onNombreChange,
  onPlataformaChange,
  onSubmit,
  onSurprise,
}) {
  const resultadoClase =
    resultado.tipo === 'exito'
      ? 'text-success'
      : resultado.tipo === 'error'
        ? 'text-danger'
        : 'text-secondary';

  return (
    <div className="mt-4 p-4 border border-secondary rounded-3 bg-dark bg-opacity-50">
      <p className="etiqueta-seccion">
        TU PRÓXIMA PARTIDA
      </p>

      <h3 className="text-light mb-2">
        Encuentra una recomendación
      </h3>

      <p className="text-secondary">
        Indica tu nombre y plataforma preferida para recibir
        una sugerencia entre los juegos cargados dinámicamente.
      </p>

      <form
        id="formRecomendacion"
        className="row g-3 align-items-end"
        noValidate
        onSubmit={onSubmit}
      >
        <div className="col-12 col-md-5">
          <label
            className="form-label text-light"
            htmlFor="nombreJugador"
          >
            Tu nombre
          </label>

          <input
            id="nombreJugador"
            className={[
              'form-control',
              'bg-dark',
              'text-light',
              'border-secondary',
              errores.nombre ? 'is-invalid' : nombre.trim().length >= 2 ? 'is-valid' : '',
            ].filter(Boolean).join(' ')}
            type="text"
            name="nombreJugador"
            placeholder="Ej.: Natalia"
            autoComplete="name"
            minLength={2}
            maxLength={30}
            required
            aria-describedby="errorNombreJugador"
            aria-invalid={Boolean(errores.nombre)}
            value={nombre}
            onChange={(event) => onNombreChange(event.target.value)}
          />

          <div
            id="errorNombreJugador"
            className="invalid-feedback"
          >
            {errores.nombre || 'Escribe un nombre de 2 a 30 caracteres.'}
          </div>
        </div>

        <div className="col-12 col-md-4">
          <label
            className="form-label text-light"
            htmlFor="plataformaPreferida"
          >
            Plataforma
          </label>

          <select
            id="plataformaPreferida"
            className={[
              'form-select',
              'bg-dark',
              'text-light',
              'border-secondary',
              errores.plataforma ? 'is-invalid' : plataforma ? 'is-valid' : '',
            ].filter(Boolean).join(' ')}
            name="plataformaPreferida"
            required
            aria-describedby="errorPlataformaPreferida"
            aria-invalid={Boolean(errores.plataforma)}
            value={plataforma}
            onChange={(event) => onPlataformaChange(event.target.value)}
          >
            <option value="">
              Selecciona una plataforma
            </option>
            <option value="PC">PC</option>
            <option value="PS5">PS5</option>
            <option value="PS4">PS4</option>
            <option value="Xbox">Xbox</option>
            <option value="Switch">Nintendo Switch</option>
          </select>

          <div
            id="errorPlataformaPreferida"
            className="invalid-feedback"
          >
            {errores.plataforma || 'Selecciona una plataforma válida.'}
          </div>
        </div>

        <div className="col-12 col-md-3 d-grid">
          <button
            id="botonRecomendar"
            className="btn btn-detalles-juego"
            type="submit"
            disabled={!habilitado}
          >
            Recomendar
          </button>
        </div>
      </form>

      <div className="d-flex flex-wrap gap-3 align-items-center mt-3">
        <button
          id="botonSorpresa"
          className="btn btn-detalles-juego"
          type="button"
          disabled={!habilitado}
          onClick={onSurprise}
        >
          🎲 Sorpréndeme
        </button>

        <p
          id="resultadoRecomendacion"
          className={`mb-0 ${resultadoClase}`}
          role="status"
          aria-live="polite"
        >
          {resultado.mensaje}
        </p>
      </div>
    </div>
  );
}

export default RecommendationForm;
