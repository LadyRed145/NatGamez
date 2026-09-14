"use strict";

const ESTA_EN_SEMANA_5 = /\/Semana(?:%20| )5\//.test(
    window.location.pathname
);

const RUTA_RECOMENDACIONES = ESTA_EN_SEMANA_5
    ? "juegos_recomendados.json"
    : "Semana 5/juegos_recomendados.json";

const RUTA_LOGO_NATGAMEZ = ESTA_EN_SEMANA_5
    ? "logo_natgamez.png"
    : "Semana 5/logo_natgamez.png";
const PLATAFORMAS_PERMITIDAS = new Set([
    "PC",
    "PS5",
    "PS4",
    "Xbox",
    "Switch"
]);

let recomendacionesCargadas = [];
let temporizadorResaltado = null;

/**
 * Configura el modal reutilizable de detalles de videojuegos.
 * Escucha el evento de Bootstrap que se dispara antes de mostrar el modal
 * y delega la actualización del contenido a una función independiente.
 */
function configurarModalDetalle() {
    const detalleJuegoModal = document.getElementById("detalleJuegoModal");

    if (!detalleJuegoModal) {
        return;
    }

    detalleJuegoModal.addEventListener("show.bs.modal", actualizarDetalleModal);
}

/**
 * Actualiza dinámicamente el contenido del modal con la información
 * almacenada en los atributos data-* del botón seleccionado.
 *
 * @param {Event} event Evento generado por Bootstrap al abrir el modal.
 */
function actualizarDetalleModal(event) {
    const boton = event.relatedTarget;

    if (!boton) {
        return;
    }

    const titulo = document.getElementById("detalleJuegoTitulo");
    const genero = document.getElementById("detalleJuegoGenero");
    const descripcion = document.getElementById("detalleJuegoDescripcion");
    const plataformas = document.getElementById("detalleJuegoPlataformas");
    const modalidad = document.getElementById("detalleJuegoModalidad");
    const rating = document.getElementById("detalleJuegoRating");
    const estado = document.getElementById("detalleJuegoEstado");
    const precio = document.getElementById("detalleJuegoPrecio");
    const imagen = document.getElementById("detalleJuegoImagen");

    if (titulo) {
        titulo.textContent = boton.dataset.titulo ?? "";
    }

    if (genero) {
        genero.textContent = boton.dataset.genero ?? "";
    }

    if (descripcion) {
        descripcion.textContent = boton.dataset.descripcion ?? "";
    }

    if (plataformas) {
        plataformas.textContent = boton.dataset.plataformas ?? "";
    }

    if (modalidad) {
        modalidad.textContent = boton.dataset.modalidad ?? "";
    }

    if (rating) {
        rating.textContent = boton.dataset.rating ?? "";
    }

    if (estado) {
        estado.textContent = boton.dataset.estado ?? "";
    }

    if (precio) {
        precio.textContent = boton.dataset.precio ?? "";
    }

    if (imagen) {
        imagen.src = boton.dataset.imagen ?? RUTA_LOGO_NATGAMEZ;
        imagen.alt = boton.dataset.alt ?? "Detalle del videojuego seleccionado";
    }
}

/**
 * Configura Collector's Vault.
 * Mantiene actualizado el contador del carrusel y permite pausar o reanudar
 * la rotación automática mediante el botón existente.
 */
