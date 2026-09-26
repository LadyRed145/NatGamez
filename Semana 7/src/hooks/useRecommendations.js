/**
 * NatGamez · Semana 7 · HOOK REACT
 * Hook React de recomendaciones.
 *
 * Administra formulario, validaciones, selección aleatoria y resultado recomendado mediante estado React.
 */
import { useState } from 'react';

import {
  PLATAFORMAS_PERMITIDAS,
} from '../utils/formatters.js';

import {
  nombreEsValido,
} from '../utils/validators.js';

export default function useRecommendations(
  productos,
  habilitado,
) {
  const [nombre, setNombre] = useState('');
  const [plataforma, setPlataforma] = useState('');
  const [errores, setErrores] = useState({
    nombre: '',
    plataforma: '',
  });

  const [resultado, setResultado] = useState({
    mensaje: 'Tu recomendación aparecerá aquí.',
    tipo: 'normal',
  });

  function limpiarResultado() {
    setResultado({
      mensaje: 'Tu recomendación aparecerá aquí.',
      tipo: 'normal',
    });
  }

  function cambiarNombre(valor) {
    setNombre(valor);

    setErrores((actual) => ({
      ...actual,
      nombre: '',
    }));

    limpiarResultado();
  }

  function cambiarPlataforma(valor) {
    setPlataforma(valor);

    setErrores((actual) => ({
      ...actual,
      plataforma: '',
    }));

    limpiarResultado();
  }

  function obtenerCompatibles(valorPlataforma) {
    return productos.filter(
      (producto) =>
        producto.plataformas.includes(
          valorPlataforma,
        ),
    );
  }

  function aleatorio(lista) {
    return lista[
      Math.floor(
        Math.random() * lista.length,
      )
    ];
  }

  function validar() {
    const nombreLimpio =
      nombre
        .trim()
        .replace(/\s+/g, ' ');

    const nuevosErrores = {
      nombre: '',
      plataforma: '',
    };

    let valido = true;

    if (!nombreEsValido(nombreLimpio)) {
      nuevosErrores.nombre =
        'Escribe un nombre de 2 a 30 caracteres que contenga al menos una letra.';
      valido = false;
    }

    if (!PLATAFORMAS_PERMITIDAS.has(plataforma)) {
      nuevosErrores.plataforma =
        'Selecciona una plataforma válida.';
      valido = false;
    }

    setErrores(nuevosErrores);

    if (valido) {
      setNombre(nombreLimpio);
    }

    return {
      valido,
      nombre: nombreLimpio,
      plataforma,
    };
  }

  function recomendar(event) {
    event?.preventDefault();

    if (!habilitado) {
      return;
    }

    const validacion = validar();

    if (!validacion.valido) {
      setResultado({
        mensaje:
          'Revisa los campos marcados antes de continuar.',
        tipo: 'error',
      });
      return;
    }

    const compatibles =
      obtenerCompatibles(
        validacion.plataforma,
      );

    if (compatibles.length === 0) {
      setResultado({
        mensaje:
          `No encontramos juegos disponibles para ${validacion.plataforma}.`,
        tipo: 'error',
      });
      return;
    }

    const producto =
      aleatorio(compatibles);

    setResultado({
      mensaje:
        `${validacion.nombre}, para ${validacion.plataforma} te recomendamos ${producto.titulo}.`,
      tipo: 'exito',
    });
  }

  function sorprender() {
    if (!habilitado) {
      return;
    }

    if (!PLATAFORMAS_PERMITIDAS.has(plataforma)) {
      setErrores((actual) => ({
        ...actual,
        plataforma:
          'Selecciona una plataforma antes de usar Sorpréndeme.',
      }));

      setResultado({
        mensaje:
          'Selecciona una plataforma para obtener una sorpresa compatible.',
        tipo: 'error',
      });

      return;
    }

    const compatibles =
      obtenerCompatibles(plataforma);

    if (compatibles.length === 0) {
      setResultado({
        mensaje:
          `No encontramos juegos disponibles para ${plataforma}.`,
        tipo: 'error',
      });
      return;
    }

    const producto =
      aleatorio(compatibles);

    setResultado({
      mensaje:
        `La ruleta NatGamez eligió para ${plataforma}: ${producto.titulo}.`,
      tipo: 'exito',
    });
  }

  return {
    nombre,
    plataforma,
    errores,
    resultado,
    cambiarNombre,
    cambiarPlataforma,
    recomendar,
    sorprender,
  };
}
