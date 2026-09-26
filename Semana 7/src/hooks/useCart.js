/**
 * NatGamez · Semana 7 · HOOK REACT
 * Hook React del carrito.
 *
 * Administra cantidades, productos, total, mensajes y checkout mediante useState y useMemo sin manipular manualmente el DOM.
 */
import { useMemo, useState } from 'react';

import {
  generarFolioVoucher,
  obtenerFechaVoucher,
} from '../utils/formatters.js';

import {
  PRODUCTOS_ESPECIALES,
} from '../utils/productUtils.js';

export default function useCart(productosCatalogo) {
  const [cantidades, setCantidades] = useState({});
  const [estado, setEstado] = useState({
    mensaje: 'Tu carrito está vacío.',
    tipo: 'normal',
  });

  const productosDisponibles = useMemo(
    () => [
      ...productosCatalogo,
      ...PRODUCTOS_ESPECIALES,
    ],
    [productosCatalogo],
  );

  const productosPorId = useMemo(
    () => new Map(
      productosDisponibles.map(
        (producto) => [
          producto.id,
          producto,
        ],
      ),
    ),
    [productosDisponibles],
  );

  const items = useMemo(
    () => Object.entries(cantidades)
      .map(([id, cantidad]) => {
        const producto = productosPorId.get(id);

        if (!producto) {
          return null;
        }

        return {
          ...producto,
          cantidad,
          subtotal:
            producto.precio * cantidad,
        };
      })
      .filter(Boolean),
    [
      cantidades,
      productosPorId,
    ],
  );

  const cantidadTotal = useMemo(
    () => items.reduce(
      (acumulado, item) =>
        acumulado + item.cantidad,
      0,
    ),
    [items],
  );

  const total = useMemo(
    () => items.reduce(
      (acumulado, item) =>
        acumulado + item.subtotal,
      0,
    ),
    [items],
  );

  function cambiarEstado(mensaje, tipo = 'normal') {
    setEstado({
      mensaje,
      tipo,
    });
  }

  function agregar(idProducto) {
    const producto = productosPorId.get(idProducto);

    if (!producto) {
      cambiarEstado(
        'No fue posible encontrar el producto seleccionado.',
        'error',
      );
      return false;
    }

    setCantidades((actual) => ({
      ...actual,
      [idProducto]:
        (actual[idProducto] ?? 0) + 1,
    }));

    cambiarEstado(
      `${producto.titulo} fue agregado al carrito.`,
      'exito',
    );

    return true;
  }

  function cambiarCantidad(idProducto, cambio) {
    const producto = productosPorId.get(idProducto);

    if (!producto) {
      return;
    }

    setCantidades((actual) => {
      const nuevaCantidad =
        (actual[idProducto] ?? 0) + cambio;

      if (nuevaCantidad <= 0) {
        const copia = {
          ...actual,
        };

        delete copia[idProducto];

        return copia;
      }

      return {
        ...actual,
        [idProducto]: nuevaCantidad,
      };
    });

    const actual =
      cantidades[idProducto] ?? 0;

    const nueva = actual + cambio;

    if (nueva <= 0) {
      cambiarEstado(
        `${producto.titulo} fue eliminado del carrito.`,
      );
      return;
    }

    cambiarEstado(
      `Cantidad de ${producto.titulo}: ${nueva}.`,
      'exito',
    );
  }

  function eliminar(idProducto) {
    const producto = productosPorId.get(idProducto);

    if (!producto) {
      return;
    }

    setCantidades((actual) => {
      const copia = {
        ...actual,
      };

      delete copia[idProducto];

      return copia;
    });

    cambiarEstado(
      `${producto.titulo} fue eliminado del carrito.`,
    );
  }

  function vaciar() {
    setCantidades({});
    cambiarEstado(
      'El carrito quedó vacío.',
    );
  }

  function finalizarCompra() {
    if (items.length === 0) {
      cambiarEstado(
        'Agrega al menos un videojuego antes de comprar.',
        'error',
      );

      return null;
    }

    const compra = {
      folio: generarFolioVoucher(),
      fecha: obtenerFechaVoucher(),
      items: items.map((item) => ({
        id: item.id,
        titulo: item.titulo,
        genero: item.genero,
        imagen: item.imagen,
        alt: item.alt,
        precio: item.precio,
        cantidad: item.cantidad,
        subtotal: item.subtotal,
      })),
      cantidadTotal,
      total,
    };

    setCantidades({});
    cambiarEstado(
      'Compra confirmada. Se generó tu comprobante NatGamez.',
      'exito',
    );

    return compra;
  }

  return {
    items,
    cantidadTotal,
    total,
    estado,
    agregar,
    cambiarCantidad,
    eliminar,
    vaciar,
    finalizarCompra,
  };
}
