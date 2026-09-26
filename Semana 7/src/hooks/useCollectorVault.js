/**
 * NatGamez · Semana 7 · HOOK REACT
 * Hook React del Collector’s Vault.
 *
 * Gestiona el estado y controles necesarios para el carrusel de ediciones especiales.
 */
import {
  useEffect,
  useRef,
  useState,
} from 'react';

import {
  Carousel,
} from 'bootstrap';

export default function useCollectorVault(totalSlides) {
  const carruselRef = useRef(null);
  const [indice, setIndice] = useState(0);
  const [pausado, setPausado] = useState(false);

  useEffect(() => {
    const elemento = carruselRef.current;

    if (!elemento) {
      return undefined;
    }

    const instancia =
      Carousel.getOrCreateInstance(
        elemento,
        {
          interval: 3000,
          pause: false,
          touch: true,
          wrap: true,
        },
      );

    const actualizar = (event) => {
      if (
        typeof event.to === 'number'
      ) {
        setIndice(event.to);
        return;
      }

      const slides = Array.from(
        elemento.querySelectorAll(
          '.carousel-item',
        ),
      );

      const actual = slides.findIndex(
        (slide) =>
          slide.classList.contains('active'),
      );

      setIndice(
        actual >= 0 ? actual : 0,
      );
    };

    elemento.addEventListener(
      'slid.bs.carousel',
      actualizar,
    );

    return () => {
      elemento.removeEventListener(
        'slid.bs.carousel',
        actualizar,
      );
    };
  }, []);

  function alternarPausa() {
    const elemento = carruselRef.current;

    if (!elemento) {
      return;
    }

    const instancia =
      Carousel.getOrCreateInstance(
        elemento,
      );

    setPausado((actual) => {
      const siguiente = !actual;

      if (siguiente) {
        instancia.pause();
      } else {
        instancia.cycle();
      }

      return siguiente;
    });
  }

  return {
    carruselRef,
    indice,
    pausado,
    alternarPausa,
    contador:
      `${String(indice + 1).padStart(2, '0')} / ${String(totalSlides).padStart(2, '0')}`,
  };
}
