"use strict";

// ======================================================
// NATGAMEZ — SEMANA 6
// Catálogo dinámico + Fetch API + búsqueda + carrito.
// ======================================================

const RUTA_PRODUCTOS = "assets/data/productos.json";
const RUTA_LOGO_NATGAMEZ = "logo_natgamez.png";

const MEDIA_HOVER_REAL = "(hover: hover) and (pointer: fine)";
const DURACION_FEEDBACK_TOUCH_MS = 1900;
const DURACION_CONFIRMACION_CARRITO_MS = 600;
const RETARDO_IMPRESION_MS = 180;

const temporizadoresFeedbackTouch = new WeakMap();

const PLATAFORMAS_PERMITIDAS = new Set([
    "PC",
    "PS5",
    "PS4",
    "Xbox",
    "Switch"
]);

let productosCargados = [];

let ultimaCompra = null;

/*
 * Productos especiales que no vienen desde productos.json.
 * Se integran al mismo carrito para que videojuegos,
 * Collector's Vault y figuras premium compartan una sola compra.
 */
const PRODUCTOS_ESPECIALES = [
    // Collector's Vault
    {
        id: "vault-elden-ring-collectors",
        titulo: "Elden Ring Collector's Edition",
        genero: "Collector's Vault · Elden Ring",
        categoria: "Edición especial",
        precio: 159990,
        imagen: "https://i.shgcdn.com/16028f93-f268-47a6-8ade-e900e314c6bc/-/format/auto/-/preview/3000x3000/-/quality/lighter/",
        alt: "Contenido de Elden Ring Premium Collector's Edition"
    },
    {
        id: "vault-cyberpunk-5th",
        titulo: "Cyberpunk 2077 5th Anniversary Collector's Set",
        genero: "Collector's Vault · Cyberpunk 2077",
        categoria: "Edición especial",
        precio: 139990,
        imagen: "https://gear.cdprojektred.com/cdn/shop/files/Cyberpunk-2077-5th-Anniversary-Collectors-Set-V2-GridImage-600x900-1_2d423b20-b3c7-4b3d-8d5c-37ef05e7c697.png?v=1765359509&width=1946",
        alt: "Cyberpunk 2077 5th Anniversary Collector's Set"
    },
    {
        id: "vault-witcher-3-collectors",
        titulo: "The Witcher 3 Collector's Edition",
        genero: "Collector's Vault · The Witcher",
        categoria: "Edición especial",
        precio: 109990,
        imagen: "https://www.pngkit.com/png/detail/307-3070122_the-witcher-3-wild-hunt-collectors-edition-witcher.png",
        alt: "The Witcher 3 Collector's Edition"
    },

    // Figuras ya existentes
    {
        id: "figura-kratos-premium",
        titulo: "Kratos · Estatua Premium",
        genero: "Figura premium · God of War",
        categoria: "Figura premium",
        precio: 94990,
        imagen: "https://static3.tcdn.com.br/img/img_prod/460977/estatua_kratos_god_of_war_3_playstation_game_41_cm_122301_1_68384c572044f483f1bf3df9e142b60b.jpeg",
        alt: "Figura premium de Kratos inspirada en God of War"
    },
    {
        id: "figura-malenia-premium",
        titulo: "Malenia · Blade of Miquella",
        genero: "Figura premium · Elden Ring",
        categoria: "Figura premium",
        precio: 109990,
        imagen: "https://i.shgcdn.com/41cc6ec2-8302-41a8-87cc-c76957cb2a04/-/format/auto/-/preview/3000x3000/-/quality/lighter/",
        alt: "Figura de Malenia, Blade of Miquella"
    },
    {
        id: "figura-geralt-roach",
        titulo: "Geralt & Roach · Deluxe Statue",
        genero: "Figura premium · The Witcher",
        categoria: "Figura premium",
        precio: 119990,
        imagen: "https://www.darkhorsedirect.com/cdn/shop/products/WITCHER_STATUE_GERALT-ROACH_PHOTO_DSP_1.png?v=1677535167&width=480",
        alt: "Estatua premium de Geralt y Roach"
    },

    // Nuevas figuras
    {
        id: "figura-trevor-philips",
        titulo: "Trevor Philips · GTA V",
        genero: "Figura premium · Grand Theft Auto V",
        categoria: "Figura premium",
        precio: 69990,
        imagen: "https://ueeshop.ly200-cdn.com/u_file/UPAD/UPAD468/2104/products/08/82e624e889.jpg.500x500.jpg",
        alt: "Figura coleccionable de Trevor Philips de Grand Theft Auto V",
        descripcion: "Figura de Trevor Philips con acabado de colección inspirada en Grand Theft Auto V."
    },
    {
        id: "figura-dante-dmc5",
        titulo: "Dante · ARTFX J DMC5",
        genero: "Figura premium · Devil May Cry 5",
        categoria: "Figura premium",
        precio: 99990,
        imagen: "https://makeshop-multi-images.akamaized.net/xjpn/itemimages/000000021152_t9kpkgb.jpg",
        alt: "Figura ARTFX J de Dante inspirada en Devil May Cry 5",
        descripcion: "Dante entra a la vitrina con abrigo carmesí, espada en mano y una pose de combate digna del cazador de demonios más stylish de Devil May Cry 5."
    },
    {
        id: "figura-bayonetta",
        titulo: "Bayonetta · Climax Action 1/7",
        genero: "Figura premium · Bayonetta",
        categoria: "Figura premium",
        precio: 109990,
        imagen: "https://images-na.ssl-images-amazon.com/images/I/71fTIOIT0YL._SL1000_.jpg",
        alt: "Figura 1/7 de Bayonetta en una pose dinámica de combate",
        descripcion: "Bayonetta llega con todo el flow: pose de patada alta, Scarborough Fair y una composición dinámica que captura el estilo exagerado y elegante de la Bruja de Umbra."
    }
];

const productosEspeciales =
    new Map(
        PRODUCTOS_ESPECIALES.map(
            (producto) => [
                producto.id,
                producto
            ]
        )
    );

/*
 * El carrito utiliza el ID del producto como clave
 * y guarda la cantidad seleccionada como valor.
 *
 * Ejemplo:
 * "elden-ring" => 2
 */
const carrito = new Map();

// ======================================================
// UTILIDADES GENERALES
// ======================================================

/**
 * Crea un elemento HTML conservando el tipo real de la etiqueta.
 * Esto mejora autocompletado y análisis estático sin introducir TypeScript.
 *
 * @template {keyof HTMLElementTagNameMap} K
 * @param {K} etiqueta
 * @param {string[]} [clases=[]]
 * @param {string} [texto=""]
 * @returns {HTMLElementTagNameMap[K]}
 */
function crearElemento(
    etiqueta,
    clases = [],
    texto = ""
) {
    const elemento =
        document.createElement(etiqueta);

    clases.forEach((clase) => {
        elemento.classList.add(clase);
    });

    if (texto) {
        elemento.textContent = texto;
    }

    return elemento;
}

function obtenerBootstrap() {
    return (/** @type {any} */ (window)).bootstrap;
}

function normalizarTexto(texto) {
    return String(texto ?? "")
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .trim()
        .toLocaleLowerCase("es-CL");
}

function formatearPrecioCLP(precio) {
    return new Intl.NumberFormat(
        "es-CL",
        {
            style: "currency",
            currency: "CLP",
            maximumFractionDigits: 0
        }
    ).format(precio);
}

function obtenerClaseEstado(estado) {
    const valor =
        normalizarTexto(estado);

    if (valor === "disponible") {
        return "estado-disponible";
    }

    if (
        valor.includes("ultimas")
    ) {
        return "estado-limitado";
    }

    return "estado-no-disponible";
}

function prepararProductoParaVista(producto) {
    return {
        ...producto,

        rating:
            `★ ${producto.rating.toFixed(1)}`,

        precio:
            formatearPrecioCLP(
                producto.precio
            ),

        estadoClase:
            obtenerClaseEstado(
                producto.estado
            )
    };
}

function aplicarFallbackImagen(
    imagen,
    titulo
) {
    imagen.src =
        RUTA_LOGO_NATGAMEZ;

    imagen.alt =
        `Imagen de respaldo de NatGamez para ${titulo}`;
}

function obtenerProductoPorId(idProducto) {
    return (
        productosCargados.find(
            (producto) =>
                producto.id === idProducto
        ) ??
        productosEspeciales.get(
            idProducto
        ) ??
        null
    );
}

// ======================================================
// VALIDACIÓN DEL JSON
// ======================================================

function esProductoValido(producto) {
    if (
        !producto ||
        typeof producto !== "object"
    ) {
        return false;
    }

    const plataformasValidas =
        Array.isArray(
            producto.plataformas
        ) &&
        producto.plataformas.length > 0 &&
        producto.plataformas.every(
            (plataforma) =>
                typeof plataforma === "string" &&
                PLATAFORMAS_PERMITIDAS.has(
                    plataforma
                )
        );

    return (
        typeof producto.id === "string" &&
        producto.id.trim() !== "" &&

        typeof producto.titulo === "string" &&
        producto.titulo.trim() !== "" &&

        typeof producto.genero === "string" &&
        producto.genero.trim() !== "" &&

        typeof producto.categoria === "string" &&
        producto.categoria.trim() !== "" &&

        plataformasValidas &&

        typeof producto.modalidad === "string" &&
        producto.modalidad.trim() !== "" &&

        typeof producto.rating === "number" &&
        Number.isFinite(
            producto.rating
        ) &&
        producto.rating >= 0 &&
        producto.rating <= 5 &&

        typeof producto.estado === "string" &&
        producto.estado.trim() !== "" &&

        typeof producto.precio === "number" &&
        Number.isFinite(
            producto.precio
        ) &&
        producto.precio >= 0 &&

        typeof producto.imagen === "string" &&
        producto.imagen.trim() !== "" &&

        typeof producto.alt === "string" &&
        producto.alt.trim() !== "" &&

        typeof producto.descripcion === "string" &&
        producto.descripcion.trim() !== "" &&

        typeof producto.badge === "string" &&

        typeof producto.badgeClase === "string" &&

        typeof producto.recomendado === "boolean"
    );
}

function tienenIdsUnicos(productos) {
    const ids =
        productos.map(
            (producto) =>
                producto.id
        );

    return (
        new Set(ids).size ===
        ids.length
    );
}

// ======================================================
// MODAL DE DETALLES
// ======================================================

function configurarModalDetalle() {
    const modal =
        document.getElementById(
            "detalleJuegoModal"
        );

    if (!modal) {
        return;
    }

    modal.addEventListener(
        "show.bs.modal",
        actualizarDetalleModal
    );
}

function actualizarDetalleModal(event) {
    const boton =
        event.relatedTarget;

    if (!boton) {
        return;
    }

    const asignarTexto = (
        id,
        valor
    ) => {
        const elemento =
            document.getElementById(id);

        if (elemento) {
            elemento.textContent =
                valor ?? "";
        }
    };

    asignarTexto(
        "detalleJuegoTitulo",
        boton.dataset.titulo
    );

    asignarTexto(
        "detalleJuegoGenero",
        boton.dataset.genero
    );

    asignarTexto(
        "detalleJuegoDescripcion",
        boton.dataset.descripcion
    );

    asignarTexto(
        "detalleJuegoPlataformas",
        boton.dataset.plataformas
    );

    asignarTexto(
        "detalleJuegoModalidad",
        boton.dataset.modalidad
    );

    asignarTexto(
        "detalleJuegoRating",
        boton.dataset.rating
    );

    asignarTexto(
        "detalleJuegoEstado",
        boton.dataset.estado
    );

    asignarTexto(
        "detalleJuegoPrecio",
        boton.dataset.precio
    );

    const imagen =
        /** @type {HTMLImageElement | null} */ (
            document.getElementById(
                "detalleJuegoImagen"
            )
        );

    if (imagen) {
        imagen.src =
            boton.dataset.imagen ??
            RUTA_LOGO_NATGAMEZ;

        imagen.alt =
            boton.dataset.alt ??
            "Detalle del videojuego seleccionado";
    }
}

