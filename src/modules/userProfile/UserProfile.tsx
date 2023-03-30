import { Header, ProfileProgressBar, UserInfo, NavBar, MissionBlock } from 'lib-productivio';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { getUser, getTasks } from './actions';
import './userProfile.scss';

export const UserProfile = () => {


  const [showRoadmap, setShowRoadMap] = useState(false);
  const dispatch = useDispatch();

  const { user } = useSelector((state: any) => state.getUser);
  const { tasks } = useSelector((state: any) => state.getTasks);

  useEffect(() => {
    dispatch(getUser());
    dispatch(getTasks())
  }, []);

  console.log('userc de db', user);
  return (
    <>
      {user && (
        <div className="user-profile">
          <div className="user-profile__header">
            <Header title="Productivio" count={0} />
          </div>
          <div>
            <UserInfo user={user} />
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
              className={`user-profile__options__missions ${showRoadmap? "" : "user-profile__options__selected"} `}
              onClick={() => {
                setShowRoadMap(false);
              }}
            >
              MISIONES
            </div>
            <div
              className={`user-profile__options__roadmap ${!showRoadmap? "" : "user-profile__options__selected"} `}
              onClick={() => {
                setShowRoadMap(true);
              }}
            >
              ROADMAP
            </div>
          </div>

          {!showRoadmap && tasks &&
            <div>
            {tasks.map((task: any) =>(
               <MissionBlock key={task.id} task={task} />)
            )}
             </div>}
            
            
            
          {showRoadmap && <div>ROADMAP</div>}
          <div className="navbar">
            <NavBar />
          </div>
        </div>
      )}
    </>
  );
};
