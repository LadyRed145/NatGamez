/**
 * NatGamez · Semana 7 · COMPONENTE REACT
 * Controles del Collector’s Vault.
 *
 * Presenta indicadores, contador y pausa/reanudación del carrusel mediante eventos React.
 */
function VaultControls({
  contador,
  pausado,
  onTogglePause,
}) {
  return (
    <div className="vault-navegacion-inferior">
      <div
        className="carousel-indicators vault-indicadores-bootstrap"
        aria-label="Seleccionar edición especial"
      >
        <button
          className="active"
          type="button"
          data-bs-target="#vaultCarouselBootstrap"
          data-bs-slide-to="0"
          aria-current="true"
          aria-label="Ver Elden Ring Collector's Edition"
        />
        <button
          type="button"
          data-bs-target="#vaultCarouselBootstrap"
          data-bs-slide-to="1"
          aria-label="Ver Cyberpunk 2077 5th Anniversary Collector's Set"
        />
        <button
          type="button"
          data-bs-target="#vaultCarouselBootstrap"
          data-bs-slide-to="2"
          aria-label="Ver The Witcher 3 Collector's Edition"
        />
      </div>

      <div className="vault-utilidades">
        <span
          id="vaultContador"
          className="vault-contador"
          aria-hidden="true"
        >
          {contador}
        </span>

        <button
          id="vaultPausa"
          className="btn vault-pausa"
          type="button"
          aria-label={
            pausado
              ? 'Reanudar rotación automática del carrusel'
              : 'Pausar rotación automática del carrusel'
          }
          aria-pressed={pausado}
          onClick={onTogglePause}
        >
          {pausado
            ? '▶ Reproducir'
            : '⏸ Pausar'}
        </button>
      </div>
    </div>
  );
}

export default VaultControls;
