<div align="center">

<img src="Semana%207/assets/img/logo_natgamez.png" alt="Logo de NatGamez" width="250">

NATGAMEZ
DESARROLLO FRONTEND I · PFY2201 · SEMANA 7
eCommerce gamer · React · Vite · Hooks · Fetch API · Bootstrap 5 · Responsive Design · Carrito · Comprobante de compra
🌐 Sitio publicado · [⚛️ Código React Semana 7](Semana 7/) · 📁 Repositorio
</div>

◆ Visión general
Catálogo	Collector's Vault	Figuras premium	Productos comprables
🎮 12 videojuegos	💎 3 ediciones	🏆 6 figuras	🛒 21 productos


NatGamez es una tienda ficticia de videojuegos desarrollada progresivamente durante la asignatura Desarrollo Frontend I (PFY2201). La Semana 7 toma como base la versión estable construida previamente y reorganiza la aplicación activa en una arquitectura React + Vite, manteniendo la identidad visual, el catálogo, las recomendaciones, el carrito unificado, Collector's Vault, figuras premium, comprobante de compra y adaptación responsive.
La aplicación utiliza componentes funcionales, Hooks personalizados, props, eventos React y renderizado condicional. El catálogo continúa cargándose mediante Fetch API desde un archivo JSON maestro y ahora cada videojuego presenta precio normal y precio oferta.
◆ Funcionalidades de Semana 7
🎮 Catálogo dinámico
Los 12 videojuegos se cargan desde:
Semana 7/assets/data/productos.json
El Hook useCatalog.js consume el JSON mediante Fetch API, valida la respuesta y administra:
- estado de carga;
- errores HTTP;
- estructura de los productos;
- IDs únicos;
- recarga controlada del catálogo.
Los productos se renderizan mediante componentes React:
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
Cada producto utiliza tres valores relacionados con precio:
{
    "precioNormal": 49990,
    "precioOferta": 39990,
    "precio": 39990
}
- precioNormal: valor referencial previo a la oferta.
- precioOferta: valor promocional presentado al usuario.
- precio: valor efectivo utilizado por carrito, subtotal, total y comprobante.
De esta forma la nueva presentación comercial cumple la rúbrica sin modificar la lógica de compra existente.
🔎 Búsqueda
El botón Buscar se integra directamente en la navegación del catálogo.
useCatalogSearch.js permite filtrar por:
- título;
- género;
- categoría;
- modalidad;
- plataforma;
- estado.
El formulario utiliza eventos React como onChange y onSubmit. Los resultados se actualizan mediante renderizado condicional sin recargar la página.
🎯 Recomendaciones
La sección de recomendaciones reutiliza los mismos 12 videojuegos del catálogo maestro, evitando mantener una segunda fuente de datos.
Incluye:
- nombre del jugador;
- plataforma preferida;
- validaciones visuales;
- acción Recomendar;
- acción 🎲 Sorpréndeme;
- selección compatible con la plataforma escogida;
- manejo de carga y errores.
La lógica reside en useRecommendations.js y la presentación se divide en componentes funcionales independientes.
🛒 Carrito unificado
Videojuegos, ediciones Collector y figuras premium utilizan el mismo estado de carrito mediante useCart.js.
El carrito permite:
- agregar productos;
- aumentar cantidades;
- disminuir cantidades;
- eliminar productos;
- vaciar el carrito;
- calcular subtotales;
- calcular total general;
- visualizar el contador desde la navegación;
- abrir un panel lateral Bootstrap Offcanvas;
- finalizar una compra simulada;
- generar un comprobante.
Los cálculos utilizan precio como valor efectivo de compra, mientras precioNormal y precioOferta se utilizan para la presentación comercial.
💎 Collector's Vault
El carrusel contiene 3 ediciones especiales comprables:
1. Elden Ring Collector's Edition;
2. Cyberpunk 2077 5th Anniversary Collector's Set;
3. The Witcher 3 Collector's Edition.
La sección se encuentra modularizada en:
CollectorVault
├── CollectorCard
└── VaultControls
Mantiene:
- navegación anterior/siguiente;
- contador de posición;
- pausa y reanudación;
- integración con el carrito;
- comportamiento responsive.
🏆 Figuras premium
La tienda contiene 6 figuras comprables:
1. Kratos · Estatua Premium;
2. Malenia · Blade of Miquella;
3. Geralt & Roach · Deluxe Statue;
4. Trevor Philips · GTA V;
5. Dante · ARTFX J DMC5;
6. Bayonetta · Climax Action 1/7.
Cada figura utiliza FigureCard y comparte el componente reutilizable AddToCartButton con los videojuegos y Collector's Vault.
🧾 Comprobante de compra
Al finalizar la compra se genera un Comprobante de compra NatGamez.
La estructura está dividida en:
VoucherModal
      ↓
