/**
 * NatGamez · Semana 8 · COMPONENTE REACT
 * Cuadrícula reutilizable del catálogo y favoritos.
 */
import ProductCard from './ProductCard.jsx';

function ProductGrid({
  productos,
  onDetails,
  onAdd,
  favoritos = [],
  onToggleFavorite,
}) {
  return (
    <div className="row g-4 catalogo-grid">
      {productos.map((producto, indice) => (
        <ProductCard
          key={producto.id}
          producto={producto}
          indice={indice}
          onDetails={onDetails}
          onAdd={onAdd}
          favorito={favoritos.includes(producto.id)}
          onToggleFavorite={onToggleFavorite}
        />
      ))}
    </div>
  );
}

export default ProductGrid;
