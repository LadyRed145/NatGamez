/**
 * NatGamez · Semana 8 · PÁGINA REACT
 * Vista completa del catálogo.
 *
 * Integra catálogo, búsqueda, recomendaciones, carrito persistente,
 * favoritos persistentes en offcanvas y recuperación de la última compra.
 */
import {
  useEffect,
  useMemo,
  useState,
} from 'react';

import {
  Offcanvas,
} from 'bootstrap';

import CatalogSky from '../components/layout/CatalogSky.jsx';
import CatalogHeader from '../components/layout/CatalogHeader.jsx';
import CatalogNavbar from '../components/layout/CatalogNavbar.jsx';
import ReturnHome from '../components/layout/ReturnHome.jsx';
import Footer from '../components/layout/Footer.jsx';

import CatalogSearch from '../components/catalog/CatalogSearch.jsx';
import CatalogSection from '../components/catalog/CatalogSection.jsx';
import ProductDetailsModal from '../components/catalog/ProductDetailsModal.jsx';

import RecommendationsSection from '../components/recommendations/RecommendationsSection.jsx';

import CollectorVault from '../components/collector/CollectorVault.jsx';
import PremiumFigures from '../components/figures/PremiumFigures.jsx';

import CartButton from '../components/cart/CartButton.jsx';
import CartOffcanvas from '../components/cart/CartOffcanvas.jsx';
import FavoritesOffcanvas from '../components/favorites/FavoritesOffcanvas.jsx';

import VoucherModal from '../components/voucher/VoucherModal.jsx';

import useCatalog from '../hooks/useCatalog.js';
import useCatalogSearch from '../hooks/useCatalogSearch.js';
import useCart from '../hooks/useCart.js';
import useRecommendations from '../hooks/useRecommendations.js';

import {
  PRODUCTOS_ESPECIALES,
} from '../utils/productUtils.js';

const CLAVE_FAVORITOS = 'natgamez:favoritos:v1';
const CLAVE_ULTIMA_COMPRA = 'natgamez:ultima-compra:v1';

function cargarFavoritosPersistidos() {
  try {
    const guardado = window.localStorage.getItem(CLAVE_FAVORITOS);

    if (!guardado) {
      return [];
    }

    const datos = JSON.parse(guardado);

    if (!Array.isArray(datos)) {
      return [];
    }

    return [...new Set(
      datos.filter(
        (id) => typeof id === 'string' && id.trim(),
      ),
    )];
  } catch (error) {
    console.warn(
      'NatGamez no pudo recuperar los favoritos guardados.',
      error,
    );

    return [];
  }
}

function cargarUltimaCompraPersistida() {
  try {
    const guardado = window.localStorage.getItem(CLAVE_ULTIMA_COMPRA);

    if (!guardado) {
      return null;
    }

    const compra = JSON.parse(guardado);

    if (
      !compra ||
      typeof compra !== 'object' ||
      !Array.isArray(compra.items) ||
      !compra.folio
    ) {
      return null;
    }

    return compra;
  } catch (error) {
    console.warn(
      'NatGamez no pudo recuperar la última compra guardada.',
      error,
    );

    return null;
  }
}

