import './styleExample.scss';
import React from 'react';

const StyleExample = () => {
  return (
    <div className="styles">
      <div className="styles__red-mobile">
        Este texto es rojo si lo ves desde un móvil porque usé{' '}
        <b>@include for-mobile-only</b>
      </div>
      <div className="styles__wide-mobile">
        Aquí uso <b>@include mobile-full-width</b> y <b>@include primary-bg</b>{' '}
        para que se vea al 100% del ancho en móvil y con el color "oficial" de
        fondo.
      </div>
      <div className="styles__blue-text">
        Puedes usar los colores "oficiales" en cualquier propiedad usando las
        variables <b>$primary-color</b> y <b>$secondary-color</b>
      </div>
      <div className="styles__default">
        <b>@include secondary-bg;</b>
        <br />
        <br />
        <b>@include padding;</b>
        <br />
        <br />
        <b>@include shadow;</b>
        <br />
        <br />
        <b>@include rounded-borders;</b>
      </div>
      <h2>@include flex-row-spaced:</h2>
      <div className="styles__spaced">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <p className="styles__note">
        Esta página usa <b>@include flex-column-centered;</b>
      </p>
    </div>
  );
};

export default StyleExample;
