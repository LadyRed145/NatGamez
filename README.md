<div align="center">

<img src="Semana%205/logo_natgamez.png" alt="Logo de NatGamez" width="250">

NATGAMEZ

DESARROLLO FRONTEND I · PFY2201 · SEMANA 5

Tienda gamer ficticia · DOM · Eventos · Fetch API · Bootstrap 5 · Responsive Design

<br>

🌐 Ver sitio ·
🎮 Abrir Semana 5 ·
📁 Repositorio ·
📸 Evidencias

</div>

<div align="center">

◆ VISIÓN GENERAL

</div>

<table>
<tr>
<td width="25%" align="center"><b>🎮 9</b><br><sub>Videojuegos del catálogo</sub></td>
<td width="25%" align="center"><b>✨ 3</b><br><sub>Recomendaciones dinámicas</sub></td>
<td width="25%" align="center"><b>💎 3</b><br><sub>Ediciones Collector</sub></td>
<td width="25%" align="center"><b>🌐 2</b><br><sub>Navegadores de prueba</sub></td>
</tr>
</table>

NatGamez es una tienda ficticia de videojuegos construida progresivamente durante la asignatura Desarrollo Frontend I (PFY2201).

En la Semana 5 el proyecto evoluciona desde una interfaz basada principalmente en HTML, CSS y Bootstrap hacia una página con comportamiento dinámico mediante JavaScript, incorporando manipulación del DOM, eventos, consumo de datos mediante Fetch API, validaciones y manejo de errores.

La versión mantiene las funcionalidades construidas previamente —Navbar, Grid, Cards, Modal y Carousel Bootstrap— y añade una sección interactiva de recomendaciones cargadas desde un archivo JSON.

Objetivo de esta versión

Aplicar JavaScript sobre el proyecto existente para:

manipular el DOM dinámicamente;

utilizar createElement() y appendChild();

implementar eventos click, mouseover y submit;

cargar datos mediante Fetch API;

mostrar información externa de forma dinámica;

validar entradas del usuario;

manejar errores de carga;

organizar el código mediante funciones reutilizables;

mantener una experiencia responsive y accesible.

Bootstrap aporta la estructura. JavaScript aporta la interacción. NatGamez conserva la personalidad.

<div align="center">

◆ NAVEGACIÓN RÁPIDA

</div>

Sección

Contenido

01 · DOM + Fetch API

Recomendaciones dinámicas desde JSON

02 · Eventos e interacción

mouseover, submit y click

03 · Formulario y validaciones

Recomendación por plataforma y manejo de errores

04 · Catálogo + Modal

9 videojuegos y ficha ampliada

05 · Collector's Vault

Carousel Bootstrap automático e interactivo

06 · Responsive + navegadores

Desktop, tablet, móvil, Brave y Firefox

07 · Accesibilidad y buenas prácticas

ARIA, foco, feedback y funciones reutilizables

08 · QA y evidencias

Pruebas funcionales y capturas

09 · Estructura del repositorio

Organización de Semana 5

10 · Tecnologías

Stack utilizado

01 · DOM + FETCH API

<div align="center">

✨ RECOMENDACIONES NATGAMEZ

</div>

La sección Recomendaciones NatGamez se construye dinámicamente mediante JavaScript.

Los datos provienen de:

Semana 5/juegos_recomendados.json

La carga utiliza Fetch API y valida que la respuesta sea correcta antes de procesar el JSON.

Fetch API
   ↓
juegos_recomendados.json
   ↓
Validación de respuesta
   ↓
Creación dinámica de elementos
   ↓
Inserción en el DOM

Métodos DOM utilizados

document.createElement()
appendChild()

Cada recomendación se construye desde JavaScript y se inserta dinámicamente en la página.

Recomendaciones cargadas

#

Videojuego

Plataformas

01

Hades II

PC

02

Sekiro: Shadows Die Twice

PS4 · Xbox · PC

03

DOOM Eternal

PS5 · Xbox · Switch · PC

Las Cards dinámicas reutilizan la identidad visual del catálogo y permiten abrir el mismo Modal Bootstrap utilizado por los videojuegos estáticos.

02 · EVENTOS E INTERACCIÓN

<div align="center">

🖱️ CLICK · MOUSEOVER · SUBMIT

</div>

La Semana 5 incorpora los tres eventos solicitados en la actividad.

<table>
<tr>
<td width="33%" valign="top">

🖱️ mouseover

Al pasar el cursor sobre una recomendación dinámica, el estado de exploración cambia para informar qué videojuego está siendo observado.

</td>
<td width="33%" valign="top">

📋 submit

El formulario procesa el nombre y la plataforma seleccionada sin recargar la página.

