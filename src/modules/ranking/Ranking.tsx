import { Header, NavBar, Podium, TopFiveUser, TopOne } from 'lib-productivio';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getRanking } from './actions';
import './ranking.scss';

export const Ranking = () => {
  const ranking = useSelector((state: any) => state.ranking);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getRanking());
  }, [dispatch]);

  let sortedUsers = [];
  let usersSlice = [];
  if (ranking && ranking.ranking) {
    sortedUsers = ranking.ranking.sort(
      (a: any, b: any) => b.user.userPoints - a.user.userPoints
    );
    usersSlice = sortedUsers.slice(4, 10);
    console.log(sortedUsers);
  }

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

      {sortedUsers.length > 3 && (
        <Podium users={[sortedUsers[1], sortedUsers[2], sortedUsers[3]]} />
      )}

      {usersSlice.length > 0 &&
        usersSlice.map((user: any, index: any) => (
          <TopFiveUser
            userImg={user.userPicUrl}
            username={user.name}
            userColor={user.userColor}
            points={user.userPoints}
            position={index + 5}
            key={user.id} // Asegúrate de añadir una key única para cada elemento en la lista
          />
        ))}

      {ranking.loading && <div>Cargando...</div>}

      <NavBar />
    </div>
  );
};
