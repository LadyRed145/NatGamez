<div align="center">

<img src="Semana%207/assets/img/logo_natgamez.png" alt="Logo de NatGamez" width="250">

NATGAMEZ
DESARROLLO FRONTEND I · PFY2201 · SEMANA 7
eCommerce gamer · React · Vite · Hooks · Fetch API · Bootstrap 5 · Responsive Design · Carrito · Comprobante de compra
🌐 Sitio publicado · [⚛️ Código React Semana 7](Semana 7/) · 📁 Repositorio
</div>

◆ Visión general
Portada	Catálogo	Collector's Vault	Figuras premium	Productos comprables
🏠 React	🎮 12 videojuegos	💎 3 ediciones	🏆 6 figuras	🛒 21 productos


NatGamez es una tienda ficticia de videojuegos desarrollada progresivamente durante la asignatura Desarrollo Frontend I (PFY2201).
La Semana 7 conserva la identidad visual y las funcionalidades construidas previamente, pero reorganiza la aplicación activa en una arquitectura React + Vite basada en componentes funcionales, Hooks, props, eventos React y renderizado condicional.
La aplicación mantiene ahora dos vistas principales dentro del mismo proyecto:
- Portada React, recuperada y adaptada desde la versión estable anterior.
- Catálogo React, con búsqueda, recomendaciones, carrito unificado, Collector's Vault, figuras premium y comprobante de compra.
La navegación se mantiene compatible con GitHub Pages sin requerir un router externo.
◆ Navegación principal
La portada se publica en:
https://ladyred145.github.io/NatGamez/
El catálogo utiliza una vista controlada mediante query string:
https://ladyred145.github.io/NatGamez/?vista=catalogo
También existen accesos directos a secciones del catálogo:
https://ladyred145.github.io/NatGamez/?vista=catalogo#videojuegos
https://ladyred145.github.io/NatGamez/?vista=catalogo#coleccionistas
https://ladyred145.github.io/NatGamez/?vista=catalogo#figuras
App.jsx detecta ?vista=catalogo mediante URLSearchParams y decide qué página React renderizar.
◆ Portada React
La página principal conserva la estructura visual histórica de NatGamez y la adapta a componentes React.
Incluye:
- hero principal con logo;
- menú principal;
- bienvenida;
- sección Explora NatGamez;
- acceso directo a Videojuegos;
- acceso directo a Collector's Vault;
- acceso directo a Figuras premium;
- productos destacados;
- footer con contacto y comunidad;
- navegación responsive.
Componentes de la portada
Semana 7/src/components/home/
├── HomeHeader.jsx
├── HomeNavbar.jsx
├── HomeWelcome.jsx
├── HomeCategories.jsx
└── HomeFeatured.jsx
La página que los integra se encuentra en:
Semana 7/src/pages/HomePage.jsx
Productos destacados
La portada conserva tres productos destacados:
1. God of War Ragnarök;
2. Cyberpunk 2077;
3. Elden Ring.
Los precios mostrados corresponden al precio efectivo actual del catálogo.
◆ Funcionalidades del catálogo
🎮 Catálogo dinámico
Los 12 videojuegos se cargan desde:
Semana 7/assets/data/productos.json
El Hook useCatalog.js consume el JSON mediante Fetch API, valida la respuesta y administra:
- estado de carga;
- errores HTTP;
- estructura de productos;
- IDs únicos;
- recarga controlada del catálogo.
Los productos se renderizan mediante:
CatalogSection
      ↓
ProductGrid
      ↓
