import { TopOne, Podium, TopFiveUser } from 'lib-productivio';
import { Header, NavBar } from 'lib-productivio';

export const Ranking = () => {
  let user1 = {
    userImg: '',
    userColor: '',
    username: '',
    userPoints: '',
  };

  let user2 = {
    userImg: '',
    userColor: '',
    username: '',
    userPoints: '',
  };

  let user3 = {
    userImg: '',
    userColor: '',
    username: '',
    userPoints: '',
  };
  let podiumUsers = [user1, user2, user3];

  return (
    <div>
      <Header count={1} title={'Productivio'} />
      Ranking page
      <TopOne userImg="" userColor="" username="" points=""></TopOne>
      <Podium users={podiumUsers} />
      <TopFiveUser
        userImg={user1.userImg}
        userColor={user1.userColor}
        username={user1.username}
        points={user1.userPoints}
        position="1"
      />
      <NavBar />
    </div>
  );
};
