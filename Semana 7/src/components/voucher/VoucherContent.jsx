/**
 * NatGamez · Semana 7 · COMPONENTE REACT
 * Contenido del comprobante.
 *
 * Construye la información imprimible de la compra a partir del objeto generado por el estado del carrito.
 */
import logoNatGamez from '../../../assets/img/logo_natgamez.png';

import {
  formatearPrecioCLP,
} from '../../utils/formatters.js';

import VoucherItem from './VoucherItem.jsx';

function Dato({
  etiqueta,
  valor,
  clase = '',
}) {
  return (
    <div className="voucher-dato">
      <span className="voucher-dato-etiqueta">
        {etiqueta}
      </span>

      <strong className={clase}>
        {valor}
      </strong>
    </div>
  );
}

function VoucherContent({
  compra,
}) {
  if (!compra) {
    return null;
  }

  return (
    <section
      id="voucherContenido"
      className="voucher-comprobante"
      aria-live="polite"
    >
      <div className="voucher-cabecera">
        <div className="voucher-identidad">
          <p className="voucher-kicker">
            COMPRA CONFIRMADA
          </p>

          <h3 className="voucher-marca">
            NatGamez
          </h3>

          <p className="voucher-mensaje">
            Gracias por comprar en NatGamez. Tu selección quedó registrada correctamente.
          </p>
        </div>

        <img
          className="voucher-logo"
          src={logoNatGamez}
          alt="Logo de NatGamez"
        />
      </div>

      <div className="voucher-datos">
        <Dato etiqueta="Folio" valor={compra.folio} />
        <Dato etiqueta="Fecha" valor={compra.fecha} />
        <Dato
          etiqueta="Estado"
          valor="Confirmado"
          clase="voucher-estado-confirmado"
        />
        <Dato
          etiqueta="Método de pago"
          valor="Pago digital · Demo"
        />
        <Dato
          etiqueta="Entrega"
          valor="Descarga inmediata"
        />
        <Dato
          etiqueta="Unidades"
          valor={String(compra.cantidadTotal)}
        />
      </div>

      <div className="voucher-tabla-contenedor">
        <table className="voucher-tabla">
          <thead>
            <tr>
              <th>Producto</th>
              <th>Cant.</th>
              <th>Precio</th>
              <th>Subtotal</th>
            </tr>
          </thead>

          <tbody>
            {compra.items.map((item) => (
              <VoucherItem
                key={item.id}
                item={item}
              />
            ))}
          </tbody>
        </table>
      </div>

      <div className="voucher-resumen">
        <div className="voucher-resumen-texto">
          <span>
            {compra.items.length} producto{compra.items.length === 1 ? '' : 's'} distinto{compra.items.length === 1 ? '' : 's'}
          </span>

          <small>
            {compra.cantidadTotal} unidad{compra.cantidadTotal === 1 ? '' : 'es'} en total
          </small>
        </div>

        <div className="voucher-total">
          <span>
            Total pagado
          </span>

          <strong>
            {formatearPrecioCLP(compra.total)}
          </strong>
        </div>
      </div>

      <div className="voucher-pie">
        <strong>
          Gracias por elegir NatGamez 🎮
        </strong>

        <p>
          Este comprobante corresponde a una compra simulada con fines académicos. No representa una transacción comercial real.
        </p>
      </div>
    </section>
  );
}

export default VoucherContent;
