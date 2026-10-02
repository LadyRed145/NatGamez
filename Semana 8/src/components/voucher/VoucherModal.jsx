/**
 * NatGamez · Semana 8 · COMPONENTE REACT
 * Modal del comprobante.
 *
 * Presenta la compra final, permite guardar/imprimir el comprobante
 * y gestiona correctamente el foco al abrir/cerrar el modal.
 *
 * El manejo del foco evita warnings de accesibilidad relacionados
 * con aria-hidden cuando Bootstrap oculta el modal.
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

  // Guarda el elemento que tenía el foco antes de abrir el voucher.
  const focoAnteriorRef = useRef(null);

  /**
   * Gestiona correctamente el foco durante el cierre del modal.
   *
   * Bootstrap aplica aria-hidden="true" al ocultar el modal.
   * Si algún botón interno conserva el foco en ese momento,
   * el navegador genera un warning de accesibilidad.
   *
   * Por eso liberamos el foco antes de que Bootstrap termine
   * de esconder el componente.
   */
  useEffect(() => {
    const elemento = ref.current;

    if (!elemento) {
      return undefined;
    }

    const liberarFocoAntesDeCerrar = () => {
      const elementoActivo = document.activeElement;

      if (
        elementoActivo instanceof HTMLElement
        && elemento.contains(elementoActivo)
      ) {
        elementoActivo.blur();
      }
    };

    const modalCerrado = () => {
      /**
       * Intentamos devolver el foco al elemento que estaba activo
       * antes de abrir el comprobante.
       */
      const focoAnterior = focoAnteriorRef.current;

      if (
        focoAnterior instanceof HTMLElement
        && focoAnterior.isConnected
      ) {
        focoAnterior.focus({
          preventScroll: true,
        });
      }

      focoAnteriorRef.current = null;

      onClose?.();
    };

    elemento.addEventListener(
      'hide.bs.modal',
      liberarFocoAntesDeCerrar,
    );

    elemento.addEventListener(
      'hidden.bs.modal',
      modalCerrado,
    );

    return () => {
      elemento.removeEventListener(
        'hide.bs.modal',
        liberarFocoAntesDeCerrar,
      );

      elemento.removeEventListener(
        'hidden.bs.modal',
        modalCerrado,
      );
    };
  }, [onClose]);

  /**
   * Abre el modal cada vez que existe una compra.
   *
   * Antes de mostrarlo se conserva el foco actual para poder
   * devolverlo correctamente cuando se cierre el comprobante.
   */
  useEffect(() => {
    const elemento = ref.current;

    if (!compra || !elemento) {
      return;
    }

    const elementoActivo = document.activeElement;

    if (
      elementoActivo instanceof HTMLElement
      && !elemento.contains(elementoActivo)
    ) {
      focoAnteriorRef.current = elementoActivo;
    }

    Modal
      .getOrCreateInstance(elemento)
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