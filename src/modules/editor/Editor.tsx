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

import {
  TestComponent,
  TestComponentProps,
} from 'src/components/propsEditor/TestComponent';
import { TabComponent } from './components/tabComponent/TabComponent';
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
  const dispatch = useDispatch();
  const [files, setFiles] = useState([]);
  const [modulesFile, setModulesFile] = useState([]);
  const [setComponentCodeList] = useState([]);
  const { modules } = useSelector((state: any) => state.editor);

  let [arrayTest, setArrayTest] = useState([]);

  useEffect(() => {
    console.log('modules', modules[0]);
    setArrayTest(modules);
  }, [modules]);
  // const fetchAndSetComponentCode = useCallback(async () => {
  //   if (files.length === 0) return;

  //   try {
  //     const codePromises = files.map(async (file) => {
  //       const filePath = file.path + file.name + '.tsx';
  //       const fileName = file.name + '.tsx';
  //       // try {
  //       //   const code = await dispatch(getCode(filePath));
  //       //   return code;
  //       // } catch (error) {
  //       //   console.error(`Error al obtener el código para ${fileName}`, error);
  //       // }
  //     });

  //     const results = await Promise.all(codePromises);
  //     //const filteredCodeList = results.filter((code) => code);
  //     setComponentCodeList(filteredCodeList);
  //   } catch (error) {
  //     console.error(
  //       'Error al obtener el código para todos los componentes',
  //       error
  //     );
  //   }
  // }, [dispatch, files]);

  // useEffect(() => {
  //   fetchAndSetComponentCode();
  // }, [files, fetchAndSetComponentCode]);

  const handleSave = (file: any) => {
    getFiles(projectPath)
      .then((data: any) => {
        const fileExists = data.find((obj: any) => obj.name === inputValue);
        if (fileExists) {
          console.log('El archivo existe');
          dispatch(updateFile(file));
        } else {
          console.log('El archivo no existe');
          dispatch(postFile(file));
          return false;
        }
      })
      .catch((error: any) => {
        console.log(error);
      });
  };

  //return modules
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

  //return components
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
  const [inputValue, setInputValue] = useState('');

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

  const [lists, setLists] = useState([
    { i: layout[0].i, component: <Likes totalLikes={100} likedByMe={false} /> },
    { i: layout[1].i, component: <TaskProgressBar /> },
  ]);

  const onLayoutChange = (newLayout: Item[]) => {
    setLayout(newLayout);
  };

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
                <TestComponent text={text} style={styles} />
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
              {console.log('mdoue', modules[0])}

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
