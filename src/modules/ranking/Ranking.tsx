import { Header, NavBar, TopOne } from 'lib-productivio';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getRanking, postRanking } from './actions';

export const Ranking = () => {
  const ranking = useSelector((state: any) => state.ranking);
  const dispatch = useDispatch();

  useEffect(() => {

    dispatch(getRanking());
  }, [dispatch]);
  
  useEffect(() => {
    console.log('Ranking state:', ranking);
  }, [ranking]);

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
      {<div><button onClick={postRanking()}></button></div>}
    </div>
  );
  
};
