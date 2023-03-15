import { IoMdPersonAdd } from 'react-icons/io';
import { IconContext } from 'react-icons';
import 'src/components/addIcon/addIcon.scss';
import { MouseEventHandler } from 'react';

export interface IconProps {
  action?: MouseEventHandler;
}

export const AddIcon = (props: IconProps) => {
  const { action } = props;

  return (
    <IconContext.Provider
      value={{ color: 'white', size: '20px', className: 'rounded-button' }}
    >
      <div>
        <IoMdPersonAdd onClick={action} />
      </div>
    </IconContext.Provider>
  );
};
