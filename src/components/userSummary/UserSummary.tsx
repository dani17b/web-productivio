import './userSummary.scss';

export const UserSummary = () => {
  // - Imagen de perfil
  // - Nombre de usuario
  // - Num misiones en curso
  // - Nivel
  // - Total contactos
  // - Total puntos
  return (
    <div className="userSummary">
      <div className="userSummary__left-column">
        <div className="userSummary__userPic"></div>
      </div>
      <div className="userSummary__center-column">
        <div className="userSummary__username">danituriño22</div>
        <div className="userSummary__currentMissions">3 misiones en curso</div>
        <div className="userSummary__userLevel">Nivel 3</div>
      </div>
      <div className="userSummary__right-column">
        <div className="userSummary__contacts">123 contactos</div>
        <div className="userSummary__total-points">520pts</div>
      </div>
    </div>
  );
};