function configurarVault() {
    const vault = document.getElementById("vaultCarouselBootstrap");
    const contadorVault = document.getElementById("vaultContador");
    const botonPausaVault = document.getElementById("vaultPausa");

    if (!vault || !contadorVault || !botonPausaVault) {
        return;
    }

    if (typeof bootstrap === "undefined") {
        console.error(
            "Bootstrap no está disponible. No se puede inicializar Collector's Vault."
        );
        return;
    }

    const slidesVault = Array.from(vault.querySelectorAll(".carousel-item"));

    const instanciaVault = bootstrap.Carousel.getOrCreateInstance(vault, {
        interval: 3000,
        pause: false,
        touch: true,
        wrap: true
    });

    let vaultPausado = false;

    /**
     * Actualiza el contador visible del carrusel según la diapositiva activa.
     */
    function actualizarContadorVault() {
        const indiceActivo = slidesVault.findIndex((slide) =>
            slide.classList.contains("active")
        );

        const indiceSeguro = indiceActivo >= 0 ? indiceActivo : 0;
        const actual = String(indiceSeguro + 1).padStart(2, "0");
        const total = String(slidesVault.length).padStart(2, "0");

        contadorVault.textContent = `${actual} / ${total}`;
    }

    vault.addEventListener("slid.bs.carousel", actualizarContadorVault);

    botonPausaVault.addEventListener("click", () => {
        vaultPausado = !vaultPausado;

        if (vaultPausado) {
            instanciaVault.pause();
            botonPausaVault.textContent = "▶ Reproducir";
            botonPausaVault.setAttribute(
                "aria-label",
                "Reanudar rotación automática del carrusel"
            );
            botonPausaVault.setAttribute("aria-pressed", "true");
            return;
        }

        instanciaVault.cycle();
        botonPausaVault.textContent = "⏸ Pausar";
        botonPausaVault.setAttribute(
            "aria-label",
            "Pausar rotación automática del carrusel"
        );
        botonPausaVault.setAttribute("aria-pressed", "false");
    });

    actualizarContadorVault();
}

/**
 * Crea un elemento HTML reutilizable con clases y texto opcionales.
 *
 * @param {string} etiqueta Etiqueta HTML que se desea crear.
 * @param {string[]} clases Clases CSS que se añadirán al elemento.
 * @param {string} texto Texto visible que tendrá el elemento.
 * @returns {HTMLElement} Elemento HTML creado.
 */
function crearElemento(etiqueta, clases = [], texto = "") {
    const elemento = document.createElement(etiqueta);

    clases.forEach((clase) => {
        elemento.classList.add(clase);
    });

    if (texto) {
        elemento.textContent = texto;
    }

    return elemento;
}

/**
 * Comprueba que un objeto del JSON tenga la estructura mínima requerida.
 *
 * @param {Object} juego Objeto que representa un videojuego.
 * @returns {boolean} true cuando la estructura es válida.
 */
function esJuegoValido(juego) {
    if (!juego || typeof juego !== "object") {
        return false;
    }

    const camposTexto = [
        "titulo",
        "genero",
        "modalidad",
        "rating",
        "estado",
        "estadoClase",
        "precio",
        "imagen",
        "alt",
        "descripcion",
        "badge",
        "badgeClase"
    ];

    const textosValidos = camposTexto.every(
        (campo) => typeof juego[campo] === "string"
    );

    const plataformasValidas =
        Array.isArray(juego.plataformas) &&
        juego.plataformas.length > 0 &&
        juego.plataformas.every(
            (plataforma) =>
                typeof plataforma === "string" &&
                PLATAFORMAS_PERMITIDAS.has(plataforma)
        );

    return textosValidos && plataformasValidas;
}

/**
 * Crea los chips de plataformas de una recomendación.
 *
 * @param {string[]} plataformas Plataformas disponibles para el videojuego.
 * @returns {HTMLDivElement} Contenedor con los chips de plataformas.
 */
function crearPlataformas(plataformas) {
    const contenedor = crearElemento("div", ["plataformas-juego"]);
    contenedor.setAttribute("aria-label", "Plataformas disponibles");

    plataformas.forEach((plataforma) => {
        const chip = crearElemento(
            "span",
            ["badge", "plataforma-chip"],
            plataforma
        );

        contenedor.appendChild(chip);
    });

    return contenedor;
}

/**
 * Sustituye una imagen externa que no pudo cargarse por el logo local,
 * evitando que una URL rota deje una Card visualmente dañada.
 *
 * @param {HTMLImageElement} imagen Imagen que produjo el error.
 * @param {string} titulo Título del videojuego.
 */
function aplicarFallbackImagen(imagen, titulo) {
    imagen.src = RUTA_LOGO_NATGAMEZ;
    imagen.alt = `Imagen de respaldo de NatGamez para ${titulo}`;
}

