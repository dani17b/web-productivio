import {
  Header,
  ProfileProgressBar,
  UserSummary,
  NavBar,
} from 'lib-productivio';
import { useState } from 'react';
import './userProfile.scss';

export const UserProfile = () => {
  const [showRoadmap, setShowRoadMap] = useState(false);
  return (
    <>
      <Header title="Productivio" count={0} />
      <div>
        <UserSummary
          username="example"
          userImg="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80"
          userColor="blue"
          totalPoints={240}
          level={3}
          contactsNumber={38}
          currentTasks={7}
        />
      </div>

      <div>
        <ProfileProgressBar
          completed={60}
          bgColor="white"
          completedColor="rgb(105, 228, 222)"
        />
      </div>

      <div className="user-profile__options">
        <div
          className="user-profile__options__misions"
          onClick={() => {
            setShowRoadMap(false);
          }}
        >
          MISIONES
        </div>
        <div
          className="user-profile__options__roadmap"
          onClick={() => {
            setShowRoadMap(true);
          }}
        >
          ROADMAP
        </div>
      </div>

      {!showRoadmap && <div>MISIONES</div>}
      {showRoadmap && <div>ROADMAP</div>}
      <div className="navbar">
        <NavBar />
      </div>
    </>
  );
};