ProductCard
Cada videojuego incluye:
- título;
- género y categoría;
- plataformas;
- modalidad;
- rating;
- disponibilidad;
- precio normal;
- precio oferta;
- descripción;
- imagen;
- Modal Bootstrap con información ampliada;
- botón de compra integrado al carrito.
💰 Precio normal y precio oferta
Cada producto utiliza tres propiedades relacionadas con precio:
{
  "precioNormal": 49990,
  "precioOferta": 39990,
  "precio": 39990
}
- precioNormal: valor referencial previo a la oferta.
- precioOferta: valor promocional presentado al usuario.
- precio: valor efectivo utilizado por carrito, subtotales, total y comprobante.
🔎 Búsqueda
useCatalogSearch.js permite filtrar por:
- título;
- género;
- categoría;
- modalidad;
- plataforma;
- estado.
La búsqueda utiliza eventos React como onChange y onSubmit y actualiza los resultados mediante renderizado condicional.
🎯 Recomendaciones
La sección de recomendaciones reutiliza los mismos 12 videojuegos del catálogo maestro.
Incluye:
- nombre del jugador;
- plataforma preferida;
- validaciones visuales;
- acción Recomendar;
- acción 🎲 Sorpréndeme;
- selección compatible con la plataforma elegida;
- manejo de carga y errores.
La lógica reside en useRecommendations.js.
🛒 Carrito unificado
Videojuegos, Collector's Vault y figuras premium comparten el mismo estado de carrito mediante useCart.js.
El carrito permite:
- agregar productos;
- aumentar cantidades;
- disminuir cantidades;
- eliminar productos;
- vaciar el carrito;
- mostrar contador total;
- calcular subtotales;
- calcular total general;
- finalizar una compra simulada;
- generar un comprobante.
💎 Collector's Vault
Incluye 3 ediciones especiales comprables:
1. Elden Ring Collector's Edition;
2. Cyberpunk 2077 5th Anniversary Collector's Set;
3. The Witcher 3 Collector's Edition.
La sección se organiza en:
CollectorVault
├── CollectorCard
└── VaultControls
🏆 Figuras premium
La tienda contiene 6 figuras comprables:
1. Kratos · Estatua Premium;
2. Malenia · Blade of Miquella;
3. Geralt & Roach · Deluxe Statue;
4. Trevor Philips · GTA V;
5. Dante · ARTFX J DMC5;
6. Bayonetta · Climax Action 1/7.
Cada figura utiliza FigureCard y comparte AddToCartButton con el resto de la tienda.
🧾 Comprobante de compra
La estructura del comprobante se encuentra dividida en:
VoucherModal
      ↓
VoucherContent
      ↓
VoucherItem
Incluye:
- logo NatGamez;
- folio;
- fecha y hora;
- productos;
- cantidades;
- precio efectivo;
- subtotal;
- total;
- información académica;
- opción de guardar o imprimir mediante el navegador.
◆ Eventos utilizados
Evento / mecanismo	Uso
onClick	navegación, carrito, detalle, recomendaciones, controles y compra
onChange	búsqueda y formularios
onSubmit	buscador y recomendaciones
onError	fallback de imágenes
Pointer Events	feedback táctil de botones de compra
eventos Bootstrap	Modal, Carousel y Offcanvas
Fetch API + async/await	carga no bloqueante de productos.json


◆ Renderizado condicional
React cambia la interfaz según el estado actual de la aplicación:
- portada o catálogo;
- catálogo cargando;
- error al cargar;
- catálogo disponible;
- búsqueda con resultados;
- búsqueda sin coincidencias;
- carrito vacío;
- carrito con productos;
- formularios con errores;
- recomendación disponible;
- comprobante generado.
◆ Arquitectura de páginas
App.jsx
├── HomePage.jsx
│   ├── HomeHeader
│   ├── HomeNavbar
│   ├── HomeWelcome
│   ├── HomeCategories
│   ├── HomeFeatured
│   └── Footer
│
└── CatalogPage.jsx
    ├── CatalogSky
    ├── CatalogHeader
    ├── CatalogNavbar
    ├── CatalogSearch
    ├── CatalogSection
    ├── RecommendationsSection
    ├── CollectorVault
    ├── PremiumFigures
    ├── CartOffcanvas
    ├── VoucherModal
    ├── ReturnHome
    └── Footer
◆ Hooks utilizados
Hook	Uso en NatGamez
useState	navegación, carrito, detalle, comprobante, búsqueda, recomendaciones y estados de interfaz
useEffect	carga del catálogo y desplazamiento a secciones mediante hash
useLayoutEffect	aplicación inmediata de la clase visual correspondiente a cada página
useMemo	cálculos derivados, filtros y totales
useCallback	operaciones reutilizables y recarga controlada


