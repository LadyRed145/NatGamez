/**
 * NatGamez · Semana 7 · COMPONENTE REACT
 * Lista visual de plataformas.
 *
 * Convierte el arreglo de plataformas de cada producto en chips reutilizables mediante renderizado con map().
 */
function PlatformChips({
  plataformas = [],
}) {
  return (
    <div
      className="plataformas-juego"
      aria-label="Plataformas disponibles"
    >
      {plataformas.map((plataforma) => (
        <span
          key={plataforma}
          className="badge plataforma-chip"
        >
          {plataforma}
        </span>
      ))}
    </div>
  );
}

export default PlatformChips;