/**
 * Crea una Card completa de recomendación utilizando DOM API.
 *
 * @param {Object} juego Datos de un videojuego obtenidos desde el JSON.
 * @returns {HTMLDivElement} Columna Bootstrap que contiene la Card creada.
 */
function crearTarjetaRecomendacion(juego) {
    const columna = crearElemento(
        "div",
        ["col-12", "col-md-6", "col-lg-4"]
    );

    const tarjeta = crearElemento(
        "article",
        ["card", "h-100", "catalog-card"]
    );

    if (juego.badgeClase === "badge-verde") {
        tarjeta.classList.add("recomendacion-borde-verde");
    } else if (juego.badgeClase === "badge-azul") {
        tarjeta.classList.add("recomendacion-borde-azul");
    } else {
        tarjeta.classList.add("recomendacion-borde-morado");
    }

    tarjeta.dataset.titulo = juego.titulo;
    tarjeta.dataset.genero = juego.genero;
    tarjeta.dataset.plataformas = juego.plataformas.join(" · ");

    const badge = crearElemento(
        "span",
        ["badge", "badge-producto"],
        juego.badge
    );

    if (juego.badgeClase) {
        badge.classList.add(juego.badgeClase);
    }

    const figura = crearElemento("figure");
    const imagen = crearElemento("img");

    imagen.src = juego.imagen;
    imagen.alt = juego.alt;
    imagen.loading = "lazy";

    imagen.addEventListener(
        "error",
        () => aplicarFallbackImagen(imagen, juego.titulo),
        { once: true }
    );

    figura.appendChild(imagen);

    const contenido = crearElemento(
        "div",
        ["card-body", "catalog-card-contenido"]
    );

    const genero = crearElemento(
        "p",
        ["producto-genero"],
        juego.genero
    );

    const titulo = crearElemento(
        "h3",
        ["card-title"],
        juego.titulo
    );

    const plataformas = crearPlataformas(juego.plataformas);

    const descripcion = crearElemento(
        "p",
        ["card-text"],
        juego.descripcion
    );

    const datosRapidos = crearElemento(
        "div",
        ["producto-datos-rapidos"]
    );

    const rating = crearElemento(
        "span",
        ["producto-rating"],
        juego.rating
    );

    rating.setAttribute(
        "aria-label",
        `Valoración NatGamez ${juego.rating.replace("★", "").trim()} de 5`
    );

    const modalidad = crearElemento(
        "span",
        ["producto-modalidad"],
        juego.modalidad
    );

    datosRapidos.appendChild(rating);
    datosRapidos.appendChild(modalidad);

    const meta = crearElemento("div", ["producto-meta"]);
    const precio = crearElemento("strong", [], juego.precio);

    const estado = crearElemento(
        "span",
        [juego.estadoClase],
        juego.estado
    );

    meta.appendChild(precio);
    meta.appendChild(estado);

    const boton = crearElemento(
        "button",
        ["btn", "btn-detalles-juego"],
        "Ver detalles"
    );

    boton.type = "button";
    boton.setAttribute("data-bs-toggle", "modal");
    boton.setAttribute("data-bs-target", "#detalleJuegoModal");

    boton.dataset.titulo = juego.titulo;
    boton.dataset.genero = juego.genero;
    boton.dataset.plataformas = juego.plataformas.join(" · ");
    boton.dataset.modalidad = juego.modalidad;
    boton.dataset.rating = juego.rating;
    boton.dataset.estado = juego.estado;
    boton.dataset.precio = juego.precio;
    boton.dataset.imagen = juego.imagen;
    boton.dataset.alt = juego.alt;
    boton.dataset.descripcion = juego.descripcion;

    contenido.appendChild(genero);
    contenido.appendChild(titulo);
    contenido.appendChild(plataformas);
    contenido.appendChild(descripcion);
    contenido.appendChild(datosRapidos);
    contenido.appendChild(meta);
    contenido.appendChild(boton);

    tarjeta.appendChild(badge);
    tarjeta.appendChild(figura);
    tarjeta.appendChild(contenido);

    columna.appendChild(tarjeta);

    return columna;
}

