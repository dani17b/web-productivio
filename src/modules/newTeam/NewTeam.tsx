import {
  FormButton,
  Header,
  InputWithLabel,
  SelectMenu,
  UserListChild,
} from 'lib-productivio';
import './newTeam.scss';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { TeamProps, teamPost, usersFetch } from './actions';
import { WebNavBar } from 'src/components/webNavBar/WebNavBar';

export const NewTeam = () => {
  const dispatch = useDispatch();
  const [assignedUsers, setAssignedUsers] = useState<any[]>([]);
  const { usersData} = useSelector((state: any) => state.usersFetch);
  const [team, setTeam] = useState<TeamProps>({
    name: '',
    description: '',
    managerId: 0,
    workerIds: [],
  });

  useEffect(() => {
    dispatch(usersFetch());
  }, []);

  return (
    <div className="new-team">
      <div className="new-team__header">
        <Header title="Productivio" count={0} />
      </div>
      <div className="new-team__form">
        <div className="new-team__form__title">NUEVO EQUIPO</div>
        <div className="new-team__form__fields">
          <div className="new-team__form__input">
            <InputWithLabel
              name="team_name"
              label="Nombre"
              height={30}
              width={350}
              fontSize={20}
              onChange={(e: any) => {
                setTeam({ ...team, name: e });
              }}
            />
          </div>

          <InputWithLabel
            name="team_description"
            label="Descripción"
            height={130}
            width={350}
            fontSize={20}
            onChange={(e: any) => {
              setTeam({ ...team, description: e });
            }}
          />
          {usersData && (
            <div className="new-team__form__select">
              <SelectMenu
                options={usersData.map((user: any) => user.name)}
                label="Asignar encargado"
                onSelect={(e: any) => {
                  let user = usersData.find(
                    (user: { name: string }) => user.name == e
                  );
                  setTeam({ ...team, managerId: user.id });
                }}
                selectString="Encargado"
              />
            </div>
          )}
          {usersData && (
            <div className="new-team__form__select">
              <SelectMenu
                options={usersData.map((user: any) => user.name)}
                label="Asignar integrantes"
                onSelect={(e: any) => {
                  let user = usersData.find(
                    (user: { name: string }) => user.name == e
                  );
                  setTeam({ ...team, workerIds: [...team.workerIds, user.id] });
                  if (user !== undefined) {
                    let newUser = {
                      username: user.name,
                      userImg: user.userPicUrl,
                      userColor: user.userColor,
                    };
                    setAssignedUsers((assignedUsers) => [
                      ...assignedUsers,
                      newUser,
                    ]);
                  }
                }}
                selectString="Seleccione integrantes"
              />
            </div>
          )}
        </div>

        {assignedUsers.map((user) => (
          <div className="users-assigned-list">
            <UserListChild
              backgroundColor="azure"
              user={user}
              onClick={(e: any) => {
                setAssignedUsers(
                  assignedUsers.filter(
                    (user) =>
                      user.username !==
                      e.target.parentElement.children[1].textContent
                  )
                );
              }}
            />
          </div>
        ))}

        <div className="new-team__form__button">
          <FormButton
            onClick={() => {
              dispatch(teamPost(team));
            }}
            buttonText="Guardar"
            buttonWidth={300}
          />
        </div>
        <div className="new-team__form__button">
          <FormButton buttonText="Cancelar" buttonWidth={300} />
        </div>
      </div>

      <WebNavBar />
    </div>
  );
};
