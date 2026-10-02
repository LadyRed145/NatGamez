<div align="center">

<img src="Semana%208/assets/img/logo_natgamez.png" alt="Logo de NatGamez" width="240">

<h1>🎮 NATGAMEZ</h1>

<h3>Desarrollo Frontend I · PFY2201 · Semana 8</h3>

<p><strong>eCommerce gamer interactivo desarrollado con React + Vite</strong></p>

<p>
  <a href="https://ladyred145.github.io/NatGamez/">🌐 Ver sitio</a>
  &nbsp;·&nbsp;
  <a href="Semana%208/">⚛️ Código Semana 8</a>
  &nbsp;·&nbsp;
  <a href="https://github.com/LadyRed145/NatGamez">📁 Repositorio</a>
</p>

</div>

---

## ✦ Visión general

**NatGamez** es una tienda ficticia de videojuegos desarrollada progresivamente durante la asignatura **Desarrollo Frontend I (PFY2201)**.

En **Semana 8**, el proyecto consolida la arquitectura **React + Vite** y refuerza la gestión de estados, los efectos secundarios y el renderizado condicional. La versión incorpora **persistencia con `localStorage` para carrito, favoritos y última compra**, permitiendo conservar el estado relevante incluso después de recargar o cerrar el navegador.

| 🏠 Portada | 🎮 Videojuegos | 💎 Collector's Vault | 🏆 Figuras premium | 🛒 Productos comprables |
|:---:|:---:|:---:|:---:|:---:|
| **React** | **12** | **3** | **6** | **21** |

### Esta versión incorpora

- 🏠 Portada principal completamente integrada en React.
- 🎮 Catálogo dinámico de **12 videojuegos**.
- 💰 Precio normal y precio oferta.
- 🔎 Búsqueda por múltiples criterios.
- 🎯 Recomendaciones y modo **Sorpréndeme**.
- 🛒 Carrito unificado para todos los productos.
- 💾 Persistencia del carrito con `localStorage`.
- ♥️ Favoritos persistentes para videojuegos, Collector's Vault y figuras premium.
- 🛍️ Offcanvas lateral de favoritos con **Agregar**, **Quitar**, **Vaciar favoritos** y **🛒 Agregar todos**.
- 🧾 Persistencia y recuperación de la última compra.
- ✅ Feedback condicional `✓ Agregado` al añadir productos.
- 💎 Collector's Vault.
- 🏆 Figuras premium.
- ✨ Navbar con iconos y glow contextual en escritorio.
- 📱 Paridad funcional en PC, tablet y celular.
- 🚀 Publicación mediante GitHub Pages.

---

## 🏠 Portada principal

La portada mantiene la estética histórica de NatGamez y ahora forma parte de la misma aplicación React.

Incluye:

- hero principal con logo;
- menú de navegación;
- bloque de bienvenida;
- sección **Explora NatGamez**;
- acceso directo a **Videojuegos**, **Collector's Vault** y **Figuras premium**;
- productos destacados;
- footer con contacto y comunidad.

### ⭐ Productos destacados

| Producto | Precio oferta |
|---|---:|
| God of War Ragnarök | **$19.990** |
| Cyberpunk 2077 | **$39.990** |
| Elden Ring | **$44.990** |

---

## 🎮 Catálogo React

Los **12 videojuegos** se cargan desde una única fuente de datos:

```text
Semana 8/assets/data/productos.json
```

La carga se realiza mediante **Fetch API** y es administrada por `useCatalog.js`.

Cada videojuego presenta:

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
- detalle en Modal Bootstrap;
- acción de compra.

### Flujo de renderizado

```text
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
```

### 💰 Precio normal y precio oferta

Cada producto utiliza tres valores relacionados con el precio:

```json
{
  "precioNormal": 49990,
  "precioOferta": 39990,
  "precio": 39990
}
```

| Campo | Función |
|---|---|
| `precioNormal` | Valor original del producto |
| `precioOferta` | Valor promocional mostrado al usuario |
| `precio` | Valor efectivo utilizado por carrito y comprobante |

---

## 🔎 Búsqueda y recomendaciones

### Búsqueda

La búsqueda permite filtrar por:

`título` · `género` · `categoría` · `modalidad` · `plataforma` · `estado`

Utiliza eventos React como `onChange` y `onSubmit`, junto con renderizado condicional para mostrar resultados o estados sin coincidencias.

### 🎯 Recomendaciones

La sección reutiliza el mismo catálogo maestro y permite:

- ingresar el nombre del jugador;
- escoger una plataforma preferida;
- ejecutar **Recomendar**;
- ejecutar **🎲 Sorpréndeme**;
- validar el formulario;
- manejar errores;
- seleccionar resultados compatibles con la plataforma elegida.

