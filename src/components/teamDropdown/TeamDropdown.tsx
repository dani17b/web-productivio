import './teamDropdown.scss';
import { useState } from 'react';
import { HiOutlineArrowSmRight, HiOutlineArrowSmDown } from 'react-icons/hi';

export interface TeamDropdownProps {
  title: string;
  data: any[];
  bgColor?: string;
}

export const TeamDropdown = (props: TeamDropdownProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  const { title, data, bgColor } = props;

  return (
    <div>
      <div className="dropdown-container" onClick={() => handleToggle()} style={{backgroundColor: bgColor || '#FF00FF'}}>
        <span className="dropdown-container__arrow">
          {isExpanded ? <HiOutlineArrowSmDown /> : <HiOutlineArrowSmRight />}
        </span>
        <div className="dropdown-container__title">{title}</div>
      </div>
      {isExpanded && (
        <div className="dropdown-container__data">
          {data.map((profileData, index) => (
            <div key={index} className="dropdown-container__data__profile">
              {/*Aquí va el componente de cada perfil*/}
              <div>{`Perfil #${index} ${profileData.name}`}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
