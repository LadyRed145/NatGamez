<div align="center">

<img src="Semana%204/logo_natgamez.png" alt="Logo de NatGamez" width="250">

NATGAMEZ

DESARROLLO FRONTEND I · PFY2201 · SEMANA 4

Tienda gamer ficticia · Bootstrap 5 · Responsive Design · Accesibilidad

<br>






<br>

🌐 Ver sitio ·
📸 Evidencias ·
🧩 Semana 4

</div>

<div align="center">

◆ VISIÓN GENERAL

</div>

<table>
<tr>
<td width="25%" align="center"><b>🎮 9</b><br><sub>Videojuegos</sub></td>
<td width="25%" align="center"><b>💎 3</b><br><sub>Ediciones Collector</sub></td>
<td width="25%" align="center"><b>🏆 3</b><br><sub>Figuras Premium</sub></td>
<td width="25%" align="center"><b>📱 3</b><br><sub>Breakpoints principales</sub></td>
</tr>
</table>

NatGamez es una tienda ficticia de videojuegos construida progresivamente durante la asignatura Desarrollo Frontend I (PFY2201).
En la Semana 4 se incorpora Bootstrap 5 como soporte estructural y funcional, manteniendo la identidad visual oscura, gamer y RGB desarrollada en las semanas anteriores.

Objetivo de esta versión

Integrar componentes Bootstrap reales —Navbar, Grid, Cards, Carousel y Modal— sin convertir el proyecto en una plantilla genérica del framework.

Bootstrap aporta la estructura. NatGamez conserva la personalidad.

<div align="center">

◆ NAVEGACIÓN RÁPIDA

</div>

Sección

Contenido

01 · Implementación Bootstrap

Navbar, Grid, Cards, Modal y Carousel

02 · Catálogo

9 videojuegos y ficha ampliada

03 · Collector's Vault

Carousel automático y controles

04 · Responsive

Desktop, tablet, móvil y breakpoint 992 px

05 · Accesibilidad

ARIA, teclado y reducción de movimiento

06 · QA y evidencias

Pruebas, consola y documentación

07 · Estructura

Organización del proyecto

08 · Tecnologías

Stack utilizado

01 · IMPLEMENTACIÓN BOOTSTRAP

<table>
<tr>
<td width="50%" valign="top">

🧭 Navbar

navbar-expand-lg

Collapse responsive

Botón hamburguesa

Navegación mediante teclado

Atributos aria-*

Cambio verificado en 991 / 992 px

</td>
<td width="50%" valign="top">

🧱 Grid

container

row

col-12

col-md-6

col-lg-4

Distribución 1 · 2 · 3 columnas

</td>
</tr>

<tr>
<td width="50%" valign="top">

🃏 Cards

9 videojuegos

Imagen, género y descripción

Chips de plataforma

Rating

Disponibilidad

Precio

Acción Ver detalles

</td>
<td width="50%" valign="top">

🪟 Modal

Modal Bootstrap reutilizable

Contenido dinámico

Imagen y descripción ampliada

Plataformas

Modalidad

Rating, estado y precio

</td>
</tr>

<tr>
<td colspan="2" valign="top">

🎠 Carousel

3 ediciones Collector

Autoplay cada 3000 ms

Flechas anterior / siguiente

Indicadores

Swipe táctil

Contador 01 / 03

Pausar / Reproducir

</td>
</tr>
</table>

02 · CATÁLOGO

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

Cada Card contiene una ficha compacta y un botón Ver detalles que abre el Modal Bootstrap con información ampliada.

<details>
<summary><b>📋 ¿Qué información muestra cada Card?</b></summary>

<br>

Categoría o género

Plataformas

Valoración

Modalidad

Disponibilidad

Precio

Descripción breve

Acceso al Modal de detalle

</details>

03 · COLLECTOR'S VAULT

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

El carrusel fue migrado desde una solución CSS de la versión anterior a un Carousel Bootstrap 5 real.

Controles disponibles

‹ anterior · ● indicadores · 01 / 03 · ⏸ pausar · ▶ reproducir · siguiente ›

El cambio automático está configurado en 3 segundos y puede detenerse manualmente para mejorar la experiencia y la accesibilidad.

04 · RESPONSIVE

<a id="responsive"></a>

<div align="center">

📱 DESKTOP · TABLET · MÓVIL

</div>

Vista

Navbar

Grid de videojuegos

🖥️ Desktop

Expandida

3 columnas

💻 Tablet

Colapsable

2 columnas

📱 Móvil

Hamburguesa

1 columna

Breakpoint validado

991 px  →  Navbar colapsada   ☰
992 px  →  Navbar expandida   Inicio · Destacados · Catálogo · Contacto

El sitio también fue revisado para evitar:

scroll horizontal accidental;

cards deformadas;

imágenes fuera de proporción;

controles inaccesibles;

colisiones entre texto y componentes.

05 · ACCESIBILIDAD

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

foco visible

navegación con teclado

enlace Saltar al contenido

prefers-reduced-motion

</td>
</tr>
</table>

El Carousel dispone además de un control manual para detener su movimiento automático.

06 · QA Y EVIDENCIAS

<div align="center">

🧪 VALIDACIÓN TÉCNICA

</div>

Se verificó manualmente:

✅ Bootstrap CSS cargado

✅ Bootstrap Bundle JS cargado

✅ Navbar expandida y colapsada

✅ Breakpoint 991 / 992 px

✅ Grid 3 / 2 / 1

✅ 9 Cards operativas

✅ Modal dinámico

✅ Carousel automático

✅ Controles del Carousel

✅ Pausa / reproducción

✅ Navegación mediante teclado

✅ Consola sin errores propios

✅ Publicación mediante GitHub Pages

📸 Documentación

La evidencia completa se encuentra en:

📄 Abrir Documentación_Capturas.pdf

<details>
<summary><b>Ver índice de las 17 evidencias</b></summary>

<br>

Inicio desktop

Navbar desktop

Navbar móvil cerrada

Navbar móvil abierta

Grid desktop

Grid tablet

Grid móvil

Modal de detalles

Carousel desktop

Carousel móvil

Carousel pausado

Figuras premium

Consola sin errores

Breakpoint 991 px

Breakpoint 992 px

Repositorio GitHub

GitHub Pages

</details>

07 · ESTRUCTURA DEL REPOSITORIO

NatGamez/
│
├── Semana 1/
├── Semana 2/
├── Semana 3/
│
├── Semana 4/
│   ├── capturas/
│   │   └── Documentación_Capturas.pdf
│   │
│   ├── Exp1_S4_Natalia_Alvarado.html
│   ├── catalogo.html
│   ├── Natalia_Alvarado_PFY2201_CSS_Semana4.css
│   └── logo_natgamez.png
│
├── index.html
└── README.md

08 · TECNOLOGÍAS

<div align="center">

<img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" alt="HTML5">
<img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" alt="CSS3">
<img src="https://img.shields.io/badge/Bootstrap_5-7952B3?style=for-the-badge&logo=bootstrap&logoColor=white" alt="Bootstrap 5">
<img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript">
<img src="https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white" alt="Git">
<img src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white" alt="GitHub">

</div>

<div align="center">

◆ IDENTIDAD VISUAL

Negro · Morado · Azul · Verde · RGB

Fondos oscuros · brillos suaves · cards translúcidas · animaciones · detalles gamer

<br>

👩‍💻 Natalia Alvarado

Analista Programador Computacional
Desarrollo Frontend I · PFY2201 · 2026

<br>



</div>