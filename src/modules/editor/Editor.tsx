// @ts-noCheck
import './editor.scss';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { parse, buildJsx } from '../../lib/tsx-builder';
import { InfoPanel } from './components/infoPanel/InfoPanel';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getFiles } from './actions';
import { useSelector } from 'react-redux';
//import { Component1 } from './components/componentsPrueba/Component1';
//import { Component2 } from './components/componentsPrueba/Component2';
import { FaReact } from 'react-icons/fa';
import { IoLogoJavascript, IoLogoHtml5, IoLogoCss3 } from 'react-icons/io';
import { Input, Likes, TopOne, UserPhoto } from 'lib-productivio';



const Column = ({ children, className, title }) => {
  const [{ canDrop, isOver }, drop] = useDrop({
    accept: 'TYPE',
    drop: () => ({ name: 'Some name' }),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  console.log('options', { canDrop, isOver });

  return (
    <div ref={drop} className={className}>
      {title}
      {children}
    </div>
  );
};

const MovableItem = ({ children }) => {
  const [{ isDragging }, drag] = useDrag({
    item: { name: 'Any custom name' },
    type: 'TYPE',
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const opacity = isDragging ? 0.4 : 1;

  return (
    <div ref={drag} className="movable-item" style={{ opacity }}>
      {children}
    </div>
  );
};
const ComponentsList = () => {
  const libraries = {
    React: [
      { name: 'React', icon: <FaReact /> },
      { name: 'React Router', icon: '🚀' },
      { name: 'Material UI', icon: '🎨' }
    ],
    JavaScript: [
      { name: 'JavaScript', icon: <IoLogoJavascript /> },
      { name: 'React Native', icon: '📱' },
      { name: 'Node.js', icon: '🚀' }
    ],
    HTML_CSS: [
      { name: 'HTML5', icon: <IoLogoHtml5 /> },
      { name: 'CSS3', icon: <IoLogoCss3 /> },
      { name: 'Bootstrap', icon: '👢' }
    ],
    Productivio: [
      {name: 'Input' , icon: <Input/>},
      {name: 'UserPhoto' , icon: <UserPhoto/>},
      {name: 'Likes' , icon: <Likes/>},
      {name: 'TopOne' , icon: <TopOne/>},

    ]

  };

  return (
    <>
      {Object.entries(libraries).map(([libraryName, components], index) => (
        <Column key={index}>
          <h2>{libraryName}</h2>
          {components.map((component, index) => (
            <MovableItem key={index}>{component.name}{component.icon}</MovableItem>
          ))}
        </Column>
      ))}
    </>
  );
};

export const Editor = () => {
  const [selectedElement, setSelectedElement] = useState(null);

  const dispatch = useDispatch();

  const { files } = useSelector((state) => state.editor);

  useEffect(() => {
    dispatch(getFiles('C:\\workspace\\dev\\web-productivio'));
  }, [dispatch]);

  useEffect(() => {
    if (files.length > 0) {
      // TODO cargar el componente en si, que sera el que se muestre en el editor abierto
      //debugger;
    }
  }, [files]);

  const componentDef = parse(`export const ScreenSample = () => {
        return (
            <div>Hola mundo</div>
        );
    }`);

  //const componentStr = build(componentDef);

  console.log(componentDef);

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="editor">
        <div className="editor__components">
          <Column>
            <ComponentsList />
          </Column>
        </div>
        <Column className="editor__canvas">
          {buildJsx(componentDef.components[0].dom, {
            selectElement: (element) => {
              console.log('edit element', element);
              setSelectedElement(element);
            },
            removeElement: (element) => {
              console.log('remove element', element);
              setSelectedElement(element);
            },
          })}
        </Column>
        <div
          className="editor__element"
          style={{
            marginRight: selectedElement == null ? -250 : 0,
          }}
        >
          <InfoPanel
            element={selectedElement}
            onClose={() => setSelectedElement(null)}
          />
        </div>
      </div>
    </DndProvider>
  );
};
