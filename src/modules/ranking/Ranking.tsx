import { Header, NavBar, TopOne } from 'lib-productivio';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getRanking } from './actions';

export const Ranking = () => {
  const ranking = useSelector((state: any) => state.ranking);
  console.log('Ranking state', ranking);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getRanking());
    console.log('Ranking state:', ranking);
  }, [dispatch]);

  return (
    <div>
      <Header count={1} title={'Productivio'} />
      Ranking page
      <TopOne userImg="" userColor="" username="" points=""></TopOne>
      {/* <Podium users={podiumUsers} />
      <TopFiveUser
        userImg={user1.userImg}
        userColor={user1.userColor}
        username={user1.username}
        points={user1.userPoints}
        position="1"
      /> */}
      <NavBar />
      <div>
        {ranking.length}
        {JSON.stringify(ranking)}
      </div>
    </div>
  );
};
