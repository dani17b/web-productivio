// @ts-nocheck
import './componentList.scss';
import { FaReact } from 'react-icons/fa';
import { IoLogoJavascript, IoLogoHtml5, IoLogoCss3 } from 'react-icons/io';
import { Column, MovableItem } from '../../Editor';
import componentsData from '../../../../../productivio-components.json';

export const getComponentNames = (componentsData) => {
  return Object.values(componentsData).map(
    (componentData) => componentData.displayName
  );
};

export const ComponentsList = () => {
  const componetsNames = getComponentNames(componentsData);

  const libraries = {
    Example_Lib: [
      { name: 'React', icon: <FaReact /> },
      { name: 'JavaScript', icon: <IoLogoJavascript /> },
      { name: 'HTML5', icon: <IoLogoHtml5 /> },
      { name: 'CSS3', icon: <IoLogoCss3 /> },
    ],
 
    Productivio: [
      {
        name: componetsNames.map((componentName, index) => (
          <Column key={index}>
            <MovableItem>{componentName}</MovableItem>
          </Column>
        )),
      },
    ],
  };
  return (
    <div className='component-list-container'>
      {Object.entries(libraries).map(([libraryName, components], index) => (
        <>
          <Column key={index}>
            <h2>{libraryName}</h2>
            {components.map((component, index) => (
              <MovableItem key={index}>
                {component.name}
                {component.icon}
              </MovableItem>
            ))}
          </Column>
        </>
      ))}
    </div>
  );
};
