/**
 * NatGamez · Semana 7 · COMPONENTE REACT
 * Sección Collector’s Vault.
 *
 * Compone el carrusel, sus cards y los controles utilizando datos reutilizables y estado proveniente del hook correspondiente.
 */
import {
  COLLECTOR_PRODUCTS,
} from '../../utils/productUtils.js';

import useCollectorVault from '../../hooks/useCollectorVault.js';

import CollectorCard from './CollectorCard.jsx';
import VaultControls from './VaultControls.jsx';

function CollectorVault({
  onAdd,
}) {
  const vault =
    useCollectorVault(
      COLLECTOR_PRODUCTS.length,
    );

  return (
    <section
      id="coleccionistas"
      className="vault-seccion"
      aria-labelledby="titulo-vault"
    >
      <div className="vault-cabecera">
        <p className="etiqueta-seccion">
          EDICIONES ESPECIALES
        </p>

        <h2 id="titulo-vault">
          Collector's Vault
        </h2>

        <p id="vault-descripcion">
          Para quienes no solo terminan un juego: también quieren
          conservar un pedazo de su universo.
        </p>
      </div>

      <div
        ref={vault.carruselRef}
        id="vaultCarouselBootstrap"
        className="carousel slide vault-carrusel-bootstrap"
        data-bs-ride="carousel"
        data-bs-interval="3000"
        data-bs-pause="false"
        data-bs-touch="true"
        data-bs-wrap="true"
        aria-label="Ediciones especiales Collector's Vault"
        aria-describedby="vault-descripcion"
        aria-roledescription="carrusel"
      >
        <div
          className="carousel-inner vault-carousel-inner"
          aria-live="off"
        >
          {COLLECTOR_PRODUCTS.map((producto, indice) => (
            <CollectorCard
              key={producto.id}
              producto={producto}
              activo={indice === 0}
              onAdd={onAdd}
            />
          ))}
        </div>

        <button
          className="carousel-control-prev vault-control vault-control-prev"
          type="button"
          data-bs-target="#vaultCarouselBootstrap"
          data-bs-slide="prev"
          aria-label="Ver edición anterior"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          />
        </button>

        <button
          className="carousel-control-next vault-control vault-control-next"
          type="button"
          data-bs-target="#vaultCarouselBootstrap"
          data-bs-slide="next"
          aria-label="Ver edición siguiente"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          />
        </button>

        <VaultControls
          contador={vault.contador}
          pausado={vault.pausado}
          onTogglePause={vault.alternarPausa}
        />
      </div>
    </section>
  );
}

export default CollectorVault;