---

## 🛒 Carrito de compras

Videojuegos, Collector's Vault y figuras premium comparten el mismo estado mediante:

```text
useCart.js
```

El carrito permite:

- agregar productos;
- aumentar cantidades;
- disminuir cantidades;
- eliminar productos;
- vaciar el carrito;
- mostrar contador total;
- calcular subtotales;
- calcular total general;
- finalizar una compra;
- generar el comprobante.

### 💾 Persistencia del carrito

La Semana 8 agrega persistencia local mediante `localStorage`. El Hook `useCart.js`:

- recupera el carrito guardado al iniciar la aplicación;
- conserva únicamente IDs y cantidades válidas;
- sincroniza automáticamente los cambios del carrito;
- elimina la clave persistida cuando el carrito queda vacío o se finaliza la compra;
- maneja contenido inválido o almacenamiento bloqueado sin detener la aplicación;
- mantiene los datos maestros del producto en `productos.json`, evitando duplicarlos en el navegador.

La clave utilizada es:

```text
natgamez:carrito:v1
```

Prueba esperada: agregar productos, recargar la página y comprobar que el carrito conserva las mismas cantidades.

---

## ♥️ Favoritos persistentes

NatGamez incorpora una wishlist persistente que funciona sobre los **21 productos comprables** de la tienda:

- 12 videojuegos;
- 3 ediciones de Collector's Vault;
- 6 figuras premium.

Los favoritos se administran desde un **offcanvas lateral izquierdo** y permiten:

- marcar o desmarcar productos mediante el corazón;
- conservar la selección después de recargar o cerrar el navegador;
- agregar un producto favorito directamente al carrito;
- quitar productos individualmente;
- vaciar toda la wishlist;
- usar **🛒 Agregar todos** para enviar una unidad de cada favorito al carrito.

La clave utilizada es:

```text
natgamez:favoritos:v1
```

El estado visual se refleja también en el contador de **Favoritos** de la navegación.

---

## 💎 Collector's Vault

Incluye **3 ediciones especiales comprables**:

1. Elden Ring Collector's Edition
2. Cyberpunk 2077 5th Anniversary Collector's Set
3. The Witcher 3 Collector's Edition

La sección se encuentra modularizada en:

```text
CollectorVault
├── CollectorCard
└── VaultControls
```

---

## 🏆 Figuras premium

Incluye **6 figuras comprables**:

1. Kratos · Estatua Premium
2. Malenia · Blade of Miquella
3. Geralt & Roach · Deluxe Statue
4. Trevor Philips · GTA V
5. Dante · ARTFX J DMC5
6. Bayonetta · Climax Action 1/7

Todas reutilizan el componente:

```text
AddToCartButton
```

Tanto las ediciones Collector como las figuras premium pueden añadirse también a **Favoritos**, compartiendo la misma persistencia y flujo del catálogo principal.

---

## 🧾 Comprobante de compra

Al finalizar una compra, NatGamez genera un comprobante con:

- logo;
- folio;
- fecha y hora;
- productos y cantidades;
- subtotales;
- total pagado;
- información académica;
- opción de imprimir o guardar.

Su estructura se divide en:

```text
VoucherModal
      ↓
VoucherContent
      ↓
VoucherItem
```

La compra más reciente también se conserva en `localStorage` con la clave:

```text
natgamez:ultima-compra:v1
```

Desde el carrito puede volver a abrirse mediante **🧾 Ver última compra** sin repetir el checkout.

---

## 🧭 Navegación

La aplicación utiliza dos vistas principales:

```text
App.jsx
├── HomePage.jsx
└── CatalogPage.jsx
```

### Rutas disponibles

| Vista | Ruta |
|---|---|
| 🏠 Portada | `/NatGamez/` |
| 🎮 Catálogo | `/NatGamez/?vista=catalogo` |
| 🕹️ Videojuegos | `/NatGamez/?vista=catalogo#videojuegos` |
| 💎 Collector's Vault | `/NatGamez/?vista=catalogo#coleccionistas` |
| 🏆 Figuras premium | `/NatGamez/?vista=catalogo#figuras` |

Además de las rutas, la navegación incluye dos acciones persistentes:

- ♥ **Favoritos** → abre el offcanvas izquierdo.
- 🛒 **Comprar** → abre el offcanvas derecho del carrito.

En escritorio, las opciones del navbar sustituyen el texto por iconos con glow contextual al pasar el cursor. En dispositivos táctiles se mantiene el texto para no depender de `hover`.

La navegación utiliza `URLSearchParams`, por lo que funciona correctamente en GitHub Pages sin requerir React Router.

---

## ⚛️ Arquitectura React

### Componentes principales