Hooks personalizados
Semana 7/src/hooks/
├── useCatalog.js
├── useCatalogSearch.js
├── useCart.js
├── useCollectorVault.js
└── useRecommendations.js
◆ Responsive Design
Semana 7 mantiene paridad funcional en los tres escenarios principales.
🖥️ Escritorio
- portada completa;
- catálogo multicolumna;
- hover completo;
- carrito Offcanvas;
- Collector's Vault horizontal;
- comprobante amplio;
- cielo RGB animado.
📱 Tablet
- reducción progresiva de columnas;
- navegación colapsable;
- controles táctiles;
- carrito adaptado;
- Collector's Vault responsive;
- portada y catálogo funcionales.
📱 Celular
- Cards en una columna;
- menú hamburguesa controlado por React;
- botones táctiles;
- carrito flotante;
- Collector's Vault apilado;
- comprobante adaptado al viewport;
- navegación completa entre portada y catálogo.
◆ Manejo de errores y buenas prácticas
- componentes funcionales separados por responsabilidad;
- páginas separadas para Inicio y Catálogo;
- Hooks personalizados;
- props para comunicación entre componentes;
- funciones reutilizables;
- renderizado condicional;
- validación de respuesta HTTP;
- validación del catálogo;
- control de IDs duplicados;
- key estable en listas;
- fallback de imágenes;
- mensajes accesibles;
- aria-live;
- labels y aria-label;
- navegación por teclado;
- Bootstrap integrado con React;
- CSS modularizado;
- comentarios explicativos por módulo;
- separación entre presentación, estado, datos y utilidades.
◆ Estructura actual del repositorio
NatGamez/
├── index.html
├── README.md
├── .gitignore
├── package.json
├── package-lock.json
├── vite.config.js
│
├── Semana 1/
├── Semana 2/
├── Semana 3/
├── Semana 4/
├── Semana 5/
├── Semana 6/                 # respaldo histórico estable
│
└── Semana 7/
    ├── assets/
    │   ├── data/
    │   │   └── productos.json
    │   └── img/
    │       └── logo_natgamez.png
    │
    └── src/
        ├── App.jsx
        ├── main.jsx
        │
        ├── pages/
        │   ├── HomePage.jsx
        │   └── CatalogPage.jsx
        │
        ├── components/
        │   ├── home/
        │   │   ├── HomeHeader.jsx
        │   │   ├── HomeNavbar.jsx
        │   │   ├── HomeWelcome.jsx
        │   │   ├── HomeCategories.jsx
        │   │   └── HomeFeatured.jsx
        │   ├── cart/
        │   ├── catalog/
        │   ├── collector/
        │   ├── figures/
        │   ├── layout/
        │   ├── recommendations/
        │   └── voucher/
        │
        ├── hooks/
        ├── utils/
        │
        └── styles/
            └── modules/
                ├── 00-foundations.css
                ├── 01-hero-navigation.css
                ├── 02-home-sections.css
                ├── 03-catalog-base.css
                ├── 04-catalog-sky-premium.css
                ├── 05-carousel-bootstrap.css
                ├── 06-dynamic-catalog.css
                ├── 07-search-cart.css
                ├── 08-voucher-store.css
                ├── 09-responsive-final.css
                ├── 10-react-core.css
                ├── 11-pricing.css
                └── 12-ui-overrides.css
