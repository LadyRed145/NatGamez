/**
 * NatGamez · Semana 8
 * Modal del comprobante de compra.
 *
 * Gestiona correctamente el foco antes de ocultarse para evitar
 * conflictos de accesibilidad entre Bootstrap y aria-hidden.
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
  const modalRef = useRef(null);
  const focoAnteriorRef = useRef(null);

  /**
   * Mueve el foco fuera del modal ANTES de que Bootstrap
   * aplique aria-hidden="true".
   */
  const liberarFocoDelModal = () => {
    const modal = modalRef.current;
    const activo = document.activeElement;

    if (
      !modal
      || !(activo instanceof HTMLElement)
      || !modal.contains(activo)
    ) {
      return;
    }

    activo.blur();

    /**
     * Dejamos temporalmente el foco en body.
     *
     * Esto garantiza que ningún descendiente del modal siga
     * teniendo foco cuando Bootstrap lo marque como oculto.
     */
    const teniaTabIndex = document.body.hasAttribute('tabindex');
    const tabIndexAnterior = document.body.getAttribute('tabindex');

    if (!teniaTabIndex) {
      document.body.setAttribute('tabindex', '-1');
    }

    document.body.focus({
      preventScroll: true,
    });

    if (!teniaTabIndex) {
      document.body.removeAttribute('tabindex');
    } else if (tabIndexAnterior !== null) {
      document.body.setAttribute(
        'tabindex',
        tabIndexAnterior,
      );
    }
  };

  useEffect(() => {
    const modal = modalRef.current;

    if (!modal) {
      return undefined;
    }

    const manejarInicioCierre = () => {
      liberarFocoDelModal();
    };

    const manejarCierreCompleto = () => {
      const focoAnterior = focoAnteriorRef.current;

      /**
       * Si el elemento original sigue visible y conectado,
       * recuperamos el foco.
       */
      if (
        focoAnterior instanceof HTMLElement
        && focoAnterior.isConnected
        && !modal.contains(focoAnterior)
      ) {
        try {
          focoAnterior.focus({
            preventScroll: true,
          });
        } catch {
          // El foco ya quedó en una zona segura.
        }
      }

      focoAnteriorRef.current = null;

      onClose?.();
    };

    modal.addEventListener(
      'hide.bs.modal',
      manejarInicioCierre,
    );

    modal.addEventListener(
      'hidden.bs.modal',
      manejarCierreCompleto,
    );

    return () => {
      modal.removeEventListener(
        'hide.bs.modal',
        manejarInicioCierre,
      );

      modal.removeEventListener(
        'hidden.bs.modal',
        manejarCierreCompleto,
      );
    };
  }, [onClose]);

  useEffect(() => {
    const modal = modalRef.current;

    if (!compra || !modal) {
      return;
    }

    const activo = document.activeElement;

    if (
      activo instanceof HTMLElement
      && !modal.contains(activo)
    ) {
      focoAnteriorRef.current = activo;
    }

    Modal
      .getOrCreateInstance(modal)
      .show();
  }, [compra]);

  /**
   * Este handler ocurre antes de que el evento click llegue
   * al listener delegado de Bootstrap que ejecuta data-bs-dismiss.
   *
   * Así eliminamos el foco del botón antes del cierre real.
   */
  const manejarBotonCerrar = (event) => {
    event.currentTarget.blur();

    liberarFocoDelModal();
  };

  return (
    <div
      ref={modalRef}
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
              onClick={manejarBotonCerrar}
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
              onClick={manejarBotonCerrar}
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