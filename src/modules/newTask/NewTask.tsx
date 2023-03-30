import { TaskForm } from 'src/components/taskForm/TaskForm';
import './newTask.scss';
import { Header, NavBar } from 'lib-productivio';

export const NewTask = () => {
  return (
    <>
      <div className="header">
        <Header count={1} title={'Productivio'} />
      </div>
      <div className="new-task">
        <div className="form">
          <TaskForm />
        </div>
        <div className="navbar">
          <NavBar
            parentBackgroundColor="#1a3891"
            childBackgroundColor="white"
          />{' '}
        </div>
      </div>
    </>
  );
};
