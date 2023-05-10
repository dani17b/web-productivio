//@ts-nocheck
/* eslint-disable max-len */
import React from 'react';
import './editor.scss';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { parse, buildJsx } from '../../lib/tsx-builder';
import { InfoPanel } from './components/infoPanel/InfoPanel';
import { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getComponents,
  postFile,
  updateFile,
  getCode,
  getFiles,
  getPath,
  setJsonArray,
} from './actions';

import { TabComponent } from './components/tabComponent/TabComponent';
import { parseJsonToTsx } from 'src/utils/parser/JsonToTsx';
import { parseJsonToScss } from 'src/utils/parser/JsonToScss';
import { Likes, TaskProgressBar } from 'lib-productivio';
import { WidthProvider, Responsive } from 'react-grid-layout';
import uuid from 'react-uuid';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import { TabSelector } from './components/tabComponent/TabSelector';
import { parseTsxToChild } from 'src/utils/parser/TsxToJson';
import { Button } from '@mui/material';

const ResponsiveGridLayout = WidthProvider(Responsive);

export const Column = ({ children, className, title, onAddComponent }) => {
  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: 'TYPE',
    drop: (item, monitor) => {
      const offset = monitor.getClientOffset();

      onAddComponent(item);
    },
  }));

  const isActive = canDrop && isOver;
  const backgroundColor = isActive ? 'rgba(0, 255, 0, 0.1)' : 'transparent';

  return (
    <div ref={drop} className={className} style={{ backgroundColor }}>
      {title}
      {children}
    </div>
  );
};
export const MovableItem = ({ children, path }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'TYPE',
    item: {
      componentName: children,
      componentPath: path,
    },

    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  const opacity = isDragging ? 0.4 : 1;

  return (
    <div ref={drag} className="movable-item" style={{ opacity }}>
      {children}
    </div>
  );
};
export const Editor = () => {
  const [selectedElement, setSelectedElement] = useState(null);
  const [inputValue, setInputValue] = useState('');
  const { modules } = useSelector((state) => state.editor);
  const [path, setPath] = useState(null);
  const dispatch = useDispatch();
  const [files, setFiles] = useState([]);
  const [modulesFile, setModulesFile] = useState([]);

  //Devuelve un Json con array de objetos con información de los módulos
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getPath();
        setPath(response);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  //Se ejecuta al darle al botón de guardar y contiene dos métodos que construyen los Json que necesita el back para guardar un archivo
  const handleSave = () => {
    const buildTsxJsonToSave = {
      filename: inputValue + '.tsx',
      content: parseJsonToTsx(modules[0]),
    };
    saveOrUpdate(buildTsxJsonToSave);
    console.log(buildTsxJsonToSave);

    const buildScssJsonToSave = {
      filename: inputValue + '.scss',
      content: parseJsonToScss(modules[0]),
    };
    console.log('css', buildScssJsonToSave);
    saveOrUpdate(buildScssJsonToSave);
  };

  //Recoge el objeto que se va a guardar y comprueba si existe en el back para decidir si hace un post o update
  const saveOrUpdate = (build) => {
    const { filename, content } = build;
    getFiles(path)
      .then((data: any) => {
        const fileExists = data.find((obj: any) => obj.name === filename);
        if (fileExists) {
          console.log('El archivo existe');
          dispatch(updateFile(build));
        } else {
          console.log('El archivo no existe');
          dispatch(postFile(build));
          return false;
        }
      })
      .catch((error: any) => {
        console.log(error);
      });
  };

  //Devuelve un Json con array de objetos con información de los módulos
  useEffect(() => {
    const fetchData = async () => {
      try {
        const path = await getPath();
        const data = await getFiles(path);

        setModulesFile(data);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  //Devuelve un Json con array de objetos con información de los componentes
  useEffect(() => {
    const fetchData = async () => {
      try {
        const path = await getPath();
        const data = await getComponents(path);
        setFiles(data);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const componentDef = parse(`export const ScreenSample = () => {
        return (
            <div>Hola mundo</div>
        );
    }`);

  const [styles, setStyles] = useState<TestComponentProps['style']>([
    {
      color: '#1b1918',
      backgroundColor: '#C70039',
      margin: '10px',
      textAlign: 'center',
    },
  ]);
  const [text, setText] = useState<TestComponentProps['text']>('Hello World!');

  interface Item {
    i: string;
    x: number;
    y: number;
    w: number;
    h: number;
  }
  const AddGridItem = async (item) => {
    const newItemUUID = uuid();

    const gridColumnWidth = 150;
    const gridRowHeight = 30;
    const gridMargin = 0;

    const gridX = Math.floor(item.x / (gridColumnWidth + gridMargin));
    const gridY = Math.floor(item.y / (gridRowHeight + gridMargin));

    setLayout((prevLayout) => [
      ...prevLayout,
      {
        i: newItemUUID,
        x: gridX,
        y: gridY,
        w: 1.5,
        h: 1,
        static: false,
        maxH: 30,
      },
    ]);

    const componentName = item.componentName;
    const path = item.componentPath;

    const Component = await load(path, componentName);
    console.log('component', Component);
    setLists((prevLists) => [
      ...prevLists,
      { i: newItemUUID, component: <Component /> },
    ]);
  };

  const [layout, setLayout] = useState([
    { i: uuid(), x: 0, y: 0, w: 1.5, h: 1, static: false, maxH: 30 },
    { i: uuid(), x: 0, y: 0, w: 3, h: 3, static: false, maxH: 30 },
  ]);

  const [lists, setLists] = useState([]);

  const onLayoutChange = (newLayout: Item[]) => {
    setLayout(newLayout);
  };

  //list of components to show in the left column
  const componentList = () => {
    return (
      <div>
        {files.map((file, index) => {
          let path = file.path + '/' + file.name + '.tsx';
          //let code = await getCode(file.path, `${file.name}.tsx`)
          return (
            <MovableItem key={index} path={path}>
              {file.name}
            </MovableItem>
          );
        })}
      </div>
    );
  };
  const [showComponentButton, setComponentButton] = useState(true);

  //funtion to add children to the json in redux when on drop element
  const addComponentToJson = async (item: any) => {
    console.log('item', item);
    let code = await getCode(item.componentPath);
    modules[0].component.returnedContent.dom.children.push(
      parseTsxToChild(item.componentName, item.componentPath, code)
    );
    console.log('modules', modules[0]);

    dispatch(setJsonArray(modules));
  };

  //This function render the module list from the project
  const moduleList = () => {
    return (
      <div>
        {modulesFile.map((file, index) => {
          let path = file.path + '/' + file.name + '.tsx';
          return (
            <MovableItem key={index} path={path}>
              {file.name}
            </MovableItem>
          );
        })}
      </div>
    );
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="editor">
        <div className="editor__components">
          <button
            onClick={() => {
              setComponentButton(true);
            }}
          >
            components
          </button>
          <button
            onClick={() => {
              setComponentButton(false);
            }}
          >
            modules
          </button>
          {showComponentButton && <Column>{componentList()}</Column>}
          {!showComponentButton && <Column>{moduleList()}</Column>}
        </div>
        <div>
          <TabComponent
            tabLabel="Hello World"
            tabContent={
              <div className="editor__canvas__wrapper">
                {/* {buildJsx(componentDef.components[0].dom, {
                  selectElement: (element) => {
                    console.log('edit element', element);
                    setSelectedElement(element);
                  },
                  removeElement: (element) => {
                    console.log('remove element', element);
                    setSelectedElement(element);
                  },
                })}{' '} */}
              </div>
            }
          />
          {modules.length > 0 ? (
            <Column
              className="editor__canvas"
              children={undefined}
              title={undefined}
              onAddComponent={addComponentToJson}
            >
              <div className="layout-grid">
                <ResponsiveGridLayout
                  className="layout"
                  autoSize={false}
                  layouts={{ lg: layout }}
                  onLayoutChange={onLayoutChange}
                  margin={[0, 0]}
                  containerPadding={[0, 0]}
                  isBounded={true}
                  rowHeight={30}
                  isResizable={true}
                >
                  {layout.map((lay) => (
                    <div
                      key={lay.i}
                      id={lay.i}
                      className="movable-item"
                      style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        boxSizing: 'border-box',
                      }}
                    >
                      <div>
                        {lists.find((item) => lay.i === item.i)?.componentName}
                      </div>
                      {lists.find((item) => lay.i === item.i)?.component}
                    </div>
                  ))}
                </ResponsiveGridLayout>
              </div>

              <div className="editor-header">
                <input
                  onChange={(e) => setInputValue(e.target.value)}
                  value={inputValue}
                ></input>
                <button onClick={handleSave}>Guardar</button>
              </div>
            </Column>
          ) : (
            ''
          )}
        </div>

        <div className="editor-header"></div>
        <Column>
          <input
            onChange={(e) => setInputValue(e.target.value)}
            value={inputValue}
          ></input>
          <button onClick={handleSave}>Guardar</button>
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
            text={text}
            setText={setText}
          />
        </div>
      </div>
    </DndProvider>
  );
};

async function load(path, componentName) {
  //let module = await import(`./../../components/header/Header.tsx`);

  let module = await import(`./../../${path}`);

  const component = module[componentName];
  console.log('load', component);
  return component;
}
