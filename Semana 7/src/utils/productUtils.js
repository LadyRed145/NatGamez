/**
 * NatGamez · Semana 7 · UTILIDAD JAVASCRIPT
 * Utilidades y datos de productos especiales.
 *
 * Centraliza reglas visuales del catálogo y los productos Collector/Figuras compartidos por los componentes React.
 */
import { normalizarTexto } from './formatters.js';

export function obtenerClaseEstado(estado) {
  const valor = normalizarTexto(estado);

  if (valor === 'disponible') {
    return 'estado-disponible';
  }

  if (valor.includes('ultimas')) {
    return 'estado-limitado';
  }

  return 'estado-no-disponible';
}

export function obtenerConfiguracionAcentoPorColumna(indice) {
  const columna = indice % 3;

  if (columna === 0) {
    return {
      borde: 'recomendacion-borde-morado',
      badge: '',
    };
  }

  if (columna === 1) {
    return {
      borde: 'recomendacion-borde-azul',
      badge: 'badge-azul',
    };
  }

  return {
    borde: 'recomendacion-borde-verde',
    badge: 'badge-verde',
  };
}

export function reordenarProductosParaCatalogo(productos) {
  const ordenEspecial = [
    'doom eternal',
    'sekiro: shadows die twice',
    'hades ii',
  ];

  const normales = [];
  const especiales = [];

  productos.forEach((producto) => {
    const titulo = normalizarTexto(producto.titulo);

    if (ordenEspecial.includes(titulo)) {
      especiales.push(producto);
    } else {
      normales.push(producto);
    }
  });

  especiales.sort((a, b) => (
    ordenEspecial.indexOf(normalizarTexto(a.titulo)) -
    ordenEspecial.indexOf(normalizarTexto(b.titulo))
  ));

  return [
    ...normales,
    ...especiales,
  ];
}

export const COLLECTOR_PRODUCTS = [
  {
    id: 'vault-elden-ring-collectors',
    titulo: "Elden Ring Collector's Edition",
    genero: "Collector's Vault · Elden Ring",
    categoria: 'Edición especial',
    precioNormal: 189990,
    precioOferta: 159990,
    precio: 159990,
    imagen: 'https://i.shgcdn.com/16028f93-f268-47a6-8ade-e900e314c6bc/-/format/auto/-/preview/3000x3000/-/quality/lighter/',
    alt: "Contenido de Elden Ring Premium Collector's Edition con estatua de Malenia, casco, steelbook y artbook",
    badge: 'EDICIÓN LIMITADA',
    badgeClase: '',
    figuraClase: 'vault-elden',
    contenido: [
      'Juego base y banda sonora digital',
      'Steelbook exclusivo',
      'Estatua de Malenia',
      'Artbook de tapa dura y réplica del casco',
    ],
  },
  {
    id: 'vault-cyberpunk-5th',
    titulo: "Cyberpunk 2077 5th Anniversary Collector's Set",
    genero: "Collector's Vault · Cyberpunk 2077",
    categoria: 'Edición especial',
    precioNormal: 169990,
    precioOferta: 139990,
    precio: 139990,
    imagen: 'https://gear.cdprojektred.com/cdn/shop/files/Cyberpunk-2077-5th-Anniversary-Collectors-Set-V2-GridImage-600x900-1_2d423b20-b3c7-4b3d-8d5c-37ef05e7c697.png?v=1765359509&width=1946',
    alt: "Cyberpunk 2077 5th Anniversary Collector's Set con caja Arasaka, biochip y tarjetas",
    badge: 'VAULT PICK',
    badgeClase: 'badge-azul',
    figuraClase: 'vault-cyber',
    contenido: [
      'Caja metálica estilo Arasaka',
      'Réplica iluminada del Relic Biochip',
      'Tarjetas holográficas y pines',
      'USB con banda sonora y extras',
    ],
  },
  {
    id: 'vault-witcher-3-collectors',
    titulo: "The Witcher 3 Collector's Edition",
    genero: "Collector's Vault · The Witcher",
    categoria: 'Edición especial',
    precioNormal: 139990,
    precioOferta: 109990,
    precio: 109990,
    imagen: 'https://www.pngkit.com/png/detail/307-3070122_the-witcher-3-wild-hunt-collectors-edition-witcher.png',
    alt: "The Witcher 3 Collector's Edition con figura, steelbook, artbook, mapa y otros contenidos",
    badge: 'COLECCIÓN',
    badgeClase: 'badge-verde',
    figuraClase: 'vault-witcher',
    contenido: [
      'Juego y steelbook',
      'Figura de Geralt contra el grifo',
      'Mapa, medallón y cartas',
      'Artbook y contenidos de colección',
    ],
  },
];

