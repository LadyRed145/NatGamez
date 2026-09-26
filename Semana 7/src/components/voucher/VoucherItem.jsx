/**
 * NatGamez · Semana 7 · COMPONENTE REACT
 * Fila de producto del comprobante.
 *
 * Renderiza cantidad, precio efectivo y subtotal de cada producto comprado.
 */
import logoNatGamez from '../../../assets/img/logo_natgamez.png';

import {
  formatearPrecioCLP,
} from '../../utils/formatters.js';

function VoucherItem({
  item,
}) {
  return (
    <tr>
      <td className="voucher-producto">
        <div className="voucher-producto-contenido">
          <img
            className="voucher-producto-imagen"
            src={item.imagen}
            alt={item.alt}
            onError={(event) => {
              event.currentTarget.onerror = null;
              event.currentTarget.src = logoNatGamez;
            }}
          />

          <div>
            <strong className="voucher-producto-nombre">
              {item.titulo}
            </strong>

            <span className="voucher-producto-genero">
              {item.genero}
            </span>
          </div>
        </div>
      </td>

      <td>
        {item.cantidad}
      </td>

      <td>
        {formatearPrecioCLP(item.precio)}
      </td>

      <td className="voucher-subtotal">
        {formatearPrecioCLP(item.subtotal)}
      </td>
    </tr>
  );
}

export default VoucherItem;
