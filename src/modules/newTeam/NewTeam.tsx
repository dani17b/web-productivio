import { Header, InputWithLabel, NavBar } from 'lib-productivio';
import './newTeam.scss';

export const NewTeam = () => {
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
            <InputWithLabel name='team_name' label='Nombre' height={30} width={360} fontSize={20}/>
            <InputWithLabel name='team_description' label='Descripción' height={130} width={360} fontSize={20}/>
        </div>
      </div>

      {/* <NavBar /> */}
    </div>
  );
};