export const FIGURE_PRODUCTS = [
  {
    id: 'figura-kratos-premium',
    titulo: 'Kratos · Estatua Premium',
    genero: 'Figura premium · God of War',
    categoria: 'Figura premium',
    precioNormal: 119990,
    precioOferta: 94990,
    precio: 94990,
    imagen: 'https://static3.tcdn.com.br/img/img_prod/460977/estatua_kratos_god_of_war_3_playstation_game_41_cm_122301_1_68384c572044f483f1bf3df9e142b60b.jpeg',
    alt: 'Figura premium de Kratos inspirada en God of War',
    descripcion: 'Estatua de exhibición con presencia de vitrina y acabado de colección.',
    cardClase: 'figura-kratos',
    imagenClase: 'figura-imagen-kratos',
    universo: 'God of War',
  },
  {
    id: 'figura-malenia-premium',
    titulo: 'Malenia · Blade of Miquella',
    genero: 'Figura premium · Elden Ring',
    categoria: 'Figura premium',
    precioNormal: 139990,
    precioOferta: 109990,
    precio: 109990,
    imagen: 'https://i.shgcdn.com/41cc6ec2-8302-41a8-87cc-c76957cb2a04/-/format/auto/-/preview/3000x3000/-/quality/lighter/',
    alt: 'Figura de Malenia, Blade of Miquella de Elden Ring',
    descripcion: 'Figura oficial de Malenia pensada para vitrinas y colecciones.',
    cardClase: 'figura-malenia',
    imagenClase: 'figura-imagen-malenia',
    universo: 'Elden Ring',
  },
  {
    id: 'figura-geralt-roach',
    titulo: 'Geralt & Roach · Deluxe Statue',
    genero: 'Figura premium · The Witcher',
    categoria: 'Figura premium',
    precioNormal: 149990,
    precioOferta: 119990,
    precio: 119990,
    imagen: 'https://www.darkhorsedirect.com/cdn/shop/products/WITCHER_STATUE_GERALT-ROACH_PHOTO_DSP_1.png?v=1677535167&width=480',
    alt: 'Estatua premium de Geralt y Roach basada en The Witcher 3',
    descripcion: 'Estatua de alta gama de Geralt junto a Roach, pensada como pieza central de colección.',
    cardClase: 'figura-geralt',
    imagenClase: 'figura-imagen-geralt',
    universo: 'The Witcher',
  },
  {
    id: 'figura-trevor-philips',
    titulo: 'Trevor Philips · GTA V',
    genero: 'Figura premium · Grand Theft Auto V',
    categoria: 'Figura premium',
    precioNormal: 89990,
    precioOferta: 69990,
    precio: 69990,
    imagen: 'https://ueeshop.ly200-cdn.com/u_file/UPAD/UPAD468/2104/products/08/82e624e889.jpg.500x500.jpg',
    alt: 'Figura coleccionable de Trevor Philips de Grand Theft Auto V',
    descripcion: 'Figura de Trevor Philips con acabado de colección inspirada en Grand Theft Auto V.',
    universo: 'Grand Theft Auto V',
    extra: true,
  },
  {
    id: 'figura-dante-dmc5',
    titulo: 'Dante · ARTFX J DMC5',
    genero: 'Figura premium · Devil May Cry 5',
    categoria: 'Figura premium',
    precioNormal: 129990,
    precioOferta: 99990,
    precio: 99990,
    imagen: 'https://makeshop-multi-images.akamaized.net/xjpn/itemimages/000000021152_t9kpkgb.jpg',
    alt: 'Figura ARTFX J de Dante inspirada en Devil May Cry 5',
    descripcion: 'Dante entra a la vitrina con abrigo carmesí, espada en mano y una pose de combate digna del cazador de demonios más stylish de Devil May Cry 5.',
    universo: 'Devil May Cry 5',
    extra: true,
  },
  {
    id: 'figura-bayonetta',
    titulo: 'Bayonetta · Climax Action 1/7',
    genero: 'Figura premium · Bayonetta',
    categoria: 'Figura premium',
    precioNormal: 139990,
    precioOferta: 109990,
    precio: 109990,
    imagen: 'https://images-na.ssl-images-amazon.com/images/I/71fTIOIT0YL._SL1000_.jpg',
    alt: 'Figura 1/7 de Bayonetta en una pose dinámica de combate',
    descripcion: 'Bayonetta llega con todo el flow: pose de patada alta, Scarborough Fair y una composición dinámica que captura el estilo exagerado y elegante de la Bruja de Umbra.',
    universo: 'Bayonetta',
    extra: true,
  },
];

export const PRODUCTOS_ESPECIALES = [
  ...COLLECTOR_PRODUCTS,
  ...FIGURE_PRODUCTS,
];
