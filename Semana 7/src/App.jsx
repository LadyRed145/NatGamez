/**
 * NatGamez · Semana 7 · COMPONENTE REACT
 * Componente raíz y selector de vistas.
 *
 * La portada recupera la estructura visual de Semana 6 y el catálogo
 * conserva la implementación React actual. Se utiliza una consulta simple
 * (?vista=catalogo) para mantener compatibilidad directa con GitHub Pages
 * sin añadir un router externo al proyecto.
 */
import {
  useEffect,
  useLayoutEffect,
} from 'react';

import HomePage from './pages/HomePage.jsx';
import CatalogPage from './pages/CatalogPage.jsx';

function App() {
  const parametros = new URLSearchParams(
    window.location.search,
  );

  const vistaCatalogo =
    parametros.get('vista') === 'catalogo';

  // Cada vista conserva la clase de body que utilizaba el diseño original.
  // useLayoutEffect evita un cambio visual tardío entre portada y catálogo.
  useLayoutEffect(() => {
    document.body.classList.remove(
      'pagina-inicio',
      'pagina-catalogo',
    );

    document.body.classList.add(
      vistaCatalogo
        ? 'pagina-catalogo'
        : 'pagina-inicio',
    );
  }, [vistaCatalogo]);

  // Permite abrir enlaces directos como
  // ?vista=catalogo#videojuegos sin perder el destino al montar React.
  useEffect(() => {
    if (!window.location.hash) {
      return undefined;
    }

    const id = window.location.hash.slice(1);

    const frame = window.requestAnimationFrame(() => {
      document
        .getElementById(id)
        ?.scrollIntoView();
    });

    return () => {
      window.cancelAnimationFrame(frame);
    };
  }, [vistaCatalogo]);

  return vistaCatalogo
    ? <CatalogPage />
    : <HomePage />;
}

export default App;
