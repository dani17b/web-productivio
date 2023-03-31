import { Header, NavBar, Podium, TopFiveUser, TopOne } from 'lib-productivio';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getRanking, postRanking, RankingProps } from './actions';
import './ranking.scss';

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
    <div>
      <Header count={1} title={'Productivio'} />

      {sortedUsers.length > 0 && (
        <TopOne
          userImg={sortedUsers[0].userPicUrl}
          userColor={sortedUsers[0].userColor}
          username={sortedUsers[0].name}
          points={sortedUsers[0].userPoints}
        />
      )}

      {sortedUsers.length > maxPodium && (
        <Podium users={[sortedUsers[1], sortedUsers[2], sortedUsers[3]]} />
      )}

      {usersSlice.length > 0 &&
        usersSlice.map((user: any, index: any) => (
          <TopFiveUser
            userImg={user.userPicUrl}
            username={user.name}
            userColor={user.userColor}
            points={user.userPoints}
            position={index + startList}
            key={user.id}
          />
        ))}

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

      <NavBar />
    </div>
  );
};