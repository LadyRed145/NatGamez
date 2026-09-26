<div align="center">

<img src="Semana%207/assets/img/logo_natgamez.png" alt="Logo de NatGamez" width="240">

🎮 NATGAMEZ
DESARROLLO FRONTEND I · PFY2201 · SEMANA 7
eCommerce gamer interactivo desarrollado con React + Vite
React · Hooks · Fetch API · Bootstrap 5 · Responsive Design · Carrito · GitHub Pages
🌐 Ver sitio ·
[⚛️ Semana 7](Semana 7/) ·
📁 Repositorio
</div>

◆ Visión general
🏠 Portada	🎮 Videojuegos	💎 Collector's Vault	🏆 Figuras	🛒 Productos
React	12	3	6	21


NatGamez es una tienda ficticia de videojuegos desarrollada progresivamente durante la asignatura Desarrollo Frontend I (PFY2201).
En Semana 7, la aplicación evoluciona a una arquitectura React + Vite, manteniendo la identidad visual construida en semanas anteriores y migrando la experiencia completa a componentes funcionales, Hooks personalizados, renderizado condicional y estado React.
La versión actual integra:
- portada principal en React;
- catálogo dinámico;
- búsqueda;
- recomendaciones;
- carrito unificado;
- Collector's Vault;
- figuras premium;
- comprobante de compra;
- diseño responsive para PC, tablet y celular;
- publicación mediante GitHub Pages.
◆ Portada principal
La página de inicio conserva la identidad visual histórica de NatGamez y ahora está implementada completamente con React.
Incluye:
- hero principal con logo;
- menú de navegación;
- bloque de bienvenida;
- sección Explora NatGamez;
- acceso directo a:
  - Videojuegos;
  - Collector's Vault;
  - Figuras premium;
- sección de productos destacados;
- footer con contacto y comunidad.
Productos destacados
Producto	Precio oferta
God of War Ragnarök	$19.990
Cyberpunk 2077	$39.990
Elden Ring	$44.990


◆ Catálogo React
Los 12 videojuegos se cargan desde:
Semana 7/assets/data/productos.json
La información se obtiene mediante Fetch API y es administrada por useCatalog.js.
Cada producto contiene:
- nombre;
- género y categoría;
- plataformas;
- modalidad;
- rating;
- disponibilidad;
- precio normal;
- precio oferta;
- descripción;
- imagen;
- detalle en Modal;
- acción de compra.
Flujo de renderizado
productos.json
      ↓
Fetch API
      ↓
useCatalog()
      ↓
CatalogSection
      ↓
ProductGrid
      ↓
ProductCard
◆ Precio normal y oferta
Cada videojuego utiliza tres valores:
{
  "precioNormal": 49990,
  "precioOferta": 39990,
  "precio": 39990
}
Campo	Uso
precioNormal	valor original del producto
precioOferta	valor promocional visible
precio	valor efectivo utilizado por carrito y comprobante


◆ Búsqueda y recomendaciones
🔎 Búsqueda
La búsqueda permite filtrar por:
- título;
- género;
- categoría;
- modalidad;
- plataforma;
- estado.
Se utilizan eventos React como:
onChange
onSubmit
y renderizado condicional para mostrar resultados o mensajes de búsqueda vacía.
🎯 Recomendaciones
La sección reutiliza el mismo catálogo maestro.
Incluye:
- nombre del jugador;
- plataforma preferida;
- acción Recomendar;
- acción 🎲 Sorpréndeme;
- validación del formulario;
- manejo de errores;
- selección compatible con la plataforma elegida.
◆ Carrito unificado
Videojuegos, Collector's Vault y figuras premium comparten el mismo carrito mediante:
useCart.js
Permite:
- agregar productos;
- aumentar cantidades;
- disminuir cantidades;
- eliminar productos;
- vaciar carrito;
- mostrar contador total;
- calcular subtotales;
- calcular total general;
- finalizar compra;
- generar comprobante.
◆ Collector's Vault
Incluye 3 ediciones especiales comprables:
1. Elden Ring Collector's Edition
2. Cyberpunk 2077 5th Anniversary Collector's Set
3. The Witcher 3 Collector's Edition
Arquitectura:
CollectorVault
├── CollectorCard
└── VaultControls
◆ Figuras premium
Incluye 6 figuras comprables:
1. Kratos · Estatua Premium
2. Malenia · Blade of Miquella
3. Geralt & Roach · Deluxe Statue
4. Trevor Philips · GTA V
5. Dante · ARTFX J DMC5
6. Bayonetta · Climax Action 1/7
Todas comparten el componente reutilizable:
AddToCartButton
◆ Comprobante de compra
Al finalizar la compra se genera un comprobante NatGamez con:
- logo;
- folio;
- fecha y hora;
- productos;
- cantidades;
- subtotales;
- total pagado;
- información académica;
- opción de imprimir o guardar.
Arquitectura:
VoucherModal
      ↓
