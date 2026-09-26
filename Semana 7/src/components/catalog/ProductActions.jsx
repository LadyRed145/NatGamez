/**
 * NatGamez · Semana 7 · COMPONENTE REACT
 * Acciones disponibles por producto.
 *
 * Agrupa Ver detalles y Agregar al carrito mediante eventos React y componentes reutilizables.
 */
import AddToCartButton from '../cart/AddToCartButton.jsx';

function ProductActions({
  producto,
  onDetails,
  onAdd,
}) {
  return (
    <div className="acciones-producto mt-auto">
      <button
        className="btn btn-detalles-juego"
        type="button"
        data-bs-toggle="modal"
        data-bs-target="#detalleJuegoModal"
        onClick={() => onDetails(producto)}
      >
        Ver detalles
      </button>

      <AddToCartButton
        producto={producto}
        onAdd={onAdd}
      />
    </div>
  );
}

export default ProductActions;
