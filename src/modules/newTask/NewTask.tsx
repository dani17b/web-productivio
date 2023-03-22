import './newTask.scss';
import { Header, NavBar } from 'lib-productivio';

export const NewTask = () => {
  return (
    <div className="new-task">
      <div className="header">
        <Header count={1} />
      </div>
      <div className="form"></div>
      <div className="navbar">
        <NavBar />
      </div>
    </div>
  );
};
