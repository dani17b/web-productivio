import {
  Header,
  ProfileProgressBar,
  UserInfo,
  MissionBlock,
} from 'lib-productivio';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { RoadmapParent } from 'src/components/roadmapParent/RoadmapParent';
import { getUser, getTasks } from './actions';
import './userProfile.scss';
import { WebNavBar } from 'src/components/webNavBar/WebNavBar';

const styles = getComputedStyle(document.documentElement);
const myColor = { color: styles.getPropertyValue('--userColor') };
console.log('color', myColor);

export const UserProfile = () => {
  const [showRoadmap, setShowRoadMap] = useState(false);
  const dispatch = useDispatch();

  const { user } = useSelector((state: any) => state.getUser);
  const { tasks } = useSelector((state: any) => state.getTasks);

  useEffect(() => {
    dispatch(getUser());
    dispatch(getTasks());
  }, []);

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
              progress={60}
              bgColor="white"
              progressColor="rgb(105, 228, 222)"
              level={user.level}
              points={user.totalPoints}
            />
          </div>

          <div className="user-profile__options">
            <div
              className={`user-profile__options__missions ${
                showRoadmap ? '' : 'user-profile__options__selected'
              } `}
              onClick={() => {
                setShowRoadMap(false);
              }}
            >
              MISIONES
            </div>
            <div
              className={`user-profile__options__roadmap ${
                !showRoadmap ? '' : 'user-profile__options__selected'
              } `}
              onClick={() => {
                setShowRoadMap(true);
              }}
            >
              ROADMAP
            </div>
          </div>

          {!showRoadmap && tasks && (
            <div>
              {tasks.map((task: any) => (
                <MissionBlock key={task.id} task={task} />
              ))}
            </div>
          )}

          {showRoadmap && <div>{<RoadmapParent tasks={tasks}></RoadmapParent>}</div>}
          <div className="navbar">
            <WebNavBar />
          </div>
        </div>
      )}
    </>
  );
};
