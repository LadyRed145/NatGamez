/**
 * NatGamez · Semana 7 · COMPONENTE REACT
 * Modal del comprobante.
 *
 * Presenta la compra final, permite cerrar el comprobante y conserva la integración con Bootstrap.
 */
import {
  useEffect,
  useRef,
} from 'react';

import {
  Modal,
} from 'bootstrap';

import {
  imprimirComprobante,
} from '../../utils/voucherUtils.js';

import VoucherContent from './VoucherContent.jsx';

function VoucherModal({
  compra,
  onClose,
}) {
  const ref = useRef(null);

  useEffect(() => {
    const elemento = ref.current;

    if (!elemento) {
      return undefined;
    }

    const cerrado = () => {
      onClose?.();
    };

    elemento.addEventListener(
      'hidden.bs.modal',
      cerrado,
    );

    return () => {
      elemento.removeEventListener(
        'hidden.bs.modal',
        cerrado,
      );
    };
  }, [onClose]);

  useEffect(() => {
    if (!compra || !ref.current) {
      return;
    }

    Modal
      .getOrCreateInstance(ref.current)
      .show();
  }, [compra]);

  return (
    <div
      ref={ref}
      id="modalVoucherNatGamez"
      className="modal fade modal-voucher-natgamez"
      tabIndex="-1"
      aria-labelledby="tituloVoucherNatGamez"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered modal-lg modal-dialog-scrollable">
        <div className="modal-content voucher-modal-content">
          <div className="modal-header voucher-modal-header">
            <h2
              id="tituloVoucherNatGamez"
              className="modal-title voucher-modal-title"
            >
              Comprobante de compra
            </h2>

            <button
              className="btn-close btn-close-white"
              type="button"
              data-bs-dismiss="modal"
              aria-label="Cerrar comprobante"
            />
          </div>

          <div className="modal-body voucher-modal-body">
            <VoucherContent
              compra={compra}
            />
          </div>

          <div className="modal-footer voucher-modal-footer">
            <button
              id="botonImprimirComprobante"
              className="voucher-boton-imprimir"
              type="button"
              disabled={!compra}
              onClick={() => {
                if (compra) {
                  void imprimirComprobante(compra);
                }
              }}
            >
              🖨️ Guardar / imprimir comprobante
            </button>

            <button
              className="voucher-boton-cerrar"
              type="button"
              data-bs-dismiss="modal"
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VoucherModal;