VoucherContent
      ↓
VoucherItem
Incluye:
- logo NatGamez;
- folio generado dinámicamente;
- fecha y hora;
- listado ordenado de productos;
- cantidades;
- precio efectivo;
- subtotal por producto;
- total pagado;
- información académica de la transacción;
- opción de guardar o imprimir mediante el diálogo del navegador.
◆ Eventos utilizados
Evento / mecanismo	Uso
onClick	carrito, detalle de producto, recomendaciones, controles, navbar y compra
onChange	búsqueda y formularios
onSubmit	búsqueda y recomendaciones
onError	fallback de imágenes
Pointer Events	feedback táctil de botones de compra
eventos Bootstrap	Modal, Carousel y Offcanvas
Fetch API + async/await	carga no bloqueante de productos.json


Semana 7 evita depender de creación manual del DOM para las funcionalidades activas. React actualiza la interfaz a partir del estado de la aplicación.
◆ Renderizado condicional
React muestra distintos elementos según el estado actual:
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
Esto permite construir una interfaz dinámica sin depender de innerHTML, appendChild() o creación manual de nodos.
◆ Responsive Design
La Semana 7 mantiene el mismo flujo funcional en escritorio, tablet y celular.
🖥️ Escritorio
- catálogo en varias columnas;
- hover completo;
- navegación horizontal;
- carrito Offcanvas lateral;
- Collector's Vault horizontal;
- comprobante amplio y ordenado;
- cielo RGB animado y estrellas fugaces.
📱 Tablet
- reducción progresiva de columnas;
- controles táctiles accesibles;
- navegación colapsable;
- botones centrados;
- Collector's Vault reorganizado;
- carrito y Modal adaptados al espacio disponible;
- paridad funcional con escritorio.
📱 Celular
- Cards en una columna;
- botones de compra táctiles;
- navegación mediante menú hamburguesa;
- apertura y cierre del menú controlados por React;
- carrito flotante;
- Collector's Vault apilado;
- figuras y comprobante adaptados al viewport;
- textos y acciones centrados.
◆ Arquitectura de datos y estado
Fuente del catálogo
productos.json
      ↓
Fetch API
      ↓
useCatalog()
      ↓
validación
      ↓
estado React
      ↓
ProductGrid
      ↓
ProductCard
El catálogo maestro se utiliza tanto para mostrar videojuegos como para búsqueda y recomendaciones.
Estado del carrito
El carrito se administra mediante un Hook personalizado:
useCart.js
Este Hook centraliza:
- productos agregados;
- cantidades;
- contador total;
- subtotales;
- total general;
- eliminación;
- vaciado;
- finalización de compra;
- generación del objeto de comprobante.
El estado se mantiene en memoria durante la sesión actual del navegador.
◆ Componentes funcionales y Hooks
Componentes principales
Semana 7/src/components/
├── cart/
├── catalog/
├── collector/
├── figures/
├── layout/
├── recommendations/
└── voucher/
Cada carpeta agrupa componentes relacionados con una única responsabilidad.
Hooks personalizados
Semana 7/src/hooks/
├── useCatalog.js
├── useCatalogSearch.js
├── useCart.js
├── useCollectorVault.js
└── useRecommendations.js
Hooks React utilizados
Hook	Uso
useState	carrito, búsqueda, recomendaciones y estados de interfaz
useEffect	carga inicial del catálogo y ciclo de vida
useMemo	valores derivados, productos y totales
useCallback	operaciones reutilizables y recarga controlada


