import { TaskForm } from 'src/components/taskForm/TaskForm';
import './newTask.scss';
import { Header, NavBar } from 'lib-productivio';

export const NewTask = () => {
  return (
    <div className="new-task">
      <Header count={1} title={'Productivio'} />
      <div className="form">
        <TaskForm />
      </div>
      <div className="navbar">
        <NavBar />
      </div>
    </div>
  );
};
