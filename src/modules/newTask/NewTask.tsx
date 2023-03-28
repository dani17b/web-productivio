import { TaskForm } from 'src/components/taskForm/TaskForm';
import './newTask.scss';
import { Header, NavBar } from 'lib-productivio';

export const NewTask = () => {
  return (
    <>
      <Header count={1} title={'Productivio'} />
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
