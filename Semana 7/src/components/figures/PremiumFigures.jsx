/**
 * NatGamez · Semana 7 · COMPONENTE REACT
 * Sección de figuras premium.
 *
 * Recorre el catálogo de figuras especiales y compone FigureCard sin duplicar estructura ni lógica.
 */
import {
  FIGURE_PRODUCTS,
} from '../../utils/productUtils.js';

import FigureCard from './FigureCard.jsx';

function PremiumFigures({
  onAdd,
}) {
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
          />
        ))}
      </div>
    </section>
  );
}

export default PremiumFigures;
