// @ts-nocheck
import './componentList.scss';
import { Column } from '../../Editor';
import componentsData from '../../../../../productivio-components.json';
import { Likes, TaskProgressBar, UserPhoto } from 'lib-productivio';

export const getComponentNames = (componentsData) => {
  return Object.values(componentsData).map(
    (componentData) => componentData.displayName
  );
};

export const ComponentsList = ({ onComponentSelect }) => {
  const componetsNames = getComponentNames(componentsData);

  const libraries = {
    Example_Lib: [
      { name: 'Likes', icon: <Likes /> },
      { name: 'TaskProgressBar', icon: <TaskProgressBar /> },
      { name: 'UserPhoto', icon: <UserPhoto /> },
    ],

    Productivio: componetsNames.map((componentName) => ({
      name: componentName,
    })),
  };

  const onComponentClick = (component, index) => {
    onComponentSelect(component, index);
  };

  return (
    <div className='component-list-container'>
      {Object.entries(libraries).map(([libraryName, components], index) => (
        <>
          <Column key={index}>
            <h2>{libraryName}</h2>
            {components.map((component, index) => (
              <div
                key={index}
                className='movable-item'
                onClick={() => onComponentClick(component, index)}
              >
                {component.name}
                {component.icon}
              </div>
            ))}
          </Column>
        </>
      ))}
    </div>
  );
};
