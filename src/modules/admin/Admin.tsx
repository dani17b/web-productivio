import { SearchBar } from 'lib-productivio';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getUsers, removeUser, saveUser } from './actions';
import './admin.scss';

const UserCard = (props: any) => {
  const { userInfo, onRemove, onEdit } = props;

  return (
    <div className="user-item">
      <div className="user-item__info">
        <div className="user-item__photo">Photo</div>
        <div className="user-item__data">
          <div className="user-item__name">{userInfo.name}</div>
          <div className="user-item__email">{userInfo.email}</div>
        </div>
      </div>
      <div className="user-item__actions">
        <div className="remove" onClick={() => onRemove()}>
          Remove
        </div>
        <div className="edit" onClick={() => onEdit()}>
          Edit
        </div>
      </div>
      User item
      {JSON.stringify(userInfo)}
    </div>
  );
};

export const Admin = () => {
  const { users } = useSelector((state: any) => state.admin);
  const dispatch = useDispatch();

  const [selectedUser, setSelectedUser] = useState<any>(null);

  useEffect(() => {
    // TODO recuperar usuarios
    dispatch(getUsers());
  }, []);

  return (
    <div>
      Administracion de usuarios
      <SearchBar
        onSearch={(value) => {
          dispatch(
            getUsers({
              name: value,
            })
          );
        }}
      />
      {users.map((user: any, i: any) => (
        <UserCard
          key={i}
          userInfo={user}
          onEdit={() => setSelectedUser(user)}
          onRemove={() => {
            dispatch(removeUser(user));
          }}
        />
      ))}
      {selectedUser && (
        <form
          className="user-form"
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();

            dispatch(saveUser(selectedUser));
          }}
        >
          <input
            name="name"
            value={selectedUser.name}
            onChange={(e) => {
              setSelectedUser({
                ...selectedUser,
                name: e.target.value,
              });
            }}
          />
          <input
            name="description"
            value={selectedUser.description}
            onChange={(e) => {
              setSelectedUser({
                ...selectedUser,
                description: e.target.value,
              });
            }}
          />
          <button>Guardar</button>
        </form>
      )}
      <div
        onClick={() => {
          setSelectedUser({
            email: 'prueba@altia.es',
            name: '',
            description: '',
            userPoints: 100,
            activeTasks: 3,
            friends: 10,
            userPicUrl:
              'https://www.dzoom.org.es/wp-content/uploads/2020/02/portada-foto-perfil-redes-sociales-consejos.jpg',
            userColor: 'red',
          });
        }}
      >
        New user
      </div>
    </div>
  );
};
