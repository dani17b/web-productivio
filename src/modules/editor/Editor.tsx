//@ts-nocheck
import './editor.scss';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { parse, buildJsx } from '../../lib/tsx-builder';
import { InfoPanel } from './components/infoPanel/InfoPanel';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getCode, getFiles } from './actions';
import { useSelector } from 'react-redux';
import { ComponentsList } from './components/componentList/ComponentList';
import {
  MyComponent,
  MyComponentProps,
} from 'src/components/propsEditor/TestComponent';
import { TabComponent } from './components/tabComponent/TabComponent';

export const Column = ({ children, className, title }) => {
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

export const MovableItem = ({ children }) => {
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

export const Editor = () => {
  const [selectedElement, setSelectedElement] = useState(null);
  const dispatch = useDispatch();
  const { files } = useSelector((state) => state.editor);
  const { code } = useSelector((state) => state.code);
  console.log('code', code);
  const [inputValue, setInputValue] = useState("");

  const handleSave = () => {
    getFiles('C:\\Users\\enrique.jimenez\\Documents\\formaciónDani\\productivio\\web-productivio')
      .then((data: any) => {
        const fileExists = data.find((obj: any) => obj.name === inputValue);
        if (fileExists) {
          console.log('El archivo existe');
          return true;
        } else {
          console.log('El archivo no existe');
          return false;
        }
      })
      .catch((error: any) => {
        console.log(error);
      });
  };
  
  
  
  useEffect(() => {
    getFiles(
      'C:\\Users\\enrique.jimenez\\Documents\\formaciónDani\\productivio\\web-productivio'
    ).then((data) => {
      console.log(data);
    }).catch((error) => {
      console.log(error);
    });
  }, []);
  

  // useEffect(() => {
  //   if (files.length > 0) {
  //     let path = files.map((file) => file
  //     let name = files.map((file) => file.name);
  //     dispatch(getCode(path[0], name[0] + '.tsx'));
  //   }
  // }, [files]);

  const componentDef = parse(`export const ScreenSample = () => {
        return (
            <div>Hola mundo</div>
        );
    }`);

  //const componentStr = build(componentDef);

  console.log(componentDef);
  const [styles, setStyles] = useState<MyComponentProps['style']>([]);
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="editor">
        <div className="editor__components">
          <Column>
            <ComponentsList />
          </Column>
        </div>
        <Column className="editor__canvas">
          <TabComponent
            tabLabel="Hello World"
            tabContent={
              <div className="editor__canvas__wrapper">
                <MyComponent text="Hello World!" style={styles} />
                {buildJsx(componentDef.components[0].dom, {
                  selectElement: (element) => {
                    console.log('edit element', element);
                    setSelectedElement(element);
                  },
                  removeElement: (element) => {
                    console.log('remove element', element);
                    setSelectedElement(element);
                  },
                })}{' '}
              </div>
            }
          />
          <div className="editor-header">
            <input onChange={(e) => setInputValue(e.target.value)} value={inputValue}></input>
            <button onClick={handleSave}>Guardar</button>
          </div>
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
            styles={styles}
            setStyles={setStyles}
          />
        </div>
      </div>
    </DndProvider>
  );
};
