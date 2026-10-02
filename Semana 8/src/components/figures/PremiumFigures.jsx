/**
 * NatGamez · Semana 8 · COMPONENTE REACT
 * Sección de figuras premium con favoritos persistentes.
 */
import {
  FIGURE_PRODUCTS,
} from '../../utils/productUtils.js';

import FigureCard from './FigureCard.jsx';

function PremiumFigures({
  onAdd,
  favoritos = [],
  onToggleFavorite,
}) {
  const favoritosSet = new Set(favoritos);

  return (
    <section
      id="figuras"
      className="figuras-seccion"
      aria-labelledby="titulo-figuras"
    >
      <div className="seccion-encabezado">
        <div>
          <p className="etiqueta-seccion">
            DISPLAY PREMIUM
          </p>

          <h2 id="titulo-figuras">
            Figuras que mandan en la repisa
          </h2>
        </div>

        <p>
          Piezas premium para convertir cualquier repisa
          en una verdadera vitrina de colección.
        </p>
      </div>

      <div className="figuras-grid">
        {FIGURE_PRODUCTS.map((producto) => (
          <FigureCard
            key={producto.id}
            producto={producto}
            onAdd={onAdd}
            favorito={favoritosSet.has(producto.id)}
            onToggleFavorite={onToggleFavorite}
          />
        ))}
      </div>
    </section>
  );
}

export default PremiumFigures;