/**
 * Actualiza el mensaje del proceso de carga.
 *
 * @param {HTMLElement} elemento Elemento donde se mostrará el mensaje.
 * @param {string} mensaje Texto que verá el usuario.
 * @param {"normal"|"exito"|"error"} tipo Tipo visual del mensaje.
 */
function actualizarEstadoRecomendaciones(
    elemento,
    mensaje,
    tipo = "normal"
) {
    elemento.textContent = mensaje;

    elemento.classList.remove(
        "text-success",
        "text-danger"
    );

    if (tipo === "exito") {
        elemento.classList.add("text-success");
    }

    if (tipo === "error") {
        elemento.classList.add("text-danger");
    }
}

/**
 * Habilita o deshabilita los controles que dependen del JSON.
 *
 * @param {boolean} habilitados Estado que deben tomar los controles.
 */
function establecerControlesRecomendacion(habilitados) {
    const botonRecomendar = document.getElementById("botonRecomendar");
    const botonSorpresa = document.getElementById("botonSorpresa");

    if (botonRecomendar) {
        botonRecomendar.disabled = !habilitados;
    }

    if (botonSorpresa) {
        botonSorpresa.disabled = !habilitados;
    }
}

/**
 * Muestra u oculta el botón para volver a intentar la carga del JSON.
 *
 * @param {boolean} visible Indica si el botón debe mostrarse.
 */
function mostrarBotonReintentar(visible) {
    const boton = document.getElementById("botonReintentarCarga");

    if (!boton) {
        return;
    }

    boton.classList.toggle("d-none", !visible);
}

/**
 * Actualiza el mensaje de la zona interactiva.
 *
 * @param {string} mensaje Texto que se mostrará al usuario.
 * @param {"normal"|"exito"|"error"} tipo Tipo de mensaje.
 */
function mostrarResultadoRecomendacion(mensaje, tipo = "normal") {
    const resultado = document.getElementById("resultadoRecomendacion");

    if (!resultado) {
        return;
    }

    resultado.textContent = mensaje;

    resultado.classList.remove(
        "text-secondary",
        "text-success",
        "text-danger"
    );

    if (tipo === "exito") {
        resultado.classList.add("text-success");
        return;
    }

    if (tipo === "error") {
        resultado.classList.add("text-danger");
        return;
    }

    resultado.classList.add("text-secondary");
}

/**
 * Marca visual y semánticamente un campo como inválido.
 *
 * @param {HTMLElement} campo Campo que presenta el error.
 * @param {HTMLElement|null} feedback Contenedor del mensaje de error.
 * @param {string} mensaje Mensaje que se mostrará al usuario.
 */
function marcarCampoInvalido(campo, feedback, mensaje) {
    campo.classList.add("is-invalid");
    campo.classList.remove("is-valid");
    campo.setAttribute("aria-invalid", "true");

    if (feedback) {
        feedback.textContent = mensaje;
    }
}

/**
 * Limpia el estado de error de un campo y opcionalmente lo marca válido.
 *
 * @param {HTMLElement} campo Campo que se desea actualizar.
 * @param {boolean} marcarValido Determina si se agrega la clase is-valid.
 */
function limpiarEstadoCampo(campo, marcarValido = false) {
    campo.classList.remove("is-invalid");
    campo.removeAttribute("aria-invalid");

    if (marcarValido) {
        campo.classList.add("is-valid");
    } else {
        campo.classList.remove("is-valid");
    }
}

/**
 * Valida el nombre sin restringir letras acentuadas ni nombres compuestos.
 *
 * @param {string} nombre Nombre ya recortado con trim().
 * @returns {boolean} true cuando el nombre cumple largo y contenido mínimos.
 */
function nombreEsValido(nombre) {
    return (
        nombre.length >= 2 &&
        nombre.length <= 30 &&
        /\p{L}/u.test(nombre)
    );
}

/**
 * Valida ambos campos del formulario y refleja los errores en el DOM.
 *
 * @returns {{valido: boolean, nombre: string, plataforma: string}}
 * Resultado normalizado de la validación.
 */