// ======================================================
// COLLECTOR'S VAULT
// ======================================================

function configurarVault() {
    const vault =
        document.getElementById(
            "vaultCarouselBootstrap"
        );

    const contador =
        document.getElementById(
            "vaultContador"
        );

    const boton =
        document.getElementById(
            "vaultPausa"
        );

    const bootstrapUI =
        obtenerBootstrap();

    if (
        !vault ||
        !contador ||
        !boton ||
        !bootstrapUI
    ) {
        return;
    }

    const slides =
        Array.from(
            vault.querySelectorAll(
                ".carousel-item"
            )
        );

    const instancia =
        bootstrapUI.Carousel.getOrCreateInstance(
            vault,
            {
                interval: 3000,
                pause: false,
                touch: true,
                wrap: true
            }
        );

    let pausado =
        false;

    const actualizarContador =
        () => {
            const indice =
                slides.findIndex(
                    (slide) =>
                        slide.classList.contains(
                            "active"
                        )
                );

            const indiceSeguro =
                indice >= 0
                    ? indice
                    : 0;

            const actual =
                String(
                    indiceSeguro + 1
                ).padStart(
                    2,
                    "0"
                );

            const total =
                String(
                    slides.length
                ).padStart(
                    2,
                    "0"
                );

            contador.textContent =
                `${actual} / ${total}`;
        };

    vault.addEventListener(
        "slid.bs.carousel",
        actualizarContador
    );

    boton.addEventListener(
        "click",
        () => {
            pausado =
                !pausado;

            if (pausado) {
                instancia.pause();

                boton.textContent =
                    "▶ Reproducir";

                boton.setAttribute(
                    "aria-pressed",
                    "true"
                );

                return;
            }

            instancia.cycle();

            boton.textContent =
                "⏸ Pausar";

            boton.setAttribute(
                "aria-pressed",
                "false"
            );
        }
    );

    actualizarContador();
}

// ======================================================
// ORDEN Y COLORES DEL CATÁLOGO
// ======================================================

function obtenerConfiguracionAcentoPorColumna(
    indice
) {
    const columna =
        indice % 3;

    if (columna === 0) {
        return {
            borde:
                "recomendacion-borde-morado",

            badge:
                null
        };
    }

    if (columna === 1) {
        return {
            borde:
                "recomendacion-borde-azul",

            badge:
                "badge-azul"
        };
    }

    return {
        borde:
            "recomendacion-borde-verde",

        badge:
            "badge-verde"
    };
}

function reordenarProductosParaCatalogo(
    productos
) {
    const ordenEspecial = [
        "doom eternal",
        "sekiro: shadows die twice",
        "hades ii"
    ];

    const normales = [];
    const especiales = [];

    productos.forEach(
        (producto) => {
            const titulo =
                normalizarTexto(
                    producto.titulo
                );

            if (
                ordenEspecial.includes(
                    titulo
                )
            ) {
                especiales.push(
                    producto
                );
            } else {
                normales.push(
                    producto
                );
            }
        }
    );

    especiales.sort(
        (a, b) => {
            const indiceA =
                ordenEspecial.indexOf(
                    normalizarTexto(
                        a.titulo
                    )
                );

            const indiceB =
                ordenEspecial.indexOf(
                    normalizarTexto(
                        b.titulo
                    )
                );

            return (
                indiceA -
                indiceB
            );
        }
    );

    return [
        ...normales,
        ...especiales
    ];
}

// ======================================================
// PLATAFORMAS
// ======================================================

function crearPlataformas(plataformas) {
    const contenedor =
        crearElemento(
            "div",
            ["plataformas-juego"]
        );

    contenedor.setAttribute(
        "aria-label",
        "Plataformas disponibles"
    );

    plataformas.forEach(
        (plataforma) => {
            const chip =
                crearElemento(
                    "span",
                    [
                        "badge",
                        "plataforma-chip"
                    ],
                    plataforma
                );

            contenedor.appendChild(
                chip
            );
        }
    );

    return contenedor;
}

// ======================================================
// CARDS DEL CATÁLOGO
// ======================================================

function crearTarjetaProducto(
    juego,
    indice
) {
    const columna =
        crearElemento(
            "div",
            [
                "col-12",
                "col-md-6",
                "col-lg-4"
            ]
        );

    const tarjeta =
        crearElemento(
            "article",
            [
                "card",
                "h-100",
                "catalog-card"
            ]
        );

    const acento =
        obtenerConfiguracionAcentoPorColumna(
            indice
        );

    tarjeta.classList.add(
        acento.borde
    );

    tarjeta.dataset.id =
        juego.id;

    tarjeta.dataset.titulo =
        juego.titulo;

    tarjeta.dataset.genero =
        juego.genero;

    tarjeta.dataset.plataformas =
        juego.plataformas.join(
            " · "
        );

    // ==================================================
    // BADGE
    // ==================================================

    const clasesBadge = [
        "badge",
        "badge-producto"
    ];

    if (acento.badge) {
        clasesBadge.push(
            acento.badge
        );
    }

    const badge =
        crearElemento(
            "span",
            clasesBadge,
            juego.badge
        );

    // ==================================================
    // IMAGEN
    // ==================================================

    const figura =
        crearElemento(
            "figure"
        );

    const imagen =
        crearElemento(
            "img"
        );

    imagen.src =
        juego.imagen;

    imagen.alt =
        juego.alt;

    imagen.loading =
        "lazy";

    imagen.addEventListener(
        "error",
        () => {
            aplicarFallbackImagen(
                imagen,
                juego.titulo
            );
        },
        {
            once: true
        }
    );

    figura.appendChild(
        imagen
    );

    // ==================================================
    // CONTENIDO
    // ==================================================

    const contenido =
        crearElemento(
            "div",
            [
                "card-body",
                "catalog-card-contenido"
            ]
        );

    const genero =
        crearElemento(
            "p",
            ["producto-genero"],
            juego.genero
        );

    const titulo =
        crearElemento(
            "h3",
            ["card-title"],
            juego.titulo
        );

    const plataformas =
        crearPlataformas(
            juego.plataformas
        );

    const descripcion =
        crearElemento(
            "p",
            ["card-text"],
            juego.descripcion
        );

    const datosRapidos =
        crearElemento(
            "div",
            [
                "producto-datos-rapidos"
            ]
        );

    const rating =
        crearElemento(
            "span",
            ["producto-rating"],
            juego.rating
        );

    rating.setAttribute(
        "aria-label",
        `Valoración NatGamez ${
            juego.rating
                .replace(
                    "★",
                    ""
                )
                .trim()
        } de 5`
    );

    const modalidad =
        crearElemento(
            "span",
            ["producto-modalidad"],
            juego.modalidad
        );

    datosRapidos.append(
        rating,
        modalidad
    );

    const meta =
        crearElemento(
            "div",
            [
                "producto-meta"
            ]
        );

    const precio =
        crearElemento(
            "strong",
            [],
            juego.precio
        );

    const estado =
        crearElemento(
            "span",
            [
                juego.estadoClase
            ],
            juego.estado
        );

    meta.append(
        precio,
        estado
    );

    // ==================================================
    // BOTÓN VER DETALLES
    // ==================================================

    const botonDetalles =
        crearElemento(
            "button",
            [
                "btn",
                "btn-detalles-juego"
            ],
            "Ver detalles"
        );

    botonDetalles.type =
        "button";

    botonDetalles.setAttribute(
        "data-bs-toggle",
        "modal"
    );

    botonDetalles.setAttribute(
        "data-bs-target",
        "#detalleJuegoModal"
    );

    Object.assign(
        botonDetalles.dataset,
        {
            id:
                juego.id,

            titulo:
                juego.titulo,

            genero:
                juego.genero,

            plataformas:
                juego.plataformas.join(
                    " · "
                ),

            modalidad:
                juego.modalidad,

            rating:
                juego.rating,

            estado:
                juego.estado,

            precio:
                juego.precio,

            imagen:
                juego.imagen,

            alt:
                juego.alt,

            descripcion:
                juego.descripcion
        }
    );

    // ==================================================
    // BOTÓN AGREGAR AL CARRITO
    // ==================================================

    /*
     * En reposo el botón muestra solamente el carrito.
     * Los eventos mouseover / mouseout agregan o quitan
     * la clase is-hover para desplegar el texto sin cambiar
     * la altura de la Card.
     */
    const botonCarrito =
        crearElemento(
            "button",
            [
                "btn",
                "btn-agregar-carrito"
            ]
        );

    botonCarrito.type =
        "button";

    botonCarrito.dataset.productoId =
        juego.id;

    botonCarrito.setAttribute(
        "aria-label",
        `Agregar ${juego.titulo} al carrito`
    );

    const iconoCarrito =
        crearElemento(
            "span",
            ["btn-carrito-icono"],
            "🛒"
        );

    iconoCarrito.setAttribute(
        "aria-hidden",
        "true"
    );

    const textoCarrito =
        crearElemento(
            "span",
            ["btn-carrito-texto"],
            "Agregar al carrito"
        );

    botonCarrito.append(
        iconoCarrito,
        textoCarrito
    );

    // ==================================================
    // CONTENEDOR DE ACCIONES
    // ==================================================

    const acciones =
        crearElemento(
            "div",
            [
                "acciones-producto",
                "mt-auto"
            ]
        );

    acciones.append(
        botonDetalles,
        botonCarrito
    );

    // ==================================================
    // ENSAMBLADO
    // ==================================================

    contenido.append(
        genero,
        titulo,
        plataformas,
        descripcion,
        datosRapidos,
        meta,
        acciones
    );

    tarjeta.append(
        badge,
        figura,
        contenido
    );

    columna.appendChild(
        tarjeta
    );

    return columna;
}

// ======================================================
// RENDER DEL CATÁLOGO
// ======================================================

function renderizarCatalogo(
    productos = productosCargados
) {
    const grid =
        document.querySelector(
            "#videojuegos .catalogo-grid"
        );

    if (!grid) {
        console.error(
            "No se encontró el contenedor principal del catálogo."
        );

        return;
    }

    grid.replaceChildren();

    if (
        productos.length === 0
    ) {
        return;
    }

    const lista =
        productos.length ===
        productosCargados.length
            ? reordenarProductosParaCatalogo(
                productos
            )
            : productos;

    lista.forEach(
        (
            producto,
            indice
        ) => {
            const vista =
                prepararProductoParaVista(
                    producto
                );

            const tarjeta =
                crearTarjetaProducto(
                    vista,
                    indice
                );

            grid.appendChild(
                tarjeta
            );
        }
    );
}

// ======================================================
// BUSCADOR COMPACTO — BLOQUE 4
// ======================================================

