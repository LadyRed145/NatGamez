<div align="center">

<img src="Semana%206/assets/img/logo_natgamez.png" alt="Logo de NatGamez" width="250">

# NATGAMEZ

**DESARROLLO FRONTEND I · PFY2201 · SEMANA 6**

Tienda gamer ficticia · DOM · Eventos · Fetch API · Bootstrap 5 · Responsive Design · Carrito · Comprobante de compra

[🌐 Sitio publicado](https://ladyred145.github.io/NatGamez/) · [🎮 Abrir catálogo Semana 6](Semana%206/assets/html/Natalia_Alvarado_PFY2201_DOM_Semana6.html) · [📁 Repositorio](https://github.com/LadyRed145/NatGamez)

</div>

---

## ◆ Visión general

| Catálogo | Collector's Vault | Figuras premium | Productos comprables |
|---:|---:|---:|---:|
| 🎮 **12 videojuegos** | 💎 **3 ediciones** | 🏆 **6 figuras** | 🛒 **21 productos** |

NatGamez es una tienda ficticia de videojuegos desarrollada progresivamente durante la asignatura **Desarrollo Frontend I (PFY2201)**. La **Semana 6** consolida el trabajo anterior y convierte el catálogo en una experiencia de compra interactiva: datos cargados mediante Fetch API, búsqueda dinámica, recomendaciones por plataforma, carrito unificado, productos coleccionables, figuras premium, comprobante de compra y adaptación responsive para escritorio, tablet y celular.

La versión actual conserva la identidad visual construida en semanas anteriores, pero la implementación activa de la entrega se encuentra completamente organizada bajo **Semana 6**.

---

## ◆ Funcionalidades de Semana 6

### 🎮 Catálogo dinámico

Los **12 videojuegos** se cargan desde:

```text
Semana 6/assets/data/productos.json
```

El archivo JavaScript consume el JSON mediante **Fetch API**, valida su estructura y genera las Cards dinámicamente con `document.createElement()`, `appendChild()` y `replaceChildren()`.

Cada videojuego incluye:

- título;
- género y categoría;
- plataformas;
- modalidad;
- rating;
- disponibilidad;
- precio;
- descripción;
- imagen;
- Modal Bootstrap con información ampliada;
- botón de compra integrado al carrito.

### 🔎 Búsqueda

El botón **Buscar** se integra directamente en la navegación del catálogo. Permite filtrar por:

- título;
- género;
- categoría;
- modalidad;
- plataforma;
- estado.

El resultado se actualiza dinámicamente sin recargar la página y entrega feedback cuando no existen coincidencias.

### 🎯 Recomendaciones

La sección de recomendaciones reutiliza los mismos **12 videojuegos del catálogo maestro**, evitando mantener fuentes de datos duplicadas.

Incluye:

- formulario por nombre y plataforma;
- validaciones visuales;
- acción **Recomendar** mediante `submit`;
- acción **🎲 Sorpréndeme** mediante `click`;
- selección aleatoria compatible con la plataforma escogida;
- manejo de errores cuando el catálogo no puede cargarse.

### 🛒 Carrito unificado

Videojuegos, ediciones Collector y figuras premium utilizan **el mismo carrito**.

El carrito permite:

- agregar productos;
- aumentar cantidades;
- disminuir cantidades;
- eliminar productos;
- vaciar el carrito;
- calcular subtotales y total general;
- visualizar el contador desde la navegación;
- abrir un panel lateral Bootstrap Offcanvas;
- finalizar una compra simulada.

Los botones de compra de las Cards utilizan `mouseover` / `mouseout` en escritorio para ampliar su descripción, mientras que en dispositivos táctiles permanecen utilizables sin depender del hover.

### 💎 Collector's Vault

El carrusel contiene **3 ediciones especiales comprables**:

1. Elden Ring Collector's Edition;
2. Cyberpunk 2077 5th Anniversary Collector's Set;
3. The Witcher 3 Collector's Edition.

Cada edición se integra al mismo carrito del catálogo y muestra su botón de compra alineado con el precio.

### 🏆 Figuras premium

La tienda contiene **6 figuras comprables**:

1. Kratos · Estatua Premium;
2. Malenia · Blade of Miquella;
3. Geralt & Roach · Deluxe Statue;
4. Trevor Philips · GTA V;
5. Dante · ARTFX J DMC5;
6. Bayonetta · Climax Action 1/7.

Dante y Bayonetta incorporan acentos visuales propios manteniendo la estética general de NatGamez.

### 🧾 Comprobante de compra

Al finalizar la compra se genera un **Comprobante de compra NatGamez** independiente de la página principal.

Incluye:

- logo NatGamez en la esquina superior derecha;
- folio generado dinámicamente;
- fecha y hora;
- estado de compra;
- método de pago simulado;
- tipo de entrega;
- cantidad total de unidades;
- listado ordenado de productos;
- cantidad, precio y subtotal por producto;
- total pagado;
- aviso de transacción académica simulada;
- opción de guardar o imprimir mediante el diálogo del navegador.

El comprobante utiliza un documento de impresión aislado para evitar imprimir el DOM completo de la tienda o dividir incorrectamente los productos.

---

## ◆ Eventos utilizados

| Evento / mecanismo | Uso |
|---|---|
| `click` | carrito, buscador, recomendaciones, controles, compra y comprobante |
| `submit` | búsqueda y formulario de recomendaciones |
| `mouseover` | expansión visual de botones de compra en escritorio |
| `mouseout` | restauración visual de botones |
| `focusin / focusout` | equivalencia accesible para navegación por teclado |
| eventos Bootstrap | Modal, Carousel y Offcanvas |
| `DOMContentLoaded` | inicialización de NatGamez |
| `Fetch API` + `async/await` | carga no bloqueante de `productos.json` |

---

## ◆ Responsive Design

La Semana 6 está adaptada para los tres escenarios principales.

### 🖥️ Escritorio

- catálogo en varias columnas;
- efectos hover completos;
- carrito Offcanvas lateral;
- Collector's Vault horizontal;
- comprobante amplio y ordenado.

### 📱 Tablet

- reducción progresiva de columnas;
- controles táctiles accesibles;
- Collector's Vault reorganizado cuando el espacio lo requiere;
- carrito y Modal adaptados al ancho disponible.

### 📱 Celular

- Cards en una columna;
- botones de compra visibles sin depender del hover;
- navegación Bootstrap colapsable;
- panel de carrito optimizado para pantalla pequeña;
- Collector's Vault apilado;
- figuras y comprobante adaptados al viewport.

---

## ◆ Arquitectura de datos y estado

### Fuente persistente del catálogo

```text
productos.json
      ↓
Fetch API
      ↓
validación
      ↓
productosCargados[]
      ↓
DOM dinámico
```

Las ediciones Collector y las figuras premium se registran en JavaScript como productos especiales y comparten la misma lógica de carrito.

### Estado del carrito

El carrito se administra mediante un `Map` en memoria:

```javascript
const carrito = new Map();
```

Esto permite mantener cantidades sin duplicar físicamente objetos dentro del estado de la sesión actual.

> **Importante:** el carrito es persistente únicamente mientras la página permanece cargada. Al recargar o cerrar la pestaña, su contenido se pierde porque esta versión no utiliza `localStorage`, `sessionStorage`, base de datos ni backend.

---

## ◆ Asincronía, idempotencia y persistencia

Estos conceptos describen propiedades diferentes de la aplicación.

| Propiedad | Estado actual | Explicación |
|---|---|---|
| **Asincronía** | ✅ Parcial | `Fetch API` se ejecuta con `async/await` y no bloquea la página. Los eventos del usuario y Bootstrap son dirigidos por eventos. Las operaciones normales del carrito y renderizado son síncronas. |
| **Idempotencia** | ⚠️ Parcial | Renderizar nuevamente la misma lista produce el mismo resultado gracias a `replaceChildren()` y existen guardas para no duplicar buscador, carrito ni listeners. Sin embargo, **Agregar al carrito** aumenta la cantidad y por definición no es idempotente; tampoco lo son la recomendación aleatoria ni la generación de folios. |
| **Persistencia** | ⚠️ Solo datos estáticos | `productos.json`, HTML, CSS y JS permanecen como archivos. El estado del carrito y la compra están en memoria y se reinician al recargar la página. |

Por lo tanto, **NatGamez no es completamente asíncrono, idempotente ni persistente**, ni sería correcto que todas sus acciones lo fueran. Cada característica aplica donde técnicamente tiene sentido.

---

## ◆ Manejo de errores y buenas prácticas

- validación de respuesta HTTP antes de procesar JSON;
- validación de tipos y propiedades de productos;
- control de IDs duplicados;
- fallback del logo NatGamez cuando una imagen externa falla;
- mensajes de error accesibles;
- `aria-live` para feedback dinámico;
- labels y `aria-label` en controles interactivos;
- navegación por teclado;
- delegación de eventos para elementos creados dinámicamente;
- funciones reutilizables;
- separación de estructura, estilos, datos y comportamiento;
- guardas para evitar registrar listeners o componentes dinámicos más de una vez.

---

## ◆ Estructura actual del repositorio

```text
NatGamez/
├── index.html
├── README.md
├── .gitignore
│
├── Semana 1/
├── Semana 2/
├── Semana 3/
├── Semana 4/
├── Semana 5/                  # respaldo histórico estable
│
└── Semana 6/
    └── assets/
        ├── css/
        │   └── Natalia_Alvarado_PFY2201_CSS_Semana6.css
        ├── data/
        │   └── productos.json
        ├── html/
        │   └── Natalia_Alvarado_PFY2201_DOM_Semana6.html
        ├── img/
        │   ├── logo_natgamez.png
        │   └── capturas/
        │       └── Documentación_Capturas.pdf
        └── js/
            └── Natalia_Alvarado_PFY2201_DOM_Semana6.js
```

`juegos_recomendados.json` ya no se utiliza en Semana 6: las recomendaciones consumen el catálogo maestro `productos.json`. La copia de Semana 5 se mantiene únicamente como respaldo histórico de la entrega anterior.

---

## ◆ Archivos principales de Semana 6

### `assets/html/Natalia_Alvarado_PFY2201_DOM_Semana6.html`

Estructura del catálogo, navegación, secciones principales, Collector's Vault, figuras, formulario, Modal y puntos de inserción para contenido dinámico.

### `assets/css/Natalia_Alvarado_PFY2201_CSS_Semana6.css`

Identidad visual, Grid, Cards, efectos, responsive design, carrito Offcanvas, figuras premium, Collector's Vault y estilos del comprobante.

### `assets/js/Natalia_Alvarado_PFY2201_DOM_Semana6.js`

Fetch API, validaciones, render dinámico, buscador, recomendaciones, eventos, carrito, compra, productos especiales y generación del comprobante.

### `assets/data/productos.json`

Fuente de datos única para los 12 videojuegos del catálogo y las recomendaciones.

---

## ◆ Ejecución local

Desde la carpeta `Semana 6`:

```bash
python3 -m http.server 8765
```

Abrir en el navegador:

```text
http://localhost:8765/assets/html/Natalia_Alvarado_PFY2201_DOM_Semana6.html
```

No se recomienda abrir el HTML directamente con `file://`, porque Fetch API requiere servir los archivos mediante HTTP para funcionar correctamente.

---

## ◆ Pruebas sugeridas

1. Confirmar que carguen los **12 videojuegos**.
2. Buscar por título, género y plataforma.
3. Probar una búsqueda sin resultados.
4. Probar **Recomendar** y **Sorpréndeme**.
5. Agregar un videojuego, una Collector y una figura.
6. Aumentar y reducir cantidades.
7. Eliminar un producto.
8. Confirmar contador y total del carrito.
9. Finalizar compra y revisar el comprobante.
10. Guardar/imprimir el comprobante.
11. Probar navegación por teclado.
12. Revisar escritorio, tablet y celular.
13. En tablet/celular, confirmar el botón flotante **Comprar**, abrir el carrito y verificar que **Finalizar compra** permanezca visible al hacer scroll.
14. En pantalla táctil, comprobar el feedback visual al tocar **Agregar al carrito** y **Comprar** (equivalente táctil del hover).
15. Finalizar una compra desde tablet/celular y comprobar que se muestre el comprobante NatGamez con logo, productos y total.
16. Confirmar consola sin errores propios del proyecto.

---

## ◆ Tecnologías

<div align="center">

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

**NatGamez · Semana 6 · Desarrollo Frontend I · PFY2201**

Natalia Alvarado · 2026

</div>

## Paridad funcional PC · Tablet · Celular

La versión final de Semana 6 mantiene el mismo flujo funcional en los tres tipos de dispositivo:

- catálogo dinámico y búsqueda;
- recomendaciones;
- compra de videojuegos, Collector's Vault y figuras premium;
- carrito lateral con cantidades, eliminación y vaciado;
- checkout accesible con **Total, Finalizar compra y Vaciar carrito**;
- generación del comprobante NatGamez;
- vista imprimible/guardable del comprobante;
- navegación completa hasta el footer después de cerrar overlays.

### Interacción de compra por dispositivo

- **PC:** conserva `mouseover` / `mouseout` y el comportamiento visual aprobado.
- **Tablet y celular:** utiliza Pointer Events como equivalente táctil. Los botones parten compactos, se expanden al tocar y conservan el estado visual aproximadamente **1,9 segundos después de soltar**.
- En videojuegos el botón compacto permanece centrado y se expande de forma simétrica.
- En Collector's Vault y Figuras premium el botón mantiene un ancho proporcional para no desplazar el precio ni cortar el texto.

### Carrito responsive

En tablet y celular el Offcanvas se divide físicamente en tres zonas:

1. cabecera;
2. lista de productos con scroll vertical propio;
3. checkout independiente del scroll.

De esta forma, una lista extensa no puede empujar fuera de pantalla el botón **Finalizar compra**.

## Limpieza técnica final

Antes de cerrar Semana 6 se realizó una pasada de calidad conservadora, sin cambiar el diseño aprobado:

- CSS validado por parser, sin bloques mal serializados.
- Una sola capa final de compatibilidad tablet/celular, eliminando parches responsive superpuestos.
- Cero propiedades duplicadas dentro de una misma regla CSS.
- Temporizadores táctiles gestionados con `WeakMap`, sin usar atributos `data-*` como almacenamiento interno.
- Hover real separado de Pointer Events para evitar estados pegados en pantallas táctiles.
- Comprobante generado mediante un documento temporal `Blob`, evitando `document.write()`.
- Duraciones de interacción centralizadas en constantes.
- JSDoc y casts DOM mínimos para mejorar autocompletado y análisis estático sin convertir el proyecto a TypeScript.
- Checkout separado físicamente de la lista scrolleable del carrito.

### Validaciones de calidad

- JavaScript validado con `node --check`.
- JavaScript revisado con `tsc --allowJs --checkJs --noEmit` sin errores.
- CSS validado con PostCSS sin errores de sintaxis.
- JSON del catálogo válido.
- Referencias locales HTML → CSS / JS / imágenes verificadas.
