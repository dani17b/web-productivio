import { Header, NavBar, Podium, TopFiveUser, TopOne } from 'lib-productivio';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getRanking, postRanking, RankingProps } from './actions';
import './ranking.scss';
import { WebNavBar } from 'src/components/webNavBar/WebNavBar';

const maxPodium = 3;
const minList = 4;
const maxList = 10;
const startList = 5;

export const Ranking = () => {
  const ranking = useSelector((state: any) => state.ranking);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getRanking());
  }, [dispatch]);

  let sortedUsers = [];
  let usersSlice = [];
  if (ranking && ranking.ranking) {
    sortedUsers = [...ranking.ranking].sort(
      (a: any, b: any) => b.userPoints - a.userPoints
    );
    usersSlice = sortedUsers.slice(minList, maxList);
  }

  const [data] = useState<RankingProps>({
    email: 'fdsfs',
    name: 'dsfsf',
    description: 'fsdfsfs',
    userPoints: 130,
    activeTasks: 3,
    friends: 0,
    userPicUrl: 'asdad',
    userColor: 'asasd',
  });

  return (
    <div className="ranking">
      <Header count={1} title={'Productivio'} />
      <div className="ranking__title">Ranking semanal</div>
      {sortedUsers.length > 0 && (
        <div className="ranking__top-one">
          <TopOne
            userPicUrl={sortedUsers[0].userPicUrl}
            userColor={sortedUsers[0].userColor}
            name={sortedUsers[0].name}
            points={sortedUsers[0].userPoints}
          />
        </div>
      )}

      {sortedUsers.length > maxPodium && (
        <div className="ranking__podium">
          <Podium users={[sortedUsers[1], sortedUsers[2], sortedUsers[3]]} />
        </div>
      )}

      {usersSlice.length > 0 &&
        usersSlice.map((user: any, index: any) => (
          <div className="ranking__list">
            <TopFiveUser
              userPicUrl={user.userPicUrl}
              name={user.name}
              userColor={user.userColor}
              points={user.userPoints}
              position={index + startList}
              key={user.id}
            />
          </div>
        ))}
      <div>
        <br />
        <br />
        <br />
      </div>
      {ranking.loading && <div>Cargando...</div>}

      {
        /*BOTON PARA AÑADIR USUARIO. ESCONDIDO CON DISPLAY NONE*/
        <div>
          <button
            onClick={() => {
              dispatch(postRanking(data));
            }}
            style={{ display: 'none' }}
          >
            dasdasdasd
          </button>
        </div>
      }
      <WebNavBar />
    </div>
  );
};
