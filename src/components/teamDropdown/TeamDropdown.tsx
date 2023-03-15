import './teamDropdown.scss';
import { useState } from 'react';
import { IoIosArrowForward, IoIosArrowDown } from 'react-icons/io';

export interface TeamDropdownProps {
  title: string;
  data: any[]; //TODO Cambiar cuando se sepan los datos que van al componente del perfil
  bgColor?: string;
}

const DEFAULT_COLOR = '#FF00FF'; //TODO definir el color por defecto

export const TeamDropdown = (props: TeamDropdownProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const { title, data, bgColor } = props;

  return (
    <div>
      <div
        className="dropdown-container"
        onClick={() => setIsExpanded(!isExpanded)}
        style={{ backgroundColor: bgColor || DEFAULT_COLOR }}
      >
        <div className="dropdown-container__title">{title}</div>
        <span className="dropdown-container__arrow">
          {isExpanded ? <IoIosArrowDown /> : <IoIosArrowForward />}
        </span>
      </div>
      {isExpanded && (
        <div className="dropdown-container__data">
          {data.map((profileData, index) => (
            <div key={index} className="dropdown-container__data__profile">
              {/*TODO Aquí va el componente de cada perfil*/}
              <div>{`Perfil #${index} ${profileData.name}`}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
