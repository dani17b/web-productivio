import './styleExample.scss';
import React from 'react';

const StyleExample = () => {
  return (
    <div className='styles'>
      <div className="styles_red-mobile">
        Este texto es rojo si lo ves desde un móvil porque usé @include for-mobile-only
      </div>
      <div className="styles__wide-mobile">
        Aquí uso @include mobile-full-width y @include primary-bg para que se
        vea al 100% del ancho en móvil y con el color "oficial" de fondo.
      </div>
      <div className="styles__blue-text">Puedes usar los colores "oficiales" en cualquier propedad con $primary-color y $secondary-color</div>
    </div>
  );
};

export default StyleExample;