function crearBuscadorCatalogo() {
    const nav =
        document.querySelector(
            ".nav-catalogo"
        );

    const navLista =
        nav?.querySelector(
            ".nav-collapse-bootstrap > ul"
        );

    const grid =
        document.querySelector(
            "#videojuegos .catalogo-grid"
        );

    if (
        !nav ||
        !navLista ||
        !grid ||
        document.getElementById(
            "formBusquedaCatalogo"
        )
    ) {
        return;
    }

    // ==================================================
    // BOTÓN BUSCAR — PRIMER ELEMENTO DE LA NAVEGACIÓN
    // ==================================================

    const itemBuscar =
        crearElemento(
            "li",
            ["nav-buscar-item"]
        );

    const botonBuscarNav =
        crearElemento(
            "button",
            [
                "nav-accion-boton",
                "nav-buscar-toggle"
            ]
        );

    botonBuscarNav.id =
        "botonBuscarNav";

    botonBuscarNav.type =
        "button";

    botonBuscarNav.setAttribute(
        "aria-expanded",
        "false"
    );

    botonBuscarNav.setAttribute(
        "aria-controls",
        "panelBusquedaCatalogo"
    );

    const iconoBoton =
        crearElemento(
            "span",
            ["nav-accion-icono"],
            "🔎"
        );

    iconoBoton.setAttribute(
        "aria-hidden",
        "true"
    );

    const textoBoton =
        crearElemento(
            "span",
            ["nav-accion-texto"],
            "Buscar"
        );

    botonBuscarNav.append(
        iconoBoton,
        textoBoton
    );

    itemBuscar.appendChild(
        botonBuscarNav
    );

    navLista.prepend(
        itemBuscar
    );

    // ==================================================
    // PANEL COMPACTO DE BÚSQUEDA
    // Se muestra debajo de la navbar al pulsar Buscar.
    // ==================================================

    const panel =
        crearElemento(
            "div",
            ["nav-buscador-panel"]
        );

    panel.id =
        "panelBusquedaCatalogo";

    panel.hidden =
        true;

    const formulario =
        crearElemento(
            "form",
            ["nav-buscador-form"]
        );

    formulario.id =
        "formBusquedaCatalogo";

    formulario.noValidate =
        true;

    formulario.setAttribute(
        "role",
        "search"
    );

    formulario.setAttribute(
        "aria-label",
        "Buscar videojuegos en el catálogo"
    );

    const contenedorInput =
        crearElemento(
            "div",
            ["nav-buscador-campo"]
        );

    const label =
        crearElemento(
            "label",
            ["visually-hidden"],
            "Buscar videojuegos"
        );

    label.htmlFor =
        "busquedaCatalogo";

    const iconoBusqueda =
        crearElemento(
            "span",
            ["nav-buscador-icono"],
            "🔎"
        );

    iconoBusqueda.setAttribute(
        "aria-hidden",
        "true"
    );

    const input =
        crearElemento(
            "input",
            ["nav-buscador-input"]
        );

    input.id =
        "busquedaCatalogo";

    input.name =
        "busquedaCatalogo";

    input.type =
        "search";

    input.placeholder =
        "Buscar por título, género, categoría o plataforma...";

    input.autocomplete =
        "off";

    input.maxLength =
        60;

    input.setAttribute(
        "aria-describedby",
        "estadoBusquedaCatalogo"
    );

    contenedorInput.append(
        label,
        iconoBusqueda,
        input
    );

    const botonSubmit =
        crearElemento(
            "button",
            ["nav-buscador-boton"],
            "Buscar"
        );

    botonSubmit.type =
        "submit";

    formulario.append(
        contenedorInput,
        botonSubmit
    );

    panel.appendChild(
        formulario
    );

    nav.insertAdjacentElement(
        "afterend",
        panel
    );

    // ==================================================
    // ESTADO DE BÚSQUEDA DEL CATÁLOGO
    // ==================================================

    if (
        !document.getElementById(
            "estadoBusquedaCatalogo"
        )
    ) {
        const estado =
            crearElemento(
                "p",
                [
                    "estado-busqueda-catalogo",
                    "estado-busqueda-normal"
                ],
                `Mostrando los ${productosCargados.length} videojuegos del catálogo.`
            );

        estado.id =
            "estadoBusquedaCatalogo";

        estado.setAttribute(
            "role",
            "status"
        );

        estado.setAttribute(
            "aria-live",
            "polite"
        );

        grid.before(
            estado
        );
    }
}

function alternarBuscadorNav() {
    const panel =
        document.getElementById(
            "panelBusquedaCatalogo"
        );

    const boton =
        document.getElementById(
            "botonBuscarNav"
        );

    const input =
        document.getElementById(
            "busquedaCatalogo"
        );

    if (
        !panel ||
        !boton
    ) {
        return;
    }

    const seAbrira =
        panel.hidden;

    panel.hidden =
        !seAbrira;

    panel.classList.toggle(
        "is-open",
        seAbrira
    );

    boton.classList.toggle(
        "is-active",
        seAbrira
    );

    boton.setAttribute(
        "aria-expanded",
        String(seAbrira)
    );

    if (seAbrira) {
        window.requestAnimationFrame(
            () => {
                input?.focus();
            }
        );
    }
}

function buscarProductos(termino) {
    const consulta =
        normalizarTexto(
            termino
        );

    if (!consulta) {
        return [
            ...productosCargados
        ];
    }

    return productosCargados.filter(
        (producto) => {
            const campos = [
                producto.titulo,
                producto.genero,
                producto.categoria,
                producto.modalidad,
                producto.estado,
                ...producto.plataformas
            ];

            return campos.some(
                (campo) =>
                    normalizarTexto(
                        campo
                    ).includes(
                        consulta
                    )
            );
        }
    );
}

function actualizarEstadoBusqueda(
    termino,
    cantidadResultados
) {
    const estado =
        document.getElementById(
            "estadoBusquedaCatalogo"
        );

    if (!estado) {
        return;
    }

    estado.classList.remove(
        "text-light",
        "text-success",
        "text-danger"
    );

    if (!termino) {
        estado.textContent =
            `Mostrando los ${productosCargados.length} videojuegos del catálogo.`;

        estado.classList.add(
            "text-light"
        );

        return;
    }

    if (
        cantidadResultados === 0
    ) {
        estado.textContent =
            `No encontramos resultados para “${termino}”.`;

        estado.classList.add(
            "text-danger"
        );

        return;
    }

    estado.textContent =
        `${cantidadResultados} resultado${
            cantidadResultados === 1
                ? ""
                : "s"
        } para “${termino}”.`;

    estado.classList.add(
        "text-success"
    );
}

function manejarSubmitBusqueda(event) {
    event.preventDefault();

    const input =
        /** @type {HTMLInputElement | null} */ (
            document.getElementById(
                "busquedaCatalogo"
            )
        );

    if (!input) {
        return;
    }

    const termino =
        input.value.trim();

    const resultados =
        buscarProductos(
            termino
        );

    renderizarCatalogo(
        resultados
    );

    actualizarEstadoBusqueda(
        termino,
        resultados.length
    );

    document
        .getElementById(
            "videojuegos"
        )
        ?.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
}

function manejarInputBusqueda(event) {
    const input =
        event.target;

    if (
        input.value.trim() !== ""
    ) {
        return;
    }

    renderizarCatalogo(
        productosCargados
    );

    actualizarEstadoBusqueda(
        "",
        productosCargados.length
    );
}

function configurarEventosBusqueda() {
    const formulario =
        document.getElementById(
            "formBusquedaCatalogo"
        );

    const input =
        document.getElementById(
            "busquedaCatalogo"
        );

    const botonBuscarNav =
        document.getElementById(
            "botonBuscarNav"
        );

    if (
        formulario &&
        formulario.dataset.eventosConfigurados !==
            "true"
    ) {
        formulario.addEventListener(
            "submit",
            manejarSubmitBusqueda
        );

        formulario.dataset.eventosConfigurados =
            "true";
    }

    if (
        input &&
        input.dataset.eventosConfigurados !==
            "true"
    ) {
        input.addEventListener(
            "input",
            manejarInputBusqueda
        );

        input.dataset.eventosConfigurados =
            "true";
    }

    if (
        botonBuscarNav &&
        botonBuscarNav.dataset.eventosConfigurados !==
            "true"
    ) {
        botonBuscarNav.addEventListener(
            "click",
            alternarBuscadorNav
        );

        botonBuscarNav.dataset.eventosConfigurados =
            "true";
    }
}


// ======================================================
// TIENDA COMPLETA — COLLECTOR'S VAULT + FIGURAS PREMIUM
// ======================================================

function crearBotonCompraEspecial(producto) {
    const boton =
        crearElemento(
            "button",
            [
                "btn",
                "btn-agregar-carrito",
                "btn-agregar-especial"
            ]
        );

    boton.type =
        "button";

    boton.dataset.productoId =
        producto.id;

    boton.setAttribute(
        "aria-label",
        `Agregar ${producto.titulo} al carrito`
    );

    const icono =
        crearElemento(
            "span",
            ["btn-carrito-icono"],
            "🛒"
        );

    icono.setAttribute(
        "aria-hidden",
        "true"
    );

    const texto =
        crearElemento(
            "span",
            ["btn-carrito-texto"],
            "Agregar al carrito"
        );

    boton.append(
        icono,
        texto
    );

    return boton;
}

function configurarCollectorComprable() {
    const slides =
        Array.from(
            document.querySelectorAll(
                "#vaultCarouselBootstrap .carousel-item"
            )
        );

    const productosVault =
        PRODUCTOS_ESPECIALES.slice(
            0,
            3
        );

    slides.forEach(
        (
            slide,
            indice
        ) => {
            const producto =
                productosVault[indice];

            const contenido =
                slide.querySelector(
                    ".vault-card-contenido"
                );

            if (
                !producto ||
                !contenido ||
                contenido.querySelector(
                    ".vault-compra-linea"
                )
            ) {
                return;
            }

            const precioExistente =
                contenido.querySelector(
                    ".precio-premium"
                );

            const linea =
                crearElemento(
                    "div",
                    ["vault-compra-linea"]
                );

            const precio =
                precioExistente ??
                crearElemento(
                    "p",
                    ["precio-premium"]
                );

            precio.textContent =
                formatearPrecioCLP(
                    producto.precio
                );

            const botonCompra =
                crearBotonCompraEspecial(
                    producto
                );

            if (precioExistente) {
                precioExistente.replaceWith(
                    linea
                );
            } else {
                contenido.appendChild(
                    linea
                );
            }

            linea.append(
                precio,
                botonCompra
            );

            /** @type {HTMLElement | null} */
            const card =
                slide.querySelector(
                    ".vault-card"
                );

            if (card) {
                card.dataset.productoId =
                    producto.id;
            }
        }
    );
}

function crearLineaCompraFigura(producto) {
    const linea =
        crearElemento(
            "div",
            ["figura-compra-linea"]
        );

    const precio =
        crearElemento(
            "strong",
            ["precio-figura"],
            formatearPrecioCLP(
                producto.precio
            )
        );

    linea.append(
        precio,
        crearBotonCompraEspecial(
            producto
        )
    );

    return linea;
}

function prepararFiguraExistente(
    card,
    producto
) {
    if (
        !card ||
        !producto
    ) {
        return;
    }

    card.dataset.productoId =
        producto.id;

    const proximamente =
        Array.from(
            card.children
        ).find(
            (elemento) =>
                elemento.tagName === "STRONG" &&
                normalizarTexto(
                    elemento.textContent
                ) === "proximamente"
        );

    proximamente?.remove();

    if (
        !card.querySelector(
            ".figura-compra-linea"
        )
    ) {
        card.appendChild(
            crearLineaCompraFigura(
                producto
            )
        );
    }
}

function crearTarjetaFiguraEspecial(producto) {
    const card =
        crearElemento(
            "article",
            [
                "figura-card",
                "figura-card-extra"
            ]
        );

    card.dataset.productoId =
        producto.id;

    const figura =
        crearElemento(
            "figure",
            [
                "figura-imagen",
                "figura-imagen-extra"
            ]
        );

    const imagen =
        crearElemento(
            "img"
        );

    imagen.src =
        producto.imagen;

    imagen.alt =
        producto.alt;

    imagen.loading =
        "lazy";

    imagen.addEventListener(
        "error",
        () => {
            aplicarFallbackImagen(
                imagen,
                producto.titulo
            );
        },
        {
            once: true
        }
    );

    figura.appendChild(
        imagen
    );

    const genero =
        crearElemento(
            "p",
            ["producto-genero"],
            producto.genero.replace(
                "Figura premium · ",
                ""
            )
        );

    const titulo =
        crearElemento(
            "h3",
            [],
            producto.titulo
        );

    const descripcion =
        crearElemento(
            "p",
            [],
            producto.descripcion
        );

    card.append(
        figura,
        genero,
        titulo,
        descripcion,
        crearLineaCompraFigura(
            producto
        )
    );

    return card;
}

function configurarFigurasComprables() {
    const grid =
        document.querySelector(
            "#figuras .figuras-grid"
        );

    if (!grid) {
        return;
    }

    const productosFiguras =
        PRODUCTOS_ESPECIALES.slice(
            3
        );

    const cardsExistentes =
        Array.from(
            grid.querySelectorAll(
                ".figura-card"
            )
        ).slice(
            0,
            3
        );

    cardsExistentes.forEach(
        (
            card,
            indice
        ) => {
            prepararFiguraExistente(
                card,
                productosFiguras[indice]
            );
        }
    );

    productosFiguras
        .slice(
            3
        )
        .forEach(
            (producto) => {
                if (
                    grid.querySelector(
                        `[data-producto-id="${producto.id}"]`
                    )
                ) {
                    return;
                }

                grid.appendChild(
                    crearTarjetaFiguraEspecial(
                        producto
                    )
                );
            }
        );
}

