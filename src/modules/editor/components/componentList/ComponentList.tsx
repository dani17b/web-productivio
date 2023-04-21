// @ts-nocheck
import './componentList.scss';
import { Column, MovableItem } from '../../Editor';
import componentsData from '../../../../../productivio-components.json';
import { Likes, TaskProgressBar, UserPhoto } from 'lib-productivio';

export const getComponentNames = (componentsData) => {
  return Object.values(componentsData).map(
    (componentData) => componentData.displayName
  );
};

export const ComponentsList = () => {
  const componetsNames = getComponentNames(componentsData);

  const libraries = {
    Example_Lib: [
      { name: 'Likes', icon: <Likes /> },
      { name: 'TaskProgressBar', icon: <TaskProgressBar /> },
      { name: 'UserPhoto', icon: <UserPhoto /> },
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
    <div className="component-list-container">
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
    </div >
  );
};
