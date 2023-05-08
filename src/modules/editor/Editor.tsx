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

const ResponsiveGridLayout = WidthProvider(Responsive);

export const Column = ({ children, className, title }) => {
  const [{ canDrop, isOver }, drop] = useDrop({
    accept: 'TYPE',
    drop: () => ({ name: 'Some name' }),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  return (
    <div ref={drop} className={className}>
      {title}
      {children}
    </div>
  );
};

export const MovableItem = ({ children, onClick }) => {
  const [{ isDragging }, drag] = useDrag({
    item: { name: 'Any custom name' },
    type: 'TYPE',
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const opacity = isDragging ? 0.4 : 1;

  return (
    <div
      ref={drag}
      className="movable-item"
      style={{ opacity }}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export const Editor = () => {
  const [selectedElement, setSelectedElement] = useState(null);
  const dispatch = useDispatch();
  const [files, setFiles] = useState([]);
  const [modules, setModules] = useState([]);
  const [setComponentCodeList] = useState([]);
  const { modules } = useSelector((state) => state.editor);

  const fetchAndSetComponentCode = useCallback(async () => {
    if (files.length === 0) return;

    try {
      const codePromises = files.map(async (file) => {
        const filePath = file.path;
        const fileName = file.name + '.tsx';
        try {
          const code = await dispatch(getCode(filePath, fileName));
          return code;
        } catch (error) {
          console.error(`Error al obtener el código para ${fileName}`, error);
        }
      });

      const results = await Promise.all(codePromises);
      const filteredCodeList = results.filter((code) => code);
      setComponentCodeList(filteredCodeList);
    } catch (error) {
      console.error(
        'Error al obtener el código para todos los componentes',
        error
      );
    }
  }, [dispatch, files]);

  useEffect(() => {
    fetchAndSetComponentCode();
  }, [files, fetchAndSetComponentCode]);

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

        setModules(data);
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

  const AddGridItem = (component: JSX.Element, layout?: any) => {
    const newItemUUID = uuid();

    setLayout((prevLayout) => [
      ...prevLayout,
      layout || {
        i: newItemUUID,
        x: 0,
        y: 0,
        w: 1,
        h: 1,
        static: false,
        maxH: 30,
      },
    ]);

    setLists((prevLists) => [...prevLists, { i: newItemUUID, component }]);
  };

  const [layout, setLayout] = useState([
    { i: uuid(), x: 0, y: 0, w: 1.5, h: 1, static: false, maxH: 30 },
    { i: uuid(), x: 0, y: 0, w: 3, h: 3, static: false, maxH: 30 },
  ]);

  const [lists, setLists] = useState([
    { i: layout[0].i, component: <Likes totalLikes={100} likedByMe={false} /> },
    { i: layout[1].i, component: <TaskProgressBar /> },
  ]);

  useEffect(() => {
    //TODO: Seleccionar el módulo/tab/grid activo, no el primero
    modules[0].component.returnedContent.dom.children.array.forEach(
      (element) => {
        AddGridItem(load(element.dom.path, element.dom.name), {
          ...element.dom.layout,
          static: false,
          maxH: 30,
        });
      }
    );
  }, []);

  const onLayoutChange = (newLayout: Item[]) => {
    setLayout(newLayout);
  };

  //This function render the components list from the project

  const componentList = () => {
    return (
      <div>
        {files.length > 0 &&
          files.map((file, index) => {
            return (
              <MovableItem
                key={index}
                onClick={async (e) => {
                  let path = file.path + '/' + file.name + '.tsx';

                  const Component = await load(path, file.name);
                  AddGridItem(<Component />);
                }}
              >
                <div>
                  <h5>{file.name}</h5>
                </div>
              </MovableItem>
            );
          })}
      </div>
    );
  };

  //This function render the module list from the project
  const moduleList = () => {
    return (
      <div>
        {modules.length > 0 &&
          modules.map((module, index) => {
            return (
              <MovableItem
                key={index}
                onClick={async (e) => {
                  let path = module.path + '/' + module.name + '.tsx';

                  const Component = await load(path, module.name);
                  AddGridItem(<Component />);
                }}
              >
                <div>
                  <h5>{module.name}</h5>
                </div>
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
          <Column>
            <TabSelector tabNames={['Components', 'Modules']}>
              {componentList()}
              {moduleList()}
            </TabSelector>
          </Column>
        </div>
        <Column
          className="editor__canvas"
          children={undefined}
          title={undefined}
        >
          {/* {buildJsx(componentDef.components[0].dom, {
            selectElement: (element) => {
              console.log('edit element', element);
              setSelectedElement(element);
            },
            removeElement: (element) => {
              console.log('remove element', element);
              setSelectedElement(element);
            }, 
             })} */}

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
  return component;
}