function validarFormularioRecomendacion() {
    const nombreInput = document.getElementById("nombreJugador");
    const plataformaSelect = document.getElementById("plataformaPreferida");
    const errorNombre = document.getElementById("errorNombreJugador");
    const errorPlataforma = document.getElementById(
        "errorPlataformaPreferida"
    );

    if (!nombreInput || !plataformaSelect) {
        return {
            valido: false,
            nombre: "",
            plataforma: ""
        };
    }

    const nombre = nombreInput.value.trim().replace(/\s+/g, " ");
    const plataforma = plataformaSelect.value;

    let valido = true;

    if (!nombreEsValido(nombre)) {
        marcarCampoInvalido(
            nombreInput,
            errorNombre,
            "Escribe un nombre de 2 a 30 caracteres que contenga al menos una letra."
        );
        valido = false;
    } else {
        nombreInput.value = nombre;
        limpiarEstadoCampo(nombreInput, true);
    }

    if (!PLATAFORMAS_PERMITIDAS.has(plataforma)) {
        marcarCampoInvalido(
            plataformaSelect,
            errorPlataforma,
            "Selecciona una plataforma válida."
        );
        valido = false;
    } else {
        limpiarEstadoCampo(plataformaSelect, true);
    }

    return {
        valido,
        nombre,
        plataforma
    };
}

/**
 * Resalta temporalmente una recomendación para hacer visible
 * el resultado de los eventos click o submit.
 *
 * @param {string} titulo Título del videojuego que debe resaltarse.
 */
function resaltarTarjetaPorTitulo(titulo) {
    const tarjetas = Array.from(
        document.querySelectorAll("#recomendacionesGrid .catalog-card")
    );

    tarjetas.forEach((tarjeta) => {
        tarjeta.style.outline = "";
        tarjeta.style.outlineOffset = "";
    });

    const tarjetaSeleccionada = tarjetas.find(
        (tarjeta) => tarjeta.dataset.titulo === titulo
    );

    if (!tarjetaSeleccionada) {
        return;
    }

    tarjetaSeleccionada.style.outline = "2px solid var(--verde-claro)";
    tarjetaSeleccionada.style.outlineOffset = "4px";

    if (temporizadorResaltado) {
        clearTimeout(temporizadorResaltado);
    }

    temporizadorResaltado = setTimeout(() => {
        tarjetaSeleccionada.style.outline = "";
        tarjetaSeleccionada.style.outlineOffset = "";
    }, 2600);
}

/**
 * Maneja mouseover sobre las Cards dinámicas mediante delegación.
 *
 * @param {MouseEvent} event Evento mouseover generado dentro del grid.
 */
function manejarMouseoverRecomendacion(event) {
    const grid = event.currentTarget;
    const tarjeta = event.target.closest(".catalog-card");

    if (!tarjeta || !grid.contains(tarjeta)) {
        return;
    }

    const estadoExploracion = document.getElementById("estadoExploracion");

    if (!estadoExploracion) {
        return;
    }

    estadoExploracion.textContent =
        `Explorando: ${tarjeta.dataset.titulo} · ${tarjeta.dataset.genero}`;
}

/**
 * Restablece el texto informativo cuando el puntero abandona una Card.
 *
 * @param {MouseEvent} event Evento mouseout generado dentro del grid.
 */
function manejarMouseoutRecomendacion(event) {
    const grid = event.currentTarget;
    const tarjeta = event.target.closest(".catalog-card");

    if (!tarjeta || !grid.contains(tarjeta)) {
        return;
    }

    if (event.relatedTarget && tarjeta.contains(event.relatedTarget)) {
        return;
    }

    const estadoExploracion = document.getElementById("estadoExploracion");

    if (estadoExploracion) {
        estadoExploracion.textContent =
            "Pasa el cursor sobre una recomendación para explorarla.";
    }
}

/**
 * Devuelve únicamente los videojuegos compatibles con una plataforma.
 * Centraliza el filtro para que "Recomendar" y "Sorpréndeme" respeten
 * exactamente las mismas reglas.
 *
 * @param {string} plataforma Plataforma seleccionada por el usuario.
 * @returns {Object[]} Recomendaciones compatibles.
 */
