import { useState, useEffect } from 'react';
import { ContactsNumberProps, CurrentTasksProps, LevelProps } from './actions';
import './userSummary.scss';

export const UserSummary = () => {
  const [level, setLevel] = useState<LevelProps>({
    //TODO Añadir lógica real
    username: 'Logica pendiente',
    totalPoints: 2,
    level: 1,
  });

  const updateLevel = (points: number) => {
    const pointsPerLevel = 350;
    const currentLevel = Math.floor(points / pointsPerLevel) + 1;
    setLevel((previousLevel) => ({ ...previousLevel, level: currentLevel }));
  };

  useEffect(() => {
    updateLevel(level.totalPoints);
  }, [level.totalPoints]);

  const [contacts, setContacts] = useState<ContactsNumberProps>({
    //TODO Añadir lógica real
    contactsNumber: 4,
  });

  const [tasks, setTasks] = useState<CurrentTasksProps>({
    //TODO Añadir lógica real
    currentTasks: 2,
  });

  return (
    <div className="user-summary">
      <div className="user-summary__left-column">
        <div className="user-summary__user-pic"></div>
      </div>
      <div className="user-summary__center-column">
        <div className="user-summary__username">
          danituriño22
          {/* {userInfo.login} */}
        </div>
        <div className="user-summary__current-missions">
          {tasks.currentTasks} misiones en curso
        </div>
        <div className="user-summary__user-level">Nivel {level.level}</div>
      </div>
      <div className="user-summary__right-column">
        <div className="user-summary__contacts">
          {contacts.contactsNumber} contactos
        </div>
        <div className="user-summary__total-points">{level.totalPoints}pts</div>
      </div>
    </div>
  );
};
