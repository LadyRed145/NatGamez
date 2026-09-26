/**
 * NatGamez · Semana 7 · HOOK REACT
 * Hook React de carga del catálogo.
 *
 * Usa useState, useEffect y useCallback para consumir productos.json con Fetch API y exponer carga, error y recarga.
 */
import { useCallback, useEffect, useState } from 'react';

import productosUrl from '../../assets/data/productos.json?url';

import {
  esProductoValido,
  tienenIdsUnicos,
} from '../utils/validators.js';

export default function useCatalog() {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');

  const cargarCatalogo = useCallback(async () => {
    setCargando(true);
    setError('');

    try {
      const respuesta = await fetch(
        productosUrl,
        {
          cache: 'no-store',
        },
      );

      if (!respuesta.ok) {
        throw new Error(
          `No fue posible cargar el catálogo. HTTP ${respuesta.status}.`,
        );
      }

      const datos = await respuesta.json();

      if (
        !Array.isArray(datos) ||
        datos.length === 0
      ) {
        throw new Error(
          'productos.json está vacío o no contiene una lista válida.',
        );
      }

      if (!datos.every(esProductoValido)) {
        throw new Error(
          'Uno o más productos contienen información inválida.',
        );
      }

      if (!tienenIdsUnicos(datos)) {
        throw new Error(
          'Existen IDs duplicados dentro de productos.json.',
        );
      }

      setProductos(datos);
    } catch (err) {
      setProductos([]);
      setError(
        err instanceof Error
          ? err.message
          : 'No fue posible cargar el catálogo.',
      );
    } finally {
      setCargando(false);
    }
  }, []);

  useEffect(() => {
    void cargarCatalogo();
  }, [cargarCatalogo]);

  return {
    productos,
    cargando,
    error,
    recargar: cargarCatalogo,
  };
}