function configurarTiendaCompleta() {
    configurarCollectorComprable();
    configurarFigurasComprables();
}

// ======================================================
// CARRITO — BLOQUE 5
// click + mouseover + mouseout + Offcanvas Bootstrap
// ======================================================

function obtenerCantidadTotalCarrito() {
    let cantidad = 0;

    carrito.forEach(
        (unidades) => {
            cantidad += unidades;
        }
    );

    return cantidad;
}

function calcularTotalCarrito() {
    let total = 0;

    carrito.forEach(
        (
            cantidad,
            idProducto
        ) => {
            const producto =
                obtenerProductoPorId(
                    idProducto
                );

            if (!producto) {
                return;
            }

            total +=
                producto.precio *
                cantidad;
        }
    );

    return total;
}

function crearBotonComprarNav() {
    const navLista =
        document.querySelector(
            ".nav-catalogo .nav-collapse-bootstrap > ul"
        );

    if (
        !navLista ||
        document.getElementById(
            "botonComprarNav"
        )
    ) {
        return;
    }

    const itemComprar =
        crearElemento(
            "li",
            ["nav-comprar-item"]
        );

    const botonComprar =
        crearElemento(
            "button",
            ["nav-comprar-boton"]
        );

    botonComprar.id =
        "botonComprarNav";

    botonComprar.type =
        "button";

    botonComprar.setAttribute(
        "data-bs-toggle",
        "offcanvas"
    );

    botonComprar.setAttribute(
        "data-bs-target",
        "#carritoOffcanvas"
    );

    botonComprar.setAttribute(
        "aria-controls",
        "carritoOffcanvas"
    );

    botonComprar.setAttribute(
        "aria-label",
        "Abrir carrito de compras"
    );

    const texto =
        crearElemento(
            "span",
            ["nav-comprar-texto"],
            "Comprar"
        );

    const icono =
        crearElemento(
            "span",
            ["nav-comprar-icono"],
            "🛒"
        );

    icono.setAttribute(
        "aria-hidden",
        "true"
    );

    const contador =
        crearElemento(
            "span",
            ["nav-comprar-contador"],
            "0"
        );

    contador.id =
        "contadorCarritoNav";

    botonComprar.append(
        texto,
        icono,
        contador
    );

    itemComprar.appendChild(
        botonComprar
    );

    navLista.appendChild(
        itemComprar
    );
}

/*
 * Acceso permanente al carrito para tablet y celular.
 * En pantallas táctiles la navegación puede estar colapsada, por lo que
 * este botón evita esconder la compra dentro del menú hamburguesa.
 */
function crearBotonComprarMovil() {
    if (
        document.getElementById(
            "botonComprarMovil"
        )
    ) {
        return;
    }

    const boton =
        crearElemento(
            "button",
            ["carrito-flotante-movil"]
        );

    boton.id =
        "botonComprarMovil";

    boton.type =
        "button";

    boton.setAttribute(
        "data-bs-toggle",
        "offcanvas"
    );

    boton.setAttribute(
        "data-bs-target",
        "#carritoOffcanvas"
    );

    boton.setAttribute(
        "aria-controls",
        "carritoOffcanvas"
    );

    boton.setAttribute(
        "aria-label",
        "Abrir carrito de compras"
    );

    const icono =
        crearElemento(
            "span",
            ["carrito-flotante-icono"],
            "🛒"
        );

    icono.setAttribute(
        "aria-hidden",
        "true"
    );

    const textoBoton =
        crearElemento(
            "span",
            ["carrito-flotante-texto"],
            "Comprar"
        );

    const contador =
        crearElemento(
            "span",
            ["carrito-flotante-contador"],
            "0"
        );

    contador.id =
        "contadorCarritoMovil";

    boton.append(
        icono,
        textoBoton,
        contador
    );

    document.body.appendChild(
        boton
    );
}

function crearCarritoCatalogo() {
    crearBotonComprarNav();
    crearBotonComprarMovil();

    /*
     * Si existiera una versión anterior del carrito inferior,
     * la retiramos para que solo exista el panel lateral.
     */
    document
        .getElementById(
            "carritoCompras"
        )
        ?.remove();

    if (
        document.getElementById(
            "carritoOffcanvas"
        )
    ) {
        renderizarCarrito();
        return;
    }

    const offcanvas =
        crearElemento(
            "aside",
            [
                "offcanvas",
                "offcanvas-end",
                "offcanvas-natgamez"
            ]
        );

    offcanvas.id =
        "carritoOffcanvas";

    offcanvas.tabIndex =
        -1;

    offcanvas.setAttribute(
        "aria-labelledby",
        "tituloCarritoOffcanvas"
    );

    const cabecera =
        crearElemento(
            "div",
            ["offcanvas-header"]
        );

    const grupoTitulo =
        crearElemento(
            "div",
            ["carrito-offcanvas-titulo"]
        );

    const etiqueta =
        crearElemento(
            "p",
            ["etiqueta-seccion"],
            "TU SELECCIÓN"
        );

    const titulo =
        crearElemento(
            "h2",
            [],
            "🛒 Tu carrito"
        );

    titulo.id =
        "tituloCarritoOffcanvas";

    grupoTitulo.append(
        etiqueta,
        titulo
    );

    const cerrar =
        crearElemento(
            "button",
            ["carrito-cerrar"],
            "×"
        );

    cerrar.type =
        "button";

    cerrar.setAttribute(
        "data-bs-dismiss",
        "offcanvas"
    );

    cerrar.setAttribute(
        "aria-label",
        "Cerrar carrito"
    );

    cabecera.append(
        grupoTitulo,
        cerrar
    );

    const cuerpo =
        crearElemento(
            "div",
            ["offcanvas-body"]
        );

    const estado =
        crearElemento(
            "p",
            [
                "carrito-estado",
                "carrito-estado-normal"
            ],
            "Tu carrito está vacío."
        );

    estado.id =
        "estadoCarrito";

    estado.setAttribute(
        "role",
        "status"
    );

    estado.setAttribute(
        "aria-live",
        "polite"
    );

    const lista =
        crearElemento(
            "div",
            ["carrito-lista"]
        );

    lista.id =
        "listaCarrito";

    const resumen =
        crearElemento(
            "div",
            ["carrito-resumen"]
        );

    const totalLinea =
        crearElemento(
            "div",
            ["carrito-total-linea"]
        );

    const etiquetaTotal =
        crearElemento(
            "span",
            [],
            "Total"
        );

    const total =
        crearElemento(
            "strong",
            [],
            "$0"
        );

    total.id =
        "totalCarrito";

    totalLinea.append(
        etiquetaTotal,
        total
    );

    const accionesCompra =
        crearElemento(
            "div",
            ["carrito-acciones-finales"]
        );

    const botonComprarAhora =
        crearElemento(
            "button",
            ["carrito-comprar-ahora"],
            "💳 Finalizar compra"
        );

    botonComprarAhora.id =
        "botonComprarAhora";

    botonComprarAhora.type =
        "button";

    botonComprarAhora.disabled =
        true;

    const botonVaciar =
        crearElemento(
            "button",
            ["carrito-vaciar"],
            "Vaciar carrito"
        );

    botonVaciar.id =
        "botonVaciarCarrito";

    botonVaciar.type =
        "button";


    accionesCompra.append(
        botonComprarAhora,
        botonVaciar
    );

    const ayudaCompra =
        crearElemento(
            "p",
            ["carrito-ayuda-compra"],
            "Compra simulada · al finalizar se genera tu comprobante NatGamez."
        );

    resumen.append(
        totalLinea,
        accionesCompra,
        ayudaCompra
    );

    /*
     * Estructura responsive real:
     * - El cuerpo contiene solamente estado + lista scrolleable.
     * - El resumen/checkout queda FUERA del área scrolleable.
     *
     * De esta forma, tanto en PC como en tablet/celular, el usuario
     * siempre puede ver Total / Finalizar compra / Vaciar carrito
     * aunque existan muchos productos en la lista.
     */
    cuerpo.append(
        estado,
        lista
    );

    resumen.classList.add(
        "carrito-checkout-fijo"
    );

    offcanvas.append(
        cabecera,
        cuerpo,
        resumen
    );

    document.body.appendChild(
        offcanvas
    );

    /*
     * Seguridad responsive:
     * Bootstrap bloquea correctamente el scroll del documento mientras
     * el carrito está abierto. Al cerrarlo restauramos cualquier estilo
     * inline residual para que tablet/celular puedan seguir recorriendo
     * toda la tienda hasta el footer, igual que en PC.
     */
    /*
     * Estado explícito del carrito para responsive.
     * No dependemos de :has() ni del tipo de puntero del navegador:
     * tablet/celular recuperan siempre el scroll completo al cerrar.
     */
    offcanvas.addEventListener(
        "show.bs.offcanvas",
        () => {
            document.body.classList.add(
                "carrito-abierto"
            );
        }
    );

    offcanvas.addEventListener(
        "hidden.bs.offcanvas",
        () => {
            document.body.classList.remove(
                "carrito-abierto"
            );

            window.requestAnimationFrame(
                () => {
                    const hayOverlayAbierto =
                        document.querySelector(
                            ".offcanvas.show, .modal.show"
                        );

                    if (!hayOverlayAbierto) {
                        [document.documentElement, document.body].forEach(
                            (elemento) => {
                                elemento.style.removeProperty(
                                    "overflow"
                                );
                                elemento.style.removeProperty(
                                    "overflow-y"
                                );
                                elemento.style.removeProperty(
                                    "height"
                                );
                                elemento.style.removeProperty(
                                    "max-height"
                                );
                                elemento.style.removeProperty(
                                    "padding-right"
                                );
                            }
                        );
                    }
                }
            );
        }
    );

    crearModalVoucher();
    renderizarCarrito();
}

function actualizarBotonComprar() {
    const cantidadTotal =
        obtenerCantidadTotalCarrito();

    const contadores = [
        document.getElementById(
            "contadorCarritoNav"
        ),
        document.getElementById(
            "contadorCarritoMovil"
        )
    ].filter(Boolean);

    const botones = [
        document.getElementById(
            "botonComprarNav"
        ),
        document.getElementById(
            "botonComprarMovil"
        )
    ].filter(Boolean);

    contadores.forEach(
        (contador) => {
            contador.textContent =
                String(
                    cantidadTotal
                );

            contador.setAttribute(
                "aria-label",
                `${cantidadTotal} producto${
                    cantidadTotal === 1
                        ? ""
                        : "s"
                } en el carrito`
            );

            contador.classList.toggle(
                "tiene-productos",
                cantidadTotal > 0
            );
        }
    );

    botones.forEach(
        (boton) => {
            boton.classList.toggle(
                "tiene-productos",
                cantidadTotal > 0
            );
        }
    );
}