La recomendación se genera únicamente cuando los datos son válidos.

</td>
<td width="33%" valign="top">

🎲 click

El botón Sorpréndeme selecciona aleatoriamente una recomendación compatible con la plataforma elegida.

</td>
</tr>
</table>

Las interacciones modifican dinámicamente el contenido y los estilos visibles de la interfaz.

03 · FORMULARIO Y VALIDACIONES

<div align="center">

🎯 ENCUENTRA TU PRÓXIMA PARTIDA

</div>

El formulario permite generar recomendaciones según la plataforma del usuario.

Acción Recomendar

Requiere:

nombre válido;

plataforma seleccionada;

datos cargados correctamente.

Acción 🎲 Sorpréndeme

Requiere:

plataforma seleccionada;

datos cargados correctamente.

El nombre no es obligatorio para esta acción.

Compatibilidad actual

Plataforma

Recomendaciones disponibles

PC

Hades II · Sekiro · DOOM Eternal

PS5

DOOM Eternal

PS4

Sekiro

Xbox

Sekiro · DOOM Eternal

Switch

DOOM Eternal

La selección aleatoria se realiza después de filtrar por compatibilidad, evitando recomendar videojuegos que no estén disponibles para la plataforma escogida.

Validaciones implementadas

feedback visual para campos inválidos;

aria-describedby asociado a mensajes de error;

validación del nombre;

validación de plataforma permitida;

botones deshabilitados mientras los datos no estén disponibles;

limpieza automática de estados al corregir los campos.

04 · CATÁLOGO + MODAL

<div align="center">

🎮 BIBLIOTECA NATGAMEZ

</div>

#

Videojuego

Enfoque

01

God of War Ragnarök

Acción · Aventura

02

Cyberpunk 2077

RPG · Mundo abierto

03

Elden Ring

RPG · Fantasía

04

The Witcher 3

RPG · Fantasía

05

Resident Evil 4

Survival horror · Acción

06

Baldur's Gate 3

RPG · Estrategia

07

Devil May Cry 5

Hack & Slash · Acción

08

Tiny Tina's Wonderlands

Looter Shooter · Fantasía

09

Mortal Kombat 1: Definitive Edition

Lucha

Cada Card incluye información resumida y un botón Ver detalles.

El Modal Bootstrap reutilizable muestra:

imagen ampliada;

descripción;

plataformas;

modalidad;

valoración;

disponibilidad;

precio.

Durante la Semana 5 también se ajustó la presentación de las imágenes para evitar recortes innecesarios y mantener una visualización completa dentro del Modal.

05 · COLLECTOR'S VAULT

<div align="center">

💎 EDICIONES ESPECIALES

</div>

<table>
<tr>
<td align="center"><b>Elden Ring</b><br><sub>Collector's Edition</sub></td>
<td align="center"><b>Cyberpunk 2077</b><br><sub>5th Anniversary Collector's Set</sub></td>
<td align="center"><b>The Witcher 3</b><br><sub>Collector's Edition</sub></td>
</tr>
</table>

El Collector's Vault mantiene el Carousel Bootstrap 5 incorporado en la Semana 4.

Controles disponibles

‹ anterior · ● indicadores · 01 / 03 · ⏸ pausar · ▶ reproducir · siguiente ›

Características:

autoplay cada 3000 ms;

flechas anterior / siguiente;

indicadores;

contador;

pausa / reproducción;

interacción táctil compatible con Bootstrap.

Mantenimiento CSS

Como mejora de mantenimiento se depuraron estilos heredados de versiones anteriores.

Se eliminaron reglas obsoletas asociadas a la antigua implementación de .vault-grid y se consolidaron los estilos utilizados por el carrusel actual bajo .vault-carrusel-bootstrap.

También se consolidaron reglas repetidas del Modal para evitar mantener versiones antiguas y nuevas del mismo componente.

El objetivo fue conservar exactamente el comportamiento visual actual reduciendo redefiniciones innecesarias.

06 · RESPONSIVE + NAVEGADORES

<a id="responsive"></a>

<div align="center">

📱 DESKTOP · TABLET · MÓVIL

</div>

Vista

Resolución de prueba

Distribución

🖥️ Desktop

1440 × 900

Vista completa

💻 Tablet

768 × 1024

Distribución adaptada

📱 Móvil

390 × 844

Contenido en una columna

La interfaz conserva los breakpoints y comportamiento responsive desarrollados anteriormente con Bootstrap y CSS personalizado.

Durante QA se verifica especialmente:

ausencia de scroll horizontal accidental;

Cards sin deformaciones;

imágenes dentro de proporción;

navegación accesible;

formulario usable;

recomendaciones correctamente distribuidas;

