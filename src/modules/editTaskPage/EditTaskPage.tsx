import { EditTask } from 'src/components/editTask/EditTask';
import './editTaskPage.scss';
import { Header, NavBar } from 'lib-productivio';

export const EditTaskPage = () => {
  return (
    <>
      <div className="header">
        <Header count={1} title={'Productivio'} />
      </div>
      <div className="new-task">
        <div className="form">
          <EditTask />
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