function renderizarCarrito() {
    const lista =
        document.getElementById(
            "listaCarrito"
        );

    const total =
        document.getElementById(
            "totalCarrito"
        );

    const botonVaciar =
        /** @type {HTMLButtonElement | null} */ (
            document.getElementById(
                "botonVaciarCarrito"
            )
        );

    const botonComprarAhora =
        /** @type {HTMLButtonElement | null} */ (
            document.getElementById(
                "botonComprarAhora"
            )
        );

    actualizarBotonComprar();

    if (
        !lista ||
        !total
    ) {
        return;
    }

    lista.replaceChildren();

    total.textContent =
        formatearPrecioCLP(
            calcularTotalCarrito()
        );

    if (botonVaciar) {
        botonVaciar.disabled =
            carrito.size === 0;
    }

    if (botonComprarAhora) {
        botonComprarAhora.disabled =
            carrito.size === 0;
    }

    if (
        carrito.size === 0
    ) {
        const vacio =
            crearElemento(
                "div",
                ["carrito-vacio"]
            );

        const icono =
            crearElemento(
                "span",
                ["carrito-vacio-icono"],
                "🎮"
            );

        icono.setAttribute(
            "aria-hidden",
            "true"
        );

        const titulo =
            crearElemento(
                "strong",
                [],
                "Tu inventario está vacío"
            );

        const texto =
            crearElemento(
                "p",
                [],
                "Agrega un videojuego desde el catálogo y aparecerá aquí."
            );

        vacio.append(
            icono,
            titulo,
            texto
        );

        lista.appendChild(
            vacio
        );

        return;
    }

    carrito.forEach(
        (
            cantidad,
            idProducto
        ) => {
            const producto =
                obtenerProductoPorId(
                    idProducto
                );

            if (!producto) {
                return;
            }

            const item =
                crearElemento(
                    "article",
                    ["carrito-item"]
                );

            item.dataset.productoId =
                producto.id;

            const imagen =
                crearElemento(
                    "img",
                    ["carrito-item-imagen"]
                );

            imagen.src =
                producto.imagen;

            imagen.alt =
                producto.alt;

            imagen.loading =
                "lazy";

            imagen.addEventListener(
                "error",
                () => {
                    aplicarFallbackImagen(
                        imagen,
                        producto.titulo
                    );
                },
                {
                    once: true
                }
            );

            const contenido =
                crearElemento(
                    "div",
                    ["carrito-item-contenido"]
                );

            const nombre =
                crearElemento(
                    "h3",
                    [],
                    producto.titulo
                );

            const precioUnidad =
                crearElemento(
                    "p",
                    ["carrito-item-precio"],
                    `${formatearPrecioCLP(
                        producto.precio
                    )} c/u`
                );

            const controles =
                crearElemento(
                    "div",
                    ["carrito-item-controles"]
                );

            const botonRestar =
                crearElemento(
                    "button",
                    [
                        "carrito-cantidad-boton",
                        "btn-carrito-restar"
                    ],
                    "−"
                );

            botonRestar.type =
                "button";

            botonRestar.dataset.productoId =
                producto.id;

            botonRestar.setAttribute(
                "aria-label",
                `Quitar una unidad de ${producto.titulo}`
            );

            const cantidadTexto =
                crearElemento(
                    "span",
                    ["carrito-cantidad"],
                    String(
                        cantidad
                    )
                );

            const botonSumar =
                crearElemento(
                    "button",
                    [
                        "carrito-cantidad-boton",
                        "btn-carrito-sumar"
                    ],
                    "+"
                );

            botonSumar.type =
                "button";

            botonSumar.dataset.productoId =
                producto.id;

            botonSumar.setAttribute(
                "aria-label",
                `Agregar otra unidad de ${producto.titulo}`
            );

            const botonEliminar =
                crearElemento(
                    "button",
                    ["btn-carrito-eliminar"],
                    "Eliminar"
                );

            botonEliminar.type =
                "button";

            botonEliminar.dataset.productoId =
                producto.id;

            botonEliminar.setAttribute(
                "aria-label",
                `Eliminar ${producto.titulo} del carrito`
            );

            controles.append(
                botonRestar,
                cantidadTexto,
                botonSumar,
                botonEliminar
            );

            contenido.append(
                nombre,
                precioUnidad,
                controles
            );

            const subtotal =
                crearElemento(
                    "strong",
                    ["carrito-item-subtotal"],
                    formatearPrecioCLP(
                        producto.precio *
                        cantidad
                    )
                );

            item.append(
                imagen,
                contenido,
                subtotal
            );

            lista.appendChild(
                item
            );
        }
    );
}

function mostrarEstadoCarrito(
    mensaje,
    tipo = "normal"
) {
    const estado =
        document.getElementById(
            "estadoCarrito"
        );

    if (!estado) {
        return;
    }

    estado.textContent =
        mensaje;

    estado.classList.remove(
        "carrito-estado-normal",
        "carrito-estado-exito",
        "carrito-estado-error"
    );

    if (tipo === "exito") {
        estado.classList.add(
            "carrito-estado-exito"
        );
        return;
    }

    if (tipo === "error") {
        estado.classList.add(
            "carrito-estado-error"
        );
        return;
    }

    estado.classList.add(
        "carrito-estado-normal"
    );
}

function agregarProductoAlCarrito(
    idProducto
) {
    const producto =
        obtenerProductoPorId(
            idProducto
        );

    if (!producto) {
        mostrarEstadoCarrito(
            "No fue posible encontrar el producto seleccionado.",
            "error"
        );
        return;
    }

    const cantidadActual =
        carrito.get(
            idProducto
        ) ?? 0;

    carrito.set(
        idProducto,
        cantidadActual + 1
    );

    renderizarCarrito();

    mostrarEstadoCarrito(
        `${producto.titulo} fue agregado al carrito.`,
        "exito"
    );

    const boton =
        document.querySelector(
            `.btn-agregar-carrito[data-producto-id="${idProducto}"]`
        );

    if (boton) {
        boton.classList.add(
            "producto-agregado"
        );

        window.setTimeout(
            () => {
                boton.classList.remove(
                    "producto-agregado"
                );
            },
            DURACION_CONFIRMACION_CARRITO_MS
        );
    }
}

function cambiarCantidadCarrito(
    idProducto,
    cambio
) {
    const producto =
        obtenerProductoPorId(
            idProducto
        );

    if (!producto) {
        return;
    }

    const cantidadActual =
        carrito.get(
            idProducto
        ) ?? 0;

    const nuevaCantidad =
        cantidadActual +
        cambio;

    if (
        nuevaCantidad <= 0
    ) {
        carrito.delete(
            idProducto
        );

        renderizarCarrito();

        mostrarEstadoCarrito(
            `${producto.titulo} fue eliminado del carrito.`
        );
        return;
    }

    carrito.set(
        idProducto,
        nuevaCantidad
    );

    renderizarCarrito();

    mostrarEstadoCarrito(
        `Cantidad de ${producto.titulo}: ${nuevaCantidad}.`,
        "exito"
    );
}

function eliminarProductoDelCarrito(
    idProducto
) {
    const producto =
        obtenerProductoPorId(
            idProducto
        );

    if (!producto) {
        return;
    }

    carrito.delete(
        idProducto
    );

    renderizarCarrito();

    mostrarEstadoCarrito(
        `${producto.titulo} fue eliminado del carrito.`
    );
}

function vaciarCarrito() {
    carrito.clear();

    renderizarCarrito();

    mostrarEstadoCarrito(
        "El carrito quedó vacío."
    );
}

// ======================================================
// COMPRA Y VOUCHER NATGAMEZ
// ======================================================

function generarFolioVoucher() {
    const ahora =
        new Date();

    const fecha =
        [
            ahora.getFullYear(),
            String(ahora.getMonth() + 1).padStart(2, "0"),
            String(ahora.getDate()).padStart(2, "0")
        ].join("");

    const hora =
        [
            String(ahora.getHours()).padStart(2, "0"),
            String(ahora.getMinutes()).padStart(2, "0"),
            String(ahora.getSeconds()).padStart(2, "0")
        ].join("");

    const aleatorio =
        Math.floor(
            1000 +
            Math.random() * 9000
        );

    return `NG-${fecha}-${hora}-${aleatorio}`;
}

function obtenerFechaVoucher() {
    return new Intl.DateTimeFormat(
        "es-CL",
        {
            dateStyle: "long",
            timeStyle: "short"
        }
    ).format(
        new Date()
    );
}

function obtenerDetalleCompra() {
    const items = [];

    carrito.forEach(
        (
            cantidad,
            idProducto
        ) => {
            const producto =
                obtenerProductoPorId(
                    idProducto
                );

            if (!producto) {
                return;
            }

            items.push(
                {
                    id: producto.id,
                    titulo: producto.titulo,
                    genero: producto.genero,
                    imagen: producto.imagen,
                    alt: producto.alt,
                    precio: producto.precio,
                    cantidad,
                    subtotal:
                        producto.precio *
                        cantidad
                }
            );
        }
    );

    return items;
}

function crearModalVoucher() {
    if (
        document.getElementById(
            "modalVoucherNatGamez"
        )
    ) {
        return;
    }

    const modal =
        crearElemento(
            "div",
            [
                "modal",
                "fade",
                "modal-voucher-natgamez"
            ]
        );

    modal.id =
        "modalVoucherNatGamez";

    modal.tabIndex =
        -1;

    modal.setAttribute(
        "aria-labelledby",
        "tituloVoucherNatGamez"
    );

    modal.setAttribute(
        "aria-hidden",
        "true"
    );

    const dialogo =
        crearElemento(
            "div",
            [
                "modal-dialog",
                "modal-dialog-centered",
                "modal-lg",
                "modal-dialog-scrollable"
            ]
        );

    const contenido =
        crearElemento(
            "div",
            [
                "modal-content",
                "voucher-modal-content"
            ]
        );

    const cabecera =
        crearElemento(
            "div",
            [
                "modal-header",
                "voucher-modal-header"
            ]
        );

    const titulo =
        crearElemento(
            "h2",
            [
                "modal-title",
                "voucher-modal-title"
            ],
            "Comprobante de compra"
        );

    titulo.id =
        "tituloVoucherNatGamez";

    const cerrar =
        crearElemento(
            "button",
            [
                "btn-close",
                "btn-close-white"
            ]
        );

    cerrar.type =
        "button";

    cerrar.setAttribute(
        "data-bs-dismiss",
        "modal"
    );

    cerrar.setAttribute(
        "aria-label",
        "Cerrar comprobante"
    );

    cabecera.append(
        titulo,
        cerrar
    );

    const cuerpo =
        crearElemento(
            "div",
            [
                "modal-body",
                "voucher-modal-body"
            ]
        );

    const voucher =
        crearElemento(
            "section",
            ["voucher-comprobante"]
        );

    voucher.id =
        "voucherContenido";

    voucher.setAttribute(
        "aria-live",
        "polite"
    );

    cuerpo.appendChild(
        voucher
    );

    const pie =
        crearElemento(
            "div",
            [
                "modal-footer",
                "voucher-modal-footer"
            ]
        );

    const imprimir =
        crearElemento(
            "button",
            ["voucher-boton-imprimir"],
            "🖨️ Guardar / imprimir comprobante"
        );

    imprimir.id =
        "botonImprimirComprobante";

    imprimir.type =
        "button";

    const cerrarPie =
        crearElemento(
            "button",
            ["voucher-boton-cerrar"],
            "Cerrar"
        );

    cerrarPie.type =
        "button";

    cerrarPie.setAttribute(
        "data-bs-dismiss",
        "modal"
    );

    pie.append(
        imprimir,
        cerrarPie
    );

    contenido.append(
        cabecera,
        cuerpo,
        pie
    );

    dialogo.appendChild(
        contenido
    );

    modal.appendChild(
        dialogo
    );

    document.body.appendChild(
        modal
    );
}

function crearDatoVoucher(
    etiqueta,
    valor,
    claseValor = ""
) {
    const bloque =
        crearElemento(
            "div",
            ["voucher-dato"]
        );

    const nombre =
        crearElemento(
            "span",
            ["voucher-dato-etiqueta"],
            etiqueta
        );

    const contenido =
        crearElemento(
            "strong",
            claseValor
                ? [claseValor]
                : [],
            valor
        );

    bloque.append(
        nombre,
        contenido
    );

    return bloque;
}

