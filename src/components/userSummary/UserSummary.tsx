import './userSummary.scss';

export const UserSummary = () => {
  // - Imagen de perfil
  // - Nombre de usuario
  // - Num misiones en curso
  // - Nivel
  // - Total contactos
  // - Total puntos
  return (
    <div className="user-summary">
      <div className="user-summary__left-column">
        <div className="user-summary__user-pic"></div>
      </div>
      <div className="user-summary__center-column">
        <div className="user-summary__username">danituriño22</div>
        <div className="user-summary__current-missions">
          3 misiones en curso
        </div>
        <div className="user-summary__user-level">Nivel 3</div>
      </div>
      <div className="user-summary__right-column">
        <div className="user-summary__contacts">123 contactos</div>
        <div className="user-summary__total-points">520pts</div>
      </div>
    </div>
  );
};