VoucherContent
      ↓
VoucherItem
◆ Navegación
La aplicación utiliza dos vistas principales:
App.jsx
├── HomePage.jsx
└── CatalogPage.jsx
Rutas utilizadas
Vista	URL
Portada	/NatGamez/
Catálogo	/NatGamez/?vista=catalogo
Videojuegos	/NatGamez/?vista=catalogo#videojuegos
Collector's Vault	/NatGamez/?vista=catalogo#coleccionistas
Figuras	/NatGamez/?vista=catalogo#figuras


La navegación utiliza URLSearchParams, por lo que funciona correctamente en GitHub Pages sin requerir React Router.
◆ Componentes y Hooks
Componentes principales
Semana 7/src/components/
├── home/
├── layout/
├── catalog/
├── cart/
├── recommendations/
├── collector/
├── figures/
└── voucher/
Hooks personalizados
Semana 7/src/hooks/
├── useCatalog.js
├── useCatalogSearch.js
├── useCart.js
├── useCollectorVault.js
└── useRecommendations.js
Hooks React utilizados
Hook	Uso
useState	estado de interfaz, carrito y navegación
useEffect	carga de datos y efectos de navegación
useLayoutEffect	clase visual activa por página
useMemo	filtros, cálculos y totales
useCallback	operaciones reutilizables


◆ Eventos utilizados
Evento / mecanismo	Uso
onClick	navegación, carrito, botones y controles
onChange	búsqueda y formularios
onSubmit	búsqueda y recomendaciones
onError	fallback de imágenes
Pointer Events	interacción táctil
Bootstrap Events	Modal, Carousel y Offcanvas
Fetch API	carga de productos.json


◆ Renderizado condicional
React cambia la interfaz según el estado de la aplicación:
- portada o catálogo;
- catálogo cargando;
- error de carga;
- resultados disponibles;
- búsqueda sin coincidencias;
- carrito vacío;
- carrito con productos;
- formulario con errores;
- recomendación disponible;
- comprobante generado.
◆ Responsive Design
La aplicación mantiene paridad funcional en:
🖥️ PC	📱 Tablet	📱 Celular
catálogo multicolumna	columnas adaptadas	una columna
hover completo	interacción táctil	interacción táctil
navbar horizontal	navbar colapsable	menú hamburguesa
Offcanvas lateral	Offcanvas adaptado	carrito flotante
Vault horizontal	Vault responsive	Vault apilado


◆ Arquitectura actual
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
├── Semana 6/                 # respaldo histórico
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
        │   ├── layout/
        │   ├── catalog/
        │   ├── cart/
        │   ├── recommendations/
        │   ├── collector/
        │   ├── figures/
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
◆ Ejecución local
Desde la raíz del repositorio:
npm install
npm run dev
Build de producción:
npm run build
Vista previa:
npm run preview
◆ GitHub Pages
La configuración de Vite utiliza:
base: '/NatGamez/'
El build se genera en:
dist/
y se publica desde la rama:
gh-pages
◆ Pruebas realizadas
- ✅ portada principal;
- ✅ navegación Inicio ↔ Catálogo;
- ✅ 12 videojuegos cargados;
- ✅ precio normal y oferta;
- ✅ búsqueda;
- ✅ recomendaciones;
- ✅ Sorpréndeme;
- ✅ carrito;
- ✅ cantidades;
- ✅ total;
- ✅ Collector's Vault;
- ✅ figuras premium;
- ✅ comprobante;
- ✅ responsive PC;
- ✅ responsive tablet;
- ✅ responsive celular;
- ✅ navegación hamburguesa;
- ✅ imports relativos;
- ✅ build de producción.
Validación técnica
0 imports rotos
151 módulos transformados
Build Vite correcto
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

NatGamez · Semana 7
Desarrollo Frontend I · PFY2201
Natalia Alvarado · 2026
</div>
