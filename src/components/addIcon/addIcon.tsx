import { useEffect, useState } from 'react';
import { IconContext } from 'react-icons';
import {IoMdPersonAdd} from 'react-icons/io';
import'src/components/addIcon/addIcon.scss'; 



export interface IconProps {
    action? : any
}

export const AddIcon = (props: IconProps) => {
const{action} = props;

  return (
    <IconContext.Provider
    value={{ color: 'white', size: '20px', className: 'rounded-button' }}
  >
    <div>
       <IoMdPersonAdd />
    </div>
    </IconContext.Provider>
  );
}