```text
Semana 8/src/components/
├── home/
├── layout/
├── catalog/
├── cart/
├── recommendations/
├── collector/
├── figures/
└── voucher/
```

### Hooks personalizados

```text
Semana 8/src/hooks/
├── useCatalog.js
├── useCatalogSearch.js
├── useCart.js
├── useCollectorVault.js
└── useRecommendations.js
```

### Hooks React utilizados

| Hook | Responsabilidad |
|---|---|
| `useState` | Estado de interfaz, carrito, favoritos, última compra y navegación |
| `useEffect` | Carga de datos, persistencia local y efectos de navegación |
| `useLayoutEffect` | Clase visual activa por página |
| `useMemo` | Filtros, cálculos y totales |
| `useCallback` | Operaciones reutilizables |

---

## ⚡ Eventos y comportamiento dinámico

| Evento / mecanismo | Uso |
|---|---|
| `onClick` | Navegación, carrito, botones y controles |
| `onChange` | Búsqueda y formularios |
| `onSubmit` | Búsqueda y recomendaciones |
| `onError` | Fallback de imágenes |
| Pointer Events | Interacción táctil |
| Bootstrap Events | Modal, Carousel y Offcanvas |
| Fetch API | Carga de `productos.json` |

### Renderizado condicional

React modifica la interfaz según el estado actual:

- portada o catálogo;
- catálogo cargando;
- error de carga;
- resultados disponibles;
- búsqueda sin coincidencias;
- carrito vacío o con productos;
- favoritos vacíos o con productos guardados;
- contador persistente de favoritos;
- disponibilidad de última compra;
- formularios con errores;
- recomendación disponible;
- comprobante generado.

---

## 📱 Responsive Design

NatGamez mantiene paridad funcional en los tres escenarios principales:

| 🖥️ PC | 📱 Tablet | 📱 Celular |
|---|---|---|
| Catálogo multicolumna | Columnas adaptadas | Una columna |
| Hover completo | Interacción táctil | Interacción táctil |
| Navbar horizontal con iconos hover | Navbar colapsable | Menú hamburguesa simétrico |
| Favoritos izquierdo + carrito derecho | Offcanvas adaptados | Offcanvas a pantalla útil + carrito flotante |
| Vault horizontal | Vault responsive | Vault apilado |

---

## 🗂️ Estructura del proyecto

<details>
<summary><strong>Ver estructura completa del repositorio</strong></summary>

<br>

```text
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
├── Semana 7/                 # respaldo React anterior
│
└── Semana 8/                 # versión actual
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
        │   ├── favorites/
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
```

</details>

---

## ✅ QA y validaciones

| Validación | Estado |
|---|:---:|
| Portada principal | ✅ |
| Navegación Inicio ↔ Catálogo | ✅ |
| 12 videojuegos cargados | ✅ |
| Precio normal y oferta | ✅ |
| Búsqueda | ✅ |
| Recomendaciones | ✅ |
| Sorpréndeme | ✅ |
| Carrito y cantidades | ✅ |
| Persistencia del carrito tras recargar | ✅ |
| Favoritos persistentes | ✅ |
| Favoritos en videojuegos, Vault y figuras | ✅ |
| Offcanvas lateral de favoritos | ✅ |
| `🛒 Agregar todos` desde favoritos | ✅ |
| Persistencia de última compra | ✅ |
| Feedback condicional `✓ Agregado` | ✅ |
| Total del carrito | ✅ |
| Collector's Vault | ✅ |
| Figuras premium | ✅ |
| Comprobante | ✅ |
| Responsive PC | ✅ |
| Responsive tablet | ✅ |
| Responsive celular | ✅ |
| Navegación hamburguesa | ✅ |
| Imports relativos | ✅ |
| Build de producción | ✅ |

### Validación técnica

```text
0 imports rotos
Persistencia local de carrito, favoritos y última compra activa
Build Vite correcto
```

---

## 🚀 Ejecución local

Desde la raíz del repositorio:

```bash
npm install
npm run dev
```

Build de producción:

```bash
npm run build
```

Vista previa del build:

```bash
npm run preview
```

---

## 🌐 GitHub Pages

La configuración de Vite utiliza:

```js
base: '/NatGamez/'
```

El build se genera en:

```text
dist/
```

y se publica desde la rama:

```text
gh-pages
```

**Sitio publicado:**  
https://ladyred145.github.io/NatGamez/

---

## 🧰 Tecnologías utilizadas

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

---

<div align="center">

### 🎮 NatGamez · Semana 8

**Desarrollo Frontend I · PFY2201**

Natalia Alvarado · 2026

<br>

[🌐 Sitio](https://ladyred145.github.io/NatGamez/) ·
[📁 Repositorio](https://github.com/LadyRed145/NatGamez)

</div>