import { TaskForm } from 'src/components/taskForm/TaskForm';
import './newTask.scss';
import { Header } from 'lib-productivio';
import { WebNavBar } from 'src/components/webNavBar/WebNavBar';

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
          <WebNavBar />
        </div>
      </div>
    </>
  );
};
