/**
 * NatGamez · Semana 7 · UTILIDAD JAVASCRIPT
 * Utilidades del comprobante.
 *
 * Aísla la preparación de datos y comportamiento auxiliar del voucher sin mezclarlo con el renderizado React.
 */
import logoNatGamez from '../../assets/img/logo_natgamez.png?url';

import {
  formatearPrecioCLP,
} from './formatters.js';

const RUTA_LOGO_NATGAMEZ = logoNatGamez;
const RETARDO_IMPRESION_MS = 180;

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

export async function imprimirComprobante(compra) {
    if (!compra) {
        console.warn(
            "No existe una compra confirmada para imprimir."
        );
        return;
    }

    const html =
        crearDocumentoComprobante(
            compra
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