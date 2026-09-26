/**
 * NatGamez · Semana 7 · COMPONENTE REACT
 * Cuadrícula del catálogo.
 *
 * Recorre la lista de productos y crea una ProductCard por elemento conservando claves únicas de React.
 */
import ProductCard from './ProductCard.jsx';

function ProductGrid({
  productos,
  onDetails,
  onAdd,
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
        />
      ))}
    </div>
  );
}

export default ProductGrid;