La carpeta Semana 6 se conserva únicamente como respaldo histórico estable. La implementación activa corresponde a Semana 7.
◆ Archivos principales de Semana 7
src/App.jsx
Componente raíz. Decide entre HomePage y CatalogPage según la vista solicitada y administra la clase visual del body.
src/pages/HomePage.jsx
Integra la portada React de NatGamez.
src/pages/CatalogPage.jsx
Integra catálogo, búsqueda, recomendaciones, carrito, Collector's Vault, figuras premium y comprobante.
src/main.jsx
Punto de montaje de React. Importa Bootstrap y los módulos CSS en el orden definido.
assets/data/productos.json
Fuente de datos única para los 12 videojuegos del catálogo, búsqueda y recomendaciones.
src/styles/modules/
Los estilos permanecen modularizados para conservar orden, mantenimiento y cascada visual.
◆ Ejecución local
Los comandos npm se ejecutan desde la raíz del repositorio:
NatGamez/
Instalar dependencias:
npm install
Iniciar Vite:
npm run dev
Build de producción:
npm run build
Vista previa:
npm run preview
La aplicación se sirve mediante Vite y no debe abrirse directamente con file://.
◆ Publicación en GitHub Pages
La configuración de Vite utiliza:
base: '/NatGamez/'
El build se genera en:
dist/
La publicación se realiza desde la rama:
gh-pages
con la carpeta raíz /.
◆ Pruebas sugeridas
1. Abrir la portada principal.
2. Probar el menú principal.
3. Entrar al catálogo desde la portada.
4. Entrar directamente a Videojuegos, Collector's Vault y Figuras premium.
5. Volver desde el catálogo a la portada.
6. Confirmar carga de los 12 videojuegos.
7. Verificar precio normal y precio oferta.
8. Buscar por título, género y plataforma.
9. Probar una búsqueda sin resultados.
10. Probar Recomendar.
11. Probar Sorpréndeme.
12. Agregar videojuego, Collector y figura.
13. Aumentar y disminuir cantidades.
14. Eliminar un producto.
15. Vaciar carrito.
16. Confirmar contador y total.
17. Finalizar compra.
18. Revisar comprobante.
19. Probar Modal de detalle.
20. Probar Collector's Vault.
21. Revisar escritorio, tablet y celular.
22. Revisar navegación por teclado.
23. Ejecutar npm run build.
24. Confirmar consola sin errores propios del proyecto.
◆ Tecnologías
<div align="center">

<img src="https://img.shields.io/badge/React-18.3.1-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React">
<img src="https://img.shields.io/badge/Vite-5.4.14-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite">
<img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" alt="HTML5">
<img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" alt="CSS3">
<img src="https://img.shields.io/badge/Bootstrap_5-7952B3?style=for-the-badge&logo=bootstrap&logoColor=white" alt="Bootstrap 5">
<img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript">
<img src="https://img.shields.io/badge/JSON-000000?style=for-the-badge&logo=json&logoColor=white" alt="JSON">
<img src="https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white" alt="Git">
<img src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white" alt="GitHub">

</div>

<div align="center">

NatGamez · Semana 7 · Desarrollo Frontend I · PFY2201
Natalia Alvarado · 2026
</div>

Paridad funcional PC · Tablet · Celular
La versión final de Semana 7 mantiene el mismo flujo funcional en los tres tipos de dispositivo:
- portada principal;
- navegación hacia el catálogo;
- catálogo dinámico y búsqueda;
- recomendaciones;
- compra de videojuegos, Collector's Vault y figuras premium;
- carrito lateral con cantidades, eliminación y vaciado;
- checkout con Total, Finalizar compra y Vaciar carrito;
- comprobante NatGamez;
- navegación de regreso a la portada.
Interacción de compra por dispositivo
- PC: conserva hover y feedback visual completo.
- Tablet y celular: utiliza Pointer Events como equivalente táctil.
- Los botones permanecen centrados y adaptados al ancho disponible.
- Collector's Vault y Figuras premium comparten componentes reutilizables de compra.
Carrito responsive
En tablet y celular el Offcanvas mantiene:
1. cabecera;
2. lista de productos con scroll vertical propio;
3. checkout independiente del scroll.
Limpieza técnica final
Antes de cerrar Semana 7 se realizó una pasada de calidad conservadora:
- portada histórica adaptada a React;
- catálogo separado en CatalogPage.jsx;
- selector de vistas centralizado en App.jsx;
- navegación compatible con GitHub Pages;
- componentes funcionales separados por responsabilidad;
- Hooks personalizados;
- CSS modularizado;
- carrito centralizado mediante useCart;
- catálogo centralizado mediante useCatalog;
- precio normal y precio oferta;
- menú hamburguesa controlado por estado React;
- paridad funcional PC, tablet y celular;
- comentarios explicativos en módulos activos;
- estructura compatible con Vite y GitHub Pages.
Validaciones de calidad
- imports relativos verificados;
- 0 imports rotos;
- build de producción validado;
- 151 módulos transformados;
- JSON del catálogo válido;
- IDs de productos únicos;
- rutas locales verificadas;
- portada y catálogo separados;
- navegación Inicio ↔ Catálogo verificada a nivel de rutas;
- estructura preparada para despliegue en GitHub Pages.