function CatalogPage() {
  const catalogo = useCatalog();

  const busqueda = useCatalogSearch(catalogo.productos);
  const carrito = useCart(catalogo.productos);

  const recomendador = useRecommendations(
    catalogo.productos,
    !catalogo.cargando && !catalogo.error,
  );

  const [productoDetalle, setProductoDetalle] = useState(null);
  const [compraActual, setCompraActual] = useState(null);
  const [favoritos, setFavoritos] = useState(cargarFavoritosPersistidos);
  const [ultimaCompra, setUltimaCompra] = useState(cargarUltimaCompraPersistida);

  useEffect(() => {
    try {
      if (favoritos.length === 0) {
        window.localStorage.removeItem(CLAVE_FAVORITOS);
        return;
      }

      window.localStorage.setItem(
        CLAVE_FAVORITOS,
        JSON.stringify(favoritos),
      );
    } catch (error) {
      console.warn(
        'NatGamez no pudo guardar los favoritos.',
        error,
      );
    }
  }, [favoritos]);

  useEffect(() => {
    if (!ultimaCompra) {
      return;
    }

    try {
      window.localStorage.setItem(
        CLAVE_ULTIMA_COMPRA,
        JSON.stringify(ultimaCompra),
      );
    } catch (error) {
      console.warn(
        'NatGamez no pudo guardar la última compra.',
        error,
      );
    }
  }, [ultimaCompra]);

  const favoritosSet = useMemo(
    () => new Set(favoritos),
    [favoritos],
  );

  const productosDisponiblesParaFavoritos = useMemo(
    () => [
      ...catalogo.productos,
      ...PRODUCTOS_ESPECIALES,
    ],
    [catalogo.productos],
  );

  const productosFavoritos = useMemo(
    () => productosDisponiblesParaFavoritos.filter(
      (producto) => favoritosSet.has(producto.id),
    ),
    [
      productosDisponiblesParaFavoritos,
      favoritosSet,
    ],
  );

  function alternarFavorito(idProducto) {
    setFavoritos((actuales) => {
      if (actuales.includes(idProducto)) {
        return actuales.filter((id) => id !== idProducto);
      }

      return [
        ...actuales,
        idProducto,
      ];
    });
  }

  function vaciarFavoritos() {
    setFavoritos([]);
  }

  function mostrarCompra(compra) {
    setCompraActual(compra);
  }

  function mostrarCompraDesdeCarrito(compra) {
    if (!compra) {
      return;
    }

    const elemento = document.getElementById('carritoOffcanvas');

    if (!elemento) {
      mostrarCompra(compra);
      return;
    }

    const mostrarVoucher = () => {
      mostrarCompra(compra);
    };

    if (elemento.classList.contains('show')) {
      elemento.addEventListener(
        'hidden.bs.offcanvas',
        mostrarVoucher,
        { once: true },
      );

      Offcanvas.getOrCreateInstance(elemento).hide();
      return;
    }

    mostrarVoucher();
  }

  function finalizarCompra() {
    const compra = carrito.finalizarCompra();

    if (!compra) {
      return;
    }

    setUltimaCompra(compra);
    mostrarCompraDesdeCarrito(compra);
  }

  return (
    <>
      <a
        className="salto-contenido"
        href="#contenido-principal"
      >
        Saltar al contenido principal
      </a>

      <CatalogSky />
      <CatalogHeader />

      <CatalogNavbar
        cantidadCarrito={carrito.cantidadTotal}
        cantidadFavoritos={productosFavoritos.length}
        buscadorAbierto={busqueda.panelAbierto}
        onToggleSearch={busqueda.alternarPanel}
      />

      <CatalogSearch
        abierto={busqueda.panelAbierto}
        entrada={busqueda.entrada}
        onChange={busqueda.cambiarEntrada}
        onSubmit={busqueda.buscar}
      />

      <CartButton
        variante="movil"
        cantidad={carrito.cantidadTotal}
      />

      <main
        id="contenido-principal"
        className="catalogo-main"
      >
        <CatalogSection
          productos={busqueda.resultados}
          cargando={catalogo.cargando}
          error={catalogo.error}
          estadoBusqueda={busqueda.estado}
          onRetry={catalogo.recargar}
          onDetails={setProductoDetalle}
          onAdd={carrito.agregar}
          favoritos={favoritos}
          onToggleFavorite={alternarFavorito}
        />

        <RecommendationsSection
          cargando={catalogo.cargando}
          error={catalogo.error}
          onRetry={catalogo.recargar}
          recommendation={recomendador}
        />

        <CollectorVault
          onAdd={carrito.agregar}
          favoritos={favoritos}
          onToggleFavorite={alternarFavorito}
        />

        <PremiumFigures
          onAdd={carrito.agregar}
          favoritos={favoritos}
          onToggleFavorite={alternarFavorito}
        />

        <ReturnHome />
      </main>

      <ProductDetailsModal
        producto={productoDetalle}
      />

      <FavoritesOffcanvas
        items={productosFavoritos}
        onRemove={alternarFavorito}
        onAdd={carrito.agregar}
        onClear={vaciarFavoritos}
      />

      <CartOffcanvas
        items={carrito.items}
        total={carrito.total}
        estado={carrito.estado}
        onIncrease={(id) => carrito.cambiarCantidad(id, 1)}
        onDecrease={(id) => carrito.cambiarCantidad(id, -1)}
        onRemove={carrito.eliminar}
        onClear={carrito.vaciar}
        onCheckout={finalizarCompra}
        ultimaCompra={ultimaCompra}
        onShowLastPurchase={() => mostrarCompraDesdeCarrito(ultimaCompra)}
      />

      <VoucherModal
        compra={compraActual}
        onClose={() => setCompraActual(null)}
      />

      <Footer />
    </>
  );
}

export default CatalogPage;