Modal adaptado;

Collector's Vault funcional.

Navegadores utilizados

Brave
Firefox

07 · ACCESIBILIDAD Y BUENAS PRÁCTICAS

<table>
<tr>
<td width="50%" valign="top">

♿ Semántica

lang="es"

HTML semántico

header

nav

main

section

article

footer

textos alt

</td>
<td width="50%" valign="top">

⌨️ Interacción

aria-label

aria-controls

aria-labelledby

aria-describedby

feedback accesible

foco visible

navegación con teclado

enlace Saltar al contenido

prefers-reduced-motion

</td>
</tr>
</table>

Organización JavaScript

La lógica se distribuye en funciones reutilizables para evitar código repetitivo.

Entre ellas se encuentran funciones encargadas de:

crear elementos dinámicos;

construir Cards de recomendaciones;

cargar información mediante Fetch;

validar formularios;

filtrar recomendaciones compatibles;

seleccionar una recomendación aleatoria;

actualizar estados de interfaz;

controlar el Modal;

controlar el Collector's Vault.

Las funciones principales incluyen comentarios que explican su propósito y flujo de trabajo.

Manejo de errores

La carga dinámica contempla:

comprobación de response.ok;

try / catch;

validación de estructura del JSON;

botón Reintentar ante fallos;

fallback de imágenes;

bloqueo temporal de controles mientras no existen datos válidos.

08 · QA Y EVIDENCIAS

<div align="center">

🧪 VALIDACIÓN TÉCNICA

</div>

Se verifican los siguientes puntos antes de la entrega:

✅ HTML Semana 5 disponible
✅ CSS Semana 5 disponible
✅ JavaScript Semana 5 disponible
✅ JSON válido
✅ JavaScript válido
✅ DOM dinámico
✅ createElement()
✅ appendChild()
✅ Fetch API
✅ Evento mouseover
✅ Evento submit
✅ Evento click
✅ Validación de formulario
✅ Compatibilidad por plataforma
✅ Manejo de errores Fetch
✅ Modal dinámico
✅ Collector's Vault
✅ Responsive
✅ Brave
✅ Firefox
✅ GitHub
✅ GitHub Pages

📸 Evidencias

La documentación final de capturas de Semana 5 se encuentra en:

📄 Abrir Documentación_Capturas.pdf

Las capturas demuestran el funcionamiento del DOM dinámico, los eventos, la responsividad, la compatibilidad entre navegadores y la publicación mediante GitHub Pages.

La documentación se mantiene intencionalmente breve: las imágenes demuestran el funcionamiento y este README contiene la explicación técnica del proyecto.

09 · ESTRUCTURA DEL REPOSITORIO

NatGamez/
│
├── Semana 1/
├── Semana 2/
├── Semana 3/
├── Semana 4/
│
├── Semana 5/
│   ├── capturas/
│   ├── juegos_recomendados.json
│   ├── logo_natgamez.png
│   ├── Natalia_Alvarado_PFY2201_CSS_Semana5.css
│   ├── Natalia_Alvarado_PFY2201_DOM_Semana5.html
│   └── Natalia_Alvarado_PFY2201_DOM_Semana5.js
│
├── index.html
└── README.md

Archivos principales de Semana 5

Archivo

Función

Natalia_Alvarado_PFY2201_DOM_Semana5.html

Estructura principal e integración de componentes

Natalia_Alvarado_PFY2201_CSS_Semana5.css

Identidad visual, responsive y estilos

Natalia_Alvarado_PFY2201_DOM_Semana5.js

DOM, eventos, Fetch, validación e interacción

juegos_recomendados.json

Fuente de datos para recomendaciones dinámicas

logo_natgamez.png

Identidad visual de NatGamez

capturas/

Evidencias de funcionamiento

10 · TECNOLOGÍAS

<div align="center">

<img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" alt="HTML5">
<img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" alt="CSS3">
<img src="https://img.shields.io/badge/Bootstrap_5-7952B3?style=for-the-badge&logo=bootstrap&logoColor=white" alt="Bootstrap 5">
<img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript">
<img src="https://img.shields.io/badge/JSON-000000?style=for-the-badge&logo=json&logoColor=white" alt="JSON">
<img src="https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white" alt="Git">
<img src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white" alt="GitHub">

</div>

<div align="center">

◆ IDENTIDAD VISUAL

Negro · Morado · Azul · Verde · RGB

Fondos oscuros · brillos suaves · Cards translúcidas · animaciones · detalles gamer

<br>

👩‍💻 Natalia Alvarado

Analista Programador Computacional
Desarrollo Frontend I · PFY2201 · 2026

<br>

NatGamez · Semana 5

</div>