function renderizarVoucher(compra) {
    const voucher =
        document.getElementById(
            "voucherContenido"
        );

    if (!voucher) {
        return;
    }

    voucher.replaceChildren();

    const cabecera =
        crearElemento(
            "div",
            ["voucher-cabecera"]
        );

    const identidad =
        crearElemento(
            "div",
            ["voucher-identidad"]
        );

    const kicker =
        crearElemento(
            "p",
            ["voucher-kicker"],
            "COMPRA CONFIRMADA"
        );

    const marca =
        crearElemento(
            "h3",
            ["voucher-marca"],
            "NatGamez"
        );

    const mensaje =
        crearElemento(
            "p",
            ["voucher-mensaje"],
            "Gracias por comprar en NatGamez. Tu selección quedó registrada correctamente."
        );

    identidad.append(
        kicker,
        marca,
        mensaje
    );

    const logo =
        crearElemento(
            "img",
            ["voucher-logo"]
        );

    logo.src =
        RUTA_LOGO_NATGAMEZ;

    logo.alt =
        "Logo de NatGamez";

    cabecera.append(
        identidad,
        logo
    );

    const datos =
        crearElemento(
            "div",
            ["voucher-datos"]
        );

    datos.append(
        crearDatoVoucher(
            "Folio",
            compra.folio
        ),
        crearDatoVoucher(
            "Fecha",
            compra.fecha
        ),
        crearDatoVoucher(
            "Estado",
            "Confirmado",
            "voucher-estado-confirmado"
        ),
        crearDatoVoucher(
            "Método de pago",
            "Pago digital · Demo"
        ),
        crearDatoVoucher(
            "Entrega",
            "Descarga inmediata"
        ),
        crearDatoVoucher(
            "Unidades",
            String(
                compra.cantidadTotal
            )
        )
    );

    const tablaContenedor =
        crearElemento(
            "div",
            ["voucher-tabla-contenedor"]
        );

    const tabla =
        crearElemento(
            "table",
            ["voucher-tabla"]
        );

    const thead =
        crearElemento(
            "thead"
        );

    const filaCabecera =
        crearElemento(
            "tr"
        );

    [
        "Producto",
        "Cant.",
        "Precio",
        "Subtotal"
    ].forEach(
        (texto) => {
            filaCabecera.appendChild(
                crearElemento(
                    "th",
                    [],
                    texto
                )
            );
        }
    );

    thead.appendChild(
        filaCabecera
    );

    const tbody =
        crearElemento(
            "tbody"
        );

    compra.items.forEach(
        (item) => {
            const fila =
                crearElemento(
                    "tr"
                );

            const producto =
                crearElemento(
                    "td",
                    ["voucher-producto"]
                );

            const productoContenido =
                crearElemento(
                    "div",
                    ["voucher-producto-contenido"]
                );

            const imagen =
                crearElemento(
                    "img",
                    ["voucher-producto-imagen"]
                );

            imagen.src =
                item.imagen;

            imagen.alt =
                item.alt;

            imagen.addEventListener(
                "error",
                () => {
                    aplicarFallbackImagen(
                        imagen,
                        item.titulo
                    );
                },
                {
                    once: true
                }
            );

            const textos =
                crearElemento(
                    "div"
                );

            const nombre =
                crearElemento(
                    "strong",
                    ["voucher-producto-nombre"],
                    item.titulo
                );

            const genero =
                crearElemento(
                    "span",
                    ["voucher-producto-genero"],
                    item.genero
                );

            textos.append(
                nombre,
                genero
            );

            productoContenido.append(
                imagen,
                textos
            );

            producto.appendChild(
                productoContenido
            );

            fila.append(
                producto,
                crearElemento(
                    "td",
                    [],
                    String(item.cantidad)
                ),
                crearElemento(
                    "td",
                    [],
                    formatearPrecioCLP(
                        item.precio
                    )
                ),
                crearElemento(
                    "td",
                    ["voucher-subtotal"],
                    formatearPrecioCLP(
                        item.subtotal
                    )
                )
            );

            tbody.appendChild(
                fila
            );
        }
    );

    tabla.append(
        thead,
        tbody
    );

    tablaContenedor.appendChild(
        tabla
    );

    const resumen =
        crearElemento(
            "div",
            ["voucher-resumen"]
        );

    const resumenTexto =
        crearElemento(
            "div",
            ["voucher-resumen-texto"]
        );

    resumenTexto.append(
        crearElemento(
            "span",
            [],
            `${compra.items.length} producto${compra.items.length === 1 ? "" : "s"} distinto${compra.items.length === 1 ? "" : "s"}`
        ),
        crearElemento(
            "small",
            [],
            `${compra.cantidadTotal} unidad${compra.cantidadTotal === 1 ? "" : "es"} en total`
        )
    );

    const total =
        crearElemento(
            "div",
            ["voucher-total"]
        );

    total.append(
        crearElemento(
            "span",
            [],
            "Total pagado"
        ),
        crearElemento(
            "strong",
            [],
            formatearPrecioCLP(
                compra.total
            )
        )
    );

    resumen.append(
        resumenTexto,
        total
    );

    const pie =
        crearElemento(
            "div",
            ["voucher-pie"]
        );

    const gracias =
        crearElemento(
            "strong",
            [],
            "Gracias por elegir NatGamez 🎮"
        );

    const aviso =
        crearElemento(
            "p",
            [],
            "Este comprobante corresponde a una compra simulada con fines académicos. No representa una transacción comercial real."
        );

    pie.append(
        gracias,
        aviso
    );

    voucher.append(
        cabecera,
        datos,
        tablaContenedor,
        resumen,
        pie
    );
}

function mostrarVoucher(compra) {
    crearModalVoucher();
    renderizarVoucher(
        compra
    );

    const modal =
        document.getElementById(
            "modalVoucherNatGamez"
        );

    const bootstrapUI =
        obtenerBootstrap();

    if (
        !modal ||
        !bootstrapUI
    ) {
        return;
    }

    bootstrapUI.Modal
        .getOrCreateInstance(
            modal
        )
        .show();
}

function finalizarCompra() {
    if (
        carrito.size === 0
    ) {
        mostrarEstadoCarrito(
            "Agrega al menos un videojuego antes de comprar.",
            "error"
        );

        return;
    }

    const compra =
        {
            folio:
                generarFolioVoucher(),
            fecha:
                obtenerFechaVoucher(),
            items:
                obtenerDetalleCompra(),
            cantidadTotal:
                obtenerCantidadTotalCarrito(),
            total:
                calcularTotalCarrito()
        };

    ultimaCompra = compra;

    const offcanvas =
        document.getElementById(
            "carritoOffcanvas"
        );

    const abrirVoucher =
        () => {
            mostrarVoucher(
                compra
            );
        };

    carrito.clear();
    renderizarCarrito();

    const bootstrapUI =
        obtenerBootstrap();

    if (
        offcanvas &&
        bootstrapUI
    ) {
        const instancia =
            bootstrapUI.Offcanvas
                .getOrCreateInstance(
                    offcanvas
                );

        offcanvas.addEventListener(
            "hidden.bs.offcanvas",
            abrirVoucher,
            {
                once: true
            }
        );

        instancia.hide();
        return;
    }

    abrirVoucher();
}

function escaparHTML(valor) {
    return String(
        valor ?? ""
    )
        .replaceAll(
            "&",
            "&amp;"
        )
        .replaceAll(
            "<",
            "&lt;"
        )
        .replaceAll(
            ">",
            "&gt;"
        )
        .replaceAll(
            '"',
            "&quot;"
        )
        .replaceAll(
            "'",
            "&#039;"
        );
}

function resolverURLAbsoluta(ruta) {
    try {
        return new URL(
            ruta,
            window.location.href
        ).href;
    } catch {
        return ruta;
    }
}

function crearDocumentoComprobante(compra) {
    const logo =
        resolverURLAbsoluta(
            RUTA_LOGO_NATGAMEZ
        );

    const filas =
        compra.items
            .map(
                (item) => `
                    <tr>
                        <td class="producto">
                            <img
                                src="${escaparHTML(
                                    resolverURLAbsoluta(
                                        item.imagen
                                    )
                                )}"
                                alt=""
                            >
                            <div>
                                <strong>${escaparHTML(item.titulo)}</strong>
                                <span>${escaparHTML(item.genero)}</span>
                            </div>
                        </td>
                        <td class="centro">
                            ${escaparHTML(item.cantidad)}
                        </td>
                        <td class="numero">
                            ${escaparHTML(
                                formatearPrecioCLP(
                                    item.precio
                                )
                            )}
                        </td>
                        <td class="numero subtotal">
                            ${escaparHTML(
                                formatearPrecioCLP(
                                    item.subtotal
                                )
                            )}
                        </td>
                    </tr>
                `
            )
            .join("");

    return `<!doctype html>
<html lang="es">
<head>
    <meta charset="utf-8">
    <title>Comprobante_NatGamez_${escaparHTML(compra.folio)}</title>

    <style>
        @page {
            size: A4;
            margin: 0;
        }

        * {
            box-sizing: border-box;
        }

        html,
        body {
            margin: 0;
            padding: 0;

            background: #ffffff;

            color: #111827;

            font-family:
                Arial,
                Helvetica,
                sans-serif;

            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
        }

        body {
            padding: 12mm;
        }

        .comprobante {
            width: 100%;

            margin: 0 auto;

            border: 1px solid #d9dde7;
            border-radius: 14px;

            overflow: hidden;

            background: #ffffff;
        }

        .barra {
            height: 5px;

            background:
                linear-gradient(
                    90deg,
                    #8b5cf6,
                    #3b82f6,
                    #22c55e
                );
        }

        .contenido {
            padding: 22px 24px 20px;
        }

        .cabecera {
            display: flex;
            align-items: flex-start;
            justify-content: space-between;

            gap: 24px;

            padding-bottom: 18px;

            border-bottom: 1px solid #e5e7eb;
        }

        .kicker {
            margin: 0 0 7px;

            color: #15803d;

            font-size: 11px;
            font-weight: 800;
            letter-spacing: 1.4px;
        }

        h1 {
            margin: 0 0 7px;

            color: #111827;

            font-size: 29px;
            line-height: 1.05;
        }

        .subtitulo {
            max-width: 510px;

            margin: 0;

            color: #6b7280;

            font-size: 12px;
            line-height: 1.5;
        }

        .logo {
            flex: 0 0 auto;

            width: 82px;
            height: 82px;

            object-fit: contain;

            padding: 5px;

            background: #0b0b10;

            border: 1px solid #d1d5db;
            border-radius: 12px;
        }

        .datos {
            display: grid;
            grid-template-columns:
                repeat(
                    3,
                    minmax(0, 1fr)
                );

            gap: 9px;

            margin: 18px 0;
        }

        .dato {
            padding: 10px 11px;

            background: #f7f8fb;

            border: 1px solid #e5e7eb;
            border-radius: 9px;
        }

        .dato span {
            display: block;

            margin-bottom: 4px;

            color: #6b7280;

            font-size: 9px;
            font-weight: 800;
            letter-spacing: 0.7px;
            text-transform: uppercase;
        }

        .dato strong {
            display: block;

            color: #111827;

            font-size: 11px;
            line-height: 1.3;

            overflow-wrap: anywhere;
        }

        .dato .confirmado {
            color: #15803d;
        }

        .tabla-contenedor {
            overflow: hidden;

            border: 1px solid #dfe3ea;
            border-radius: 10px;
        }

        table {
            width: 100%;

            border-collapse: collapse;

            table-layout: fixed;
        }

        thead {
            display: table-header-group;
        }

        thead th {
            padding: 10px;

            color: #4b5563;

            background: #f2f3f7;

            border-bottom: 1px solid #dfe3ea;

            font-size: 9px;
            font-weight: 800;
            letter-spacing: 0.55px;
            text-align: left;
            text-transform: uppercase;
        }

        thead th:nth-child(1) {
            width: 55%;
        }

        thead th:nth-child(2) {
            width: 9%;
        }

        thead th:nth-child(3),
        thead th:nth-child(4) {
            width: 18%;
        }

        tbody tr {
            break-inside: avoid;
            page-break-inside: avoid;
        }

        tbody td {
            padding: 9px 10px;

            border-bottom: 1px solid #eceef2;

            color: #374151;

            font-size: 10.5px;
            vertical-align: middle;
        }

        tbody tr:last-child td {
            border-bottom: 0;
        }

        .producto {
            display: flex;
            align-items: center;

            gap: 10px;
        }

        .producto img {
            flex: 0 0 auto;

            width: 42px;
            height: 42px;

            object-fit: contain;

            background: #0f1118;

            border: 1px solid #e5e7eb;
            border-radius: 7px;
        }

        .producto strong {
            display: block;

            margin-bottom: 3px;

            color: #111827;

            font-size: 10.5px;
            line-height: 1.25;
        }

        .producto span {
            display: block;

            color: #6b7280;

            font-size: 8.8px;
            line-height: 1.25;
        }

        .centro {
            text-align: center;
        }

        .numero {
            text-align: right;
            white-space: nowrap;
        }

        .subtotal {
            color: #15803d;

            font-weight: 800;
        }

        .resumen {
            display: flex;
            align-items: flex-end;
            justify-content: space-between;

            gap: 24px;

            margin-top: 16px;
            padding-top: 14px;

            border-top: 1px dashed #cfd4dc;
        }

        .cantidad {
            color: #4b5563;

            font-size: 10px;
            line-height: 1.5;
        }

        .cantidad strong {
            display: block;

            color: #111827;

            font-size: 11px;
        }

        .total {
            text-align: right;
        }

        .total span {
            display: block;

            margin-bottom: 2px;

            color: #6b7280;

            font-size: 9px;
            font-weight: 800;
            letter-spacing: 0.7px;
            text-transform: uppercase;
        }

        .total strong {
            color: #15803d;

            font-size: 24px;
            line-height: 1;
        }

        .pie {
            margin-top: 16px;
            padding: 12px 14px;

            background: #f7f8fb;

            border: 1px solid #e5e7eb;
            border-radius: 9px;
        }

        .pie strong {
            display: block;

            margin-bottom: 4px;

            color: #111827;

            font-size: 10.5px;
        }

        .pie p {
            margin: 0;

            color: #6b7280;

            font-size: 8.8px;
            line-height: 1.45;
        }

        .pie .academico {
            margin-top: 3px;

            color: #7c3aed;
        }

        @media print {
            body {
                padding: 12mm;
            }

            .comprobante,
            .dato,
            .tabla-contenedor,
            .pie,
            tbody tr {
                break-inside: avoid;
                page-break-inside: avoid;
            }
        }
    </style>
</head>

<body>
    <main class="comprobante">
        <div class="barra"></div>

        <div class="contenido">
            <header class="cabecera">
                <div>
                    <p class="kicker">
                        COMPRA CONFIRMADA
                    </p>

                    <h1>
                        Comprobante de compra
                    </h1>

                    <p class="subtitulo">
                        Gracias por comprar en NatGamez.
                        A continuación encontrarás el detalle
                        ordenado de tu compra.
                    </p>
                </div>

                <img
                    class="logo"
                    src="${escaparHTML(logo)}"
                    alt="Logo NatGamez"
                >
            </header>

            <section class="datos">
                <div class="dato">
                    <span>Folio</span>
                    <strong>${escaparHTML(compra.folio)}</strong>
                </div>

                <div class="dato">
                    <span>Fecha</span>
                    <strong>${escaparHTML(compra.fecha)}</strong>
                </div>

                <div class="dato">
                    <span>Estado</span>
                    <strong class="confirmado">Confirmado</strong>
                </div>

                <div class="dato">
                    <span>Método de pago</span>
                    <strong>Pago digital · Demo</strong>
                </div>

                <div class="dato">
                    <span>Entrega</span>
                    <strong>Descarga inmediata</strong>
                </div>

                <div class="dato">
                    <span>Unidades</span>
                    <strong>${escaparHTML(compra.cantidadTotal)}</strong>
                </div>
            </section>

            <section class="tabla-contenedor">
                <table>
                    <thead>
                        <tr>
                            <th>Producto</th>
                            <th class="centro">Cant.</th>
                            <th class="numero">Precio</th>
                            <th class="numero">Subtotal</th>
                        </tr>
                    </thead>

                    <tbody>
                        ${filas}
                    </tbody>
                </table>
            </section>

            <section class="resumen">
                <div class="cantidad">
                    <strong>
                        ${escaparHTML(compra.items.length)}
                        producto${compra.items.length === 1 ? "" : "s"}
                        distinto${compra.items.length === 1 ? "" : "s"}
                    </strong>

                    ${escaparHTML(compra.cantidadTotal)}
                    unidad${compra.cantidadTotal === 1 ? "" : "es"}
                    en total
                </div>

                <div class="total">
                    <span>Total pagado</span>

                    <strong>
                        ${escaparHTML(
                            formatearPrecioCLP(
                                compra.total
                            )
                        )}
                    </strong>
                </div>
            </section>

            <footer class="pie">
                <strong>
                    Gracias por elegir NatGamez 🎮
                </strong>

                <p>
                    Conserva este comprobante como resumen de tu compra.
                </p>

                <p class="academico">
                    Compra simulada con fines académicos.
                    No representa una transacción comercial real.
                </p>
            </footer>
        </div>
    </main>
</body>
</html>`;
}