function obtenerRecomendacionesCompatibles(plataforma) {
    return recomendacionesCargadas.filter((juego) =>
        juego.plataformas.includes(plataforma)
    );
}

/**
 * Elige aleatoriamente un elemento de una lista no vacía.
 *
 * @param {Object[]} opciones Lista de opciones disponibles.
 * @returns {Object} Elemento elegido.
 */
function elegirRecomendacionAleatoria(opciones) {
    const indice = Math.floor(Math.random() * opciones.length);

    return opciones[indice];
}

/**
 * Procesa el formulario de preferencias y evita la recarga de la página.
 *
 * @param {SubmitEvent} event Evento submit del formulario.
 */
function manejarSubmitRecomendacion(event) {
    event.preventDefault();

    const validacion = validarFormularioRecomendacion();

    if (!validacion.valido) {
        mostrarResultadoRecomendacion(
            "Revisa los campos marcados antes de continuar.",
            "error"
        );

        const primerInvalido = document.querySelector(
            "#formRecomendacion .is-invalid"
        );

        if (primerInvalido) {
            primerInvalido.focus();
        }

        return;
    }

    if (recomendacionesCargadas.length === 0) {
        mostrarResultadoRecomendacion(
            "Las recomendaciones todavía no están disponibles.",
            "error"
        );
        return;
    }

    const compatibles = obtenerRecomendacionesCompatibles(
        validacion.plataforma
    );

    if (compatibles.length === 0) {
        mostrarResultadoRecomendacion(
            `No encontramos una recomendación para ${validacion.plataforma}.`,
            "error"
        );
        return;
    }

    const recomendacion = elegirRecomendacionAleatoria(compatibles);

    mostrarResultadoRecomendacion(
        `${validacion.nombre}, para ${validacion.plataforma} te recomendamos ${recomendacion.titulo}.`,
        "exito"
    );

    resaltarTarjetaPorTitulo(recomendacion.titulo);
}

/**
 * Maneja el click del botón "Sorpréndeme".
 * La ruleta respeta siempre la plataforma seleccionada en el formulario.
 * No exige nombre, pero sí una plataforma válida para evitar sugerencias
 * incompatibles.
 */
function manejarClickSorpresa() {
    const plataformaSelect = document.getElementById(
        "plataformaPreferida"
    );
    const errorPlataforma = document.getElementById(
        "errorPlataformaPreferida"
    );

    if (!plataformaSelect) {
        return;
    }

    if (recomendacionesCargadas.length === 0) {
        mostrarResultadoRecomendacion(
            "Espera a que las recomendaciones terminen de cargar.",
            "error"
        );
        return;
    }

    const plataforma = plataformaSelect.value;

    if (!PLATAFORMAS_PERMITIDAS.has(plataforma)) {
        marcarCampoInvalido(
            plataformaSelect,
            errorPlataforma,
            "Selecciona una plataforma antes de usar Sorpréndeme."
        );

        mostrarResultadoRecomendacion(
            "Selecciona una plataforma para que la sorpresa sea compatible.",
            "error"
        );

        plataformaSelect.focus();
        return;
    }

    limpiarEstadoCampo(plataformaSelect, true);

    const compatibles = obtenerRecomendacionesCompatibles(plataforma);

    if (compatibles.length === 0) {
        mostrarResultadoRecomendacion(
            `No hay recomendaciones disponibles para ${plataforma}.`,
            "error"
        );
        return;
    }

    const recomendacion = elegirRecomendacionAleatoria(compatibles);

    mostrarResultadoRecomendacion(
        `La ruleta NatGamez eligió para ${plataforma}: ${recomendacion.titulo}.`,
        "exito"
    );

    resaltarTarjetaPorTitulo(recomendacion.titulo);
}

/**
 * Limpia el estado de validación cuando el usuario corrige un campo.
 *
 * @param {Event} event Evento input o change del formulario.
 */
function manejarCorreccionCampo(event) {
    const campo = event.target;

    limpiarEstadoCampo(campo);

    mostrarResultadoRecomendacion(
        "Tu recomendación aparecerá aquí."
    );
}

