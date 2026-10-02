/**
 * NatGamez · Semana 8 · HOOK REACT
 * Hook React del carrito.
 *
 * Administra cantidades, productos, total, mensajes, persistencia y checkout
 * mediante useState, useEffect y useMemo sin manipular manualmente el DOM.
 */
import {
  useEffect,
  useMemo,
  useState,
} from 'react';

import {
  generarFolioVoucher,
  obtenerFechaVoucher,
} from '../utils/formatters.js';

import {
  PRODUCTOS_ESPECIALES,
} from '../utils/productUtils.js';

const CLAVE_CARRITO = 'natgamez:carrito:v1';

function cargarCarritoPersistido() {
  try {
    const guardado = window.localStorage.getItem(CLAVE_CARRITO);

    if (!guardado) {
      return {};
    }

    const datos = JSON.parse(guardado);

    if (!datos || typeof datos !== 'object' || Array.isArray(datos)) {
      return {};
    }

    return Object.entries(datos).reduce(
      (acumulado, [id, cantidad]) => {
        const cantidadValida = Number(cantidad);

        if (
          typeof id === 'string' &&
          id.trim() &&
          Number.isInteger(cantidadValida) &&
          cantidadValida > 0
        ) {
          acumulado[id] = cantidadValida;
        }

        return acumulado;
      },
      {},
    );
  } catch (error) {
    console.warn(
      'NatGamez no pudo recuperar el carrito persistido.',
      error,
    );

    return {};
  }
}

export default function useCart(productosCatalogo) {
  const [cantidades, setCantidades] = useState(
    cargarCarritoPersistido,
  );

  const [estado, setEstado] = useState({
    mensaje: 'Tu carrito está vacío.',
    tipo: 'normal',
  });

  useEffect(() => {
    try {
      if (Object.keys(cantidades).length === 0) {
        window.localStorage.removeItem(CLAVE_CARRITO);
        return;
      }

      window.localStorage.setItem(
        CLAVE_CARRITO,
        JSON.stringify(cantidades),
      );
    } catch (error) {
      console.warn(
        'NatGamez no pudo guardar el carrito en el navegador.',
        error,
      );
    }
  }, [cantidades]);

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