function esperarImagenesDocumento(documento) {
    const imagenes =
        Array.from(
            documento.images
        );

    return Promise.all(
        imagenes.map(
            (imagen) => {
                if (
                    imagen.complete
                ) {
                    return Promise.resolve();
                }

                return new Promise(
                    (resolver) => {
                        imagen.addEventListener(
                            "load",
                            resolver,
                            {
                                once: true
                            }
                        );

                        imagen.addEventListener(
                            "error",
                            resolver,
                            {
                                once: true
                            }
                        );
                    }
                );
            }
        )
    );
}

async function imprimirComprobante() {
    if (!ultimaCompra) {
        console.warn(
            "No existe una compra confirmada para imprimir."
        );
        return;
    }

    const html =
        crearDocumentoComprobante(
            ultimaCompra
        );

    const archivoTemporal =
        new Blob(
            [html],
            {
                type: "text/html;charset=utf-8"
            }
        );

    const urlTemporal =
        URL.createObjectURL(
            archivoTemporal
        );

    const ventana =
        window.open(
            urlTemporal,
            "_blank",
            "width=960,height=850"
        );

    if (!ventana) {
        URL.revokeObjectURL(
            urlTemporal
        );

        alert(
            "El navegador bloqueó la ventana del comprobante. Permite ventanas emergentes para NatGamez y vuelve a intentarlo."
        );
        return;
    }

    await new Promise(
        (resolver) => {
            if (ventana.document.readyState === "complete") {
                resolver();
                return;
            }

            ventana.addEventListener(
                "load",
                resolver,
                { once: true }
            );
        }
    );

    await esperarImagenesDocumento(
        ventana.document
    );

    const liberarDocumentoTemporal =
        () => {
            URL.revokeObjectURL(
                urlTemporal
            );
        };

    ventana.addEventListener(
        "afterprint",
        () => {
            liberarDocumentoTemporal();
            ventana.close();
        },
        { once: true }
    );

    ventana.addEventListener(
        "beforeunload",
        liberarDocumentoTemporal,
        { once: true }
    );

    ventana.focus();

    window.setTimeout(
        () => {
            ventana.print();
        },
        RETARDO_IMPRESION_MS
    );
}

function admiteHoverReal() {
    return window.matchMedia(
        MEDIA_HOVER_REAL
    ).matches;
}

function activarHoverBotonCarrito(boton) {
    boton?.classList.add(
        "is-hover"
    );
}

function desactivarHoverBotonCarrito(boton) {
    boton?.classList.remove(
        "is-hover"
    );
}

function manejarMouseOverCarrito(event) {
    if (!admiteHoverReal()) {
        return;
    }

    const botonCard =
        event.target.closest(
            ".btn-agregar-carrito"
        );

    if (botonCard) {
        activarHoverBotonCarrito(
            botonCard
        );
    }

    const botonComprar =
        event.target.closest(
            "#botonComprarNav, #botonComprarMovil"
        );

    if (botonComprar) {
        botonComprar.classList.add(
            "is-hover"
        );
    }
}

function manejarMouseOutCarrito(event) {
    if (!admiteHoverReal()) {
        return;
    }

    const botonCard =
        event.target.closest(
            ".btn-agregar-carrito"
        );

    if (
        botonCard &&
        !botonCard.contains(
            event.relatedTarget
        )
    ) {
        desactivarHoverBotonCarrito(
            botonCard
        );
    }

    const botonComprar =
        event.target.closest(
            "#botonComprarNav, #botonComprarMovil"
        );

    if (
        botonComprar &&
        !botonComprar.contains(
            event.relatedTarget
        )
    ) {
        botonComprar.classList.remove(
            "is-hover"
        );
    }
}

function manejarFocoCarrito(event) {
    /*
     * En touch, un toque también puede entregar foco al botón y dejar
     * pegada la clase is-hover. Por eso el comportamiento de foco que
     * imita mouseover se reserva a mouse/trackpad. En móvil/tablet el
     * feedback equivalente se gestiona con Pointer Events.
     */
    if (!admiteHoverReal()) {
        return;
    }

    const botonCard =
        event.target.closest(
            ".btn-agregar-carrito"
        );

    if (botonCard) {
        activarHoverBotonCarrito(
            botonCard
        );
    }

    const botonComprar =
        event.target.closest(
            "#botonComprarNav, #botonComprarMovil"
        );

    if (botonComprar) {
        botonComprar.classList.add(
            "is-hover"
        );
    }
}

function manejarDesenfoqueCarrito(event) {
    if (!admiteHoverReal()) {
        return;
    }

    const botonCard =
        event.target.closest(
            ".btn-agregar-carrito"
        );

    if (botonCard) {
        desactivarHoverBotonCarrito(
            botonCard
        );
    }

    const botonComprar =
        event.target.closest(
            "#botonComprarNav, #botonComprarMovil"
        );

    if (botonComprar) {
        botonComprar.classList.remove(
            "is-hover"
        );
    }
}

/*
 * Equivalente táctil del mouseover/mouseout.
 * Un teléfono no puede hacer hover real, así que usamos Pointer Events
 * para entregar el mismo feedback visual mientras el usuario toca.
 */
function obtenerControlTactilCarrito(event) {
    return event.target.closest(
        ".btn-agregar-carrito, #botonComprarNav, #botonComprarMovil, .carrito-comprar-ahora"
    );
}

function manejarPointerDownCarrito(event) {
    if (event.pointerType === "mouse") {
        return;
    }

    const control =
        obtenerControlTactilCarrito(
            event
        );

    if (!control) {
        return;
    }

    const temporizadorAnterior =
        temporizadoresFeedbackTouch.get(
            control
        );

    if (temporizadorAnterior) {
        window.clearTimeout(
            temporizadorAnterior
        );
        temporizadoresFeedbackTouch.delete(
            control
        );
    }

    if (
        typeof control.setPointerCapture === "function" &&
        event.pointerId !== undefined
    ) {
        try {
            control.setPointerCapture(
                event.pointerId
            );
        } catch {
            // Algunos navegadores pueden rechazar capture en gestos ya finalizados.
        }
    }

    control.classList.add(
        "is-touching"
    );

    if (
        control.matches(
            ".btn-agregar-carrito, #botonComprarNav, #botonComprarMovil"
        )
    ) {
        control.classList.add(
            "is-hover"
        );
    }
}

function manejarPointerFinCarrito(event) {
    if (event.pointerType === "mouse") {
        return;
    }

    const control =
        obtenerControlTactilCarrito(
            event
        );

    if (!control) {
        return;
    }

    control.classList.remove(
        "is-touching"
    );

    const temporizadorAnterior =
        temporizadoresFeedbackTouch.get(
            control
        );

    if (temporizadorAnterior) {
        window.clearTimeout(
            temporizadorAnterior
        );
    }

    const temporizador =
        window.setTimeout(
            () => {
                control.classList.remove(
                    "is-hover"
                );

                temporizadoresFeedbackTouch.delete(
                    control
                );
            },
            DURACION_FEEDBACK_TOUCH_MS
        );

    temporizadoresFeedbackTouch.set(
        control,
        temporizador
    );
}