◆ Manejo de errores y buenas prácticas
- validación de respuesta HTTP antes de procesar JSON;
- validación de tipos y propiedades de productos;
- control de IDs duplicados;
- fallback de imágenes;
- mensajes accesibles;
- aria-live para feedback dinámico;
- labels y aria-label en controles;
- navegación por teclado;
- componentes funcionales separados por responsabilidad;
- Hooks personalizados;
- props para comunicación entre componentes;
- renderizado condicional;
- funciones reutilizables;
- key estable en listas;
- separación entre presentación, estado, datos y utilidades;
- CSS modularizado;
- comentarios explicativos por módulo;
- Bootstrap integrado con React.
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
        ├── components/
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
La carpeta Semana 6 permanece únicamente como respaldo histórico estable.
La aplicación activa corresponde a Semana 7.
◆ Archivos principales de Semana 7
src/App.jsx
Componente raíz de la aplicación. Integra las secciones principales y conecta Hooks con componentes mediante props.
src/main.jsx
Punto de montaje de React. Importa Bootstrap y los módulos CSS en el orden definido para conservar correctamente la cascada visual.
assets/data/productos.json
Fuente de datos única para los 12 videojuegos del catálogo, búsqueda y recomendaciones.
src/hooks/
Contiene la lógica reutilizable de catálogo, búsqueda, carrito, Collector's Vault y recomendaciones.
src/styles/modules/
Contiene la hoja de estilos completamente modularizada:
- 00-foundations.css: variables, reset, accesibilidad y estilos generales;
- 01-hero-navigation.css: hero, logo, barra RGB y navegación;
- 02-home-sections.css: secciones generales;
- 03-catalog-base.css: estructura base del catálogo;
- 04-catalog-sky-premium.css: cielo RGB, estrellas y estrellas fugaces;
- 05-carousel-bootstrap.css: carrusel, Modal y estilos Bootstrap asociados;
- 06-dynamic-catalog.css: catálogo dinámico y recomendaciones;
- 07-search-cart.css: búsqueda, carrito y Offcanvas;
- 08-voucher-store.css: comprobante y productos especiales;
- 09-responsive-final.css: ajustes finales responsive;
- 10-react-core.css: integración visual con React;
- 11-pricing.css: precio normal y precio oferta;
- 12-ui-overrides.css: ajustes finales de controles y botones.
◆ Ejecución local
Los comandos npm se ejecutan desde la raíz del repositorio:
NatGamez/
Instalar dependencias:
npm install
Iniciar Vite:
npm run dev
Build de producción:
npm run build
Vista previa del build:
npm run preview
La aplicación se sirve mediante Vite y no debe abrirse directamente con file://.
◆ Pruebas sugeridas
1. Confirmar que carguen los 12 videojuegos.
2. Verificar precio normal y precio oferta.
3. Buscar por título, género y plataforma.
4. Probar una búsqueda sin resultados.
5. Probar Recomendar.
6. Probar Sorpréndeme.
7. Agregar un videojuego, una Collector y una figura.
8. Aumentar y reducir cantidades.
9. Eliminar un producto.
10. Vaciar el carrito.
11. Confirmar contador y total.
12. Finalizar la compra.
13. Revisar el comprobante.
14. Guardar/imprimir el comprobante.
15. Abrir el Modal de detalle.
16. Probar Collector's Vault.
17. Abrir y cerrar la navegación hamburguesa.
18. Revisar escritorio, tablet y celular.
19. Comprobar navegación por teclado.
20. Ejecutar npm run build.
21. Confirmar consola sin errores propios del proyecto.
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
- catálogo dinámico y búsqueda;
- recomendaciones;
- compra de videojuegos, Collector's Vault y figuras premium;
- carrito lateral con cantidades, eliminación y vaciado;
- checkout accesible con Total, Finalizar compra y Vaciar carrito;
- generación del comprobante NatGamez;
- vista imprimible/guardable del comprobante;
- navegación completa hasta el footer después de cerrar overlays.
Interacción de compra por dispositivo
- PC: conserva estados hover y feedback visual completo.
- Tablet y celular: utiliza Pointer Events como equivalente táctil.
- Los botones de compra permanecen centrados y adaptados al ancho disponible.
- Collector's Vault y Figuras premium comparten el mismo componente de compra reutilizable.
Carrito responsive
En tablet y celular el Offcanvas mantiene:
1. cabecera;
2. lista de productos con scroll vertical propio;
3. checkout independiente del scroll.
De esta forma, una lista extensa no desplaza fuera de pantalla las acciones principales del carrito.
Limpieza técnica final
Antes de cerrar Semana 7 se realizó una pasada de calidad conservadora, manteniendo el diseño y las funcionalidades aprobadas:
- migración de la aplicación activa a React;
- componentes funcionales separados por responsabilidad;
- Hooks personalizados;
- CSS modularizado en archivos temáticos;
- eliminación de bloques CSS vacíos y selectores obsoletos;
- carrito centralizado mediante useCart;
- catálogo centralizado mediante useCatalog;
- eventos React en lugar de manipulación manual del DOM;
- precio normal y precio oferta integrados sin alterar los cálculos;
- menú hamburguesa controlado por estado React;
- paridad funcional en PC, tablet y celular;
- comentarios explicativos en los módulos activos;
- estructura de proyecto compatible con Vite y GitHub Pages.
Validaciones de calidad
- build de producción mediante npm run build;
- JSON del catálogo válido;
- IDs de productos únicos;
- rutas locales verificadas;
- componentes React organizados;
- Hooks y utilidades separados;
- responsive probado en escritorio, tablet y celular;
- carrito, recomendaciones, Collector's Vault, figuras y comprobante probados;
- navegación hamburguesa verificada;
- consola revisada sin errores propios del proyecto.
