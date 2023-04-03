import { Header, InputWithLabel, NavBar, SelectMenu } from 'lib-productivio';
import './newTeam.scss';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import {useEffect} from 'react';
import { usersFetch } from './actions';

export const NewTeam = () => {

  const dispatch = useDispatch();
  

  useEffect(() => {
    dispatch(usersFetch());
  }, []);

  const {usersData, loading} = useSelector((state: any) => state.usersFetch);
  console.log(usersData);

  return (
    <div className='new-team'>
      {/* <div className="new-team__header">
        <Header title="Productivio" count={0} /> 
      </div> */}
      <div className='new-team__form'>
        <div className='new-team__form__title'>
            NUEVO EQUIPO
        </div>
        <div className='new-team__form__fields'>
            <InputWithLabel name='team_name' label='Nombre' height={30} width={350} fontSize={20}/>
            <InputWithLabel name='team_description' label='Descripción' height={130} width={350} fontSize={20}/>
            {usersData && <SelectMenu options={usersData.map((user: any) => user.name)} label="Asignar encargado" onSelect={() => {}} selectString='Encargado'/>}
            {usersData && <SelectMenu options={usersData.map((user: any) => user.name)} label="Asignar integrantes" onSelect={() => {}} selectString='Seleccione integrantes'/>}
        </div>
      </div>

      {/* <NavBar /> */}
    </div>
  );
};
