/**
 * NatGamez · Semana 7 · HOOK REACT
 * Hook React de búsqueda.
 *
 * Centraliza el término de búsqueda, apertura del panel, resultados y feedback sin mezclar lógica con presentación.
 */
import { useMemo, useState } from 'react';

import {
  normalizarTexto,
} from '../utils/formatters.js';

import {
  reordenarProductosParaCatalogo,
} from '../utils/productUtils.js';

export default function useCatalogSearch(productos) {
  const [panelAbierto, setPanelAbierto] = useState(false);
  const [entrada, setEntrada] = useState('');
  const [terminoAplicado, setTerminoAplicado] = useState('');

  const resultados = useMemo(() => {
    const consulta = normalizarTexto(terminoAplicado);

    if (!consulta) {
      return reordenarProductosParaCatalogo(productos);
    }

    return productos.filter((producto) => {
      const campos = [
        producto.titulo,
        producto.genero,
        producto.categoria,
        producto.modalidad,
        producto.estado,
        ...producto.plataformas,
      ];

      return campos.some(
        (campo) =>
          normalizarTexto(campo).includes(consulta),
      );
    });
  }, [
    productos,
    terminoAplicado,
  ]);

  function alternarPanel() {
    setPanelAbierto((actual) => !actual);
  }

  function cambiarEntrada(valor) {
    setEntrada(valor);

    if (valor.trim() === '') {
      setTerminoAplicado('');
    }
  }

  function buscar(event) {
    event?.preventDefault();

    const limpio = entrada.trim();
    setTerminoAplicado(limpio);

    window.requestAnimationFrame(() => {
      document
        .getElementById('videojuegos')
        ?.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
    });
  }

  const estado = useMemo(() => {
    if (!terminoAplicado) {
      return {
        texto: `Mostrando los ${productos.length} videojuegos del catálogo.`,
        clase: 'text-light',
      };
    }

    if (resultados.length === 0) {
      return {
        texto: `No encontramos resultados para “${terminoAplicado}”.`,
        clase: 'text-danger',
      };
    }

    return {
      texto: `${resultados.length} resultado${
        resultados.length === 1 ? '' : 's'
      } para “${terminoAplicado}”.`,
      clase: 'text-success',
    };
  }, [
    productos.length,
    resultados.length,
    terminoAplicado,
  ]);

  return {
    panelAbierto,
    entrada,
    terminoAplicado,
    resultados,
    estado,
    alternarPanel,
    cambiarEntrada,
    buscar,
  };
}
