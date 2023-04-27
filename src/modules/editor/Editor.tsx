//@ts-nocheck
/* eslint-disable max-len */
//@ts-nocheck
import React from 'react';
import './editor.scss';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { parse, buildJsx } from '../../lib/tsx-builder';
import { InfoPanel } from './components/infoPanel/InfoPanel';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getCode, getFiles } from './actions';
import { useSelector } from 'react-redux';
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

  console.log('options', { canDrop, isOver });

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
  const { files } = useSelector((state) => state.editor);
  const { code } = useSelector((state) => state.code);
  const objectNames = files.map((file) => file.name);
  const [componentCodeList, setComponentCodeList] = useState([]);

  console.log('code', code);

  useEffect(() => {
    dispatch(
      getFiles(
        'C:\\Users\\fernando.valerio\\Desktop\\workspace\\dev\\web-productivio'
      )
    );
  }, [dispatch]);

  const codeList = useSelector((state) => state.code.code);

  useEffect(() => {
    async function fetchAndSetComponentCode(codeList) {
      await Promise.all(
        files.map(async (file) => {
          const filePath = file.path;
          const fileName = file.name + '.tsx';
          await dispatch(getCode(filePath, fileName));
        })
      );

      // Filtra los elementos vacíos en `codeList`
      const filteredCodeList = codeList.filter((code) => code);

      // Establece el estado `componentCodeList` con el código filtrado de cada componente
      setComponentCodeList(filteredCodeList);
    }

    if (files.length > 0) {
      fetchAndSetComponentCode(codeList);
    }
  }, [dispatch, files, codeList]);

  function createComponentFromCode(code) {
    try {
      const component = eval(code);
      return component.default || component;
    } catch (error) {
      console.error('Error al crear el componente a partir del código', error);
      return null;
    }
  }

  const componentDef = parse(`export const ScreenSample = () => {
        return (
            <div>Hola mundo</div>
        );
    }`);

  console.log(componentDef);
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
  const AddGridItem = (component: JSX.Element, componentName: string) => {
    const newItemUUID = uuid();

    setLayout((prevLayout) => [
      ...prevLayout,
      { i: newItemUUID, x: 0, y: 0, w: 1.5, h: 1, static: false, maxH: 30 },
    ]);

    setLists((prevLists) => [
      ...prevLists,
      { i: newItemUUID, component, componentName },
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

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="editor">
        <div className="editor__components">
          <Column>
            {objectNames.map((objectName, index) => (
              <MovableItem
                key={index}
                onClick={() =>
                  AddGridItem(
                    createComponentFromCode(componentCodeList[index]),
                    objectName
                  )
                }
              >
                {objectName}
              </MovableItem>
            ))}
          </Column>
        </div>
        <Column
          className="editor__canvas"
          children={undefined}
          title={undefined}
        >
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
          <TestComponent text={text} style={styles} />
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