function manejarClickCarrito(event) {
    const botonAgregar =
        event.target.closest(
            ".btn-agregar-carrito"
        );

    if (botonAgregar) {
        agregarProductoAlCarrito(
            botonAgregar.dataset.productoId
        );
        return;
    }

    const botonSumar =
        event.target.closest(
            ".btn-carrito-sumar"
        );

    if (botonSumar) {
        cambiarCantidadCarrito(
            botonSumar.dataset.productoId,
            1
        );
        return;
    }

    const botonRestar =
        event.target.closest(
            ".btn-carrito-restar"
        );

    if (botonRestar) {
        cambiarCantidadCarrito(
            botonRestar.dataset.productoId,
            -1
        );
        return;
    }

    const botonEliminar =
        event.target.closest(
            ".btn-carrito-eliminar"
        );

    if (botonEliminar) {
        eliminarProductoDelCarrito(
            botonEliminar.dataset.productoId
        );
        return;
    }

    const botonComprarAhora =
        event.target.closest(
            "#botonComprarAhora"
        );

    if (botonComprarAhora) {
        finalizarCompra();
        return;
    }

    const botonVaciar =
        event.target.closest(
            "#botonVaciarCarrito"
        );

    if (botonVaciar) {
        vaciarCarrito();
        return;
    }

    const botonImprimir =
        event.target.closest(
            "#botonImprimirComprobante"
        );

    if (botonImprimir) {
        void imprimirComprobante();
    }
}

function configurarEventosCarrito() {
    if (
        document.body.dataset
            .eventosCarritoConfigurados ===
        "true"
    ) {
        return;
    }

    document.body.addEventListener(
        "click",
        manejarClickCarrito
    );

    document.body.addEventListener(
        "mouseover",
        manejarMouseOverCarrito
    );

    document.body.addEventListener(
        "mouseout",
        manejarMouseOutCarrito
    );

    document.body.addEventListener(
        "focusin",
        manejarFocoCarrito
    );

    document.body.addEventListener(
        "focusout",
        manejarDesenfoqueCarrito
    );

    document.body.addEventListener(
        "pointerdown",
        manejarPointerDownCarrito
    );

    document.body.addEventListener(
        "pointerup",
        manejarPointerFinCarrito
    );

    document.body.addEventListener(
        "pointercancel",
        manejarPointerFinCarrito
    );

    document.body.dataset
        .eventosCarritoConfigurados =
        "true";
}

// ======================================================
// RECOMENDADOR
// ======================================================

function ocultarEjemplosRecomendaciones() {
    const grid =
        document.getElementById(
            "recomendacionesGrid"
        );

    const exploracion =
        document.getElementById(
            "estadoExploracion"
        );

    const estado =
        document.getElementById(
            "estadoRecomendaciones"
        );

    if (grid) {
        grid.replaceChildren();

        grid.classList.add(
            "d-none"
        );
    }

    exploracion?.classList.add(
        "d-none"
    );

    if (estado) {
        estado.textContent =
            "";

        estado.classList.add(
            "d-none"
        );
    }
}

function obtenerProductosCompatibles(
    plataforma
) {
    return productosCargados.filter(
        (producto) =>
            producto.plataformas.includes(
                plataforma
            )
    );
}

function elegirProductoAleatorio(
    productos
) {
    return productos[
        Math.floor(
            Math.random() *
            productos.length
        )
    ];
}

function establecerControlesRecomendacion(
    habilitados
) {
    const botonRecomendar =
        /** @type {HTMLButtonElement | null} */ (
            document.getElementById(
                "botonRecomendar"
            )
        );

    const botonSorpresa =
        /** @type {HTMLButtonElement | null} */ (
            document.getElementById(
                "botonSorpresa"
            )
        );

    if (botonRecomendar) {
        botonRecomendar.disabled =
            !habilitados;
    }

    if (botonSorpresa) {
        botonSorpresa.disabled =
            !habilitados;
    }
}

function mostrarBotonReintentar(
    visible
) {
    document
        .getElementById(
            "botonReintentarCarga"
        )
        ?.classList.toggle(
            "d-none",
            !visible
        );
}

function mostrarResultadoRecomendacion(
    mensaje,
    tipo = "normal"
) {
    const resultado =
        document.getElementById(
            "resultadoRecomendacion"
        );

    if (!resultado) {
        return;
    }

    resultado.textContent =
        mensaje;

    resultado.classList.remove(
        "text-secondary",
        "text-success",
        "text-danger"
    );

    if (tipo === "exito") {
        resultado.classList.add(
            "text-success"
        );

        return;
    }

    if (tipo === "error") {
        resultado.classList.add(
            "text-danger"
        );

        return;
    }

    resultado.classList.add(
        "text-secondary"
    );
}

function marcarCampoInvalido(
    campo,
    feedback,
    mensaje
) {
    campo.classList.add(
        "is-invalid"
    );

    campo.classList.remove(
        "is-valid"
    );

    campo.setAttribute(
        "aria-invalid",
        "true"
    );

    if (feedback) {
        feedback.textContent =
            mensaje;
    }
}

function limpiarEstadoCampo(
    campo,
    marcarValido = false
) {
    campo.classList.remove(
        "is-invalid"
    );

    campo.removeAttribute(
        "aria-invalid"
    );

    campo.classList.toggle(
        "is-valid",
        marcarValido
    );
}

function nombreEsValido(nombre) {
    return (
        nombre.length >= 2 &&
        nombre.length <= 30 &&
        /\p{L}/u.test(nombre)
    );
}

function validarFormularioRecomendacion() {
    const nombreInput =
        /** @type {HTMLInputElement | null} */ (
            document.getElementById(
                "nombreJugador"
            )
        );

    const plataformaSelect =
        /** @type {HTMLSelectElement | null} */ (
            document.getElementById(
                "plataformaPreferida"
            )
        );

    const errorNombre =
        document.getElementById(
            "errorNombreJugador"
        );

    const errorPlataforma =
        document.getElementById(
            "errorPlataformaPreferida"
        );

    if (
        !nombreInput ||
        !plataformaSelect
    ) {
        return {
            valido: false,
            nombre: "",
            plataforma: ""
        };
    }

    const nombre =
        nombreInput.value
            .trim()
            .replace(
                /\s+/g,
                " "
            );

    const plataforma =
        plataformaSelect.value;

    let valido =
        true;

    if (
        !nombreEsValido(
            nombre
        )
    ) {
        marcarCampoInvalido(
            nombreInput,
            errorNombre,
            "Escribe un nombre de 2 a 30 caracteres que contenga al menos una letra."
        );

        valido =
            false;
    } else {
        nombreInput.value =
            nombre;

        limpiarEstadoCampo(
            nombreInput,
            true
        );
    }

    if (
        !PLATAFORMAS_PERMITIDAS.has(
            plataforma
        )
    ) {
        marcarCampoInvalido(
            plataformaSelect,
            errorPlataforma,
            "Selecciona una plataforma válida."
        );

        valido =
            false;
    } else {
        limpiarEstadoCampo(
            plataformaSelect,
            true
        );
    }

    return {
        valido,
        nombre,
        plataforma
    };
}

function manejarSubmitRecomendacion(
    event
) {
    event.preventDefault();

    const validacion =
        validarFormularioRecomendacion();

    if (
        !validacion.valido
    ) {
        mostrarResultadoRecomendacion(
            "Revisa los campos marcados antes de continuar.",
            "error"
        );

        return;
    }

    const compatibles =
        obtenerProductosCompatibles(
            validacion.plataforma
        );

    if (
        compatibles.length === 0
    ) {
        mostrarResultadoRecomendacion(
            `No encontramos juegos disponibles para ${validacion.plataforma}.`,
            "error"
        );

        return;
    }

    const producto =
        elegirProductoAleatorio(
            compatibles
        );

    mostrarResultadoRecomendacion(
        `${validacion.nombre}, para ${validacion.plataforma} te recomendamos ${producto.titulo}.`,
        "exito"
    );
}

function manejarClickSorpresa() {
    const plataformaSelect =
        /** @type {HTMLSelectElement | null} */ (
            document.getElementById(
                "plataformaPreferida"
            )
        );

    const errorPlataforma =
        document.getElementById(
            "errorPlataformaPreferida"
        );

    if (!plataformaSelect) {
        return;
    }

    const plataforma =
        plataformaSelect.value;

    if (
        !PLATAFORMAS_PERMITIDAS.has(
            plataforma
        )
    ) {
        marcarCampoInvalido(
            plataformaSelect,
            errorPlataforma,
            "Selecciona una plataforma antes de usar Sorpréndeme."
        );

        mostrarResultadoRecomendacion(
            "Selecciona una plataforma para obtener una sorpresa compatible.",
            "error"
        );

        plataformaSelect.focus();

        return;
    }

    limpiarEstadoCampo(
        plataformaSelect,
        true
    );

    const compatibles =
        obtenerProductosCompatibles(
            plataforma
        );

    if (
        compatibles.length === 0
    ) {
        mostrarResultadoRecomendacion(
            `No encontramos juegos disponibles para ${plataforma}.`,
            "error"
        );

        return;
    }

    const producto =
        elegirProductoAleatorio(
            compatibles
        );

    mostrarResultadoRecomendacion(
        `La ruleta NatGamez eligió para ${plataforma}: ${producto.titulo}.`,
        "exito"
    );
}

function manejarCorreccionCampo(
    event
) {
    limpiarEstadoCampo(
        event.target
    );

    mostrarResultadoRecomendacion(
        "Tu recomendación aparecerá aquí."
    );
}

function manejarClickReintentar() {
    void cargarCatalogoMaestro();
}

function configurarEventosRecomendaciones() {
    document
        .getElementById(
            "formRecomendacion"
        )
        ?.addEventListener(
            "submit",
            manejarSubmitRecomendacion
        );

    document
        .getElementById(
            "botonSorpresa"
        )
        ?.addEventListener(
            "click",
            manejarClickSorpresa
        );

    document
        .getElementById(
            "botonReintentarCarga"
        )
        ?.addEventListener(
            "click",
            manejarClickReintentar
        );

    document
        .getElementById(
            "nombreJugador"
        )
        ?.addEventListener(
            "input",
            manejarCorreccionCampo
        );

    document
        .getElementById(
            "plataformaPreferida"
        )
        ?.addEventListener(
            "change",
            manejarCorreccionCampo
        );
}

// ======================================================
// FETCH API
// ======================================================

async function cargarCatalogoMaestro() {
    productosCargados = [];

    establecerControlesRecomendacion(
        false
    );

    mostrarBotonReintentar(
        false
    );

    try {
        const respuesta =
            await fetch(
                RUTA_PRODUCTOS,
                {
                    cache:
                        "no-store"
                }
            );

        if (
            !respuesta.ok
        ) {
            throw new Error(
                `No fue posible cargar el catálogo. HTTP ${respuesta.status}.`
            );
        }

        const productos =
            await respuesta.json();

        if (
            !Array.isArray(
                productos
            ) ||
            productos.length === 0
        ) {
            throw new Error(
                "productos.json está vacío o no contiene una lista válida."
            );
        }

        if (
            !productos.every(
                esProductoValido
            )
        ) {
            throw new Error(
                "Uno o más productos contienen información inválida."
            );
        }

        if (
            !tienenIdsUnicos(
                productos
            )
        ) {
            throw new Error(
                "Existen IDs duplicados dentro de productos.json."
            );
        }

        productosCargados =
            productos;

        renderizarCatalogo(
            productosCargados
        );

        crearBuscadorCatalogo();

        configurarEventosBusqueda();

        crearCarritoCatalogo();

        configurarTiendaCompleta();

        configurarEventosCarrito();

        ocultarEjemplosRecomendaciones();

        establecerControlesRecomendacion(
            true
        );

        console.info(
            `✅ Catálogo NatGamez cargado correctamente: ${productosCargados.length} productos.`
        );

        return true;
    } catch (error) {
        productosCargados =
            [];

        establecerControlesRecomendacion(
            false
        );

        mostrarBotonReintentar(
            true
        );

        mostrarResultadoRecomendacion(
            "El catálogo no está disponible hasta recuperar la carga.",
            "error"
        );

        console.error(
            "❌ Error al cargar productos.json:",
            error
        );

        return false;
    }
}

// ======================================================
// INICIALIZACIÓN
// ======================================================

function inicializarNatGamez() {
    configurarModalDetalle();

    configurarVault();

    configurarEventosRecomendaciones();

    establecerControlesRecomendacion(
        false
    );

    ocultarEjemplosRecomendaciones();

    void cargarCatalogoMaestro();
}

document.addEventListener(
    "DOMContentLoaded",
    inicializarNatGamez
);
