🎮 NatGamez

Proyecto académico desarrollado para la asignatura Desarrollo Frontend I (PFY2201).

Estudiante: Natalia Alvarado
Carrera: Analista Programador Computacional
Semana actual: Semana 4
Tecnología principal de esta entrega: Bootstrap 5

📌 Descripción

NatGamez es una tienda ficticia de videojuegos desarrollada progresivamente durante el curso de Desarrollo Frontend I.

La versión correspondiente a la Semana 4 conserva la identidad visual construida en las semanas anteriores e integra Bootstrap 5 para mejorar la estructura responsive, la navegación, la organización del catálogo y la interacción del sitio.

El proyecto mantiene una estética propia basada en tonos oscuros con detalles en morado, azul y verde, efectos RGB, tarjetas de productos, secciones de colección y componentes interactivos adaptados a distintos tamaños de pantalla.

🌐 Sitio publicado

GitHub Pages:
https://ladyred145.github.io/NatGamez/

Repositorio:
https://github.com/LadyRed145/NatGamez

🧩 Funcionalidades implementadas en Semana 4

Navbar responsive con Bootstrap

La navegación principal fue integrada con Bootstrap manteniendo el diseño original de NatGamez.

Incluye:

Navbar responsive.

Menú expandido en escritorio.

Botón hamburguesa en resoluciones menores a 992 px.

Componente collapse de Bootstrap.

Navegación accesible mediante teclado.

Atributos aria-* asociados a los controles.

Breakpoint verificado:

991 px → menú colapsado.

992 px → menú expandido.

Grid responsive

El catálogo utiliza el sistema Grid de Bootstrap para adaptar automáticamente la distribución de videojuegos según el tamaño de pantalla.

Distribución implementada:

Escritorio: 3 tarjetas por fila.

Tablet: 2 tarjetas por fila.

Móvil: 1 tarjeta por fila.

Clases Bootstrap principales utilizadas:

container
row
col-12
col-md-6
col-lg-4

Cards de videojuegos

El catálogo contiene 9 videojuegos organizados mediante Cards Bootstrap.

Cada tarjeta incluye:

Imagen del videojuego.

Categoría o género.

Nombre.

Descripción.

Plataformas disponibles.

Valoración.

Modalidad de juego.

Estado de disponibilidad.

Precio.

Botón Ver detalles.

Entre los títulos presentes se encuentran:

God of War Ragnarök

Cyberpunk 2077

Elden Ring

The Witcher 3

Resident Evil 4

Baldur's Gate 3

Devil May Cry 5

Tiny Tina's Wonderlands

Mortal Kombat 1: Definitive Edition

Modal de detalles

Cada videojuego puede abrir una ficha ampliada utilizando un Modal Bootstrap.

El modal muestra dinámicamente:

Imagen.

Nombre del juego.

Género.

Descripción ampliada.

Plataformas.

Modalidad.

Valoración.

Estado.

Precio.

La información cambia según la tarjeta seleccionada.

Collector's Vault

La sección Collector's Vault presenta ediciones especiales mediante un Carousel Bootstrap.

Incluye:

3 ediciones de colección.

Cambio automático cada 3 segundos.

Navegación anterior y siguiente.

Indicadores.

Swipe táctil en dispositivos compatibles.

Contador de diapositivas.

Botón Pausar / Reproducir.

Diseño responsive.

Controles accesibles.

Ediciones incluidas:

Elden Ring Collector's Edition

Cyberpunk 2077 5th Anniversary Collector's Set

The Witcher 3 Collector's Edition

Figuras premium

El catálogo incorpora además una sección destinada a figuras de colección.

Actualmente incluye:

Kratos · Estatua Premium

Malenia · Blade of Miquella

Geralt & Roach · Deluxe Statue

Esta sección mantiene el mismo lenguaje visual del resto de NatGamez y se adapta al diseño responsive del sitio.

♿ Accesibilidad

Durante la Semana 4 se reforzaron distintos aspectos de accesibilidad.

Se implementaron:

Atributo lang="es".

Textos alternativos alt en imágenes.

Etiquetas aria-label.

Relaciones aria-controls, aria-labelledby y aria-describedby.

Enlace Saltar al contenido principal.

Foco visible para navegación mediante teclado.

Soporte para prefers-reduced-motion.

Controles accesibles en Navbar, Carousel y Modal.

Botón para detener el movimiento automático del Carousel.

📱 Diseño responsive

El sitio fue probado en distintas resoluciones utilizando las herramientas de desarrollo del navegador.

Se verificó el comportamiento en:

Escritorio.

Tablet.

Móvil.

Breakpoints cercanos a los 992 px.

También se comprobó:

Ausencia de desbordamiento horizontal.

Correcta reorganización del Grid.

Adaptación de Cards.

Funcionamiento del Navbar colapsable.

Adaptación del Carousel.

Funcionamiento del Modal en distintos tamaños.

🧪 Pruebas realizadas

Durante la revisión técnica se comprobó:

Carga correcta de Bootstrap CSS.

Carga correcta de Bootstrap Bundle JS.

Navbar responsive funcional.

Apertura y cierre del menú hamburguesa.

Grid responsive.

Cards Bootstrap.

Apertura y cierre del Modal.

Cambio dinámico de contenido del Modal.

Carousel automático.

Navegación manual del Carousel.

Pausa y reproducción del Carousel.

Navegación mediante teclado.

Consola del navegador sin errores propios del proyecto.

Correcto funcionamiento desde GitHub Pages.

🗂️ Estructura del repositorio

NatGamez/
├── Semana 1/
├── Semana 2/
├── Semana 3/
├── Semana 4/
│   ├── capturas/
│   ├── Exp1_S4_Natalia_Alvarado.html
│   ├── catalogo.html
│   ├── Natalia_Alvarado_PFY2201_CSS_Semana4.css
│   └── logo_natgamez.png
│
├── index.html
└── README.md

📸 Evidencias

La documentación de la Semana 4 incluye evidencias de:

Inicio en escritorio.

Navbar en escritorio.

Navbar móvil cerrada.

Navbar móvil abierta.

Grid desktop.

Grid tablet.

Grid móvil.

Modal de detalles.

Carousel desktop.

Carousel móvil.

Carousel pausado.

Figuras premium.

Consola sin errores propios.

Breakpoint a 991 px.

Breakpoint a 992 px.

Repositorio GitHub.

GitHub Pages.

🛠️ Tecnologías utilizadas

HTML5

CSS3

Bootstrap 5.3.3

JavaScript

Git

GitHub

GitHub Pages

🎨 Identidad visual

NatGamez utiliza una estética oscura inspirada en interfaces gaming.

Elementos visuales principales:

Fondo oscuro.

Detalles en morado, azul y verde.

Efectos RGB.

Sombras y brillos suaves.

Tarjetas con diseño propio.

Animaciones y transiciones.

Diseño adaptativo para escritorio, tablet y móvil.

Bootstrap se utiliza principalmente para aportar estructura y funcionalidad responsive sin reemplazar la identidad visual personalizada del proyecto.

📚 Objetivo académico

El objetivo principal de la Semana 4 es aplicar Bootstrap 5 para construir una interfaz responsiva utilizando componentes y herramientas del framework.

La implementación incorpora:

Vinculación correcta de Bootstrap 5.

Navbar responsive.

Carousel automático.

Grid responsive.

Cards Bootstrap.

Convenciones de desarrollo frontend.

Accesibilidad.

Publicación mediante GitHub Pages.

👩‍💻 Autor

Natalia Alvarado
Analista Programador Computacional
Desarrollo Frontend I — PFY2201
2026