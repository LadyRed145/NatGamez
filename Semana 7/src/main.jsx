/**
 * NatGamez · Semana 7 · COMPONENTE REACT
 * Punto de entrada de React.
 *
 * Monta <App /> con ReactDOM, activa StrictMode y carga Bootstrap junto a los estilos de Semana 7.
 */
import React from 'react';
import ReactDOM from 'react-dom/client';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import './styles/modules/00-foundations.css';
import './styles/modules/01-hero-navigation.css';
import './styles/modules/02-home-sections.css';
import './styles/modules/03-catalog-base.css';
import './styles/modules/04-catalog-sky-premium.css';
import './styles/modules/05-carousel-bootstrap.css';
import './styles/modules/06-dynamic-catalog.css';
import './styles/modules/07-search-cart.css';
import './styles/modules/08-voucher-store.css';
import './styles/modules/09-responsive-final.css';
import './styles/modules/10-react-core.css';
import './styles/modules/11-pricing.css';
import './styles/modules/12-ui-overrides.css';

import App from './App.jsx';

ReactDOM.createRoot(
  document.getElementById('root'),
).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
