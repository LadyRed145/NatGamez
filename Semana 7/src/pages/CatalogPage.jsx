/**
 * NatGamez · Semana 7 · PÁGINA REACT
 * Vista completa del catálogo.
 *
 * Conserva la lógica y las funcionalidades que anteriormente vivían en
 * App.jsx: catálogo, búsqueda, recomendaciones, carrito, voucher y secciones
 * comerciales. Separarla permite recuperar la portada sin mezclar estados.
 */
import { useState } from 'react';

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

import VoucherModal from '../components/voucher/VoucherModal.jsx';

import useCatalog from '../hooks/useCatalog.js';
import useCatalogSearch from '../hooks/useCatalogSearch.js';
import useCart from '../hooks/useCart.js';
import useRecommendations from '../hooks/useRecommendations.js';

function CatalogPage() {
  const catalogo = useCatalog();

  const busqueda =
    useCatalogSearch(
      catalogo.productos,
    );

  const carrito =
    useCart(
      catalogo.productos,
    );

  const recomendador =
    useRecommendations(
      catalogo.productos,
      !catalogo.cargando &&
        !catalogo.error,
    );

  const [productoDetalle, setProductoDetalle] =
    useState(null);

  const [compraActual, setCompraActual] =
    useState(null);

  function finalizarCompra() {
    const compra =
      carrito.finalizarCompra();

    if (!compra) {
      return;
    }

    const elemento =
      document.getElementById(
        'carritoOffcanvas',
      );

    if (!elemento) {
      setCompraActual(compra);
      return;
    }

    const mostrarVoucher = () => {
      setCompraActual(compra);
    };

    if (
      elemento.classList.contains('show')
    ) {
      elemento.addEventListener(
        'hidden.bs.offcanvas',
        mostrarVoucher,
        {
          once: true,
        },
      );

      Offcanvas
        .getOrCreateInstance(elemento)
        .hide();

      return;
    }

    mostrarVoucher();
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
        cantidadCarrito={
          carrito.cantidadTotal
        }
        buscadorAbierto={
          busqueda.panelAbierto
        }
        onToggleSearch={
          busqueda.alternarPanel
        }
      />

      <CatalogSearch
        abierto={
          busqueda.panelAbierto
        }
        entrada={
          busqueda.entrada
        }
        onChange={
          busqueda.cambiarEntrada
        }
        onSubmit={
          busqueda.buscar
        }
      />

      <CartButton
        variante="movil"
        cantidad={
          carrito.cantidadTotal
        }
      />

      <main
        id="contenido-principal"
        className="catalogo-main"
      >
        <CatalogSection
          productos={
            busqueda.resultados
          }
          cargando={
            catalogo.cargando
          }
          error={
            catalogo.error
          }
          estadoBusqueda={
            busqueda.estado
          }
          onRetry={
            catalogo.recargar
          }
          onDetails={
            setProductoDetalle
          }
          onAdd={
            carrito.agregar
          }
        />

        <RecommendationsSection
          cargando={
            catalogo.cargando
          }
          error={
            catalogo.error
          }
          onRetry={
            catalogo.recargar
          }
          recommendation={
            recomendador
          }
        />

        <CollectorVault
          onAdd={
            carrito.agregar
          }
        />

        <PremiumFigures
          onAdd={
            carrito.agregar
          }
        />

        <ReturnHome />
      </main>

      <ProductDetailsModal
        producto={
          productoDetalle
        }
      />

      <CartOffcanvas
        items={
          carrito.items
        }
        total={
          carrito.total
        }
        estado={
          carrito.estado
        }
        onIncrease={
          (id) =>
            carrito.cambiarCantidad(
              id,
              1,
            )
        }
        onDecrease={
          (id) =>
            carrito.cambiarCantidad(
              id,
              -1,
            )
        }
        onRemove={
          carrito.eliminar
        }
        onClear={
          carrito.vaciar
        }
        onCheckout={
          finalizarCompra
        }
      />

      <VoucherModal
        compra={
          compraActual
        }
        onClose={() =>
          setCompraActual(null)
        }
      />

      <Footer />
    </>
  );
}

export default CatalogPage;
