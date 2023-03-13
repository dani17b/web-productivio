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
        <div className="userSummary__username"></div>
        <div className="userSummary__currentMissions"></div>
        <div className="userSummary__userLevel"></div>
      </div>
      <div className="userSummary__right-column">
        <div className="userSummary__contacts"></div>
        <div className="userSummary__total-points"></div>
      </div>
    </div>
  );
};