/**
 * Reintenta la carga del JSON después de un error de red o contenido.
 */
function manejarClickReintentar() {
    void cargarRecomendaciones();
}

/**
 * Configura los eventos requeridos en Semana 5 y los eventos auxiliares
 * utilizados para validación y recuperación de errores.
 */
function configurarEventosRecomendaciones() {
    const grid = document.getElementById("recomendacionesGrid");
    const formulario = document.getElementById("formRecomendacion");
    const botonSorpresa = document.getElementById("botonSorpresa");
    const botonReintentar = document.getElementById("botonReintentarCarga");
    const nombreInput = document.getElementById("nombreJugador");
    const plataformaSelect = document.getElementById("plataformaPreferida");

    if (grid) {
        grid.addEventListener(
            "mouseover",
            manejarMouseoverRecomendacion
        );

        grid.addEventListener(
            "mouseout",
            manejarMouseoutRecomendacion
        );
    }

    if (formulario) {
        formulario.addEventListener(
            "submit",
            manejarSubmitRecomendacion
        );
    }

    if (botonSorpresa) {
        botonSorpresa.addEventListener(
            "click",
            manejarClickSorpresa
        );
    }

    if (botonReintentar) {
        botonReintentar.addEventListener(
            "click",
            manejarClickReintentar
        );
    }

    if (nombreInput) {
        nombreInput.addEventListener(
            "input",
            manejarCorreccionCampo
        );
    }

    if (plataformaSelect) {
        plataformaSelect.addEventListener(
            "change",
            manejarCorreccionCampo
        );
    }
}

/**
 * Obtiene las recomendaciones desde JSON mediante Fetch API,
 * valida la respuesta y recupera la interfaz de forma segura ante errores.
 */
async function cargarRecomendaciones() {
    const grid = document.getElementById("recomendacionesGrid");
    const estado = document.getElementById("estadoRecomendaciones");

    if (!grid || !estado) {
        return;
    }

    recomendacionesCargadas = [];
    grid.replaceChildren();

    establecerControlesRecomendacion(false);
    mostrarBotonReintentar(false);

    actualizarEstadoRecomendaciones(
        estado,
        "Cargando recomendaciones..."
    );

    try {
        const respuesta = await fetch(RUTA_RECOMENDACIONES);

        if (!respuesta.ok) {
            throw new Error(
                `No fue posible cargar las recomendaciones. HTTP ${respuesta.status}.`
            );
        }

        const juegos = await respuesta.json();

        if (!Array.isArray(juegos) || juegos.length === 0) {
            throw new Error(
                "El archivo de recomendaciones está vacío o no tiene el formato esperado."
            );
        }

        if (!juegos.every(esJuegoValido)) {
            throw new Error(
                "El archivo contiene una o más recomendaciones con datos inválidos."
            );
        }

        recomendacionesCargadas = juegos;

        juegos.forEach((juego) => {
            const tarjeta = crearTarjetaRecomendacion(juego);
            grid.appendChild(tarjeta);
        });

        actualizarEstadoRecomendaciones(
            estado,
            `${juegos.length} recomendaciones cargadas correctamente.`,
            "exito"
        );

        establecerControlesRecomendacion(true);
    } catch (error) {
        recomendacionesCargadas = [];
        grid.replaceChildren();

        establecerControlesRecomendacion(false);
        mostrarBotonReintentar(true);

        console.error("Error al cargar recomendaciones:", error);

        actualizarEstadoRecomendaciones(
            estado,
            "No fue posible cargar las recomendaciones. Puedes intentar nuevamente.",
            "error"
        );

        mostrarResultadoRecomendacion(
            "Las recomendaciones no están disponibles hasta recuperar la carga.",
            "error"
        );
    }
}

/**
 * Inicializa todas las funcionalidades JavaScript de NatGamez
 * cuando el DOM ya está completamente disponible.
 */
function inicializarNatGamez() {
    configurarModalDetalle();
    configurarVault();
    configurarEventosRecomendaciones();
    establecerControlesRecomendacion(false);
    void cargarRecomendaciones();
}

document.addEventListener("DOMContentLoaded", inicializarNatGamez);
