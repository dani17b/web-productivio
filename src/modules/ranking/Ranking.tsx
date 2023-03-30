import { Header, NavBar, TopOne } from 'lib-productivio';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getRanking, postRanking, RankingProps } from './actions';
import './ranking.scss';

export const Ranking = () => {
  const ranking = useSelector((state: any) => state.ranking);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getRanking());
  }, [dispatch]);

  useEffect(() => {
    console.log('Ranking state:', ranking);
  }, [ranking]);

  const [data] = useState<RankingProps>({
    email: '',
    name: '',
    description: '',
    userPoints: 0,
    activeTasks: 0,
    friends: 0,
    userPicUrl: '',
    userColor: '',
  });
  return (
    <div>
      <Header count={1} title={'Productivio'} />
      Ranking page
      <TopOne userImg="" userColor="" username="" points=""></TopOne>
      <NavBar />
      {ranking.loading && <div>Cargando...</div>}
      {!ranking.loading && ranking !== null && (
        <div>
          {ranking.length}
          {JSON.stringify(ranking)}
        </div>
      )}
      {
        <div>
          <button
            onClick={() => {
              dispatch(postRanking(data));
            }}
            
          > dasdasdasd </button>
        </div>
      }
    </div>
  );
};
